# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Pages portfolio website (Gus0711.github.io) - a professional portfolio for a GTB (Building Management System) engineer with 9+ years of experience. The site showcases real projects from 2016-2024 including public lighting modernization (3600+ points), hospital supervision with 500 LoRa valves, and public contracts.

## Architecture

**Multi-Page Professional Portfolio**: The portfolio consists of 4 main pages with external CSS and JavaScript:
- `index.html` - Homepage with hero, about, services, timeline (career/education)
- `skills.html` - Detailed technical skills organized by categories
- `projects.html` - Project library with 6 real projects (2016-2024) and filter system
- `contact.html` - Contact form with FAQ

**Technologies**: HTML5, CSS3 (external stylesheet), JavaScript (for interactivity)

**Key Features**:
- Responsive design (mobile, tablet, desktop)
- CSS Grid and Flexbox layouts
- Project filtering system (GTB, IoT, LoRaWAN, Public Contracts, Dev)
- Timeline component for career history
- Real professional experience integrated from LinkedIn

**Language**: French (lang="fr")

**Real Projects Featured**:
1. Public Lighting Modernization (2021-2023) - 3600 light points, 7 subcontractors
2. Hospital CVC Supervision (2023) - 500 LoRa thermostatic valves
3. Multi-tenant Supervision Platform (2023) - SaaS for clients
4. Public Contracts Aisne & 4 Hospitals (2024) - Niagara hypervisor + LNS LoRa
5. Wireless IoT Solutions (2016-2022) - Temperature, COV sensors
6. PLC Programming & Commissioning (2016-2022) - Trend, Distech, Siemens

**Technologies Featured**: Niagara N4, Distech Controls, Trend, Siemens, LoRaWAN, MQTT, BACnet, Modbus, Proxmox, Docker, Home Assistant

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
