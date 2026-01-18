// Global state
let currentReviewSlide = 0;
let isAutoPlaying = true;
let autoPlayInterval;
let isMobileMenuOpen = false;

let lastScrollTop = 0;
let preventHideHeader = false;

// DOM elements
const header = document.getElementById('header');
const mobileNav = document.getElementById('mobile-nav');
const reviewsTrack = document.getElementById('reviews-track');
const dots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const toastContainer = document.getElementById('toast-container');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeFAQ();
    initializeReviewsCarousel();
    initializeContactForm();
    initializeScrollAnimations();
});

// Header functionality
function initializeHeader() {
    // Handle scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop <= 10) {
            header.classList.remove('hide');
            header.classList.remove('scrolled');
            lastScrollTop = scrollTop;
            return;
        }

        if (preventHideHeader) {
            header.classList.remove('hide');
            header.classList.add('scrolled');
            lastScrollTop = scrollTop;
            return;
        }

        if (scrollTop > lastScrollTop) {
            header.classList.add('hide');
            header.classList.add('scrolled');
        } else {
            header.classList.remove('hide');
            header.classList.add('scrolled');
        }
        lastScrollTop = scrollTop;
    });
}

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileNav.classList.add('active');
    } else {
        mobileNav.classList.remove('active');
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;

        preventHideHeader = true;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });

        header.classList.remove('hide');

        // Try to detect real scroll end
        let scrollEndHandler = () => {
            preventHideHeader = false;
            document.removeEventListener('scrollend', scrollEndHandler);
        };

        if ('onscrollend' in document) {
            document.addEventListener('scrollend', scrollEndHandler);
        } else {
            // Fallback for browsers without scrollend event
            setTimeout(() => {
                preventHideHeader = false;
            }, 1800);
        }
    }

    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').classList.remove('open');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                answer.classList.remove('open');
            } else {
                item.classList.add('open');
                answer.classList.add('open');
            }
        });      
    });
}

// Reviews carousel functionality
function initializeReviewsCarousel() {
    const totalSlides = 6;
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentReviewSlide * 100;
        reviewsTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentReviewSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        if (isAutoPlaying) {
            autoPlayInterval = setInterval(function() {
                nextReview();
            }, 5000);
        }
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Navigation functions
    window.nextReview = function() {
        currentReviewSlide = (currentReviewSlide + 1) % totalSlides;
        updateCarousel();
    };
    
    window.previousReview = function() {
        currentReviewSlide = (currentReviewSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };
    
    window.goToReview = function(index) {
        currentReviewSlide = index;
        updateCarousel();
    };
    
    // Pause on hover
    const carousel = document.querySelector('.reviews-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            isAutoPlaying = false;
            stopAutoPlay();
        });
        
        carousel.addEventListener('mouseleave', function() {
            isAutoPlaying = true;
            startAutoPlay();
        });
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });
        
        carousel.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextReview();
                } else {
                    previousReview();
                }
            }
            
            // Restart auto-play after a delay
            setTimeout(() => {
                isAutoPlaying = true;
                startAutoPlay();
            }, 1000);
        });
    }
    
    // Initialize
    updateCarousel();
    startAutoPlay();
}

// Contact form functionality
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <div class="loading-spinner"></div>
            Enviando...
        `;
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(function() {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showToast('Mensagem enviada com sucesso!', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Show success message card
            if (successMessage) {
                successMessage.classList.add('show');
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        }, 2000);
    });
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' 
        ? '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>'
        : '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    
    toast.innerHTML = `
        ${icon}
        <div class="toast-content">
            <h4>${type === 'success' ? 'Sucesso!' : 'Erro!'}</h4>
            <p>${message}</p>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .contact-card, .faq-item, .stat-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Navigate reviews with arrow keys
    if (e.key === 'ArrowLeft') {
        previousReview();
    } else if (e.key === 'ArrowRight') {
        nextReview();
    }
});

// Page visibility API for auto-play
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        isAutoPlaying = false;
        clearInterval(autoPlayInterval);
    } else {
        isAutoPlaying = true;
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(function() {
            nextReview();
        }, 5000);
    }
});

// Preload images
function preloadImages() {
    const imageUrls = [
        'src/assets/uniform-polo.jpg',
        'src/assets/uniform-professional.jpg',
        'src/assets/uniform-custom.jpg',
        'src/assets/review-user-1.jpg',
        'src/assets/review-user-2.jpg',
        'src/assets/review-user-3.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

// Replace scroll listener with optimized version
window.removeEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Console welcome message
console.log('%c🎉 Nigel Uniformes - Website carregado com sucesso!', 
    'color: #333; font-size: 16px; font-weight: bold;');

// Export functions to global scope for inline handlers
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.nextReview = nextReview;
window.previousReview = previousReview;
window.goToReview = goToReview;