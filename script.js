// WattWise — shared script for the 3-page version
// Highlights whichever nav link matches the current page, and keeps
// the footer year current. Actual navigation is handled by normal
// <a href="..."> links between index.html, televisions.html and about.html.

(function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Get just the filename part of the current URL, defaulting to
  // index.html when the path ends in a slash (e.g. hosted at a domain root).
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkFile = link.getAttribute("href");
    const isCurrent = linkFile === currentFile;

    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
})();