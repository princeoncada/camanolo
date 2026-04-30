"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/sections";
import { Navbar } from "./Navbar";
import LoadingImage from "@/components/shared/LoadingImage";

const SCROLL_SETTLE_DELAY = 140;

const SiteHeader = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollUpdateTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const getCurrentSection = () => {
      const anchor = window.scrollY + window.innerHeight * 0.35;

      return sections.reduce((activeIndex, section, index) => {
        const element = document.getElementById(section.id);
        return element && element.offsetTop <= anchor ? index : activeIndex;
      }, 0);
    };

    const updateCurrentSection = () => {
      setCurrentSection(getCurrentSection());
    };

    const updateCurrentSectionAfterScrollSettles = () => {
      if (scrollUpdateTimeoutRef.current) {
        window.clearTimeout(scrollUpdateTimeoutRef.current);
      }

      scrollUpdateTimeoutRef.current = window.setTimeout(() => {
        updateCurrentSection();
      }, SCROLL_SETTLE_DELAY);
    };

    updateCurrentSection();
    window.addEventListener("scroll", updateCurrentSectionAfterScrollSettles, {
      passive: true,
    });
    window.addEventListener("resize", updateCurrentSection);

    return () => {
      if (scrollUpdateTimeoutRef.current) {
        window.clearTimeout(scrollUpdateTimeoutRef.current);
      }
      window.removeEventListener(
        "scroll",
        updateCurrentSectionAfterScrollSettles,
      );
      window.removeEventListener("resize", updateCurrentSection);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id);
    setCurrentSection(index);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-8 lg:top-3 top-5 z-50"
      >
        <motion.button
          onClick={() => scrollToSection(0)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="hover:cursor-pointer"
        >
          <LoadingImage
            src="/logo.png"
            alt="Camanolo"
            width={160}
            height={40}
            wrapperClassName="h-10 w-fit bg-transparent"
            className="h-10 w-auto"
          />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed right-8 top-3 z-50 hidden lg:flex"
      >
        <motion.button
          onClick={() => scrollToSection(4)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black px-8 py-2.5 text-sm tracking-wider text-white"
        >
          BOOK
        </motion.button>
      </motion.div>

      <Navbar
        currentSection={currentSection}
        sections={[...sections]}
        onNavigate={scrollToSection}
      />
    </>
  );
};

export default SiteHeader;
