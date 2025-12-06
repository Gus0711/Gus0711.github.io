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
    initParticlesBackground();
    initCursorEffect();
    initTerminalEffect();
    initButtonEffects();
    initTiltEffect();
    initBackToTop();
});

// === Button Effects (Glitch & Magnetic) ===
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        if (btn.classList.contains('btn-primary')) {
            if (!btn.querySelector('.btn-glitch')) {
                const glitchSpan = document.createElement('span');
                glitchSpan.className = 'btn-glitch';
                btn.appendChild(glitchSpan);
            }
        }

        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / 8;
            const deltaY = (y - centerY) / 8;
            this.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// === Terminal Typing Effect ===
function initTerminalEffect() {
    const terminalBody = document.getElementById('hero-terminal');
    if (!terminalBody) return;

    const lines = terminalBody.querySelectorAll('.code-line:not(:last-child)');
    const lastLine = terminalBody.querySelector('.code-line:last-child');

    lines.forEach(line => line.style.display = 'none');
    if (lastLine) lastLine.style.display = 'none';

    let currentLine = 0;

    function showNextLine() {
        if (currentLine < lines.length) {
            lines[currentLine].style.display = 'block';
            currentLine++;
            setTimeout(showNextLine, 400 + Math.random() * 400);
        } else {
            if (lastLine) lastLine.style.display = 'block';
        }
    }

    setTimeout(showNextLine, 1000);
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
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
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
                <p><strong><a href="https://www.ctrlpoint.eu" target="_blank" style="color: var(--primary); text-decoration: underline;">Visiter le site : ctrlpoint.eu</a></strong></p>
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
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
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
            const response = await fetch('https://formspree.io/f/xbldwgwq', {
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

// === Particles Background ===
function initParticlesBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
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
            ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });

        // Connect particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    });
}

// === Custom Cursor ===
function initCursorEffect() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = 'position:fixed;width:20px;height:20px;border-radius:50%;border:2px solid #06b6d4;pointer-events:none;z-index:9999;transition:transform 0.15s ease;opacity:0;';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.style.cssText = 'position:fixed;width:6px;height:6px;border-radius:50%;background:#06b6d4;pointer-events:none;z-index:10000;opacity:0;';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

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

    document.querySelectorAll('a, button, .btn, .filter-btn, .nav-link, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#14b8a6';
            cursorDot.style.background = '#14b8a6';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#06b6d4';
            cursorDot.style.background = '#06b6d4';
        });
    });
}

// === Tilt Effect ===
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .skill-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10;
            const rotateY = (rect.width / 2 - x) / 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
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
    // Create button
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(btn);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
