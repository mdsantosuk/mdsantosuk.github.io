// ==========================================
// ANNOUNCEMENT BAR ROTATION
// ==========================================

const messages = [
    "free shipping on orders over $75",
    "subscribe & save 20% on every order",
    "new: limited edition sea salt caramel bar"
];
const msgElement = document.getElementById('announcement-msg');
let msgIndex = 0;

setInterval(() => {
    msgElement.style.opacity = '0';
    msgElement.style.transform = 'translateY(-5px)';
    
    setTimeout(() => {
        msgIndex = (msgIndex + 1) % messages.length;
        msgElement.textContent = messages[msgIndex];
        msgElement.style.opacity = '1';
        msgElement.style.transform = 'translateY(0)';
    }, 400); 
}, 4000);

// ==========================================
// MOBILE MENU
// ==========================================

const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const bars = document.querySelectorAll('.bar');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; 

        bars[0].style.transform = 'rotate(45deg) translate(6px, 7px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
    } else {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

mobileToggle.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(isMenuOpen) toggleMenu();
    });
});

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ==========================================
// TESTIMONIAL SLIDER
// ==========================================

const track = document.getElementById('track');
const slides = Array.from(track.children);
const navContainer = document.getElementById('slider-nav');
let currentSlide = 0;
let slideInterval;

// Create navigation dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    navContainer.appendChild(dot);
});

const dots = Array.from(navContainer.children);

function goToSlide(index) {
    currentSlide = index;
    const amountToMove = -100 * index;
    track.style.transform = `translateX(${amountToMove}%)`;
    
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

startSlider();

const sliderContainer = document.getElementById('testimonial-slider');
sliderContainer.addEventListener('mouseenter', stopSlider);
sliderContainer.addEventListener('mouseleave', startSlider);

// Touch/swipe support for testimonials
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopSlider();
}, { passive: true });

sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startSlider();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        } else {
            // Swipe right - previous slide
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }
    }
}

// ==========================================
// NEWSLETTER FORM - Alternative
// ==========================================
//
//
//const form = document.getElementById('newsletter-form');
//const emailInput = document.getElementById('email');
//const successMsg = document.getElementById('success-message');
//
//form.addEventListener('submit', (e) => {
//    e.preventDefault();
//    const email = emailInput.value;
//    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//
//    if (regex.test(email)) {
//        form.style.display = 'none';
//        document.querySelector('.form-note').style.display = 'none';
//        successMsg.style.display = 'block';
//        successMsg.classList.add('reveal', 'active'); 
//    } else {
//        emailInput.style.outline = '3px solid #e74c3c';
//        emailInput.style.outlineOffset = '2px';
//        
//        // Shake animation
//        emailInput.style.animation = 'shake 0.5s ease';
//        
//        setTimeout(() => {
//            emailInput.style.outline = '';
//            emailInput.style.animation = '';
//        }, 2000);
//    }
//});

// ==========================================
// NEWSLETTER FORM
// ==========================================

const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const successMsg = document.getElementById('success-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    emailInput.style.outline = '3px solid #e74c3c';
    emailInput.style.outlineOffset = '2px';
    emailInput.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      emailInput.style.outline = '';
      emailInput.style.animation = '';
    }, 2000);
    return;
  }

  // honeypot bot field
  const gotcha = form.querySelector('input[name="_gotcha"]');
  if (gotcha && gotcha.value) return;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) throw new Error('Submit failed');

    form.style.display = 'none';
    document.querySelector('.form-note').style.display = 'none';
    successMsg.style.display = 'block';
    successMsg.classList.add('reveal', 'active');
  } catch (err) {
    alert("Sorry — we couldn't subscribe you right now. Please try again.");
  }
});



// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// ADD TO CART BUTTON FEEDBACK
// ==========================================

document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Added ✓';
        this.style.background = '#2ecc71';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
});


// Add shake animation via CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
