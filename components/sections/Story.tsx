"use client";

import { motion } from "framer-motion";

const Story = () => {
  return (
    <section
      id="story"
      className="flex min-h-screen items-center justify-center px-8 py-32"
    >
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="space-y-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl tracking-tight md:text-7xl"
            >
              Our Story
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto h-px w-24 bg-black"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-2xl font-light leading-relaxed md:text-3xl"
          >
            Camanolo is more than a name, it&apos;s a legacy.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-light leading-relaxed text-gray-600 text-center max-w-3xl mx-auto"
          >
            Born from the loving union of our parents&apos; families, Camanolo carries the warmth of generations.
            This name honors the mother and father of both sides, a tribute to the roots that brought us together
            and the family we&apos;ve built in the heart of Siargao.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl font-light leading-relaxed text-gray-600 text-center max-w-3xl mx-auto"
          >
            When you stay with us, you don&apos;t just visit — you become part of our family.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;