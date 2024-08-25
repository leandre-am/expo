import type { ImageRef, ImageSource, UseImageHookOptions } from './Image.types';
/**
 * A hook that loads an image from the given source and returns a reference
 * to the native image instance, or `null` until the image is successfully loaded.
 * @platform android
 * @platform ios
 */
export declare function useImage(source: ImageSource | string, options?: UseImageHookOptions): ImageRef | null;
//# sourceMappingURL=useImage.d.ts.map