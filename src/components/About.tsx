"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-bg px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end"
        >
          <div className="aspect-[2094/4608] w-full max-w-[320px] overflow-hidden rounded-2xl bg-bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile-pic.jpg"
            alt="David Fitzgerald"
            className="h-full w-full object-cover"
          />
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
            I&apos;m My name is David Fitzgerald, an FPV drone pilot and filmmaker
            specializing in cinematic aerial footage. I capture immersive
            perspectives that traditional cameras can&apos;t capture.
          </p>
          <p className="mt-4 text-text-body leading-relaxed">
            With years of experience flying racing FPV drones and a degree in mechanical engineering, I bring a
            unique combination of technical precision and know-how to
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
