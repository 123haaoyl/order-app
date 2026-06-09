const app = getApp();

Page({
  data: {
    theme: "light",
    orders: []
  },

  onShow() {
    this.syncTheme();
    this.reloadOrders();
  },

  syncTheme() {
    const theme = app.applyTheme(app.getTheme());
    this.setData({ theme });
  },

  toggleTheme() {
    const theme = app.toggleTheme();
    this.setData({ theme });
  },

  reloadOrders() {
    const orders = wx.getStorageSync(app.globalData.orderStorageKey) || [];
    this.setData({ orders });
  },

  goMenu() {
    wx.switchTab({ url: "/pages/menu/menu" });
  }
});
