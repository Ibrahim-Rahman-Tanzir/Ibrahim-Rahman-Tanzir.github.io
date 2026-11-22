(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navigation");
  const saved = localStorage.getItem("irt-theme");
  if (saved === "dark") root.dataset.theme = "dark";
  const updateTheme = () => {
    themeButton.textContent = root.dataset.theme === "dark" ? "☀" : "☾";
    themeButton.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };
  updateTheme();
  themeButton.addEventListener("click", () => {
    if (root.dataset.theme === "dark") {
      delete root.dataset.theme;
      localStorage.setItem("irt-theme", "light");
    } else {
      root.dataset.theme = "dark";
      localStorage.setItem("irt-theme", "dark");
    }
    updateTheme();
  });
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
  const links = [...nav.querySelectorAll("a")];
  const sections = [...document.querySelectorAll("main section[id], .hero")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, {rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section => observer.observe(section));
  document.getElementById("year").textContent = new Date().getFullYear();

  // Email is intentionally not hard-coded; add your public email here when ready.
  document.getElementById("contact-form").addEventListener("submit", event => {
    event.preventDefault();
    const note = document.getElementById("form-note");
    const emailAddress = "ibrahim.r.tanzir@gmail.com";
    if (!emailAddress) {
      note.textContent = "Add your email address in assets/js/script.js to enable message sending.";
      return;
    }
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(data.get("subject"));
    const body = encodeURIComponent(`From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  });
})();