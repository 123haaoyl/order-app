(() => {
  const STORAGE_KEY = "order-app-theme";
  const root = document.documentElement;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  function normalizeTheme(theme) {
    return theme === "dark" || theme === "light" ? theme : prefersDark ? "dark" : "light";
  }

  function updateToggle(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const nextTheme = theme === "dark" ? "浅色" : "深色";
      const label = button.querySelector("[data-theme-label]");
      if (label) label.textContent = nextTheme;
      button.setAttribute("aria-label", `切换${nextTheme}样式`);
      button.title = `切换${nextTheme}样式`;
    });
  }

  function applyTheme(theme) {
    const normalizedTheme = normalizeTheme(theme);
    root.dataset.theme = normalizedTheme;
    root.style.colorScheme = normalizedTheme;
    updateToggle(normalizedTheme);
  }

  function toggleTheme() {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  function bindToggle() {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", toggleTheme);
    });
    updateToggle(root.dataset.theme);
  }

  applyTheme(localStorage.getItem(STORAGE_KEY));

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggle);
  } else {
    bindToggle();
  }
})();
