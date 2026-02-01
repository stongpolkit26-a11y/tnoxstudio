// TNOX Studio — script (module)

document.addEventListener('DOMContentLoaded', () => {

  // Preloader
  const pre = document.getElementById('preloader');
  if (pre) {
    setTimeout(() => {
      pre.classList.add('hidden');
    }, 1200);
  }

  // Custom cursor
  const cursor = document.createElement('div');
  const dot    = document.createElement('div');
  cursor.className = 'cursor';
  dot.className    = 'cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    cursor.style.display = dot.style.display = 'none';
  }

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function tick() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    dot.style.transform    = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  if (!isTouch) tick();

  // Hover
  document.querySelectorAll('a, button, .btn-primary').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Menu toggle
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('menu-close');

  if (toggle && overlay) {
    const open = () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const cls = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    toggle.onclick = open;
    closeBtn.onclick = cls;
    overlay.onclick = e => { if (e.target === overlay) cls(); };
    window.addEventListener('keydown', e => { if (e.key === 'Escape') cls(); });
  }

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});
