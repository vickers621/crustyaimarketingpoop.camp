(function () {
  var S = window.SITE, E = S.event, V = E.venue;
  var $ = function (id) { return document.getElementById(id); };
  var mail = "mailto:" + S.contactEmail + "?subject=" + encodeURIComponent(E.title + " at " + V.name);

  ["nav-substack", "hero-substack", "nl-substack", "foot-substack"].forEach(function (id) { $(id).href = S.substackUrl; });
  ["foot-email", "lineup-email"].forEach(function (id) { $(id).href = mail; });
  if (S.instagram) { $("foot-ig").href = S.instagram; $("foot-ig-wrap").hidden = false; }
  $("year").textContent = new Date().getFullYear();

  $("ev-title").textContent = E.title;
  $("ev-venue").textContent = V.name;
  $("ev-venue-link").href = V.url;
  $("ev-venue-tagline").textContent = V.tagline.toLowerCase();
  $("ev-date").textContent = E.dateText;
  $("ev-time").textContent = E.timeText;
  $("ev-address").textContent = V.address;
  $("ev-city").textContent = V.city;
  $("ev-map").href = V.mapsUrl;
  $("ev-price").textContent = E.price;
  $("pending-ribbon").hidden = !!E.confirmed;

  var cta = $("ev-cta");
  if (E.ticketUrl) { cta.href = E.ticketUrl; cta.target = "_blank"; cta.rel = "noopener"; cta.textContent = "Get tickets"; }
  else { cta.href = mail; cta.textContent = "RSVP by email"; }

  if (E.lineup.length) {
    $("lineup-empty").hidden = true;
    E.lineup.forEach(function (c) {
      var li = document.createElement("li");
      var b = document.createElement("b");
      if (c.url) { var a = document.createElement("a"); a.href = c.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = c.name; b.appendChild(a); }
      else b.textContent = c.name;
      li.appendChild(b);
      if (c.credit) { var s = document.createElement("small"); s.textContent = c.credit; li.appendChild(s); }
      $("lineup").appendChild(li);
    });
  }

  // Countdown to show start
  var target = new Date(E.dateISO).getTime();
  function tick() {
    var d = Math.max(0, target - Date.now());
    $("cd-d").textContent = Math.floor(d / 864e5);
    $("cd-h").textContent = String(Math.floor(d / 36e5) % 24).padStart(2, "0");
    $("cd-m").textContent = String(Math.floor(d / 6e4) % 60).padStart(2, "0");
    $("cd-s").textContent = String(Math.floor(d / 1e3) % 60).padStart(2, "0");
  }
  tick(); setInterval(tick, 1000);

  // .ics calendar file
  function ics(dt) { return new Date(dt).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  var start = new Date(E.dateISO), end = new Date(start.getTime() + 4 * 36e5);
  var body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//crustyaimarketingpoop.camp//NYE//EN", "BEGIN:VEVENT",
    "UID:nye-" + start.getFullYear() + "@crustyaimarketingpoop.camp", "DTSTAMP:" + ics(Date.now()),
    "DTSTART:" + ics(start), "DTEND:" + ics(end),
    "SUMMARY:" + E.title + " at " + V.name, "LOCATION:" + V.name + ", " + V.address + ", " + V.city,
    "DESCRIPTION:" + E.timeText + " - https://crustyaimarketingpoop.camp/nye", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  $("ev-cal").href = "data:text/calendar;charset=utf-8," + encodeURIComponent(body);
})();
