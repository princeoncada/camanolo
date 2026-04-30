"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingImage from "@/components/shared/LoadingImage";

const amenities = [
  { label: "Garden views", image: "/image-2.png" },
  { label: "Private balconies", image: "/image-3.png" },
  { label: "Shared kitchen", image: "/image-4.png" },
  { label: "Fast WiFi", image: "/image-5.png" },
  { label: "Bicycle hire", image: "/image-6.png" },
  { label: "Free parking", image: "/image-7.png" },
];

const Experience = () => {
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);
  const activeImage = amenities[activeAmenityIndex];

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
              className="mr-auto h-px w-24 bg-black lg:hidden"
            />

            <div className="relative aspect-4/3 overflow-hidden md:hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeImage.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <LoadingImage
                    src={activeImage.image}
                    alt={activeImage.label}
                    fill
                    sizes="100vw"
                    wrapperClassName="absolute inset-0"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 border-y border-black/20 text-base font-light sm:grid-cols-2"
              role="radiogroup"
              aria-label="Experience highlights"
            >
              {amenities.map((amenity, index) => (
                <button
                  type="button"
                  key={amenity.label}
                  role="radio"
                  aria-checked={activeAmenityIndex === index}
                  onClick={() => setActiveAmenityIndex(index)}
                  onFocus={() => setActiveAmenityIndex(index)}
                  className={`group flex items-center gap-4 border-b border-black/10 py-5 last:border-b-0 sm:odd:pl-6 sm:even:border-l sm:even:pl-6 ${
                    index >= amenities.length - 2 ? "sm:border-b-0" : ""
                  } cursor-pointer text-left outline-none transition-colors hover:bg-black/5 focus-visible:bg-black/5`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center border text-xs tracking-[0.2em] transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white ${
                      activeAmenityIndex === index
                        ? "border-black bg-black text-white"
                        : "border-black/25 text-black/60"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg leading-none tracking-tight text-black">
                    {amenity.label}
                  </p>
                </button>
              ))}
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
            className="relative hidden aspect-3/4 overflow-hidden md:block"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={activeImage.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <LoadingImage
                  src={activeImage.image}
                  alt={activeImage.label}
                  fill
                  sizes="50vw"
                  wrapperClassName="absolute inset-0"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
