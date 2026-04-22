/* ============================================================
   JUDZ BEAUTY CARE — main.js
   ============================================================ */

(function () {
  'use strict';

  /* --- Footer year ----------------------------------------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Nav scroll shadow ------------------------------------ */
  const nav = document.querySelector('.site-nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile nav toggle ------------------------------------ */
  const hamburger = document.getElementById('nav-hamburger');
  const mobilePanel = document.getElementById('nav-mobile-panel');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  if (hamburger && mobilePanel) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobilePanel.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburgerIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobilePanel.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburgerIcon.className = 'fa-solid fa-bars';
      });
    });
  }

  /* --- Active nav via IntersectionObserver ----------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            const match = link.getAttribute('href') === '#' + entry.target.id;
            link.toggleAttribute('aria-current', match);
            if (match) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* --- Scroll-reveal ---------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* --- Floating CTA — hide when Final CTA is in view ------- */
  const floatBtn = document.getElementById('float-cta');
  const finalCta = document.getElementById('final-cta');

  if (floatBtn && finalCta) {
    const floatObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          floatBtn.classList.toggle('hidden', entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );
    floatObserver.observe(finalCta);
  }
})();
