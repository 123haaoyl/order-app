const { shopConfig, tables, menuItems } = require("../../utils/data");
const {
  buildCartEntry,
  buildCartKey,
  createOrderPayload,
  defaultSpecs,
  getCartItems,
  getTotals,
  getUnitPrice
} = require("../../utils/order");

const app = getApp();

Page({
  data: {
    shop: shopConfig,
    categories: [],
    activeCategory: "全部",
    keyword: "",
    page: 1,
    pageSize: 8,
    totalPages: 1,
    pageItems: [],
    tableOptions: [],
    tableNo: "",
    orderType: "dinein",
    address: "",
    deliveryTime: "",
    paymentMethod: "到店支付",
    note: "",
    cart: {},
    cartItems: [],
    totals: { count: 0, subtotal: 0, packingFee: 0, deliveryFee: 0, payable: 0 },
    specVisible: false,
    selectedDish: null,
    selectedSpecIndexes: {},
    selectedPrice: 0
  },

  onLoad(query = {}) {
    const tableNo = query.table || "";
    const categories = ["全部", ...new Set(menuItems.map((item) => item.category).filter(Boolean))];
    const tableOptions = tables
      .filter((table) => table.status !== "occupied")
      .map((table) => ({ value: table.id, label: `${table.id} · ${table.area} · ${table.seats}人` }));
    const cart = wx.getStorageSync(app.globalData.cartStorageKey) || {};
    this.setData({ categories, tableOptions, tableNo, cart }, () => this.refreshAll());
  },

  getFilteredItems() {
    const keyword = this.data.keyword.trim().toLowerCase();
    return menuItems
      .filter((item) => {
        const inCategory = this.data.activeCategory === "全部" || item.category === this.data.activeCategory;
        const inKeyword = !keyword ||
          item.name.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword);
        return item.isActive !== false && inCategory && inKeyword;
      })
      .sort((a, b) => Number(a.rank || 99) - Number(b.rank || 99));
  },

  refreshAll() {
    this.refreshMenu();
    this.refreshCart();
  },

  refreshMenu() {
    const items = this.getFilteredItems();
    const totalPages = Math.max(1, Math.ceil(items.length / this.data.pageSize));
    const page = Math.min(Math.max(1, this.data.page), totalPages);
    const start = (page - 1) * this.data.pageSize;
    this.setData({ page, totalPages, pageItems: items.slice(start, start + this.data.pageSize) });
  },

  refreshCart() {
    const cartItems = getCartItems(this.data.cart);
    const totals = getTotals(this.data.cart, this.data.orderType);
    this.setData({ cartItems, totals });
    wx.setStorageSync(app.globalData.cartStorageKey, this.data.cart);
  },

  setOrderType(event) {
    this.setData({ orderType: event.currentTarget.dataset.type }, () => this.refreshCart());
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

  inputKeyword(event) {
    this.setData({ keyword: event.detail.value, page: 1 }, () => this.refreshMenu());
  },

  setCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.category, page: 1 }, () => this.refreshMenu());
  },

  prevPage() {
    this.setData({ page: this.data.page - 1 }, () => this.refreshMenu());
  },

  nextPage() {
    this.setData({ page: this.data.page + 1 }, () => this.refreshMenu());
  },

  openSpec(event) {
    const selectedDish = menuItems.find((item) => item.id === event.currentTarget.dataset.id);
    if (!selectedDish) return;
    const selectedSpecIndexes = {};
    (selectedDish.specs || []).forEach((_, index) => {
      selectedSpecIndexes[index] = 0;
    });
    this.setData({
      specVisible: true,
      selectedDish,
      selectedSpecIndexes,
      selectedPrice: getUnitPrice(selectedDish, defaultSpecs(selectedDish))
    });
  },

  closeSpec() {
    this.setData({ specVisible: false, selectedDish: null, selectedSpecIndexes: {} });
  },

  noop() {},

  selectSpec(event) {
    const { group, option } = event.currentTarget.dataset;
    const selectedSpecIndexes = { ...this.data.selectedSpecIndexes, [group]: Number(option) };
    const specs = this.getSelectedSpecs(selectedSpecIndexes);
    this.setData({ selectedSpecIndexes, selectedPrice: getUnitPrice(this.data.selectedDish, specs) });
  },

  getSelectedSpecs(indexes = this.data.selectedSpecIndexes) {
    return (this.data.selectedDish?.specs || []).map((group, groupIndex) => {
      const option = group.options?.[indexes[groupIndex] || 0] || {};
      return {
        name: group.name,
        label: option.label || "默认",
        priceDelta: Number(option.priceDelta || 0)
      };
    });
  },

  addSelectedDish() {
    const dish = this.data.selectedDish;
    if (!dish) return;
    const specs = this.getSelectedSpecs();
    const key = buildCartKey(dish, specs);
    const cart = { ...this.data.cart };
    cart[key] = cart[key] || buildCartEntry(dish, specs, 0);
    cart[key].quantity += 1;
    this.setData({ cart, specVisible: false }, () => this.refreshCart());
    wx.showToast({ title: "已加入购物车", icon: "success" });
  },

  increaseCart(event) {
    this.updateCartQuantity(event.currentTarget.dataset.key, 1);
  },

  decreaseCart(event) {
    this.updateCartQuantity(event.currentTarget.dataset.key, -1);
  },

  updateCartQuantity(key, delta) {
    const cart = { ...this.data.cart };
    if (!cart[key]) return;
    cart[key].quantity += delta;
    if (cart[key].quantity <= 0) delete cart[key];
    this.setData({ cart }, () => this.refreshCart());
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
        const order = res.statusCode >= 200 && res.statusCode < 300 ? (res.data.order || payload) : payload;
        this.saveLocalOrder({ ...order, source: res.statusCode >= 200 && res.statusCode < 300 ? "cloud" : "local" });
      },
      fail: () => this.saveLocalOrder({ ...payload, id: `WX-${Date.now()}`, source: "local" })
    });
  },

  saveLocalOrder(order) {
    const orders = wx.getStorageSync(app.globalData.orderStorageKey) || [];
    wx.setStorageSync(app.globalData.orderStorageKey, [{ ...order, created_at: order.created_at || new Date().toISOString() }, ...orders]);
    wx.removeStorageSync(app.globalData.cartStorageKey);
    this.setData({ cart: {} }, () => this.refreshCart());
    wx.showModal({
      title: "订单已提交",
      content: order.source === "cloud" ? "订单已同步到后台" : "订单已保存在本机，配置云端后可同步后台",
      showCancel: false
    });
  }
});
