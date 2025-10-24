# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Pages portfolio website (Gus0711.github.io) - a static HTML portfolio site with embedded CSS. The site is hosted directly from the repository via GitHub Pages.

## Architecture

**Single-Page Static Site**: The entire portfolio is contained in a single `index.html` file with inline CSS styles. The site uses:
- Semantic HTML5 structure
- CSS Grid for project card layout
- Flexbox for skills badges
- Sticky navigation
- Gradient backgrounds (linear-gradient for header)
- Smooth hover transitions on interactive elements

**Language**: The site is in French (lang="fr")

**Layout Sections**:
1. Header with gradient background
2. Sticky navigation bar
3. About section (#about)
4. Projects section (#projects) - grid-based card layout
5. Skills section (#skills) - flexbox badge layout
6. Contact section (#contact)
7. Footer with social links

## Development

**No Build Process**: This is a static HTML site with no build step, bundler, or dependencies. Changes to `index.html` are immediately reflected when the file is committed and pushed.

**Local Development**: Open `index.html` directly in a browser to preview changes. No local server is required, though one can be used:
```bash
# Optional: Simple local server
python -m http.server 8000
# or
npx serve
```

**Deployment**: The site is automatically deployed via GitHub Pages when changes are pushed to the `main` branch. Access at `https://Gus0711.github.io`

## Styling Architecture

All styles are embedded in a `<style>` tag in the HTML head. Key styling patterns:

- **Color Scheme**: Purple gradient theme (#667eea to #764ba2)
- **Responsive Design**: CSS Grid with `auto-fit` and `minmax()` for fluid project cards
- **Hover Effects**: Transform and box-shadow transitions on project cards
- **Typography**: System font stack (Segoe UI, Tahoma, etc.)

## Customization Points

To personalize this template, update:
- Line 131: Replace "Votre Nom" with actual name
- Line 132: Update title/subtitle
- Lines 150-161: Replace placeholder project descriptions
- Lines 168-175: Update skills list
- Line 186: Update email address
- Lines 187-188: Update GitHub and LinkedIn URLs
- Line 190: Update copyright name
