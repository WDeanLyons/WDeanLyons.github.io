/* W. Dean Lyons — scroll reveals and sticky header state.
   No dependencies. Degrades gracefully if JS is off. */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* ---- Reveal on scroll --------------------------------------- */
  var targets = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = el.getAttribute('data-reveal-delay') || 0;
        setTimeout(function () { el.classList.add('is-in'); }, Number(delay));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Sticky header hairline --------------------------------- */
  var bar = document.querySelector('.topbar');
  if (bar) {
    var onScroll = function () {
      bar.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
