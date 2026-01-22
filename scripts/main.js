
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                themeIcon.className = 'lni lni-sun';
            } else {
                themeIcon.className = 'lni lni-night';
            }
        });

        // Mobile menu
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scroll
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

        // Add click functionality to project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('click', function() {
                const links = [
                    'https://www.revolutionspecialityfood.co.uk/',
                    'https://nigel-official.github.io/',
                    'https://techfindshub.co.uk/'
                ];
                if (links[index]) {
                    window.open(links[index], '_blank', 'noopener noreferrer');
                }
            });
        });