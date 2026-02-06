# Portfolium Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page FPV photography/video business website with portfolio showcase, Stripe Checkout payments, and a contact form.

**Architecture:** Next.js 14 App Router with TypeScript. Single page with 5 sections (Hero, Work, Services, About, Contact). Two API routes: `/api/checkout` (Stripe) and `/api/contact` (Resend email). Static content stored in TypeScript data files. Dark cinematic aesthetic with `#417ee0` accent.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Stripe Checkout, Resend

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.mjs`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Initialize Next.js with TypeScript and Tailwind**

Run:
```bash
cd /root/Portfolium
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted about overwriting files, select yes. This creates the full Next.js scaffold.

Expected: Project files created, `node_modules` installed.

**Step 2: Install additional dependencies**

Run:
```bash
cd /root/Portfolium
npm install framer-motion stripe resend
```

Expected: Packages added to `package.json`.

**Step 3: Configure Tailwind theme with design tokens**

Replace the content of `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        "bg-card": "#141414",
        accent: "#417ee0",
        "text-heading": "#fafafa",
        "text-body": "#a0a0a0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 4: Set up global styles**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0a;
  color: #fafafa;
}
```

**Step 5: Set up root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolium | FPV Photography & Video",
  description:
    "Professional FPV drone photography and videography services. Cinematic aerial footage for your project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

**Step 6: Create placeholder page**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text-heading">
      <p className="p-8 text-accent">Portfolium — coming soon</p>
    </main>
  );
}
```

**Step 7: Verify dev server runs**

Run:
```bash
cd /root/Portfolium && npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
```

Expected: HTML response containing "Portfolium". Kill the dev server after verifying.

**Step 8: Create .env.local template**

Create `.env.local`:

```
STRIPE_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
RESEND_API_KEY=re_placeholder
CONTACT_EMAIL=david.fitzgerald.uav@gmail.com
```

Create `.env.example` with the same content (placeholder values) for reference.

Add `.env.local` to `.gitignore` (should already be there from create-next-app).

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind and dependencies"
```

---

### Task 2: Create Static Data Files

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/services.ts`
- Create: `src/data/navigation.ts`

**Step 1: Create project data**

Create `src/data/projects.ts`:

```ts
export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  description: string;
  videoUrl: string; // YouTube or Vimeo embed URL
  thumbnailUrl: string;
}

