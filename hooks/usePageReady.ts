"use client";

import { useSyncExternalStore } from "react";

export const PAGE_READY_EVENT = "camanolo:page-ready";

const subscribeToPageReady = (callback: () => void) => {
  window.addEventListener(PAGE_READY_EVENT, callback);

  return () => {
    window.removeEventListener(PAGE_READY_EVENT, callback);
  };
};

const getPageReadySnapshot = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.pageReady === "true";

const getServerSnapshot = () => false;

const usePageReady = () =>
  useSyncExternalStore(
    subscribeToPageReady,
    getPageReadySnapshot,
    getServerSnapshot,
  );

export default usePageReady;
