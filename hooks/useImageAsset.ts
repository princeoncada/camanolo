"use client";

import { useEffect, useSyncExternalStore } from "react";

import {
  getImageAssetSnapshot,
  getImageAssetSrcSnapshot,
  isPublicImageAsset,
  loadImageAsset,
  subscribeToImageAssets,
} from "@/lib/image-assets";

const getServerSnapshot = () => null;

/**
 * Hook for using the shared local-image loader in React components.
 *
 * Purpose:
 * - Start loading a local public image, or join the existing load.
 * - Return the temporary browser URL when the image is ready.
 * - Tell the component whether this image uses the shared loader.
 */
const useImageAsset = (
  src: unknown,
  fetchPriority: HTMLImageElement["fetchPriority"] = "auto",
) => {
  const shouldUseAssetStore = isPublicImageAsset(src);

  useEffect(() => {
    if (!shouldUseAssetStore) {
      return;
    }

    loadImageAsset(src, fetchPriority);
  }, [fetchPriority, shouldUseAssetStore, src]);

  const resolvedSrc = useSyncExternalStore(
    subscribeToImageAssets,
    () => (shouldUseAssetStore ? getImageAssetSrcSnapshot(src) : null),
    getServerSnapshot,
  );
  const snapshot = shouldUseAssetStore
    ? getImageAssetSnapshot(src)
    : {
        isLoaded: false,
        src: null,
      };

  return {
    ...snapshot,
    src: resolvedSrc,
    shouldUseAssetStore,
  };
};

export default useImageAsset;
