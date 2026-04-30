/**
 * One shared image loader for local public images.
 *
 * Purpose:
 * - Download each local image only once while the page is open.
 * - Let the page loader and all image components share that same download.
 * - Stop repeated sections from requesting the same large PNG again and again.
 * - Give components a temporary browser URL they can render after download.
 *
 * Jargon legend:
 * - Cache: a place where we remember work that is already done.
 * - Public image: an image from this app's `/public` folder, like `/image-4.png`.
 * - Object URL: a temporary browser-made URL for a downloaded file.
 * - Promise: a JavaScript value that finishes later, after work is done.
 * - Subscriber/listener: code that asks to be notified when something changes.
 * - Snapshot: the current answer to "is this image ready yet?"
 *
 * This is not meant to replace normal browser caching. It only helps this app
 * avoid duplicate image downloads during one page visit.
 */
type ImageAssetRecord = {
  objectUrl: string | null;
  promise: Promise<void> | null;
  status: "idle" | "loading" | "loaded" | "error";
};

type PriorityRequestInit = RequestInit & {
  priority?: HTMLImageElement["fetchPriority"];
};

const imageAssets = new Map<string, ImageAssetRecord>();
const listeners = new Set<() => void>();

const getRecord = (src: string) => {
  let record = imageAssets.get(src);

  if (!record) {
    record = {
      objectUrl: null,
      promise: null,
      status: "idle",
    };
    imageAssets.set(src, record);
  }

  return record;
};

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

/**
 * Decide whether this image should use the shared loader.
 *
 * We only handle local public images like `/image-4.png`. Other image types
 * keep using their normal Next.js behavior.
 */
export const isPublicImageAsset = (src: unknown): src is string =>
  typeof src === "string" && src.startsWith("/") && !src.startsWith("/_next/");

/**
 * Let React components know when an image finishes loading.
 *
 * Components use this to update from spinner -> image at the right time.
 */
export const subscribeToImageAssets = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

/**
 * Return the current load state for an image.
 *
 * If an image fails, we still mark it as "done" so the page loader or spinner
 * does not stay on screen forever.
 */
export const getImageAssetSnapshot = (src: string) => {
  const record = getRecord(src);

  return {
    isLoaded: record.status === "loaded" || record.status === "error",
    src: record.objectUrl,
  };
};

/**
 * Return the temporary browser URL for an image, if it is ready.
 *
 * This returns a simple string or null. That keeps React updates predictable.
 */
export const getImageAssetSrcSnapshot = (src: string) => {
  const record = getRecord(src);

  return record.objectUrl;
};

/**
 * Start loading an image, or reuse the load that already started.
 *
 * The first component starts the download. Every later component waits for the
 * same download instead of starting a new one.
 */
export const loadImageAsset = (
  src: string,
  fetchPriority: HTMLImageElement["fetchPriority"] = "auto",
) => {
  const record = getRecord(src);

  if (record.promise) {
    return record.promise;
  }

  record.status = "loading";
  record.promise = fetch(src, {
    priority: fetchPriority,
  } as PriorityRequestInit)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load image asset: ${src}`);
      }

      return response.blob();
    })
    .then((blob) => {
      record.objectUrl = URL.createObjectURL(blob);
      record.status = "loaded";
    })
    .catch(() => {
      record.status = "error";
    })
    .finally(() => {
      emitChange();
    });

  emitChange();

  return record.promise;
};
