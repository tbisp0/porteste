/**
 * Utility functions for handling asset paths in development and production
 */

/**
 * Get the correct asset path for the current environment
 * Must respect Vite's base path configuration
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Use import.meta.env.BASE_URL which Vite provides automatically
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

/**
 * Get image path specifically
 */
export const getImagePath = (filename: string): string => {
  return getAssetPath(`images/${filename}`);
};

/**
 * Get profile image paths with WebP support
 */
export const getProfileImagePaths = () => {
  return {
    webp: getImagePath('tarcisio_bispo.webp'),
    png: getImagePath('tarcisio_bispo.png')
  };
};

/**
 * Get IxDF logo paths
 */
export const getIxDFLogoPaths = () => {
  return {
    dark: getImagePath('ixdf-symbol-dark.png'),
    white: getImagePath('ixdf-symbol-white.png')
  };
};
