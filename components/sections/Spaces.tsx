"use client";

import { motion } from "framer-motion";
import { ImageGallery } from "@/components/shadix-ui/components/image-gallery";

const images = [
  { src: "/image-2.png", alt: "Space image 2" },
  { src: "/image-6.png", alt: "Space image 6" },
  { src: "/image.png", alt: "Space image 1" },
  { src: "/image-5.png", alt: "Space image 5" },
  { src: "/image-3.png", alt: "Space image 3" },
  { src: "/image-4.png", alt: "Space image 4" },
  { src: "/image-7.png", alt: "Space image 7" },
  { src: "/image-8.png", alt: "Space image 8" },
];

const Spaces = () => {
  return (
    <section id="spaces" className="min-h-screen px-8 py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-400"
      >
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl tracking-tight md:text-7xl"
          >
            Spaces
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto h-px w-24 bg-black"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <ImageGallery images={images} />
        </div>
      </motion.div>
    </section>
  );
};

export default Spaces;