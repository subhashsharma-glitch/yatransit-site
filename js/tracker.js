/* YA Transit – Robotaxi Tracker: renders the operator table from tracker/data.json.
   The page ships with a pre-rendered table, so if this script or the JSON fails, that stays in place. */
(function () {
  "use strict";
  var table = document.querySelector("[data-tracker-table]");
  var tbody = document.querySelector("[data-tracker-rows]");
  if (!table || !tbody || !window.fetch) return;

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function human(iso) {
    var p = String(iso).split("-");
    return parseInt(p[2], 10) + " " + MONTHS[parseInt(p[1], 10) - 1] + " " + p[0];
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[c];
    });
  }
  function safeUrl(u) { return /^https:\/\//.test(u) ? u : "#"; }

  /* Keep in sync with row() in _dev/build_tracker.py */
  function renderRow(o, labels) {
    var fleet = o.fleet
      ? "<strong>" + esc(o.fleet) + '</strong><span class="rt-sub">' + esc(o.fleetNote) + "</span>"
      : '<span class="rt-muted">' + esc(o.fleetNote) + "</span>";
    var srcs = (o.sources || []).map(function (s) {
      return '<li><a href="' + esc(safeUrl(s.url)) + '" rel="noopener">' + esc(s.label) + "</a></li>";
    }).join("");
    return '<tr data-region="' + esc(o.region) + '" data-status="' + esc(o.status) + '">' +
      '<th scope="row" data-label="Place"><span class="rt-place">' + esc(o.place) + '</span><span class="rt-sub">' + esc(o.country) + "</span></th>" +
      '<td data-label="Operator"><span class="rt-op">' + esc(o.operator) + '</span><span class="rt-sub">' + esc(o.type) + "</span></td>" +
      '<td data-label="Status"><span class="rt-status rt-s-' + esc(o.status) + '"><span class="rt-dot" aria-hidden="true"></span>' +
        esc(labels[o.status] || o.status) + '</span><span class="rt-sub">' + esc(o.statusText) + "</span></td>" +
      '<td data-label="Fleet (official)">' + fleet + "</td>" +
      '<td data-label="Notes" class="rt-note">' + esc(o.note) + "</td>" +
      '<td data-label="Sources"><ul class="rt-sources">' + srcs + '</ul><span class="rt-verified">Last verified <time datetime="' +
        esc(o.lastVerified) + '">' + esc(human(o.lastVerified)) + "</time></span></td>" +
      "</tr>";
  }

  fetch(table.getAttribute("data-src"), { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (data) {
      var ops = data.operators || [];
      if (!ops.length) return;
      var labels = {};
      (data.statuses || []).forEach(function (s) { labels[s.id] = s.label; });

      var filters = document.querySelector("[data-tracker-filters]");
      var count = document.querySelector("[data-tracker-count]");
      var region = document.querySelector('[data-filter="region"]');
      var status = document.querySelector('[data-filter="status"]');

      function draw() {
        var r = region ? region.value : "", s = status ? status.value : "";
        var shown = ops.filter(function (o) { return (!r || o.region === r) && (!s || o.status === s); });
        tbody.innerHTML = shown.length
          ? shown.map(function (o) { return renderRow(o, labels); }).join("")
          : '<tr class="rt-empty"><td colspan="6">No entries match these filters.</td></tr>';
        if (count) count.textContent = "Showing " + shown.length + " of " + ops.length + " entries";
      }
      draw();
      if (filters) filters.hidden = false;
      if (region) region.addEventListener("change", draw);
      if (status) status.addEventListener("change", draw);
    })
    .catch(function () { /* keep the pre-rendered table */ });
})();
