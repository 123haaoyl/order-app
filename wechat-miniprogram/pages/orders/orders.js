const app = getApp();

Page({
  data: {
    orders: []
  },

  onShow() {
    this.reloadOrders();
  },

  reloadOrders() {
    const orders = wx.getStorageSync(app.globalData.orderStorageKey) || [];
    this.setData({ orders });
  },

  goMenu() {
    wx.switchTab({ url: "/pages/menu/menu" });
  }
});
