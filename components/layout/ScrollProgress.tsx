"use client";

import { motion, useScroll } from "framer-motion";
import { RefObject } from "react";

type Props = {
  targetRef: RefObject<HTMLElement | null>;
};

const ScrollProgress = ({ targetRef }: Props) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#E8C468] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
