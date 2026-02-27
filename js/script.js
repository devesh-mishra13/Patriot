/* ============================================
   PATRIOT SIKSHA SANSTHAN — JavaScript
   ============================================ */

// ---- Mobile Navigation Toggle ----
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('show');
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('show');
            });
        });
    }

    // ---- Scroll Animations (Fade-in) ----
    const fadeElements = document.querySelectorAll(
        '.card, .offering-detail-card, .mv-card, .team-card, .blog-card, ' +
        '.about-grid, .stat-item, .contact-grid, .about-preview-grid'
    );

    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // ---- Counter Animation for Stats ----
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16));

        function update() {
            current += step;
            if (current >= target) {
                element.textContent = target;
            } else {
                element.textContent = current;
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ---- Smooth Scroll for Hash Links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash !== '#' && hash.length > 1) {
                const target = document.querySelector(hash);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ---- Contact Form Handling ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            // Simple validation feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending... ✉️';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(function () {
                submitBtn.innerHTML = 'Message Sent! ✅';
                submitBtn.style.backgroundColor = '#2b7a4b';

                // Reset after 3 seconds
                setTimeout(function () {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // ---- Navbar Background on Scroll ----
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ---- Newsletter Form ----
    const newsletterBtn = document.querySelector('.newsletter-form .primary-btn');
    const newsletterInput = document.querySelector('.newsletter-input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();

            if (email && email.includes('@')) {
                const originalText = newsletterBtn.innerHTML;
                newsletterBtn.innerHTML = 'Subscribed! ✅';
                newsletterInput.value = '';

                setTimeout(function () {
                    newsletterBtn.innerHTML = originalText;
                }, 3000);
            } else {
                newsletterInput.style.borderColor = '#e74c3c';
                setTimeout(function () {
                    newsletterInput.style.borderColor = '';
                }, 2000);
            }
        });
    }

    // ---- Disclosure Page: Search Filter ----
    const disclosureSearch = document.getElementById('disclosureSearch');
    const disclosureList = document.getElementById('disclosureList');

    if (disclosureSearch && disclosureList) {
        disclosureSearch.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            const cards = disclosureList.querySelectorAll('.disclosure-card');

            cards.forEach(function (card) {
                const name = card.querySelector('.dc-info h4').textContent.toLowerCase();
                card.style.display = name.includes(query) ? '' : 'none';
            });
        });
    }
});
