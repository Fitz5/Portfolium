"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background video via YouTube embed */}
      <div className="pointer-events-none absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/svyvU6WvOcI?autoplay=1&mute=1&loop=1&playlist=svyvU6WvOcI&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1"
          title="Hero background video"
          allow="autoplay; encrypted-media"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

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
          Cinematic FPV
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-4 max-w-xl text-lg text-text-body md:text-xl"
        >
          Drone footage that tells your story.
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
