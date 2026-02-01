/**
 * TNOX STUDIO - INTERACTION ENGINE
 * CONCEPT: 4D DYNAMICS & NEURAL SMOOTHING
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER CONTROL ---
    const preloader = document.querySelector('.preloader');
    const brand = document.querySelector('.brand');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }
        }, 1500); // ให้เวลาคนดูความหรูของ Loader นิดนึง
    });

    // --- 2. 4D MOUSE DYNAMICS (TNOX TILTING) ---
    // ทำให้ตัวหนังสือ TNOX เอียงตามเมาส์แบบสมจริง
    document.addEventListener('mousemove', (e) => {
        if (brand) {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // คำนวณองศาการเอียง (เลข 25 คือความแรง ยิ่งน้อยยิ่งเอียงเยอะ)
            const rotateX = (centerY - clientY) / 25;
            const rotateY = (clientX - centerX) / 25;

            brand.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    // --- 3. CUSTOM CURSOR ENGINE (SMOOTH LAG) ---
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot) {
        let mouseX = 0, mouseY = 0;     // ตำแหน่งเมาส์จริง
        let ballX = 0, ballY = 0;       // ตำแหน่งวงกลมที่จะวิ่งตาม
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // ตัวจุด (Dot) ให้ตามทันทีเพื่อความแม่นยำ
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Loop สำหรับสร้างความนุ่มนวล (Smooth Follow)
        function animateCursor() {
            // สูตรคำนวณความหน่วง (Lerp)
            ballX += (mouseX - ballX) * 0.15;
            ballY += (mouseY - ballY) * 0.15;

            cursor.style.left = `${ballX}px`;
            cursor.style.top = `${ballY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // --- 4. INTERACTIVE HOVER EFFECTS ---
    const interactiveElements = document.querySelectorAll('a, .cta, .brand, .logo');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(3)';
            cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
            cursor.style.borderColor = 'transparent';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = 'var(--gold-primary)';
        });
    });

    // --- 5. SCROLL REVEAL (FOR FUTURE CONTENT) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));
});
