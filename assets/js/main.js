(function () {
  const root = document.documentElement;
  const key = "mm_theme";

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(key, theme);
    const btn = document.querySelector("#themeToggle");
    if (btn) btn.setAttribute("aria-label", `Switch theme (current: ${theme})`);
  }

  // Init theme
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") setTheme(saved);

 
})();
