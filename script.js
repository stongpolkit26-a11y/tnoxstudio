// TNOX — minimal interaction layer

document.addEventListener('DOMContentLoaded', () => {

  // Simple scroll reveal for statement items
  const items = document.querySelectorAll('.statement-item .value');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
      }
    });
  }, {
    threshold: 0.4
  });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(40px)';
    item.style.transition = 'all 0.9s cubic-bezier(0.23,1,0.32,1)';
    observer.observe(item);
  });

}, { passive: true });
