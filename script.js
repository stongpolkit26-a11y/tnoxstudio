document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Logic (เพื่อความหรู)
    const navbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // เมื่อ Scroll ลงมาเกิน 50px
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Double Click "Add to Vault" Logic (ตามสั่ง "กด 2 ทีก็โหด")
    document.querySelectorAll('.item').forEach(product => {
        product.addEventListener('dblclick', (event) => {
            const productId = product.dataset.productId || 'UNKNOWN_PRODUCT';
            const productName = product.dataset.productName || 'This Exclusive Item';
            
            // Basic Alert for demonstration
            alert(`TNOX GOLD: ${productName} (ID: ${productId}) ADDED TO YOUR PRIVATE VAULT ------ SUCCESS`);

            // In a real application, you would send this to a backend
            // console.log(`Product DBL clicked: ${productName} (${productId})`);
        });
    });

    // 3. Smooth Scroll for Navigation Links (เพื่อประสบการณ์ผู้ใช้)
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // ป้องกันการกระโดดแบบทันที

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll into view with smooth animation
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Contact Form Submission (ตัวอย่าง)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // ป้องกันการโหลดหน้าใหม่

            // In a real application, you would collect form data and send it to a server
            alert('Thank you for your inquiry. TNOX GOLD will contact you shortly.');
            this.reset(); // Clear the form
        });
    }

    // You can add more JavaScript for animations (e.g., Intersection Observer for fade-in effects)
    // or for image lazy loading for better performance.
});
