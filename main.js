(function () {
  var details = document.querySelector(".nav-details");
  var desktopNav = window.matchMedia("(min-width: 960px)");
  function syncNav() {
    if (!details) return;
    if (desktopNav.matches) details.setAttribute("open", "");
  }
  if (details) {
    syncNav();
    desktopNav.addEventListener("change", syncNav);
    details.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!desktopNav.matches) details.removeAttribute("open");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !desktopNav.matches) details.removeAttribute("open");
    });
  }

  document.querySelectorAll("a[data-regarding]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("regarding");
      if (select) select.value = link.getAttribute("data-regarding");
    });
  });

  var root = document.documentElement;
  var heading = document.querySelector("#contact-thanks h3, .thanks h1");
  if (heading && (root.classList.contains("asked") || root.classList.contains("sent"))) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
})();
