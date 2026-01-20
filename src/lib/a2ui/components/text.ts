/**
 * Text Component Creator
 */
import { PropertyResolver } from '../property-resolver';

export function createTextElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const element = document.createElement('div');
  element.className = 'a2ui-text';
  element.setAttribute('data-component-id', id);

  // Mark data binding if using DynamicString with path
  if (properties.text && typeof properties.text === 'object' && properties.text.path) {
    element.dataset.bindingTextPath = properties.text.path;
  }

  // Handle text property (v0.9 supports direct string or DynamicString with path)
  const text = propertyResolver.resolveValue(properties.text, surfaceId);
  element.textContent = (text ?? '').toString();

  // Handle variant (replaces usageHint in v0.9)
  const mapVariantToClass = (variant: string): string | undefined => {
    switch (variant) {
      case 'h1':
        return 'text-extraLarge';
      case 'h2':
        return 'text-large';
      case 'h3':
        return 'text-h3';
      case 'h4':
        return 'text-h4';
      case 'h5':
        return 'text-h5';
      case 'body':
        return 'text-medium';
      case 'caption':
        return 'text-small';
      default:
        return `text-${variant}`;
    }
  };

  if (properties.variant) {
    const mapped = mapVariantToClass(properties.variant);
    if (mapped) {
      element.classList.add(mapped);
    }
  } else if (properties.usageHint) {
    // Legacy support
    element.classList.add(`text-${properties.usageHint}`);
  }

  // Handle style properties
  if (properties.style) {
    Object.entries(properties.style).forEach(([key, value]) => {
      if (typeof value === 'string') {
        element.style.setProperty(key, value);
      }
    });
  }

  return element;
}
