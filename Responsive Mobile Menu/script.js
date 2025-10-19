// Sidebar toggle (dashboard + settings pages)
function toggleMenu() {
  var sb = document.getElementById("sidebar");
  if (sb) sb.classList.toggle("active");
}

// Tab switcher (dashboard)
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

// Common actions once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Logout works anywhere the button exists
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("You have been logged out!");
      window.location.href = "index.html";
    });
  }

  // Settings save (simple demo: toggles dark mode immediately)
  const saveBtn = document.getElementById("saveSettings");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const dark = document.getElementById("darkModeToggle")?.checked;
      if (dark) {
        document.body.style.background = "#222";
        document.body.style.color = "#fff";
      } else {
        document.body.style.background = "#f4f7f2";
        document.body.style.color = "#333";
      }
      alert("Settings saved!");
    });
  }
});
