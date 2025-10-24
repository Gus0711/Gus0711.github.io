# Portfolio GTB Engineering

Portfolio professionnel d'ingénieur en Gestion Technique du Bâtiment, spécialisé en automatisme, IoT/LoRaWAN et optimisation énergétique.

## 🚀 Aperçu du site

Ce portfolio est conçu pour mettre en valeur mes compétences techniques et servir de bibliothèque pour mes projets GTB/IoT. Il comprend :

- **Page d'accueil** : Présentation professionnelle et services
- **Compétences** : Détail de mes expertises techniques (GTB, IoT, développement)
- **Projets** : Bibliothèque détaillée de réalisations avec filtres par catégorie
- **Contact** : Formulaire de contact et informations

## 📁 Structure du projet

```
Gus0711.github.io/
├── index.html          # Page d'accueil
├── skills.html         # Page compétences
├── projects.html       # Bibliothèque de projets
├── contact.html        # Page contact
├── styles.css          # Styles CSS
├── script.js           # JavaScript (navigation, filtres)
├── assets/
│   └── images/
│       ├── projects/   # Images des projets
│       └── icons/      # Icônes et logos
├── CLAUDE.md           # Guide pour Claude Code
└── README.md           # Ce fichier
```

## 🎨 Personnalisation

### Modifier les informations personnelles

**Contact :**
- Fichier : Tous les fichiers HTML (footer)
- Lignes à modifier :
  - Email : `contact@example.com`
  - GitHub : `https://github.com/Gus0711`
  - LinkedIn : `https://linkedin.com/in/votreprofil`

**Nom et branding :**
- Fichiers : Tous les fichiers HTML
- Chercher "GTB Engineering" pour personnaliser le nom

### Ajouter de nouveaux projets

1. Ouvrir `projects.html`
2. Dupliquer un bloc `<article class="project-card-large">`
3. Modifier :
   - `data-category` : catégories (gtb, iot, dev, consulting)
   - `.project-badge` : Type de projet
   - `.project-icon-large` : Icône emoji
   - Titre, description, objectifs, technologies, résultats
   - `.project-tech-stack` : Tags de technologies

### Ajouter des images aux projets

1. Placer les images dans `assets/images/projects/`
2. Dans le HTML du projet, ajouter :
```html
<div class="project-image">
    <img src="assets/images/projects/nom-projet.jpg" alt="Description">
</div>
```

### Modifier les couleurs

Éditer `styles.css`, section `:root` (lignes 8-20) :
```css
--primary-color: #2563eb;     /* Couleur principale */
--secondary-color: #10b981;   /* Couleur secondaire */
--accent-color: #f59e0b;      /* Couleur d'accentuation */
```

## 🌐 Déploiement GitHub Pages

Le site est automatiquement déployé via GitHub Pages :

1. **URL du site** : `https://Gus0711.github.io`
2. **Configuration** : Le site se déploie depuis la branche `main`
3. **Mise à jour** : Chaque commit sur `main` met à jour le site automatiquement

### Commandes Git

```bash
# Ajouter tous les fichiers modifiés
git add .

# Créer un commit
git commit -m "Description des modifications"

# Pousser vers GitHub (déploiement automatique)
git push origin main
```

## 📧 Configuration du formulaire de contact

Le formulaire est actuellement en mode démo. Pour le rendre fonctionnel :

### Option 1 : FormSpree (recommandé, gratuit)

1. Créer un compte sur [formspree.io](https://formspree.io/)
2. Créer un nouveau formulaire
3. Copier l'ID du formulaire
4. Dans `script.js`, décommenter et configurer le code FormSpree (lignes 70-85)

### Option 2 : Netlify Forms

1. Déployer sur Netlify
2. Ajouter `data-netlify="true"` au formulaire dans `contact.html`

### Option 3 : EmailJS

1. Créer un compte sur [emailjs.com](https://www.emailjs.com/)
2. Suivre leur documentation pour l'intégration

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS, Grid, Flexbox
- **JavaScript** : Navigation mobile, filtres de projets, validation de formulaire
- **Design** : Responsive, mobile-first
- **Hébergement** : GitHub Pages

## 🎯 Fonctionnalités

- ✅ Design moderne et professionnel
- ✅ Entièrement responsive (mobile, tablette, desktop)
- ✅ Navigation sticky
- ✅ Filtres de projets par catégorie
- ✅ Formulaire de contact avec validation
- ✅ Animations et transitions fluides
- ✅ SEO-friendly (meta descriptions, titres)
- ✅ Performance optimisée

## 📝 Maintenance

### Ajouter une nouvelle compétence

Éditer `skills.html`, section `.skill-category` correspondante.

### Ajouter une FAQ

Éditer `contact.html`, section `.faq-section`, dupliquer un `.faq-item`.

### Modifier les services

Éditer `index.html`, section `.services-grid`, modifier les `.service-card`.

## 🔄 Mises à jour futures

Idées d'améliorations :
- [ ] Ajouter un blog technique
- [ ] Intégrer des vidéos de démonstration
- [ ] Ajouter des témoignages clients
- [ ] Créer une section CV téléchargeable
- [ ] Ajouter des animations avancées
- [ ] Multilingue (FR/EN)

## 📄 Licence

© 2025 GTB Engineering Portfolio. Tous droits réservés.

---

**Note** : Ce portfolio est conçu pour être facilement maintenable et extensible. Chaque section peut être enrichie avec de nouveaux contenus au fur et à mesure de vos projets.
