'use client';

import { useEffect, useState } from 'react';

import { Image } from './Image';
import type { ImageRef, ImageSource, UseImageHookOptions } from './Image.types';
import { resolveSource } from './utils/resolveSources';

/**
 * A hook that loads an image from the given source and returns a reference
 * to the native image instance, or `null` until the image is successfully loaded.
 * @platform android
 * @platform ios
 */
export function useImage(
  source: ImageSource | string,
  options: UseImageHookOptions = {}
): ImageRef | null {
  const resolvedSource = resolveSource(source) as ImageSource;
  const [image, setImage] = useState<ImageRef | null>(null);

  useEffect(() => {
    async function loadImage() {
      try {
        const image = await Image.loadAsync(resolvedSource);
        setImage(image);
      } catch (error) {
        if (options.onError) {
          options.onError(error, loadImage);
        } else {
          // Print unhandled errors to the console.
          console.error(
            `Loading an image from '${resolvedSource.uri}' failed, use 'onError' option to handle errors and suppress this message`
          );
          console.error(error);
        }
      }
    }

    loadImage();

    return () => {
      image?.release();
    };
  }, [resolvedSource.uri]);

  return image;
}
