/* =============================================
   Ayra JEWELLERY - LANDING PAGE SCRIPTS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ----- Preloader -----
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hidden');
        }, 1200);
    });

    // Fallback: hide preloader after 3 seconds
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 3000);

    // ----- Navbar Scroll Effect -----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Trigger AOS animations
        handleScrollAnimations();

        // Active nav link
        updateActiveNavLink();
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- Mobile Menu -----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.style.overflow = '';
        });
    });

    // ----- Scroll Animations (Custom AOS) -----
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const delay = parseInt(el.getAttribute('data-aos-delay')) || 0;

            if (rect.top < windowHeight * 0.88) {
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);
            }
        });
    }

    // Initial check
    handleScrollAnimations();

    // ----- Active Nav Link -----
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinksList = document.querySelectorAll('.nav-links li a');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // ----- Counter Animation -----
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;

            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                counter.dataset.animated = 'true';
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function update(timestamp) {
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
                    counter.textContent = Math.floor(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(update);
            }
        });
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ----- Countdown Timer -----
    function updateTimer() {
        // Set end date 12 days from now
        const now = new Date();
        const endDate = new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000);

        // Use localStorage to persist the end date
        let savedEnd = localStorage.getItem('ayra_offer_end');
        let end;

        if (savedEnd) {
            end = new Date(savedEnd);
            if (end < now) {
                end = endDate;
                localStorage.setItem('ayra_offer_end', end.toISOString());
            }
        } else {
            end = endDate;
            localStorage.setItem('ayra_offer_end', end.toISOString());
        }

        function tick() {
            const diff = end - new Date();
            if (diff <= 0) return;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }

        tick();
        setInterval(tick, 1000);
    }

    updateTimer();

    // ----- Product Filter -----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----- Newsletter Form -----
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input.value.trim()) {
                alert('Thank you for subscribing! 💎 You\'ll receive our latest updates soon.');
                input.value = '';
            }
        });
    }

    // ----- Smooth Reveal on Load -----
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // ----- Parallax Effect on Hero Shapes -----
    const shapes = document.querySelectorAll('.hero-bg-shapes .shape');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            shapes.forEach((shape, i) => {
                const speed = (i + 1) * 0.5;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // ----- Add fadeInUp animation -----
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
