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

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Register interest form ---------- */
  var form = document.getElementById("interest-form");
  if (!form) return;

  var thankYou = document.getElementById("thank-you");
  var status = form.querySelector(".form-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, errorId, show) {
    var err = document.getElementById(errorId);
    if (show) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", errorId);
      err.hidden = false;
    } else {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
      err.hidden = true;
    }
  }

  function validate() {
    var name = form.elements.name;
    var email = form.elements.email;
    var consent = form.elements.consent;
    var nameBad = name.value.trim().length < 2;
    var emailBad = !emailPattern.test(email.value.trim());
    var consentBad = !consent.checked;
    setError(name, "name-error", nameBad);
    setError(email, "email-error", emailBad);
    setError(consent, "consent-error", consentBad);
    var firstBad = nameBad ? name : emailBad ? email : consentBad ? consent : null;
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function showThankYou() {
    var first = form.elements.name.value.trim().split(/\s+/)[0];
    var title = document.getElementById("thank-you-title");
    if (first) title.textContent = "Thank you, " + first + "!";
    form.hidden = true;
    thankYou.hidden = false;
    thankYou.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");
    if (!validate()) return;

    // Honeypot: if a bot filled the hidden field, quietly pretend success.
    if (form.elements._gotcha && form.elements._gotcha.value) {
      showThankYou();
      return;
    }

    var action = form.getAttribute("action") || "#";

    // PLACEHOLDER MODE: no form service connected yet (action="#").
    // Nothing is sent anywhere; we only show the thank-you message.
    // Connect Formspree (or similar) by setting the form's action in index.html.
    if (action === "#" || action.trim() === "") {
      if (window.console) console.info("[YA Transit] Form not yet connected to a form service – submission not sent.");
      showThankYou();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        showThankYou();
      })
      .catch(function () {
        status.textContent = "Sorry, something went wrong. Please try again, or email hello@yatransit.co.uk.";
        status.classList.add("is-error");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Register my interest";
      });
  });
})();
