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

(function () {
  var form = document.getElementById("intake-form");
  if (!form) return;
  var boxes = Array.prototype.slice.call(form.querySelectorAll("#matters input[type=checkbox]"));
  var limit = 2;

  function syncBoxes() {
    var picked = boxes.filter(function (box) { return box.checked; }).length;
    boxes.forEach(function (box) {
      box.disabled = picked >= limit && !box.checked;
    });
  }
  boxes.forEach(function (box) {
    box.addEventListener("change", syncBoxes);
  });
  syncBoxes();
  window.addEventListener("pageshow", function () {
    var old = form.querySelector("input[name='What matters most right now? (picked)']");
    if (old) old.remove();
    syncBoxes();
  });

  form.addEventListener("submit", function () {
    var name = (form.elements["Name"].value || "").trim();
    document.getElementById("intake-subject").value = "Intake: " + (name || "new submission");

    var picked = boxes.filter(function (box) { return box.checked; }).map(function (box) { return box.value; });
    if (picked.length) {
      var joined = document.createElement("input");
      joined.type = "hidden";
      joined.name = "What matters most right now? (picked)";
      joined.value = picked.join(", ");
      form.appendChild(joined);
    }
    boxes.forEach(function (box) { box.disabled = true; });
  });
})();
