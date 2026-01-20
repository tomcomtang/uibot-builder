/**
 * AudioPlayer Component Creator
 */
import { PropertyResolver } from '../property-resolver';

export function createAudioElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'a2ui-audio-container';
  container.setAttribute('data-component-id', id);

  const element = document.createElement('audio');
  element.className = 'a2ui-audio';
  element.controls = true;

  // Mark data binding for url if using DynamicString with path
  if (properties.url && typeof properties.url === 'object' && properties.url.path) {
    element.dataset.bindingUrlPath = properties.url.path;
  }

  const url = propertyResolver.resolveValue(properties.url, surfaceId);
  if (url) {
    console.log(`🎵 Loading audio for component ${id}:`, url);
    element.src = url;
  } else {
    console.warn(`⚠️ No URL found for audio component ${id}`);
  }

  // Handle description if provided
  if (properties.description) {
    const description = propertyResolver.resolveValue(properties.description, surfaceId);
    if (description) {
      const descElement = document.createElement('div');
      descElement.className = 'a2ui-audio-description';
      descElement.textContent = String(description);
      container.appendChild(descElement);
    }
  }

  container.appendChild(element);

  // Handle audio load error
  element.addEventListener('error', () => {
    console.error(`❌ Audio load failed for component ${id}, URL:`, element.src);
  });

  return container;
}
