// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.visibility = 'hidden', 1000);
    }, 1000);
});

// Custom Cursor Logic (with Elegant Lag)
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    if(cursor && cursorDot) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // 4D Mouse Interaction: ทำให้ตัว TNOX เอียงตามเมาส์
        const brand = document.querySelector('.brand');
        if (brand) {
            // คำนวณตำแหน่งเมาส์เทียบกับกึ่งกลางจอ
            let x = (window.innerWidth / 2 - e.clientX) / 30; 
            let y = (window.innerHeight / 2 - e.clientY) / 30;
            brand.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
        }

        // Add a little lag to the outer circle
        setTimeout(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }, 50);
    }
});

// Hover Effect for Cursor
document.querySelectorAll('a, .cta, .logo').forEach(link => {
    link.addEventListener('mouseenter', () => {
        if(cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            cursor.style.border = 'none';
        }
    });
    link.addEventListener('mouseleave', () => {
        if(cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid #d4af37';
        }
    });
});

// Scroll Reveal Logic
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal-text');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(text => {
        const revealTop = text.getBoundingClientRect().top;
        if(revealTop < windowHeight - 100) {
            text.classList.add('active');
        }
    });
});
