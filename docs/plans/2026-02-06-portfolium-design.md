# Portfolium — FPV Photography/Video Business Website

## Overview

Client-facing website for an FPV photography/video business. Serves as a curated portfolio showcase and enables clients to book services, pay, and get in contact.

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for scroll animations
- **Resend** for contact form emails
- **Stripe Checkout** for payments

## Site Structure

Single-page layout with fixed header navigation. Five sections:

### 1. Hero

- Full-viewport background video loop (muted, autoplay) of best FPV footage
- Business name + tagline overlay with dark gradient for readability
- CTA button ("See My Work") smooth-scrolls to Work section

### 2. Work

- Grid of 4-6 curated projects
- Each project: thumbnail card that opens a modal with YouTube/Vimeo embed
- Project details: client name, location, description
- Video embeds lazy-loaded via `lite-youtube-embed` or similar for performance

### 3. Services

Three package cards:

| Package | Price | Includes |
|---------|-------|----------|
| Starter | $500 | 30-second edited FPV video, 1 location, 1 revision |
| Professional | $1,500 | 2-minute edited FPV video, up to 3 locations, 2 revisions, licensed music |
| Custom Project | — | "Let's talk about your vision" — links to contact form |

- Starter and Professional: "Book Now" button triggers Stripe Checkout
- Custom Project: smooth-scrolls to Contact with "Project Type" pre-selected

### 4. About

- Brief section about the photographer, FPV experience, gear/approach
- Personal photo or setup shot
- Builds trust and personality

### 5. Contact

Form fields:

- Name (required)
- Email (required, validated)
- Phone (optional)
- Project Type (required, dropdown): Starter Package, Professional Package, Custom Project, General Inquiry
- Message (required, textarea)

Submissions sent to `david.fitzgerald.uav@gmail.com` via Resend.

Spam prevention: honeypot field (hidden input that bots fill, humans skip).

## Architecture

### Static Content

- No database, no CMS, no auth
- Portfolio data in `data/projects.ts` (array of project objects)
- Service data in `data/services.ts` (array of service objects)
- Update content by editing these files

### API Routes

Two server-side routes:

**`/api/checkout`** — Stripe Checkout

1. Receives selected package ID from frontend
2. Creates Stripe Checkout Session (name, price, email collection)
3. Redirects client to Stripe-hosted checkout
4. Success → `/thank-you` confirmation page
5. Cancel → redirect back to services section

**`/api/contact`** — Contact Form

1. Receives form data via POST
2. Validates server-side
3. Sends formatted email via Resend
4. Subject: "New Inquiry: [Project Type] from [Name]"
5. Success → "Thanks! I'll get back to you within 24 hours."
6. Error → "Something went wrong. Reach me at david.fitzgerald.uav@gmail.com"

## Visual Design

### Colors

- Background: `#0a0a0a` (near-black)
- Card surfaces: `#141414` (dark gray)
- Headings: `#fafafa` (white)
- Body text: `#a0a0a0` (muted gray)
- Accent: `#417ee0` (soft blue) — CTAs, highlights, hover effects

### Typography

- Modern sans-serif (Inter or Manrope)
- Bold weights for headings, light for body

### Effects

- Subtle fade-in animations on scroll (Framer Motion)
- Hero video with dark gradient overlay
- Card hover: slight lift + accent border glow
- Smooth scroll between sections

### Responsive

- Mobile-first design
- Nav collapses to hamburger menu on mobile
- Video grid goes single-column on small screens
- All sections stack naturally

## Pages

- `/` — Main single-page site (all 5 sections)
- `/thank-you` — Post-payment confirmation page
