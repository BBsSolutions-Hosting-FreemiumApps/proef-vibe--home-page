// De Vlerk Amphitours — kleine interactieve toevoegingen.
// Progressieve verbetering: zonder JavaScript werkt de site volledig.

(function () {
  "use strict";

  // Zachte verschijningsanimatie van de gelegenheidskaarten,
  // alleen wanneer de bezoeker geen voorkeur voor minder beweging heeft.
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var kaarten = document.querySelectorAll(".kaart");
  if (!kaarten.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var teller = 0;
  kaarten.forEach(function (kaart) {
    kaart.style.opacity = "0";
    kaart.style.transform = "translateY(24px)";
    kaart.style.transition =
      "opacity .55s ease " + teller * 0.08 + "s, transform .55s ease " + teller * 0.08 + "s";
    teller += 1;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var kaart = entry.target;
          kaart.style.opacity = "1";
          kaart.style.transform = "translateY(0)";
          observer.unobserve(kaart);
        }
      });
    },
    { threshold: 0.2 }
  );

  kaarten.forEach(function (kaart) {
    observer.observe(kaart);
  });
})();
