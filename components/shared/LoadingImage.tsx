"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import useImageAsset from "@/hooks/useImageAsset";
import { cn } from "@/lib/utils";

type LoadingImageProps = ImageProps & {
  wrapperClassName?: string;
};

/**
 * Image component with a built-in loading spinner.
 *
 * Purpose:
 * - Show a spinner inside the image area until the image is ready.
 * - Reuse the shared local-image loader for images like `/image-4.png`.
 * - Keep using `next/image` for other image sources.
 */
const LoadingImage = ({
  className,
  wrapperClassName,
  alt,
  onLoad,
  onError,
  src,
  ...props
}: LoadingImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<ImageProps["src"] | null>(null);
  const asset = useImageAsset(src, props.fetchPriority);
  const isLoaded = asset.shouldUseAssetStore
    ? asset.isLoaded
    : loadedSrc === src;
  const renderedSrc = asset.src ?? src;
  const nativeImageClassName = cn(
    props.fill && "absolute inset-0 h-full w-full",
    "transition-opacity duration-500 ease-out",
    isLoaded ? "opacity-100" : "opacity-0",
    className,
  );

  return (
    <span
      className={cn(
        "relative block overflow-hidden bg-black/5",
        props.fill && "h-full w-full",
        wrapperClassName,
      )}
    >
      {!isLoaded && (
        <span className="absolute inset-0 z-10 flex items-center justify-center">
          <span className="size-7 animate-spin rounded-full border border-black/15 border-t-black/70" />
        </span>
      )}

      {asset.shouldUseAssetStore ? (
        asset.src ? (
          /**
           * This native img is intentional.
           *
           * For local public images, we already downloaded the file in the
           * shared loader. Rendering the temporary browser URL directly avoids
           * asking Next.js to make another image request.
           */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={renderedSrc as string}
            alt={alt}
            width={typeof props.width === "number" ? props.width : undefined}
            height={typeof props.height === "number" ? props.height : undefined}
            sizes={props.sizes}
            className={nativeImageClassName}
            onLoad={(event) => {
              setLoadedSrc(src);
              onLoad?.(event as unknown as React.SyntheticEvent<HTMLImageElement>);
            }}
            onError={(event) => {
              setLoadedSrc(src);
              onError?.(
                event as unknown as React.SyntheticEvent<HTMLImageElement>,
              );
            }}
          />
        ) : null
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-500 ease-out",
            isLoaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={(event) => {
            setLoadedSrc(src);
            onLoad?.(event);
          }}
          onError={(event) => {
            setLoadedSrc(src);
            onError?.(event);
          }}
        />
      )}
    </span>
  );
};

export default LoadingImage;
