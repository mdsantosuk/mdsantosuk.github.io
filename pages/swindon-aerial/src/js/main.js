// Vanilla JavaScript for Swindon Aerial Satellite Installations

// Gallery Images Data
const galleryImages = [
    {
        src: 'src/images/gallery-1.jpg',
        alt: 'Digital TV aerial installation on residential roof',
        caption: 'Professional digital TV aerial installation'
    },
    {
        src: 'src/images/gallery-2.jpg',
        alt: 'Satellite dish installation on house exterior',
        caption: 'Expert satellite dish installation'
    },
    {
        src: 'src/images/gallery-3.jpg',
        alt: 'TV wall mounting in modern living room',
        caption: 'Professional TV wall mounting service'
    },
    {
        src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        alt: 'Happy customer with new installation',
        caption: 'Satisfied customer with new aerial system'
    },
    {
        src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
        alt: 'Professional installation equipment',
        caption: 'Professional grade installation equipment'
    },
    {
        src: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
        alt: 'Modern home entertainment setup',
        caption: 'Complete home entertainment installation'
    }
];

// Service Areas Data
const serviceAreas = [
    { code: 'SN1', name: 'Swindon Central', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39692.26190251523!2d-1.8370394918802206!3d51.55418293672498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48714381b264fbe1%3A0x74e45141d5f2db40!2sSwindon%20SN1!5e0!3m2!1sen!2suk!4v1751639784464!5m2!1sen!2suk' },
    { code: 'SN2', name: 'Swindon South', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39671.476518746786!2d-1.830657591528023!3d51.577998738123966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48714154abe9253f%3A0xce2836aafeacfdcd!2sSwindon%20SN2!5e0!3m2!1sen!2suk!4v1751639951541!5m2!1sen!2suk' },
    { code: 'SN3', name: 'Swindon West', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79359.61601303815!2d-1.812656043880416!3d51.568453499327966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871443fa75620db%3A0x3a6f9fd74539bc6c!2sSwindon%20SN3!5e0!3m2!1sen!2suk!4v1751640462553!5m2!1sen!2suk' },
    { code: 'SN4', name: 'Wootton Bassett', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79468.35817453825!2d-1.8832003476114894!3d51.506130484745306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48714212ae3c6207%3A0xdb83c08eb6bfc458!2sSwindon%20SN4!5e0!3m2!1sen!2suk!4v1751640491385!5m2!1sen!2suk' },
    { code: 'SN5', name: 'Swindon West', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79333.79264182813!2d-1.962811792994443!3d51.58324565280916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48714106bbabb695%3A0xf575fa8929af3add!2sSwindon%20SN5!5e0!3m2!1sen!2suk!4v1751640519472!5m2!1sen!2suk' },
    { code: 'SN6', name: 'Highworth', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158581.37407506612!2d-1.9370675490661131!3d51.607930677231444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487137c28922c829%3A0x4c5a8e9e94061ef!2sSwindon%20SN6!5e0!3m2!1sen!2suk!4v1751640576951!5m2!1sen!2suk' },
    { code: 'SN7', name: 'Faringdon', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79253.69089751638!2d-1.658439290246183!3d51.629110313651886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871350e053cdf6b%3A0x4db97021befcb876!2sFaringdon%20SN7!5e0!3m2!1sen!2suk!4v1751640612447!5m2!1sen!2suk' },
    { code: 'SN8', name: 'Marlborough', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159319.375435592!2d-1.8602154509429323!3d51.39634333019389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48714d8754ae74cd%3A0x725b475f758fdb47!2sMarlborough%20SN8!5e0!3m2!1sen!2suk!4v1751640634741!5m2!1sen!2suk' },
    { code: 'SN9', name: 'Pewsey', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79809.37880135699!2d-1.8734981093129675!3d51.31033158982036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487157ee9d5af31b%3A0xa5f1ca7e30db5657!2sPewsey%20SN9!5e0!3m2!1sen!2suk!4v1751640655922!5m2!1sen!2suk' },
    { code: 'SN10', name: 'Devizes', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159584.90526894922!2d-2.1203772696108216!3d51.32006246070404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48715fce46aa505d%3A0x8d95d089af6efbc7!2sDevizes%20SN10!5e0!3m2!1sen!2suk!4v1751640680938!5m2!1sen!2suk' },
    { code: 'SN11', name: 'Calne', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79582.68324238445!2d-2.0657596015342077!3d51.44054956954784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48715d891d1c79e7%3A0x82871517348b8f!2sCalne%20SN11!5e0!3m2!1sen!2suk!4v1751640711699!5m2!1sen!2suk' },
    { code: 'SN12', name: 'Melksham', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79706.78420763384!2d-2.224475755792486!3d51.3692930532067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487162a4efed7b33%3A0x73102411dbae7179!2sMelksham%20SN12!5e0!3m2!1sen!2suk!4v1751640855902!5m2!1sen!2suk' },
    { code: 'SN13', name: 'Corsham', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39806.622410501644!2d-2.2547474438182684!3d51.42300822910886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487178b45a112c2f%3A0xfcb112f82a460bd2!2sCorsham%20SN13!5e0!3m2!1sen!2suk!4v1751640883106!5m2!1sen!2suk' },
    { code: 'SN14', name: 'Chippenham', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79472.67927521151!2d-2.33424254775972!3d51.50365283416839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48716fd045c6cbc5%3A0x60878060f3c9d4c7!2sChippenham%20SN14!5e0!3m2!1sen!2suk!4v1751640916819!5m2!1sen!2suk' },
    { code: 'SN15', name: 'Malmesbury', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159043.87210821733!2d-2.2038270315754103!3d51.475403753080585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871630088ddd45d%3A0xd2e786888a15b92d!2sChippenham%20SN15!5e0!3m2!1sen!2suk!4v1751640940574!5m2!1sen!2suk' },
    { code: 'SN16', name: 'Malmesbury', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79308.2595411025!2d-2.1655657921183775!3d51.597868556258064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48716a2a0dcb10bb%3A0x46d4b0ec813d2408!2sMalmesbury%20SN16!5e0!3m2!1sen!2suk!4v1751641061675!5m2!1sen!2suk' },
    { code: 'SN25', name: 'Swindon North', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39652.224128425725!2d-1.8361106912017058!3d51.60005103942378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871413f6312a65f%3A0x34ce20d2adc607e0!2sSwindon%20SN25!5e0!3m2!1sen!2suk!4v1751641089001!5m2!1sen!2suk' },
    { code: 'SN26', name: 'Swindon Northeast', embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39637.45794361582!2d-1.8328972909514354!3d51.61696014042338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48714137ac3b5123%3A0xadf83f17cf276256!2sSwindon%20SN26!5e0!3m2!1sen!2suk!4v1751641122813!5m2!1sen!2suk' }
];

// DOM Elements
let currentImageIndex = 0;



function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load saved preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
}

function initThemeIconToggle() {
  const lightBtn = document.getElementById('lightModeBtn');
  const darkBtn = document.getElementById('darkModeBtn');
  const body = document.body;

  function setTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      lightBtn.style.display = 'inline-block';
      darkBtn.style.display = 'none';
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      lightBtn.style.display = 'none';
      darkBtn.style.display = 'inline-block';
    }
  }

  // Load saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  lightBtn.addEventListener('click', () => setTheme('light'));
  darkBtn.addEventListener('click', () => setTheme('dark'));
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initGallery();
    initServiceCards();
    initContactForm();
    initServiceAreas();
    initScrollAnimations();  
    initThemeIconToggle(); 
});

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const carousel = document.getElementById('galleryCarousel');
    const carouselImage = document.getElementById('carouselImage');
    const carouselCounter = document.getElementById('carouselCounter');
    const carouselCaption = document.getElementById('carouselCaption');

    // Populate gallery
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}">
            <div class="gallery-overlay">
                <div class="gallery-caption">
                    <h4>${image.caption}</h4>
                    <p>Click to enlarge</p>
                </div>
            </div>
        `;
        galleryItem.addEventListener('click', () => openCarousel(index));
        galleryGrid.appendChild(galleryItem);
    });

    // Carousel controls
    document.getElementById('carouselClose').addEventListener('click', closeCarousel);
    document.getElementById('carouselPrev').addEventListener('click', prevImage);
    document.getElementById('carouselNext').addEventListener('click', nextImage);
    
    // Close on overlay click
    carousel.addEventListener('click', (e) => {
        if (e.target === carousel) closeCarousel();
    });
}

function openCarousel(index) {
    currentImageIndex = index;
    updateCarouselImage();
    document.getElementById('galleryCarousel').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCarousel() {
    document.getElementById('galleryCarousel').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateCarouselImage();
}

function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    updateCarouselImage();
}

function updateCarouselImage() {
    const image = galleryImages[currentImageIndex];
    document.getElementById('carouselImage').src = image.src;
    document.getElementById('carouselImage').alt = image.alt;
    document.getElementById('carouselCounter').textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    document.getElementById('carouselCaption').textContent = image.caption;
}

// Service Cards
function initServiceCards() {
    const serviceToggleButtons = document.querySelectorAll('.service-toggle');
    
    serviceToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceDetails = serviceCard.querySelector('.service-details');
            
            if (serviceDetails.style.display === 'none' || !serviceDetails.style.display) {
                serviceDetails.style.display = 'block';
                this.textContent = 'Read Less';
            } else {
                serviceDetails.style.display = 'none';
                this.textContent = 'Read More';
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create mailto link
        const subject = `Enquiry from ${data.name} - ${data.service || 'General'}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nService: ${data.service || 'Not specified'}\n\nMessage:\n${data.message}`;
        const mailtoLink = `mailto:multipointaerials@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client should open with the message ready to send.');
        
        // Reset form
        this.reset();
    });
}

// Service Areas
function initServiceAreas() {
    const serviceAreasContainer = document.getElementById('serviceAreas');
    const locationMap = document.getElementById('locationMap');
    
    serviceAreas.forEach(area => {
        const areaButton = document.createElement('button');
        areaButton.className = 'area-button';
        areaButton.innerHTML = `
            <div class="area-dot"></div>
            <span>${area.code} - ${area.name}</span>
        `;
        areaButton.addEventListener('click', () => {
            locationMap.src = area.embedUrl;
            locationMap.title = `Service area map - ${area.code}`;
        });
        serviceAreasContainer.appendChild(areaButton);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    const carousel = document.getElementById('galleryCarousel');
    if (carousel.style.display === 'flex') {
        if (e.key === 'Escape') closeCarousel();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    }
});