export const projects: Project[] = [
  {
    id: "mountain-resort",
    title: "Mountain Resort Flythrough",
    client: "Alpine Lodge Co.",
    location: "Aspen, CO",
    description:
      "Cinematic FPV tour through a luxury mountain resort, weaving between chalets and through the main lodge.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/mountain-resort.jpg",
  },
  {
    id: "urban-chase",
    title: "Urban Chase Sequence",
    client: "Metro Films",
    location: "Los Angeles, CA",
    description:
      "High-speed FPV chase through downtown streets and parking structures for a short film production.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/urban-chase.jpg",
  },
  {
    id: "warehouse-tour",
    title: "Warehouse Product Launch",
    client: "TechStart Inc.",
    location: "Austin, TX",
    description:
      "One-take FPV flight through a warehouse during a product launch event, capturing the energy of the crowd.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/warehouse-tour.jpg",
  },
  {
    id: "coastal-cliffs",
    title: "Coastal Cliff Dive",
    client: "Travel Weekly",
    location: "Big Sur, CA",
    description:
      "Dramatic cliff-diving FPV footage along the Pacific coastline for a travel magazine feature.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/coastal-cliffs.jpg",
  },
  {
    id: "stadium-event",
    title: "Stadium Concert Opener",
    client: "Live Nation",
    location: "Nashville, TN",
    description:
      "Opening sequence FPV flight through a packed stadium, diving from the rafters to the stage.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/stadium-event.jpg",
  },
  {
    id: "real-estate-luxury",
    title: "Luxury Estate Showcase",
    client: "Sotheby's Realty",
    location: "Miami, FL",
    description:
      "Seamless FPV tour of a waterfront estate, flowing from exterior pool area through the interior rooms.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/thumbnails/real-estate-luxury.jpg",
  },
];
```

**Step 2: Create services data**

Create `src/data/services.ts`:

```ts
export interface Service {
  id: string;
  name: string;
  price: number | null; // null for custom
  priceLabel: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const services: Service[] = [
  {
    id: "starter",
    name: "Starter",
    price: 50000, // in cents for Stripe
    priceLabel: "$500",
    description: "Perfect for small projects and social media content.",
    features: [
      "30-second edited FPV video",
      "1 location",
      "1 revision",
      "Delivered in 5 business days",
    ],
    cta: "Book Now",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 150000,
    priceLabel: "$1,500",
    description: "Full production for commercial and creative projects.",
    features: [
      "2-minute edited FPV video",
      "Up to 3 locations",
      "2 revisions",
      "Licensed music included",
      "Delivered in 10 business days",
    ],
    cta: "Book Now",
    highlighted: true,
  },
  {
    id: "custom",
    name: "Custom Project",
    price: null,
    priceLabel: "Let's Talk",
    description: "Have something bigger in mind? Let's build your vision together.",
    features: [
      "Tailored to your project scope",
      "Multiple locations & deliverables",
      "Dedicated project planning",
      "Flexible timeline",
    ],
    cta: "Get in Touch",
    highlighted: false,
  },
];
```

**Step 3: Create navigation data**

Create `src/data/navigation.ts`:

```ts
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
```

**Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add static data files for projects, services, and navigation"
```

---

### Task 3: Build Header Component

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Header component**

Create `src/components/Header.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { navItems } from "@/data/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold text-text-heading">
          Portfolium
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-text-body transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-text-heading transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-heading transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-heading transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-bg/95 px-6 pb-4 backdrop-blur-sm md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm text-text-body transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
```

**Step 2: Add Header to page**

Update `src/app/page.tsx`:

```tsx
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg text-text-heading">
        <p className="p-8 pt-24 text-accent">Portfolium — coming soon</p>
      </main>
    </>
  );
}
```

**Step 3: Verify dev server**

Run: `npm run dev` and check `http://localhost:3000` — header should be visible with nav links.

**Step 4: Commit**

```bash
git add src/components/Header.tsx src/app/page.tsx
git commit -m "feat: add responsive header with scroll transparency and mobile menu"
```

---

### Task 4: Build Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background video — replace src with your own reel */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold tracking-tight text-text-heading md:text-7xl"
        >
          Portfolium
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-4 max-w-xl text-lg text-text-body md:text-xl"
        >
          Cinematic FPV drone footage that tells your story.
        </motion.p>
        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          See My Work
        </motion.a>
      </div>
    </section>
  );
}
```

**Step 2: Add Hero to page**

Update `src/app/page.tsx` to import and render `<Hero />` inside `<main>`, removing the placeholder text.

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

**Step 3: Add placeholder assets**

Create `public/hero-poster.jpg` — a placeholder dark image (can be a 1x1 pixel dark image or any dark screenshot). The actual hero video (`public/hero-reel.mp4`) will be added by the user later. The component gracefully falls back to the poster image if no video is present.

**Step 4: Verify and commit**

Run dev server, verify Hero renders full-viewport with gradient overlay and animated text.

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: add Hero section with background video and scroll CTA"
```

---

### Task 5: Build Work Section (Portfolio Grid + Video Modal)

