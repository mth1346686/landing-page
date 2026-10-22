# 🦈 SHARK GYM — Aggressive Luxury Dark-Mode Athletic Landing Page

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Canvas FX](https://img.shields.io/badge/HTML5_Canvas-60FPS_Sparks-e11d48?style=for-the-badge)](https://developer.mozilla.org/)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An aggressive, production-ready dark-mode landing page and web application suite engineered for **SHARK GYM** — Egypt's premier male athletic facility and heavy barbell compound.

Built using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**, alongside an instantly runnable zero-dependency **standalone HTML5** build.

---

## ⚡ Live Demo & Quick Launch

The repository includes a ready-to-run zero-dependency build (`index.html`) at the repository root.

```bash
# Instant zero-dependency preview server
node server.js
# Access live at: http://localhost:3000
```

---

## ✨ Design Architecture & Core Features

### 1. Visual Aesthetics & Dark Luxury Theme
* **Color Palette:**
  * Deep Pitch Black: `#050505` & `#0a0a0a`
  * High-Contrast Charcoal Panels: `#121214` & `#18181b`
  * Crimson Red Neon Accents: `#e11d48` & `#ff1744`
  * Sharp Typography: High-contrast white display headers and zinc muted sub-labels.
* **Signature Torn/Ripped Diagonal Border:**
  * Recreates a dynamic jagged slash diagonal divider separating the left copy from the right hero visual.
  * Powered by SVG polyline with neon Gaussian blur filter and an **animated vertical laser scanning beam** running along the seam.
* **60FPS Atmospheric Particle Engine:**
  * Built-in HTML5 Canvas particle system generating rising glowing red sparks and floating chalk dust across the dark hero section.

### 2. Hero Section (Split Layout)
* **Live Radar Indicator Badge:** Pulsing concentric radar rings denoting *"PREMIUM MALE ATHLETIC FACILITY"*.
* **2-Line Headline:**
  * Line 1: `BE STRONG BUILD` (pure white)
  * Line 2: `YOUR DREAM BODY` (fiery glowing crimson red)
* **Dual CTAs:**
  * Primary Button: *"Start Free Trial"* with sheen light-sweep animation.
  * Secondary Ghost Button: *"Explore Programs"*.
* **Interactive Stats Ticker:**
  * `9,400+` Active Members
  * `42+` Heavy Calibrated Racks
  * `99.4%` Goal Success Rate
* **Accent Graphics:** 6x3 red dot matrix and concentric curved arcs.

### 3. Precision Training Protocols (Filterable)
* Interactive category tabs: `All`, `Hypertrophy`, `Powerlifting`, `Conditioning`, and `Combat Strength`.
* Complete cards featuring real imagery, duration timers, intensity overload badges, description, and target muscle groups:
  * **Iron Hypertrophy Protocol** (High Volume, 60-75 Min, RPE 9)
  * **Apex Powerlifting Squad** (Sub-Max Strength, 90 Min, Eleiko & Texas Bars)
  * **Metabolic Conditioning Rush** (Fat Shred, 45 Min, Zone 4-5 Anaerobic)
  * **Gladiator Combat Strength** (Striking Power, 60 Min, Muscular Fighter & Torque)

### 4. Membership Pricing (Egyptian Pounds - L.E)
* Interactive **Monthly / Quarterly (-15% Discount)** billing toggle:
  * **Predator Pass:** `850 L.E/mo` (`2,165 L.E` quarterly)
  * **Apex Pro (Featured / Best Value):** `1,500 L.E/mo` (`3,825 L.E` quarterly)
  * **Great White VIP:** `2,800 L.E/mo` (`7,140 L.E` quarterly)

### 5. Strategic Egyptian Compound Hubs
* **New Cairo Flagship:** North 90th Street (2,400 m², 16 Olympic Squat Racks, Cryo Plunge, 24/7 Biometric Keycard Access).
* **Maadi Iron Bunker:** Degla Street 218 (1,800 m² Hardcore Underground Cellar, Chalk-Allowed Platforms, Dumbbells up to 75 KG).
* **Tanta Delta Mega Arena:** Al-Geish Street (1,500 m² Delta Regional Epicenter, Monolift & InBody Station, 06:00 - 02:00).

### 6. Interactive 7-Day Free Trial Modal & WhatsApp Activation
* **Egyptian Mobile Mask:** Auto-formats inputs as `+20 1X XXXX XXXX` and validates Egyptian carrier prefixes (010, 011, 012, 015).
* **Multi-Stage Loading Simulation:** Rotating 60FPS spinner with carrier verification steps.
* **Green Verified Checkmark Screen:** Emerald glow badge, personalized athlete dossier, unique pass token (`SHARK-EGY-XXXX`), and direct deep link to WhatsApp with pre-filled activation message.

---

## 📁 Repository Structure

```
landing-page/
├── index.html                       # Standalone zero-dependency HTML5 app (GitHub Pages ready)
├── Shark_Gym_Luxury_Landing_Page.html # Mirror standalone application
├── server.js                        # Zero-dependency Node.js preview server
├── package.json                     # Next.js 14 & Lucide React dependencies
├── tsconfig.json                    # TypeScript compiler configuration
├── tailwind.config.js               # Custom Shark Gym theme extensions
├── postcss.config.js                # PostCSS plugins
├── next.config.js                   # Next.js optimization configuration
├── docs/
│   ├── Shark_Gym_Executive_Brochure.pdf # 2-Page publication-grade PDF brochure
│   └── Shark_Gym_Executive_Brief.pdf    # Executive specification dossier
├── public/
│   └── index.html                   # Static web deployment fallback
└── src/
    ├── app/
    │   ├── globals.css              # Custom keyframe animations & styling
    │   ├── layout.tsx               # Root layout with Montserrat & Oswald fonts
    │   └── page.tsx                 # Full Next.js 14 client component (Single-file)
    └── data/
        └── gymData.ts               # Program protocols, pricing, and compound hubs
```

---

## 🚀 Getting Started

### Option 1: Instant Zero-Dependency Server
No `npm install` needed!
```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Full Next.js 14 Development
```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Option 3: Production Build
```bash
npm run build
npm start
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Crafted for SHARK GYM EGYPT • 2026*
