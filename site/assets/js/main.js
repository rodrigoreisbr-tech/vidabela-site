/* Vida Bela Lofts Cumbuco — main.js */
(function () {
  'use strict';

  /* ---- Header: fundo sólido ao rolar ---- */
  var header = document.querySelector('.site-header');
  if (header && !header.classList.contains('site-header--solid')) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      if (open && header) header.classList.add('is-scrolled');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Reveal ao rolar ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Lightbox da galeria ---- */
  var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (galleryLinks.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Galeria de fotos ampliada');
    lightbox.innerHTML =
      '<button class="lightbox__close" aria-label="Fechar galeria">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
      '<button class="lightbox__prev" aria-label="Foto anterior">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<img src="" alt="">' +
      '<button class="lightbox__next" aria-label="Próxima foto">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
      '<p class="lightbox__caption"></p>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector('img');
    var lbCaption = lightbox.querySelector('.lightbox__caption');
    var current = 0;
    var lastFocus = null;

    var show = function (i) {
      current = (i + galleryLinks.length) % galleryLinks.length;
      var link = galleryLinks[current];
      lbImg.src = link.getAttribute('href');
      var alt = link.querySelector('img') ? link.querySelector('img').alt : '';
      lbImg.alt = alt;
      lbCaption.textContent = alt;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox__close').focus();
    };
    var close = function () {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
      if (lastFocus) lastFocus.focus();
    };

    galleryLinks.forEach(function (link, i) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });
    lightbox.querySelector('.lightbox__close').addEventListener('click', close);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.lightbox__next').addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---- Filtros (sabores) ---- */
  var filterChips = document.querySelectorAll('.filter-chip');
  var filterables = document.querySelectorAll('[data-cat]');
  if (filterChips.length && filterables.length) {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var cat = chip.getAttribute('data-filter');
        filterables.forEach(function (el) {
          var cats = el.getAttribute('data-cat').split(' ');
          el.classList.toggle('is-hidden', cat !== 'todos' && cats.indexOf(cat) === -1);
        });
      });
    });
  }

  /* ---- Ano corrente no rodapé ---- */
  var yearEl = document.getElementById('ano');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
