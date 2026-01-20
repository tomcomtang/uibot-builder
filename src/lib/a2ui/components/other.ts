/**
 * Other Components Creator (Divider, Icon, etc.)
 */
import { PropertyResolver } from '../property-resolver';

export function createDividerElement(id: string, properties: any): HTMLElement {
  const element = document.createElement('hr');
  element.className = 'a2ui-divider';
  element.setAttribute('data-component-id', id);

  if (properties.axis === 'vertical') {
    element.classList.add('divider-vertical');
  }

  return element;
}

export function createIconElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const element = document.createElement('div');
  element.className = 'a2ui-icon';
  element.setAttribute('data-component-id', id);

  // Mark data binding for icon name if using DynamicString with path
  if (properties.name && typeof properties.name === 'object' && properties.name.path) {
    element.dataset.bindingIconNamePath = properties.name.path;
  }

  const iconName = propertyResolver.resolveValue(properties.name, surfaceId);
  if (iconName) {
    // Simple icon rendering - you can enhance this with an icon library
    element.textContent = iconName;
    element.setAttribute('data-icon-name', iconName.toString());
  }

  return element;
}
