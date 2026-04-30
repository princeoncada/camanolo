"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MIN_VISIBLE_TIME = 700;
const IMAGE_ASSETS = [
  "/logo.png",
  "/image.png",
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
  "/image-5.png",
  "/image-6.png",
  "/image-7.png",
  "/image-8.png",
];

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const image = new window.Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      resolve();
    }
  });

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: number | undefined;
    let isMounted = true;
    const startedAt = performance.now();
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    const unlockScroll = () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };

    const finishLoading = () => {
      const elapsed = performance.now() - startedAt;
      const remainingTime = Math.max(MIN_VISIBLE_TIME - elapsed, 0);

      timeoutId = window.setTimeout(() => {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
        unlockScroll();
      }, remainingTime);
    };

    const waitForImages = () => {
      Promise.all(IMAGE_ASSETS.map(preloadImage)).then(finishLoading);
    };

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (document.readyState === "complete") {
      waitForImages();
    } else {
      window.addEventListener("load", waitForImages, { once: true });
    }

    return () => {
      isMounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("load", waitForImages);
      unlockScroll();
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white px-8"
        >
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border border-black/10 border-t-black" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
