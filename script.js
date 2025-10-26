// ============================================
// GTB Engineering Portfolio - Modern JavaScript
// Advanced animations, particles & interactions
// ============================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initThemeSwitcher();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initScrollAnimations();
    initParticlesBackground();
    initCursorEffect();
});

// === Navbar Scroll Effect ===
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// === Mobile Menu Toggle ===
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
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

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// === Theme Switcher ===
function initThemeSwitcher() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const styleLink = document.getElementById('theme-style');

    if (!themeSwitcher || !styleLink) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'v3';
    applyTheme(savedTheme);

    // Switch theme on button click
    themeSwitcher.addEventListener('click', function() {
        const currentTheme = styleLink.getAttribute('href').includes('v1') ? 'v1' : 'v3';
        const newTheme = currentTheme === 'v3' ? 'v1' : 'v3';

        applyTheme(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);

        // Show notification
        const themeName = newTheme === 'v1' ? 'Dark Glassmorphism' : 'Light Corporate';
        showNotification(`Thème changé: ${themeName}`, 'success');
    });

    function applyTheme(theme) {
        const cssFile = theme === 'v1' ? 'styles-v1-glassmorphism.css' : 'styles.css';
        styleLink.setAttribute('href', cssFile);

        // Update button text/icon
        themeSwitcher.innerHTML = theme === 'v1'
            ? '☀️ <span class="theme-text">Light</span>'
            : '🌙 <span class="theme-text">Dark</span>';

        // Add transition class
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }
}

