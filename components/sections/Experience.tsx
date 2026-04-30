"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section
      id="experience"
      className="flex min-h-screen items-center justify-center bg-[#E8C468] px-8 py-32"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 items-center gap-20 md:grid-cols-2"
        >
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl tracking-tight md:text-7xl relative -left-1"
            >
              Experience
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mr-auto h-px w-24 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-lg font-light"
            >
              {/* TODO: IMPLEMENT BETTER STYLING */}
              <p>Garden views</p>
              <p>Private balconies</p>
              <p>Shared kitchen</p>
              <p>Fast WiFi (103 Mbps)</p>
              <p>Bicycle hire</p>
              <p>Free parking</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-1 pt-8"
            >
              <p className="mb-4 text-sm font-light">LOCATION</p>
              <p className="text-lg font-light">
                Walking distance to General Luna Beach
              </p>
              <p className="text-lg font-light">1km to Guyam Island</p>
              <p className="text-lg font-light">30km from Sayak Airport</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-3/4"
          >
            <Image
              src="/image-8.png"
              alt="Camanolo location"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;