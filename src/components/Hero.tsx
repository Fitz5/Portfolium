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
