"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.75, ease: "easeOut" }}
      >
        <Image
          src="/image-4.png"
          alt="Camanolo Homestay"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="relative z-10 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="mb-4 text-[10vw] leading-10 tracking-wider lg:text-[8vw] lg:leading-35">
            CAMANOLO
          </h1>

          <p className="mb-8 text-xl font-light tracking-[0.3em] md:text-4xl">
            HOMESTAY
          </p>

          <p className="mb-10 max-w-md text-base font-light md:text-md">
            Siargao, Philippines
          </p>

          <motion.div style={{ opacity }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            >
              <ChevronDown className="animate-bounce" size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
