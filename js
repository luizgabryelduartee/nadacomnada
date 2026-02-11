// ============================
// COUNTDOWN TIMER
// ============================
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    // Define o fim do dia atual
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    function updateCountdown() {
        const currentTime = new Date();
        const diff = endOfDay - currentTime;
        
        if (diff <= 0) {
            countdownEl.textContent = '00:00:00';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================
// SMOOTH SCROLL
// ============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================
// ANIMATE ON SCROLL (Simple)
// ============================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.problem-card, .recipe-card, .bonus-card, .testimonial-card, .faq-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Add CSS class for animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ============================
// BUTTON CLICK TRACKING
// ============================
function initClickTracking() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            // Aqui você pode adicionar tracking (Google Analytics, Facebook Pixel, etc.)
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
}

// ============================
// FAQ ACCORDION (Already works with <details>, but adding animation)
// ============================
function initFaqAnimations() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                const content = this.querySelector('p');
                content.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });
    
    // Add fade animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    `);
}

// ============================
// INITIALIZE
// ============================
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    initSmoothScroll();
    initScrollAnimations();
    initClickTracking();
    initFaqAnimations();
});
