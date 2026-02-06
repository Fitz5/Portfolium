"use client";

import { useState, useEffect, FormEvent } from "react";
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
  const [projectType, setProjectType] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("type=custom")) {
      setProjectType("Custom Project");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get("website")) {
      setStatus("sent");
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
        setProjectType("");
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
          {/* Honeypot — visually hidden but accessible to bots */}
          <input
            type="text"
            name="website"
            className="absolute -left-[9999px] opacity-0 h-0 w-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-body"
            >
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-body"
            >
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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text-body"
            >
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
            <label
              htmlFor="projectType"
              className="block text-sm font-medium text-text-body"
            >
              Project Type *
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
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
            <label
              htmlFor="message"
              className="block text-sm font-medium text-text-body"
            >
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
