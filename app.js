// ============================================
// GTB Engineering Portfolio - JavaScript
// Animations, interactions & modal system
// ============================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initMobileMenu();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initScrollAnimations();
    initTypewriter();
    initSkillsChart();
    initBackToTop();
});

// === Typewriter Effect ===
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if (!textElement) return;

    const roles = [
        "Ingenieur GTB & BMS",
        "Developpeur IoT & LoRaWAN",
        "Architecte Cloud & SaaS",
        "Expert Optimisation Energetique"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deleting
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// === Navbar Scroll Effect ===
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

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
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
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

    let currentProjectId = null;

    // Project data
    const projectsData = {
        0: {
            icon: '⚡',
            badge: 'En construction',
            title: 'CtrlPoint - Gestion de projets GTB',
            period: '2025 - En cours',
            client: 'Projet SaaS',
            excerpt: 'Creez, organisez et exportez vos listes de points pour vos projets de Gestion Technique du Batiment.',
            description: `
                <p>CtrlPoint est une plateforme SaaS moderne concue pour simplifier la gestion des projets GTB.</p>
                <p>Elle permet de creer, d'organiser et d'exporter des listes de points de maniere collaborative, remplacant les fichiers Excel complexes et propices aux erreurs.</p>
                <p><strong><a href="https://www.ctrlpoint.eu" target="_blank" rel="noopener noreferrer" style="color: var(--primary); text-decoration: underline;">Visiter le site : ctrlpoint.eu</a></strong></p>
            `,
            objectives: [
                'Simplifier la creation de listes de points',
                'Permettre la collaboration en temps reel',
                'Standardiser les exports pour les automates',
                'Gagner du temps sur la phase de conception'
            ],
            technologies: [
                { name: 'React / Next.js', icon: '⚛️' },
                { name: 'TypeScript', icon: '📘' },
                { name: 'TailwindCSS', icon: '🎨' },
                { name: 'Supabase', icon: '🔥' }
            ],
            results: [
                'Gain de temps estime : 40% sur la saisie',
                'Standardisation des donnees',
                'Zero erreur de versionning'
            ],
            challenges: 'Creation d\'une interface UX intuitive pour des donnees techniques complexes'
        },
        1: {
            icon: '🌐',
            badge: 'En cours',
            title: 'Plateforme de Supervision Mutualisee',
            period: '2023 - En cours',
            client: 'Multi-clients GTB',
            excerpt: 'Hebergement cloud multi-tenant avec LNS LoRaWAN mutualise pour clients GTB',
            description: `
                <p>Developpement d'une plateforme cloud complete permettant d'heberger plusieurs clients GTB avec des supervisions isolees mais partageant une infrastructure LoRaWAN commune.</p>
            `,
            objectives: [
                'Creer une architecture multi-tenant securisee',
                'Mutualiser le LNS LoRaWAN (ChirpStack) entre clients',
                'Automatiser le provisionnement de nouvelles instances',
                'Garantir l\'isolation des donnees clients'
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
                '15+ clients heberges simultanement',
                '60+ sites supervises',
                'Reduction des couts infrastructure'
            ],
            challenges: 'Gestion de la securite multi-tenant, orchestration des conteneurs, monitoring centralise, scalabilite horizontale'
        },
        2: {
            icon: '🏛️',
            badge: 'En cours',
            title: 'Marche Public Aisne',
            period: '2024 - 2026',
            client: 'Collectivites territoriales',
            excerpt: 'Regulation multi-communes avec chaufferies, comptage et automatisation',
            description: `
                <p>Marche public d'envergure couvrant plusieurs communes de l'Aisne pour la modernisation et l'optimisation energetique de batiments publics (mairies, ecoles, gymnases).</p>
            `,
            objectives: [
                'Remplacer les regulations obsoletes par des automates modernes',
                'Implementer le comptage energetique sur tous les sites',
                'Centraliser la supervision multi-sites',
                'Former les equipes techniques municipales'
            ],
            technologies: [
                { name: 'Automates CVC', icon: '⚙️' },
                { name: 'BACnet/IP', icon: '🌐' },
                { name: 'Modbus', icon: '🔗' },
                { name: 'Supervision Web', icon: '💻' },
                { name: 'Compteurs M-Bus', icon: '📊' }
            ],
            results: [
                '80+ batiments equipes',
                'Reduction energetique estimee: 20-30%',
                'Supervision centralisee operationnelle',
                'Formation des agents techniques'
            ],
            challenges: 'Coordination entre communes, compatibilite equipements existants, formations terrain, deploiement progressif sans interruption'
        },
        3: {
            icon: '🏥',
            badge: 'En cours',
            title: 'Supervision 5 Hopitaux',
            period: '2023 - 2025',
            client: 'Groupement hospitalier',
            excerpt: 'Hyperviseur centralise avec 5 supervisions personnalisees et reseau LoRa',
            description: `
                <p>Projet d'envergure visant a unifier la supervision technique de 5 etablissements hospitaliers tout en conservant l'autonomie locale de chaque site.</p>
            `,
            objectives: [
                'Deployer un hyperviseur centralise pour vue d\'ensemble',
                'Creer 5 supervisions personnalisees par etablissement',
                'Installer un reseau LoRaWAN sur chaque site',
                'Integrer capteurs IoT pour qualite d\'air et confort'
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
                'Hyperviseur pilotant 5 sites en temps reel',
                '50+ passerelles LoRa deployees',
                '2000+ capteurs IoT connectes',
                'Alertes centralisees et tracabilite complete'
            ],
            challenges: 'Heterogeneite des installations existantes, contraintes reseaux securises (VLAN), continuite de service 24/7, deploiement progressif'
        },
        4: {
            icon: '🏥',
            badge: 'Termine',
            title: '500 Vannes Thermostatiques LoRa',
            period: '2023',
            client: 'CHU',
            excerpt: 'Deploiement massif de vannes connectees avec LNS dedie dans un hopital',
            description: `
                <p>Remplacement de toutes les vannes thermostatiques manuelles par des vannes connectees LoRaWAN pour un controle centralise et des economies d'energie significatives.</p>
            `,
            objectives: [
                'Installer 500 vannes thermostatiques LoRa',
                'Deployer un reseau LoRaWAN couvrant tous les batiments',
                'Integrer a la supervision existante',
                'Optimiser le chauffage piece par piece'
            ],
            technologies: [
                { name: 'Vannes LoRaWAN', icon: '🌡️' },
                { name: 'LoRa Gateway', icon: '📡' },
                { name: 'ChirpStack LNS', icon: '🔧' },
                { name: 'MQTT Integration', icon: '📨' },
                { name: 'Niagara', icon: '🏢' }
            ],
            results: [
                '500 vannes installees et commissionnees',
                'Couverture LoRa 100% du site',
                'Reduction consommation chauffage: 25%',
                'Temps d\'intervention reduit de 80%'
            ],
            challenges: 'Etude de couverture radio complexe, commissioning massif, integration protocoles, gestion des batteries'
        },
        5: {
            icon: '💡',
            badge: 'Termine',
            title: '3600+ Automates Eclairage Public',
            period: '2021 - 2023',
            client: 'Metropole',
            excerpt: 'Modernisation complete avec supervision et coordination de 7 sous-traitants',
            description: `
                <p>Projet metropolitain de modernisation de l'eclairage public avec remplacement de plus de 3600 automates d'armoires electriques et creation d'une supervision centralisee.</p>
            `,
            objectives: [
                'Remplacer 3600+ automates obsoletes',
                'Creer une supervision temps reel de l\'eclairage public',
                'Coordonner 7 entreprises de pose',
                'Optimiser les plages horaires et reduire la consommation'
            ],
            technologies: [
                { name: 'Automates eclairage', icon: '💡' },
                { name: 'Telegestion GSM', icon: '📱' },
                { name: 'Supervision Web', icon: '🌐' },
                { name: 'API REST', icon: '🔌' },
                { name: 'Cartographie GIS', icon: '🗺️' }
            ],
            results: [
                '3600+ automates remplaces',
                '100% du reseau supervise',
                'Economie energetique: 40%',
                'Detection pannes automatique'
            ],
            challenges: 'Coordination multi-entreprises, deploiement sur 2 ans, maintenance du service, gestion des aleas (pannes, acces difficiles)'
        },
        6: {
            icon: '📡',
            badge: 'Termine',
            title: 'Solutions IoT Sans Fil',
            period: '2016 - 2022',
            client: 'Divers clients tertiaires',
            excerpt: 'Developpement et integration de capteurs environnementaux sans fil',
            description: `
                <p>Developpement de solutions IoT sur-mesure pour la mesure et le monitoring de parametres environnementaux dans des batiments tertiaires.</p>
            `,
            objectives: [
                'Developper des capteurs sans fil autonomes',
                'Creer des passerelles d\'agregation de donnees',
                'Integrer aux supervisions GTB existantes',
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
                '100+ capteurs deployes',
                'Autonomie batterie: 7+ ans',
                'Integration reussie sur 10+ sites',
                'ROI < 18 mois'
            ],
            challenges: 'Optimisation consommation energetique, fiabilite transmission, integration multi-protocoles, maintenance a distance'
        },
        7: {
            icon: '⚙️',
            badge: 'Termine',
            title: 'Programmation Automates CVC',
            period: '2016 - 2022',
            client: 'Divers clients',
            excerpt: 'Integration multi-marques avec mise en service et developpement supervision',
            description: `
                <p>Prestations de programmation et mise en service d'automates CVC (Climatisation, Ventilation, Chauffage) multi-marques avec developpement des interfaces de supervision associees.</p>
            `,
            objectives: [
                'Programmer automates selon cahiers des charges',
                'Assurer la mise en service et le reglage',
                'Developper les synoptiques de supervision',
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
                '50+ projets livres',
                'Multi-marques maitrisees',
                'Taux satisfaction: 95%+',
                'Nombreuses references tertiaire/sante'
            ],
            challenges: 'Heterogeneite des marques et protocoles, respect des delais chantiers, contraintes exploitation (interventions nocturnes/week-end)'
        }
    };

    // Open modal
    function openModal(projectId) {
        currentProjectId = projectId;
        const project = projectsData[projectId];

        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        const modalHTML = `
            <div class="modal-header">
                <div class="modal-header-top">
                    <div class="modal-icon">${project.icon}</div>
                    <div class="modal-badge modal-badge-${project.badge === 'En cours' || project.badge === 'En construction' ? 'active' : 'completed'}">${project.badge}</div>
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
                    <h3>🛠️ Technologies utilisees</h3>
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
                    <h3>✅ Resultats</h3>
                    <ul class="results-list">
                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-section">
                    <h3>⚡ Defis techniques</h3>
                    <p>${project.challenges}</p>
                </div>
            </div>
        `;

        modalContent.innerHTML = modalHTML;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentProjectId = null;
    }

    // Navigate projects
    function navigateProject(direction) {
        if (currentProjectId === null) return;

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

    // Event listeners - Cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            const projectId = parseInt(card.getAttribute('data-project-id'));
            openModal(projectId);
        });
    });

    // Event listeners - Buttons
    const viewButtons = document.querySelectorAll('.btn-view-project');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = button.closest('.project-card');
            const projectId = parseInt(card.getAttribute('data-project-id'));
            openModal(projectId);
        });
    });

    // Close events
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateProject('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateProject('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowLeft') navigateProject('prev');
        else if (e.key === 'ArrowRight') navigateProject('next');
    });
}