**Files:**
- Create: `src/components/Work.tsx`
- Create: `src/components/VideoModal.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create VideoModal component**

Create `src/components/VideoModal.tsx`:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl overflow-hidden rounded-xl bg-bg-card"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-video">
            <iframe
              src={project.videoUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-heading">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-accent">
              {project.client} &middot; {project.location}
            </p>
            <p className="mt-3 text-text-body">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            aria-label="Close modal"
          >
            &times;
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

**Step 2: Create Work section**

Create `src/components/Work.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import VideoModal from "./VideoModal";

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="bg-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-text-heading md:text-4xl"
        >
          Selected Work
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-body">
          A curated selection of recent FPV projects.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(project)}
              className="group relative aspect-video overflow-hidden rounded-xl bg-bg-card text-left"
            >
              {/* Thumbnail — placeholder gradient until real thumbnails are added */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-bg-card transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-lg font-semibold text-text-heading">
                  {project.title}
                </h3>
                <p className="text-sm text-text-body">{project.client}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <VideoModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
```

**Step 3: Add Work to page**

Update `src/app/page.tsx`:

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
      </main>
    </>
  );
}
```

**Step 4: Verify and commit**

Run dev server. Verify grid renders 6 cards, clicking one opens the modal with the video embed.

```bash
git add src/components/Work.tsx src/components/VideoModal.tsx src/app/page.tsx
git commit -m "feat: add Work section with portfolio grid and video modal"
```

---

### Task 6: Build Services Section

**Files:**
- Create: `src/components/Services.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Services component**

Create `src/components/Services.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";

export default function Services() {
  const handleBookNow = async (serviceId: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <section id="services" className="bg-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-text-heading md:text-4xl"
        >
          Services
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-body">
          Packages to fit your project. Need something unique? Let&apos;s talk.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-xl border p-8 ${
                service.highlighted
                  ? "border-accent bg-accent/5"
                  : "border-white/10 bg-bg-card"
              }`}
            >
              {service.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-text-heading">
                {service.name}
              </h3>
              <p className="mt-2 text-3xl font-extrabold text-accent">
                {service.priceLabel}
              </p>
              <p className="mt-3 text-sm text-text-body">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <span className="mt-0.5 text-accent">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {service.price !== null ? (
                <button
                  onClick={() => handleBookNow(service.id)}
                  className="mt-8 w-full rounded-lg bg-accent py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  {service.cta}
                </button>
              ) : (
                <a
                  href="#contact"
                  className="mt-8 block w-full rounded-lg border border-accent py-3 text-center font-semibold text-accent transition-colors hover:bg-accent/10"
                >
                  {service.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add Services to page**

Update `src/app/page.tsx` to import and render `<Services />` after `<Work />`.

**Step 3: Verify and commit**

```bash
git add src/components/Services.tsx src/app/page.tsx
git commit -m "feat: add Services section with package cards and Stripe checkout trigger"
```

---

### Task 7: Build About Section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create About component**

Create `src/components/About.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-bg px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Photo placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="aspect-square overflow-hidden rounded-2xl bg-bg-card"
        >
          {/* Replace with your photo: <img src="/about-photo.jpg" alt="..." className="h-full w-full object-cover" /> */}
          <div className="flex h-full items-center justify-center text-text-body">
            Your photo here
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-text-heading md:text-4xl">
            About Me
          </h2>
          <p className="mt-6 text-text-body leading-relaxed">
            I&apos;m David Fitzgerald, an FPV drone pilot and filmmaker
            specializing in cinematic aerial footage. From real estate
            walkthroughs to high-energy event coverage, I create immersive
            perspectives that traditional cameras can&apos;t capture.
          </p>
          <p className="mt-4 text-text-body leading-relaxed">
            With years of experience flying custom-built FPV rigs, I bring a
            unique combination of technical precision and creative vision to
            every project. Whether it&apos;s threading through tight spaces or
            sweeping across open landscapes, every flight is crafted to tell
            your story.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Add About to page**

Update `src/app/page.tsx` to import and render `<About />` after `<Services />`.

**Step 3: Commit**

```bash
git add src/components/About.tsx src/app/page.tsx
git commit -m "feat: add About section with photo placeholder and bio"
```

---

### Task 8: Build Contact Section with Form

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Contact component**

Create `src/components/Contact.tsx`:

```tsx
"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

const projectTypes = [
  "Starter Package",
  "Professional Package",
  "Custom Project",
  "General Inquiry",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("website")) {
      setStatus("sent"); // silently succeed for bots
      return;
    }

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-bg px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-text-heading md:text-4xl"
        >
          Let&apos;s Work Together
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-text-body">
          Tell me about your project and I&apos;ll get back to you within 24
          hours.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-6"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-body">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-heading placeholder-text-body/50 outline-none transition-colors focus:border-accent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-body">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-heading placeholder-text-body/50 outline-none transition-colors focus:border-accent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text-body">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-heading placeholder-text-body/50 outline-none transition-colors focus:border-accent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-text-body">
              Project Type *
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-heading outline-none transition-colors focus:border-accent"
            >
              <option value="">Select a project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-body">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-heading placeholder-text-body/50 outline-none transition-colors focus:border-accent"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-accent py-3 font-semibold text-white transition-transform hover:scale-105 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-center text-sm text-green-400">
              Thanks! I&apos;ll get back to you within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. You can reach me directly at{" "}
              <a
                href="mailto:david.fitzgerald.uav@gmail.com"
                className="underline"
              >
                david.fitzgerald.uav@gmail.com
              </a>
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
```

**Step 2: Add Contact to page**

Update `src/app/page.tsx` to import and render `<Contact />` after `<About />`.

**Step 3: Commit**

```bash
git add src/components/Contact.tsx src/app/page.tsx
git commit -m "feat: add Contact section with form, honeypot spam prevention, and status handling"
```

---

### Task 9: Build Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-text-body">
          &copy; {new Date().getFullYear()} Portfolium. All rights reserved.
        </p>
        <a
          href="mailto:david.fitzgerald.uav@gmail.com"
          className="text-sm text-text-body transition-colors hover:text-accent"
        >
          david.fitzgerald.uav@gmail.com
        </a>
      </div>
    </footer>
  );
}
```

**Step 2: Add Footer to page**

Update `src/app/page.tsx` to import and render `<Footer />` after `</main>`.

**Step 3: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: add Footer with copyright and contact email"
```

---

### Task 10: Build Stripe Checkout API Route

**Files:**
- Create: `src/app/api/checkout/route.ts`
- Create: `src/lib/stripe.ts`

**Step 1: Create Stripe client helper**

Create `src/lib/stripe.ts`:

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});
```

**Step 2: Create checkout API route**

Create `src/app/api/checkout/route.ts`:

```ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { services } from "@/data/services";

