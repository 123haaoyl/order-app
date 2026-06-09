const { shopConfig, tables } = require("../../utils/data");
const { createOrderPayload, getCartItems, getTotals } = require("../../utils/order");

const app = getApp();

Page({
  data: {
    theme: "light",
    shop: shopConfig,
    orderType: "dinein",
    tableOptions: [],
    tableNo: "",
    address: "",
    deliveryTime: "",
    paymentMethod: "到店支付",
    note: "",
    cart: {},
    cartItems: [],
    totals: { count: 0, subtotal: 0, packingFee: 0, deliveryFee: 0, payable: 0 }
  },

  onLoad(query = {}) {
    this.syncTheme();
    const tableOptions = tables
      .filter((table) => table.status !== "occupied")
      .map((table) => ({ value: table.id, label: `${table.id} · ${table.area} · ${table.seats}人` }));
    const cart = wx.getStorageSync(app.globalData.cartStorageKey) || {};
    this.setData({
      tableOptions,
      cart,
      orderType: query.type || "dinein",
      tableNo: decodeURIComponent(query.table || "")
    }, () => this.refreshOrder());
  },

  onShow() {
    this.syncTheme();
  },

  syncTheme() {
    const theme = app.applyTheme(app.getTheme());
    this.setData({ theme });
  },

  toggleTheme() {
    const theme = app.toggleTheme();
    this.setData({ theme });
  },

  refreshOrder() {
    const cartItems = getCartItems(this.data.cart);
    const totals = getTotals(this.data.cart, this.data.orderType);
    this.setData({ cartItems, totals });
  },

  setOrderType(event) {
    this.setData({ orderType: event.currentTarget.dataset.type }, () => this.refreshOrder());
  },

  pickTable(event) {
    const option = this.data.tableOptions[Number(event.detail.value)];
    this.setData({ tableNo: option?.value || "" });
  },

  inputAddress(event) {
    this.setData({ address: event.detail.value });
  },

  inputDeliveryTime(event) {
    this.setData({ deliveryTime: event.detail.value });
  },

  inputNote(event) {
    this.setData({ note: event.detail.value });
  },

  submitOrder() {
    if (!this.data.totals.count) {
      wx.showToast({ title: "请先选择菜品", icon: "none" });
      return;
    }
    if (this.data.orderType === "dinein" && !this.data.tableNo) {
      wx.showToast({ title: "请选择桌号", icon: "none" });
      return;
    }
    if (this.data.orderType === "takeaway" && !this.data.address.trim()) {
      wx.showToast({ title: "请填写地址", icon: "none" });
      return;
    }
    const payload = createOrderPayload({
      cart: this.data.cart,
      orderType: this.data.orderType,
      tableNo: this.data.tableNo,
      address: this.data.address,
      deliveryTime: this.data.deliveryTime,
      paymentMethod: this.data.paymentMethod,
      note: this.data.note
    });
    this.submitToBackend(payload);
  },

  submitToBackend(payload) {
    const apiBaseUrl = app.globalData.apiBaseUrl;
    if (!apiBaseUrl) {
      this.saveLocalOrder({ ...payload, id: `WX-${Date.now()}`, source: "local" });
      return;
    }
    wx.request({
      url: `${apiBaseUrl.replace(/\/$/, "")}/api/orders`,
      method: "POST",
      data: payload,
      success: (res) => {
        const isOk = res.statusCode >= 200 && res.statusCode < 300;
        const order = isOk ? (res.data.order || payload) : payload;
        this.saveLocalOrder({ ...order, source: isOk ? "cloud" : "local" });
      },
      fail: () => this.saveLocalOrder({ ...payload, id: `WX-${Date.now()}`, source: "local" })
    });
  },

  saveLocalOrder(order) {
    const orders = wx.getStorageSync(app.globalData.orderStorageKey) || [];
    wx.setStorageSync(app.globalData.orderStorageKey, [{ ...order, created_at: order.created_at || new Date().toISOString() }, ...orders]);
    wx.removeStorageSync(app.globalData.cartStorageKey);
    wx.showModal({
      title: "订单已提交",
      content: order.source === "cloud" ? "订单已同步到后台" : "订单已保存在本机，配置云端后可同步后台",
      showCancel: false,
      success: () => wx.switchTab({ url: "/pages/orders/orders" })
    });
  }
});
