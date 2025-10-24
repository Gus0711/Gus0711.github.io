// ============================================
// GTB Engineering Portfolio - JavaScript
// ============================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initProjectFilters();
    initContactForm();
    initSmoothScroll();
});

// === Mobile Menu Toggle ===
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// === Project Filters ===
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-large');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');

                    if (filter === 'all') {
                        card.style.display = 'block';
                        // Fade in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease';
                            card.style.opacity = '1';
                        }, 10);
                    } else if (categories && categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease';
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// === Contact Form Handling ===
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                phone: document.getElementById('phone').value,
                projectType: document.getElementById('project-type').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a backend
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);

            // Show success message
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');

            // Reset form
            contactForm.reset();

            // You can integrate with services like:
            // - FormSpree (https://formspree.io/)
            // - Netlify Forms
            // - EmailJS (https://www.emailjs.com/)
            // - Your own backend API

            // Example with FormSpree:
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Message envoyé avec succès!');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     alert('Erreur lors de l\'envoi. Veuillez réessayer.');
            //     console.error('Error:', error);
            // });
        });
    }
}

// === Smooth Scroll for Anchor Links ===
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === Navbar Scroll Effect (Optional Enhancement) ===
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
    }
});

// === Form Validation Helpers ===
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone);
}

// === Add animations on scroll (Optional - requires Intersection Observer) ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Call scroll animations if you add the .fade-in-up class to elements
// initScrollAnimations();
