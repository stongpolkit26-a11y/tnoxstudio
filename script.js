// script.js - TNOX OFFICIAL STUDIO 2026 Edition

document.addEventListener('DOMContentLoaded', () => {

    // ==================== Preloader ====================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 600);
        });
    }

    // ==================== Dynamic Year ====================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==================== Custom Cursor ====================
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'cursor';
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

        requestAnimationFrame(updateCursor);
    }
    if (!isTouchDevice) updateCursor();

    // Hover effect
    const hoverElements = document.querySelectorAll('a, button, .cta');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ==================== Hamburger Menu ====================
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu');

    if (hamburger && menuOverlay) {
        hamburger.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'visible';
        };

        closeMenuBtn.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) closeMenu();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // ==================== Parallax Brand ====================
    const brand = document.getElementById('brand');
    const hero = document.getElementById('hero');

    if (brand && hero && !isTouchDevice) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const progress = Math.min(scrollY / heroHeight, 1);
            
            brand.style.transform = `translateY(${progress * 120}px) rotateX(${progress * 15}deg)`;
            brand.style.opacity = 1 - (progress * 0.4);
        }, { passive: true });
    }

    // ==================== Magnetic CTA ====================
    const cta = document.getElementById('cta');
    if (cta && !isTouchDevice) {
        cta.addEventListener('mousemove', (e) => {
            const rect = cta.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
            
            cta.style.transform = `translate(${x}px, ${y}px)`;
        });

        cta.addEventListener('mouseleave', () => {
            cta.style.transform = 'translate(0, 0)';
        });
    }

    // ==================== Scroll Reveal ====================
    const revealText = document.getElementById('reveal-text');
    if (revealText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(revealText);
    }

    // ==================== Reduced Motion Check ====================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-speed', '0.01ms');
    }

});