// === Project Filters ===
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');

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

// === Contact Form ===
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span class="loading-spinner"></span> Envoi en cours...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formspree.io/f/myzrpldw', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showNotification('Message envoye avec succes !', 'success');
                contactForm.reset();
            } else {
                showNotification('Une erreur est survenue. Veuillez reessayer.', 'error');
            }
        } catch (error) {
            showNotification('Erreur de connexion.', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('reveal-hidden');
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.service-card, .skill-card, .project-card, .stat-card, .timeline-item, .about-text, .section-header, .cta-content');
    elements.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
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
        transform: translateX(100px);
        transition: all 0.4s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// === Back to Top Button ===
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// === Skills Radar Chart ===
function initSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    // Wait for Chart.js to load
    if (typeof Chart === 'undefined') {
        setTimeout(initSkillsChart, 100);
        return;
    }

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue('--primary').trim() || '#0f766e';
    const textMain = styles.getPropertyValue('--text-main').trim() || '#172033';
    const textMuted = styles.getPropertyValue('--text-muted').trim() || '#5d6879';
    const line = styles.getPropertyValue('--line').trim() || 'rgba(23, 32, 51, 0.12)';

    // Chart Global Defaults
    Chart.defaults.color = textMuted;
    Chart.defaults.borderColor = line;
    Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['GTB / BMS', 'IoT / LoRaWAN', 'Dev Web (JS/React)', 'Backend / API', 'DevOps / Cloud', 'Réseau / IT'],
            datasets: [{
                label: 'Niveau de Maitrise',
                data: [95, 90, 85, 80, 75, 85],
                backgroundColor: 'rgba(15, 118, 110, 0.14)',
                borderColor: primary,
                pointBackgroundColor: primary,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: primary
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: line
                    },
                    grid: {
                        color: line
                    },
                    pointLabels: {
                        color: textMain,
                        font: {
                            size: 11
                        }
                    },
                    ticks: {
                        display: false, // Hide 0-100 scale numbers
                        backdropColor: 'transparent'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(23, 32, 51, 0.96)',
                    titleColor: '#ffffff',
                    bodyFont: {
                        family: 'Inter'
                    },
                    padding: 12,
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    borderWidth: 1,
                    displayColors: false
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}
