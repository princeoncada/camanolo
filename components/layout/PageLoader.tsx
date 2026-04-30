"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PAGE_READY_EVENT } from "@/hooks/usePageReady";
import { getImageAssetSnapshot, loadImageAsset } from "@/lib/image-assets";

const SECONDARY_IMAGE_TIMEOUT = 3000;
const HERO_IMAGE_ASSET = "/image-4.png";
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
const SECONDARY_IMAGE_ASSETS = IMAGE_ASSETS.filter(
  (src) => src !== HERO_IMAGE_ASSET,
);

/**
 * Full-screen loader shown before the page opens.
 *
 * Purpose:
 * - Make sure the hero image is ready before the user sees the page.
 * - Give the other images a short chance to load too.
 * - Avoid making the user wait forever for below-the-fold images.
 * - Store loaded images in the shared loader so components can reuse them.
 */
const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  const markPageReady = () => {
    document.documentElement.dataset.pageReady = "true";
    window.dispatchEvent(new Event(PAGE_READY_EVENT));
  };

  useEffect(() => {
    let isMounted = true;
    const timeoutIds = new Set<number>();
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    const unlockScroll = () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };

    const finishLoading = () => {
      if (!isMounted) {
        return;
      }

      markPageReady();
      setIsLoading(false);
      unlockScroll();
    };

    /**
     * Loading policy:
     * 1. If all images are already ready, open the page immediately.
     * 2. If not, wait up to 3 seconds for all images.
     * 3. After 3 seconds, only keep waiting if the hero image is not ready.
     */
    const preloadCriticalImages = async () => {
      const queuedImages = [HERO_IMAGE_ASSET, ...SECONDARY_IMAGE_ASSETS];

      if (
        queuedImages.every((src) => getImageAssetSnapshot(src).isLoaded)
      ) {
        finishLoading();
        return;
      }

      const allImagesLoaded = Promise.all(
        queuedImages.map((src) =>
          loadImageAsset(src, src === HERO_IMAGE_ASSET ? "high" : "low"),
        ),
      );
      
      const imageBudgetElapsed = new Promise<void>((resolve) => {
        const timeoutId = window.setTimeout(() => {
          timeoutIds.delete(timeoutId);
          resolve();
        }, SECONDARY_IMAGE_TIMEOUT);

        timeoutIds.add(timeoutId);
      });

      await Promise.race([allImagesLoaded, imageBudgetElapsed]);

      if (!getImageAssetSnapshot(HERO_IMAGE_ASSET).isLoaded) {
        await loadImageAsset(HERO_IMAGE_ASSET, "high");
      }

      finishLoading();
    };

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.pageReady = "false";

    preloadCriticalImages();

    return () => {
      isMounted = false;
      timeoutIds.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
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
