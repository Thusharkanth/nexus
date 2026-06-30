# Nexus Solutions — Developer Documentation & Website Requirement Document

Welcome to the codebase for the **Nexus Solutions** website. This is a dual-purpose web platform designed as a lead generation engine for custom software services and a product showcase for the **ALLFIX** SaaS platform.

This document serves as both a **Website Requirement Document (WRD)** and a **Local Development Guide** for developers working on this project.

---

## 1. Local Development Setup

Follow these instructions to run, build, and test the website locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended) and npm installed.

### Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/The-Nexus-Solutions/Nexus_website.git
   cd Nexus_website
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local dev server with Hot Module Replacement (HMR):
```bash
npm run dev
```
By default, the site will be available at [http://localhost:5173/](http://localhost:5173/).

### Production Build
To build the application for production, compile the TypeScript code and generate static files using Vite:
```bash
npm run build
```
The compiled build output will be stored in the `/dist` directory.

### Preview Production Build
To preview the generated production files locally:
```bash
npm run preview
```

### Code Linting
Run ESLint to check for code style issues:
```bash
npm run lint
```

---

## 2. Technical Overview & Architecture

### Stack Configuration
*   **Frontend Framework**: React v19.2.6
*   **Build System**: Vite v8.0.12
*   **Language**: TypeScript v6.0.2
*   **Styling**: Tailwind CSS v4.3.1 (integrated via `@tailwindcss/vite` plugin)
*   **Routing**: React Router DOM v7.18.0
*   **Animations**: GSAP v3.15.0 and Framer Motion v12.40.0
*   **Icons**: Lucide React v1.21.0

### Key Directories
*   [`/public`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/public): Static assets, including video backgrounds (`/Hero/Diamond_rotating.mp4`), intro video (`/Hero/herovideo.mp4`), and portfolio images.
*   [`/src/components`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/components): Reusable React components.
    *   [`SiteChrome.tsx`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/components/SiteChrome.tsx): Navbar, Footer, Magnetic Buttons, Cursor Glow, and Scroll Progress.
    *   [`IntroVideo.tsx`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/components/IntroVideo.tsx): Cinematic landing/entry animation.
    *   [`sections/Hero.tsx`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/components/sections/Hero.tsx): Responsive, loop-crossfaded video hero banner.
    *   [`sections/Sections.tsx`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/components/sections/Sections.tsx): Global page section layout components (Services, About, FAQ, etc.).
*   [`/src/pages`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/pages): Route-level components.
*   [`/src/data/portfolioData.ts`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/data/portfolioData.ts): Data definitions for portfolio items across the three Practices.
*   [`/src/index.css`](file:///c:/Users/User/OneDrive%20-%20Robert%20Gordon%20University/Desktop/THE%20MATRICES/Nexus/website/final%20kaveen/Nexus_website/src/index.css): Styling setup using OKLCH colors, theme definitions, and custom animations.

---

## 3. Website Requirement Document (WRD)

The following requirements outline the business context, objectives, structure, and design principles of the website.

### 3.1 Project Overview
Nexus Solutions is the IT and Technology division of **The Matrices Pvt Ltd**, focused on delivering AI-powered software solutions, digital transformation services, and SaaS products for global clients.

The company operates under two models:
1.  **Service-Based Model**: Custom software, cloud, and AI solutions.
2.  **Product-Based Model**: The **ALLFIX** SaaS platform.

### 3.2 Business Identity
*   **Company Name**: Nexus Solutions
*   **Parent Organization**: The Matrices Pvt Ltd
*   **Product Ecosystem**: ALLFIX (SaaS Product)
*   **Partnerships**: Futura Solutions
*   **Locations**: Colombo, Badulla (Sri Lanka)

### 3.3 Vision & Mission
*   **Vision**: To be a leading technology and digital transformation partner recognized for innovation, excellence, and creating sustainable growth for businesses worldwide.
*   **Mission**: We deliver affordable, high-quality technology solutions that help businesses modernize, automate, and scale. Through AI, software development, cloud technologies, and digital transformation services, we solve real business challenges while providing a premium customer experience. We build long-term partnerships founded on trust, reliability, innovation, and measurable results.

### 3.4 Core Objectives
*   Generate qualified leads and new business opportunities.
*   Establish credibility and strengthen brand trust.
*   Showcase AI, software, and digital transformation capabilities.

### 3.5 Target Audience
*   **Primary**: SMEs (Small & Medium Enterprises), Entrepreneurs, and Startups undergoing digital transformation.
*   **Secondary**: Government organizations and NGOs.
*   **Geography**: Global (initial focus: Sri Lanka).

### 3.6 Services Offered
1.  **Core Development**: Website, Web Application, Mobile App, Custom Software, and SaaS Development.
2.  **AI & Automation**: AI Chatbots, AI Automation Solutions, AI Integration Services, and Data Science & Analytics.
3.  **Strategy & Design**: UI/UX Design, IT Consulting & Digital Transformation.

### 3.7 Product Showcase: ALLFIX
ALLFIX is a complete service repair management system designed for modern repair businesses.
*   **Key Functions**: Repair tracking system, Customer management, Workflow automation, and Service shop management.
*   **Website Role**: Secondary conversion funnel, complete with a dedicated product page and demo/adoption links.

### 3.8 Website Page Structure

#### Phase 1 — Launch (Current Status)
*   `Home` (Main landing page showcasing services, about, ALLFIX, FAQ)
*   `About Us` (Vision, mission, locations, and operational overview)
*   `Services` (Interactive directory of core services)
*   `Projects / Portfolio` (Directory grouped into three practices: Design, Tech, Products)
*   `Case Studies` (In-depth proof of work details - *linked under portfolio*)
*   `ALLFIX Product Page` (Dedicated product presentation and demo capture)
*   `Contact` (Lead capture, priority WhatsApp conversion, and consultation booking)

#### Phase 2 — Future Expansion
*   `Industries`
*   `Team`
*   `Blog`
*   `Careers`
*   `FAQ`

### 3.9 Homepage Structure Flow
1.  **Hero Section**: Brand message + primary CTA (sticky dynamic crossfade loop).
2.  **About Preview**: Nexus + Matrices positioning visual.
3.  **Services Overview**: Interactive list of AI, Software, and Automation capabilities.
4.  **ALLFIX Highlight**: SaaS product showcase and interactive dashboard mockup.
5.  **Why Choose Us**: Differentiators with interactive stat counter gauges.
6.  **Case Studies Preview**: Proof of work cards highlighting client outcomes.
7.  **Team Preview**: Link to key contributors and team photo placeholder.
8.  **Contact CTA**: Final conversion trigger to WhatsApp or email form.

### 3.10 Technical Contributors (Team Structure)
The development and technology implementation are driven by the following key technical contributors:
*   **Thusharkanth**
*   **Hindujaan**
*   **Shukri Ahmed**
*   **Lathurshan**
*   **Kaveen**
*   **Kavisheak**
*   **Suhab**

### 3.11 Conversion & Lead System
*   **Contact Form**: Primary custom data-capture method.
*   **WhatsApp Integration**: High-priority direct channel.
*   **Calendly / Call Booking**: 30-minute consultation scheduling link.
*   **Lead Journey**: Visitor → Website → Service/Product Interest → Contact/WhatsApp → Consultation → Project Conversion.

### 3.12 Visual Direction & Design References
*   **Aesthetic**: Modern tech / SaaS-inspired, minimal, clean layout.
*   **Color Theme**: Dark theme with white typography and Neon Green accents (`oklch(0.76 0.17 162)` / `#04d294`).
*   **UI References**: 
    *   *Stripe* (copywriting clarity, premium layout)
    *   *Linear* (minimal SaaS interfaces, dark modes)
    *   *Vercel* (developer-centric grid systems)
    *   *Google Cloud* (trust architecture, enterprise framing)
