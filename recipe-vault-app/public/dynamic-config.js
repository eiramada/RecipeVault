// public/dynamic-config.js
document.addEventListener("DOMContentLoaded", () => {
  const userLang = localStorage.getItem("lang") || "en";
  const appName = userLang === "ee" ? "Retseptisahtel" : "Recipe Vault";

  document.getElementById("app-title").textContent = appName;
});
