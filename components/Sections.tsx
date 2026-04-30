"use client";

import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Spaces from "./sections/Spaces";
import Separator from "./sections/Separator";
import Experience from "./sections/Experience";
import Stay from "./sections/Stay";
import Footer from "./layout/Footer";
import SiteHeader from "./layout/SiteHeader";
import ScrollProgress from "./layout/ScrollProgress";
import { useRef } from "react";

const Sections = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="bg-white">
      <ScrollProgress targetRef={scrollRef} />
      <SiteHeader />

      {/* ✅ ONLY track this */}
      <div ref={scrollRef}>
        <Hero />
        <Story />
        <Separator />
        <Spaces />
        <Experience />
        <Stay />
      </div>

      <Footer />
    </main>
  );
};

export default Sections;