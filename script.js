// WattWise — simple page-swap navigation
// Shows/hides the three <section class="page"> blocks and keeps the
// nav links, page title and browser hash in sync with the current page.

(function () {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const logoBtn = document.getElementById("logo-btn");
  const yearSpan = document.getElementById("year");

  yearSpan.textContent = new Date().getFullYear();

  function showPage(pageId) {
    let matched = false;

    pages.forEach((page) => {
      const isTarget = page.id === pageId;
      page.classList.toggle("active", isTarget);
      if (isTarget) matched = true;
    });

    // Fall back to home if an unknown/empty id was requested
    if (!matched) {
      document.getElementById("home").classList.add("active");
      pageId = "home";
    }

    // Update nav link styling + "current page" feedback for assistive tech
    navLinks.forEach((link) => {
      const isCurrent = link.dataset.page === pageId;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Update the browser tab title using the section's data-title
    const activeSection = document.getElementById(pageId);
    if (activeSection && activeSection.dataset.title) {
      document.title = activeSection.dataset.title;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateTo(pageId) {
    // Updating the hash triggers the hashchange listener below,
    // which keeps a page refresh / bookmark landing on the same page.
    if (window.location.hash.slice(1) === pageId) {
      showPage(pageId);
    } else {
      window.location.hash = pageId;
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigateTo(link.dataset.page);
    });
  });

  logoBtn.addEventListener("click", () => navigateTo("home"));

  window.addEventListener("hashchange", () => {
    showPage(window.location.hash.slice(1) || "home");
  });

  // Initial load: honour a hash if present (e.g. a bookmarked link), else home
  showPage(window.location.hash.slice(1) || "home");
})();