// TNOX Studio — Clean & Performant Script (module mode)

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1400);
  }

  // Cursor
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    cursor.style.display = 'none';
    dot.style.display = 'none';
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.14;
    cursorY += (mouseY - cursorY) * 0.14;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }

  if (!isTouch) requestAnimationFrame(updateCursor);

  // Hover effect
  document.querySelectorAll('a, button, .cta-button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Mobile menu
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('menu-close');

  if (toggleBtn && menu) {
    const openMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'true');
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menu.addEventListener('click', e => {
      if (e.target === menu) closeMenu();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Reduced motion check
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
  }

}, { once: true });