// === Project Modal System ===
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const modalContent = document.getElementById('modalContent');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    const viewButtons = document.querySelectorAll('.btn-view-project');

    let currentProjectId = null;

    // Project data with full details
    const projectsData = {
        1: {
            id: 1,
            icon: '🌐',
            badge: 'En cours',
            title: 'Plateforme de Supervision Mutualisée',
            period: '2023 - En cours',
            client: 'Multi-clients GTB',
            category: ['gtb', 'dev', 'iot'],
            excerpt: 'Hébergement cloud multi-tenant avec LNS LoRaWAN mutualisé pour clients GTB',
            description: `
                <p>Développement d'une plateforme cloud complète permettant d'héberger plusieurs clients GTB avec des supervisions isolées mais partageant une infrastructure LoRaWAN commune.</p>
            `,
            objectives: [
                'Créer une architecture multi-tenant sécurisée',
                'Mutualiser le LNS LoRaWAN (ChirpStack) entre clients',
                'Automatiser le provisionnement de nouvelles instances',
                'Garantir l\'isolation des données clients'
            ],
            technologies: [
                { name: 'Niagara Framework', icon: '🏢' },
                { name: 'ChirpStack LNS', icon: '📡' },
                { name: 'Docker & Kubernetes', icon: '🐳' },
                { name: 'PostgreSQL', icon: '🗄️' },
                { name: 'MQTT', icon: '📨' },
                { name: 'API REST', icon: '🔌' }
            ],
            results: [
                '5+ clients hébergés simultanément',
                '99.9% de disponibilité',
                'Provisionnement en moins de 2h',
                'Réduction des coûts infrastructure de 60%'
            ],
            challenges: 'Gestion de la sécurité multi-tenant, orchestration des conteneurs, monitoring centralisé, scalabilité horizontale'
        },
        2: {
            id: 2,
            icon: '🏛️',
            badge: 'En cours',
            title: 'Marché Public Aisne',
            period: '2024 - 2026',
            client: 'Collectivités territoriales',
            category: ['marche-public', 'gtb'],
            excerpt: 'Régulation multi-communes avec chaufferies, comptage et automatisation',
            description: `
                <p>Marché public d'envergure couvrant plusieurs communes de l'Aisne pour la modernisation et l'optimisation énergétique de bâtiments publics (mairies, écoles, gymnases).</p>
            `,
            objectives: [
                'Remplacer les régulations obsolètes par des automates modernes',
                'Implémenter le comptage énergétique sur tous les sites',
                'Centraliser la supervision multi-sites',
                'Former les équipes techniques municipales'
            ],
            technologies: [
                { name: 'Automates CVC', icon: '⚙️' },
                { name: 'BACnet/IP', icon: '🌐' },
                { name: 'Modbus', icon: '🔗' },
                { name: 'Supervision Web', icon: '💻' },
                { name: 'Compteurs M-Bus', icon: '📊' }
            ],
            results: [
                '25+ bâtiments équipés',
                'Réduction énergétique estimée: 20-30%',
                'Supervision centralisée opérationnelle',
                'Formation de 15 agents techniques'
            ],
            challenges: 'Coordination entre communes, compatibilité équipements existants, formations terrain, déploiement progressif sans interruption'
        },
        3: {
            id: 3,
            icon: '🏥',
            badge: 'En cours',
            title: 'Supervision 5 Hôpitaux',
            period: '2023 - 2025',
            client: 'Groupement hospitalier',
            category: ['gtb', 'iot'],
            excerpt: 'Hyperviseur centralisé avec 5 supervisions personnalisées et réseau LoRa',
            description: `
                <p>Projet d'envergure visant à unifier la supervision technique de 5 établissements hospitaliers tout en conservant l'autonomie locale de chaque site.</p>
            `,
            objectives: [
                'Déployer un hyperviseur centralisé pour vue d\'ensemble',
                'Créer 5 supervisions personnalisées par établissement',
                'Installer un réseau LoRaWAN sur chaque site',
                'Intégrer capteurs IoT pour qualité d\'air et confort'
            ],
            technologies: [
                { name: 'Niagara N4', icon: '🏢' },
                { name: 'LoRaWAN Gateway', icon: '📡' },
                { name: 'ChirpStack', icon: '🔧' },
                { name: 'Capteurs IoT', icon: '📊' },
                { name: 'BACnet', icon: '🌐' },
                { name: 'SQL Database', icon: '🗄️' }
            ],
            results: [
                'Hyperviseur pilotant 5 sites en temps réel',
                '50+ passerelles LoRa déployées',
                '200+ capteurs IoT connectés',
                'Alertes centralisées et traçabilité complète'
            ],
            challenges: 'Hétérogénéité des installations existantes, contraintes réseaux sécurisés (VLAN), continuité de service 24/7, déploiement progressif'
        },
        4: {
            id: 4,
            icon: '🏥',
            badge: 'Terminé',
            title: '500 Vannes Thermostatiques LoRa',
            period: '2023',
            client: 'CHU',
            category: ['iot', 'gtb'],
            excerpt: 'Déploiement massif de vannes connectées avec LNS dédié dans un hôpital',
            description: `
                <p>Remplacement de toutes les vannes thermostatiques manuelles par des vannes connectées LoRaWAN pour un contrôle centralisé et des économies d'énergie significatives.</p>
            `,
            objectives: [
                'Installer 500 vannes thermostatiques LoRa',
                'Déployer un réseau LoRaWAN couvrant tous les bâtiments',
                'Intégrer à la supervision existante',
                'Optimiser le chauffage pièce par pièce'
            ],
            technologies: [
                { name: 'Vannes LoRaWAN', icon: '🌡️' },
                { name: 'LoRa Gateway', icon: '📡' },
                { name: 'ChirpStack LNS', icon: '🔧' },
                { name: 'MQTT Integration', icon: '📨' },
                { name: 'Niagara', icon: '🏢' }
            ],
            results: [
                '500 vannes installées et commissionnées',
                'Couverture LoRa 100% du site',
                'Réduction consommation chauffage: 25%',
                'Temps d\'intervention réduit de 80%'
            ],
            challenges: 'Étude de couverture radio complexe, commissioning massif, intégration protocoles, gestion des batteries'
        },
        5: {
            id: 5,
            icon: '💡',
            badge: 'Terminé',
            title: '3600+ Automates Éclairage Public',
            period: '2021 - 2023',
            client: 'Métropole',
            category: ['gtb', 'marche-public'],
            excerpt: 'Modernisation complète avec supervision et coordination de 7 sous-traitants',
            description: `
                <p>Projet métropolitain de modernisation de l'éclairage public avec remplacement de plus de 3600 automates d'armoires électriques et création d'une supervision centralisée.</p>
            `,
            objectives: [
                'Remplacer 3600+ automates obsolètes',
                'Créer une supervision temps réel de l\'éclairage public',
                'Coordonner 7 entreprises de pose',
                'Optimiser les plages horaires et réduire la consommation'
            ],
            technologies: [
                { name: 'Automates éclairage', icon: '💡' },
                { name: 'Télégestion GSM', icon: '📱' },
                { name: 'Supervision Web', icon: '🌐' },
                { name: 'API REST', icon: '🔌' },
                { name: 'Cartographie GIS', icon: '🗺️' }
            ],
            results: [
                '3600+ automates remplacés',
                '100% du réseau supervisé',
                'Économie énergétique: 40%',
                'Détection pannes automatique'
            ],
            challenges: 'Coordination multi-entreprises, déploiement sur 2 ans, maintenance du service, gestion des aléas (pannes, accès difficiles)'
        },
        6: {
            id: 6,
            icon: '📡',
            badge: 'Terminé',
            title: 'Solutions IoT Sans Fil',
            period: '2016 - 2022',
            client: 'Divers clients tertiaires',
            category: ['iot', 'dev'],
            excerpt: 'Développement et intégration de capteurs environnementaux sans fil',
            description: `
                <p>Développement de solutions IoT sur-mesure pour la mesure et le monitoring de paramètres environnementaux dans des bâtiments tertiaires.</p>
            `,
            objectives: [
                'Développer des capteurs sans fil autonomes',
                'Créer des passerelles d\'agrégation de données',
                'Intégrer aux supervisions GTB existantes',
                'Garantir 5+ ans d\'autonomie batterie'
            ],
            technologies: [
                { name: 'LoRaWAN', icon: '📡' },
                { name: 'Zigbee', icon: '🔗' },
                { name: 'Capteurs environnementaux', icon: '🌡️' },
                { name: 'MQTT', icon: '📨' },
                { name: 'Python', icon: '🐍' },
                { name: 'Node-RED', icon: '🔴' }
            ],
            results: [
                '100+ capteurs déployés',
                'Autonomie batterie: 7+ ans',
                'Intégration réussie sur 10+ sites',
                'ROI < 18 mois'
            ],
            challenges: 'Optimisation consommation énergétique, fiabilité transmission, intégration multi-protocoles, maintenance à distance'
        },
        7: {
            id: 7,
            icon: '⚙️',
            badge: 'Terminé',
            title: 'Programmation Automates CVC',
            period: '2016 - 2022',
            client: 'Divers clients',
            category: ['gtb'],
            excerpt: 'Intégration multi-marques avec mise en service et développement supervision',
            description: `
                <p>Prestations de programmation et mise en service d'automates CVC (Climatisation, Ventilation, Chauffage) multi-marques avec développement des interfaces de supervision associées.</p>
            `,
            objectives: [
                'Programmer automates selon cahiers des charges',
                'Assurer la mise en service et le réglage',
                'Développer les synoptiques de supervision',
                'Former les exploitants'
            ],
            technologies: [
                { name: 'Siemens (Desigo)', icon: '🔧' },
                { name: 'Schneider (EcoStruxure)', icon: '⚡' },
                { name: 'Honeywell', icon: '🏢' },
                { name: 'BACnet/Modbus', icon: '🌐' },
                { name: 'Niagara', icon: '💻' }
            ],
            results: [
                '50+ projets livrés',
                'Multi-marques maîtrisées',
                'Taux satisfaction: 95%+',
                'Nombreuses références tertiaire/santé'
            ],
            challenges: 'Hétérogénéité des marques et protocoles, respect des délais chantiers, contraintes exploitation (interventions nocturnes/week-end)'
        }
    };

    // Open modal
    function openModal(projectId) {
        currentProjectId = projectId;
        const project = projectsData[projectId];
        if (!project) return;

        // Generate modal HTML
        const modalHTML = `
            <div class="modal-header">
                <div class="modal-header-top">
                    <div class="modal-icon">${project.icon}</div>
                    <div class="modal-badge modal-badge-${project.badge === 'En cours' ? 'active' : 'completed'}">${project.badge}</div>
                </div>
                <h2>${project.title}</h2>
                <div class="modal-meta">
                    <span class="meta-item">📅 ${project.period}</span>
                    <span class="meta-item">👤 ${project.client}</span>
                </div>
            </div>

            <div class="modal-body">
                <div class="modal-section">
                    <h3>📋 Description</h3>
                    ${project.description}
                    <p class="project-excerpt-large">${project.excerpt}</p>
                </div>

                <div class="modal-section">
                    <h3>🎯 Objectifs</h3>
                    <ul class="objectives-list">
                        ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-section">
                    <h3>🛠️ Technologies utilisées</h3>
                    <div class="tech-grid">
                        ${project.technologies.map(tech => `
                            <div class="tech-item">
                                <span class="tech-icon">${tech.icon}</span>
                                <span class="tech-name">${tech.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-section">
                    <h3>✅ Résultats</h3>
                    <ul class="results-list">
                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-section">
                    <h3>⚡ Défis techniques</h3>
                    <p>${project.challenges}</p>
                </div>
            </div>
        `;

        modalContent.innerHTML = modalHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        currentProjectId = null;
    }

    // Navigate to adjacent project
    function navigateProject(direction) {
        if (!currentProjectId) return;

        const projectIds = Object.keys(projectsData).map(Number).sort((a, b) => a - b);
        const currentIndex = projectIds.indexOf(currentProjectId);

        let newIndex;
        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : projectIds.length - 1;
        } else {
            newIndex = currentIndex < projectIds.length - 1 ? currentIndex + 1 : 0;
        }

        openModal(projectIds[newIndex]);
    }

    // Event listeners
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.project-card-compact');
            const projectId = parseInt(card.getAttribute('data-project-id'));
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => navigateProject('prev'));
    nextBtn.addEventListener('click', () => navigateProject('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateProject('prev');
        } else if (e.key === 'ArrowRight') {
            navigateProject('next');
        }
    });
}

// === Project Filters with Animation ===
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-compact');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter projects with stagger animation
                projectCards.forEach((card, index) => {
                    const categories = card.getAttribute('data-category');

                    // Hide all first
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        if (filter === 'all' || (categories && categories.includes(filter))) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.transition = 'all 0.4s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, index * 100);
                        } else {
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }, 100);
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
                company: document.getElementById('company')?.value,
                phone: document.getElementById('phone')?.value,
                projectType: document.getElementById('project-type')?.value,
                budget: document.getElementById('budget')?.value,
                message: document.getElementById('message').value
            };

            console.log('Form submitted:', formData);

            // Show success message with animation
            showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');

            // Reset form
            contactForm.reset();
        });
    }
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll(`
        .service-card,
        .skill-card,
        .project-card-large,
        .specialty-item,
        .stat-card,
        .timeline-item,
        .expertise-item,
        .faq-item
    `);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// === Particles Background Effect ===
function initParticlesBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
}

// === Custom Cursor Effect ===
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #6366f1;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #6366f1;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.05s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX - 3 + 'px';
        cursorDot.style.top = mouseY - 3 + 'px';
        cursorDot.style.opacity = '1';
        cursor.style.opacity = '1';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .filter-btn, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#14b8a6';
            cursorDot.style.background = '#14b8a6';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#6366f1';
            cursorDot.style.background = '#6366f1';
        });
    });

    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }
}

// === Notification System ===
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #14b8a6, #10b981)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 4000);
}

// === Smooth Scroll for Anchor Links ===
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === Tilt Effect on Cards ===
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .skill-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Init tilt effect
setTimeout(initTiltEffect, 1000);

// === Add fade-in-up animation to elements ===
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style);
