const THEME_KEY = "order-mini-theme";

const THEMES = {
  light: {
    pageBg: "#f6f4ef",
    navBg: "#c7442e",
    navFront: "#ffffff",
    tabBg: "#fffdf8",
    tabColor: "#706c63",
    tabSelected: "#c7442e",
    tabBorder: "black"
  },
  dark: {
    pageBg: "#11130f",
    navBg: "#11130f",
    navFront: "#ffffff",
    tabBg: "#181a16",
    tabColor: "#aaa397",
    tabSelected: "#f4c15d",
    tabBorder: "white"
  }
};

App({
  globalData: {
    // 上线后可改成你的 Vercel 域名，例如：https://order-app-lemon-seven.vercel.app
    apiBaseUrl: "",
    orderStorageKey: "customer-orders",
    cartStorageKey: "order-cart",
    theme: "light",
    themeStorageKey: THEME_KEY
  },

  onLaunch() {
    this.applyTheme(this.getStoredTheme());
  },

  getStoredTheme() {
    return wx.getStorageSync(THEME_KEY) || "light";
  },

  getTheme() {
    return this.globalData.theme || this.getStoredTheme();
  },

  toggleTheme() {
    const nextTheme = this.getTheme() === "dark" ? "light" : "dark";
    return this.applyTheme(nextTheme);
  },

  applyTheme(theme = "light") {
    const nextTheme = theme === "dark" ? "dark" : "light";
    const colors = THEMES[nextTheme];
    this.globalData.theme = nextTheme;
    wx.setStorageSync(THEME_KEY, nextTheme);

    wx.setNavigationBarColor({
      frontColor: colors.navFront,
      backgroundColor: colors.navBg
    });

    if (wx.setBackgroundColor) {
      wx.setBackgroundColor({
        backgroundColor: colors.pageBg,
        backgroundColorTop: colors.pageBg,
        backgroundColorBottom: colors.pageBg
      });
    }

    if (wx.setTabBarStyle) {
      wx.setTabBarStyle({
        backgroundColor: colors.tabBg,
        color: colors.tabColor,
        selectedColor: colors.tabSelected,
        borderStyle: colors.tabBorder
      });
    }

    return nextTheme;
  }
});
