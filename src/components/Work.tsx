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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-bg-card" />
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
