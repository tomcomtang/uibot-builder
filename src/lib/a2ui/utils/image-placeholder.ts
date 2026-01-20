/**
 * Image 404 Placeholder SVG Generator
 * Uses the SVG file from public directory for better performance and easy editing
 */

/**
 * Get 404 placeholder image URL
 * Returns the path to the static SVG file in public directory
 */
export function get404PlaceholderURL(_width: number = 512, _height: number = 320): string {
  // Use the static SVG file from public directory
  // This allows easy editing and preview in browser
  return '/image-404-placeholder.svg';
}
