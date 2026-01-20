/**
 * Card Component Creator
 */

export function createCardElement(id: string, _properties: any): HTMLElement {
  const element = document.createElement('div');
  element.className = 'a2ui-card';
  element.setAttribute('data-component-id', id);

  // Note: Children will be handled by MessageHandlers

  return element;
}
