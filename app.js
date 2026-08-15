/* W. Dean Lyons — theme toggle, scroll reveals, sticky header.
   No dependencies. Degrades gracefully if JS is off.

   THEME DEFAULT: dark. To follow the visitor's system setting instead,
   change getInitial() below to return the system preference first. */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* ---- Theme -------------------------------------------------- */
  function current() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme, save) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');

    var btn = document.querySelector('.themetoggle');
    if (btn) {
      btn.setAttribute('aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F4F7FB' : '#061527');

    if (save) { try { localStorage.setItem('theme', theme); } catch (e) {} }
  }

  apply(current(), false);

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.themetoggle');
    if (!btn) return;
    apply(current() === 'light' ? 'dark' : 'light', true);
  });

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
    var onScroll = function () { bar.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
