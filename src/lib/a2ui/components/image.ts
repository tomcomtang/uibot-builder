/**
 * Image Component Creator
 */
import { PropertyResolver } from '../property-resolver';
import { get404PlaceholderURL } from '../utils/image-placeholder';

export function createImageElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const element = document.createElement('img');
  element.className = 'a2ui-image';
  element.setAttribute('data-component-id', id);

  // Mark data binding for url if using DynamicString with path
  if (properties.url && typeof properties.url === 'object' && properties.url.path) {
    element.dataset.bindingUrlPath = properties.url.path;
  }

  const url = propertyResolver.resolveValue(properties.url, surfaceId);
  if (url) {
    console.log(`🖼️ Loading image for component ${id}:`, url);
    element.src = url;
  } else {
    console.warn(`⚠️ No URL found for image component ${id}`);
  }

  if (properties.usageHint) {
    element.classList.add(`image-${properties.usageHint}`);
  }

  if (properties.fit) {
    element.style.objectFit = properties.fit;
  }

  // Handle image load error - show 404 placeholder SVG
  element.addEventListener('error', () => {
    console.error(`❌ Image load failed for component ${id}, URL:`, element.src);
    const placeholderUrl = get404PlaceholderURL(512, 320);
    element.src = placeholderUrl;
    element.alt = 'Image not found (404)';

    // Set explicit dimensions to ensure placeholder displays correctly
    if (!element.style.width && !element.style.height) {
      element.style.width = '512px';
      element.style.height = '320px';
      element.style.objectFit = 'contain';
    }
  });

  return element;
}