export async function POST(request: Request) {
  try {
    const { serviceId } = await request.json();

    const service = services.find((s) => s.id === serviceId);
    if (!service || service.price === null) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: service.price,
            product_data: {
              name: `Portfolium — ${service.name}`,
              description: service.description,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/thank-you`,
      cancel_url: `${request.headers.get("origin")}/#services`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
```

**Step 3: Verify the route compiles**

Run: `npm run dev` — no build errors expected. You can test with:

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"starter"}'
```

Expected: Returns JSON with `{ error: ... }` (because Stripe key is placeholder). With a real key, returns `{ url: "https://checkout.stripe.com/..." }`.

**Step 4: Commit**

```bash
git add src/lib/stripe.ts src/app/api/checkout/route.ts
git commit -m "feat: add Stripe Checkout API route for service payments"
```

---

### Task 11: Build Contact Form API Route

**Files:**
- Create: `src/app/api/contact/route.ts`

**Step 1: Create contact API route**

Create `src/app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL!;

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    // Server-side validation
    if (!body.name || !body.email || !body.projectType || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolium <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: body.email,
      subject: `New Inquiry: ${body.projectType} from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Project Type: ${body.projectType}`,
        ``,
        `Message:`,
        body.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact form API route with Resend email and validation"
```

---

### Task 12: Build Thank You Page

**Files:**
- Create: `src/app/thank-you/page.tsx`

**Step 1: Create thank-you page**

Create `src/app/thank-you/page.tsx`:

```tsx
import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-heading">Thank You!</h1>
        <p className="mt-4 text-lg text-text-body">
          Your payment was successful. I&apos;ll be in touch shortly to kick off
          your project.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/thank-you/page.tsx
git commit -m "feat: add thank-you page for post-payment confirmation"
```

---

### Task 13: Final Page Assembly and Polish

**Files:**
- Modify: `src/app/page.tsx` (final assembly)

**Step 1: Ensure final page.tsx has all sections**

Verify `src/app/page.tsx` looks like:

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Run build to verify no errors**

Run:
```bash
cd /root/Portfolium && npm run build
```

Expected: Build completes successfully with no TypeScript or lint errors.

**Step 3: Fix any build errors found**

Address any issues that come up during the build step.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: assemble all sections into final single-page layout"
```

---

## Summary of File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/
│   │   │   └── route.ts
│   │   └── contact/
│   │       └── route.ts
│   ├── thank-you/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── VideoModal.tsx
│   └── Work.tsx
├── data/
│   ├── navigation.ts
│   ├── projects.ts
│   └── services.ts
└── lib/
    └── stripe.ts
```
