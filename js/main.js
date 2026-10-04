/* YA Transit – minimal vanilla JS (no dependencies) */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  /* ---------- Forms (monthly briefing + route survey) ---------- */
  document.querySelectorAll("form[data-yat-form]").forEach(function (form) {
    var survey = form.hasAttribute("data-survey");
    var show = function (id, on) {
      var el = document.getElementById(id);
      if (el) el.hidden = !on;
      return el;
    };
    form.addEventListener("submit", function (e) {
      if (survey) {
        var journeys = form.querySelectorAll('input[data-group="Journeys"]:checked').length;
        var other = form.querySelector('input[name="Other journey"]');
        var hasOther = other && other.value.trim() !== "";
        if (!journeys && !hasOther) {
          e.preventDefault();
          var err = show("survey-journeys-error", true);
          var first = form.querySelector('input[data-group="Journeys"]');
          if (first) first.focus();
          if (err) err.scrollIntoView({ block: "center" });
          return;
        }
        show("survey-journeys-error", false);
        var email = form.querySelector('input[type="email"]');
        var needsEmail = form.querySelectorAll("input[data-needs-email]:checked").length > 0;
        if (needsEmail && email && email.value.trim() === "") {
          e.preventDefault();
          show("survey-email-error", true);
          email.setAttribute("aria-invalid", "true");
          email.focus();
          return;
        }
        show("survey-email-error", false);
        if (email) email.removeAttribute("aria-invalid");
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        if (btn.disabled) { e.preventDefault(); return; }
        btn.disabled = true;
        if (!btn.hasAttribute("data-label")) btn.setAttribute("data-label", btn.textContent);
        btn.textContent = "Sending…";
      }
    });
  });
  /* Re-enable submit buttons if the user comes back with the browser's Back button */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    document.querySelectorAll("form[data-yat-form] button[disabled]").forEach(function (b) {
      b.disabled = false;
      b.textContent = b.getAttribute("data-label") || (b.closest("[data-survey]") ? "Send my answers" : "Sign up");
    });
  });

  /* ---------- Thank-you page message ---------- */
  var thanksTitle = document.querySelector("[data-thanks-title]");
  var thanksText = document.querySelector("[data-thanks-text]");
  if (thanksTitle && thanksText) {
    var kind = new URLSearchParams(window.location.search).get("form");
    if (kind === "briefing") {
      thanksTitle.textContent = "You’re on the list";
      thanksText.textContent = "Thanks for signing up for the monthly YA Transit briefing. You can unsubscribe at any time by emailing hello@yatransit.co.uk.";
    } else if (kind === "survey") {
      thanksTitle.textContent = "Thanks for your answers";
      thanksText.textContent = "Your survey response helps us decide which journeys to plan for first. If you asked for the monthly briefing, it will arrive by email.";
    } else if (kind === "tracker") {
      thanksTitle.textContent = "Thanks for your report";
      thanksText.textContent = "We’ll check it against public sources before changing the tracker. If you gave your email address, we may reply with a question.";
      var back = document.querySelector(".thanks-actions .btn-primary");
      if (back) { back.textContent = "Back to the tracker"; back.setAttribute("href", "tracker.html"); }
    }
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
