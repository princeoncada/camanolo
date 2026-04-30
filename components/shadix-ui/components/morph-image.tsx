"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type React from "react";

import { AnimatePresence, motion, type Transition } from "motion/react";

import useImageAsset from "@/hooks/useImageAsset";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEventListener } from "@/hooks/useEventListener";
import { cn } from "@/lib/utils";

const transition: Transition = {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
    stiffness: 120,
    damping: 15,
};

const subscribeToMount = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const MorphImage: React.FC<React.ComponentProps<typeof motion.img>> = ({
    src,
    className,
    alt,
    onClick,
    onLoad,
    onError,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loadedThumbnailSrc, setLoadedThumbnailSrc] = useState<
        React.ComponentProps<typeof motion.img>["src"] | null
    >(null);
    const mounted = useSyncExternalStore(
        subscribeToMount,
        getClientSnapshot,
        getServerSnapshot,
    );
    const asset = useImageAsset(src);
    const renderedSrc = asset.src ?? src;
    const isThumbnailLoaded = asset.shouldUseAssetStore
        ? asset.isLoaded
        : loadedThumbnailSrc === src;

    const imageRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        ref: imageRef,
        callback: () => setIsOpen(false),
    });

    useEventListener("scroll", () => isOpen && setIsOpen(false));

    const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
        onClick?.(e);
    };

    if (!mounted) return null;

    const thumbnail = (
        renderedSrc ? <motion.img
            src={renderedSrc}
            alt={alt}
            layoutId="morph-image"
            className={cn(
                "w-full h-full object-cover object-center not-prose cursor-zoom-in transition-opacity duration-500 ease-out",
                isThumbnailLoaded ? "opacity-100" : "opacity-0",
                className,
            )}
            onClick={() => setIsOpen(true)}
            transition={transition}
            onLoad={(event) => {
                setLoadedThumbnailSrc(src ?? null);
                onLoad?.(event);
            }}
            onError={(event) => {
                setLoadedThumbnailSrc(src ?? null);
                onError?.(event);
            }}
            {...props}
        /> : null
    );

    const modal = createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-40 bg-black/80 cursor-pointer"
                        initial={{ opacity: 0, pointerEvents: "none" }}
                        animate={{ opacity: 1, pointerEvents: "auto" }}
                        exit={{ opacity: 0, pointerEvents: "none" }}
                        transition={transition}
                    />
                    <motion.div
                        key="container"
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={transition}
                    >
                        <motion.img
                            ref={imageRef as React.RefObject<HTMLImageElement>}
                            src={renderedSrc}
                            alt={alt}
                            layoutId={props.layoutId || "morph-image"}
                            className={cn(
                                "object-cover object-center max-w-[90vw] max-h-[90vh] pointer-events-auto cursor-zoom-out overflow-hidden",
                            )}
                            onClick={(e) => handleClick(e)}
                            transition={transition}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body,
    );

    return (
        <div className="w-full h-full flex items-center justify-center">
            <picture className="relative block w-full h-full bg-black/5">
                {!isThumbnailLoaded && (
                    <span className="absolute inset-0 z-10 flex items-center justify-center">
                        <span className="size-7 animate-spin rounded-full border border-black/15 border-t-black/70" />
                    </span>
                )}
                {thumbnail}
            </picture>
            {modal}
        </div>
    );
};

export default MorphImage;
