"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/services";

export default function Services() {
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleBookNow = async (serviceId: string) => {
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setCheckoutError(data.error || "Failed to start checkout. Please try again.");
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError("Failed to start checkout. Please try again.");
      }
    } catch {
      setCheckoutError("Network error. Please check your connection and try again.");
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
                  href="#contact?type=custom"
                  className="mt-8 block w-full rounded-lg border border-accent py-3 text-center font-semibold text-accent transition-colors hover:bg-accent/10"
                >
                  {service.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {checkoutError && (
          <p className="mt-6 text-center text-sm text-red-400">
            {checkoutError}
          </p>
        )}
      </div>
    </section>
  );
}
