/**
 * Button Component Creator
 */

import { PropertyResolver } from '../property-resolver';

export function createButtonElement(
  id: string,
  properties: any,
  componentElements: Map<string, HTMLElement>,
  handleAction: (action: any) => void,
  propertyResolver?: PropertyResolver,
  surfaceId?: string
): HTMLElement {
  const element = document.createElement('button');
  element.className = 'a2ui-button';
  element.setAttribute('data-component-id', id);

  if (properties.primary) {
    element.classList.add('button-primary');
  }

  // Store children IDs for later attachment (children may not exist yet when button is created)
  // Support both 'children' array and 'child' single ID for backward compatibility
  const childrenIds: string[] = [];
  if (properties.children && Array.isArray(properties.children)) {
    childrenIds.push(...properties.children);
  } else if (properties.child) {
    childrenIds.push(properties.child);
  }
  
  // Store children IDs in dataset for later processing
  if (childrenIds.length > 0) {
    element.dataset.buttonChildren = JSON.stringify(childrenIds);
  }

  // Try to attach children immediately if they exist
  childrenIds.forEach((childId: string) => {
    const childElement = componentElements.get(childId);
    if (childElement) {
      element.appendChild(childElement);
    }
  });

  // Handle action
  if (properties.action) {
    element.addEventListener('click', () => {
      // Merge item data from List binding into action context if available
      const listItemDataStr = element.dataset.listItemData;
      let finalAction = { ...properties.action };
      
      if (listItemDataStr) {
        try {
          const listItemData = JSON.parse(listItemDataStr);
          console.log('📦 Found List item data for button:', listItemData);
          
          // Merge item data into action context
          // If context already exists, merge item data into it
          // Otherwise, use item data as context
          if (finalAction.context) {
            finalAction.context = {
              ...listItemData,
              ...finalAction.context, // Action context takes precedence
            };
          } else {
            finalAction.context = listItemData;
          }
          
          console.log('🔘 Final action with merged context:', finalAction);
        } catch (error) {
          console.error('❌ Failed to parse list item data:', error);
        }
      }
      
      // Build A2UI v0.9 standard action format (client_to_server.json)
      // Find surfaceId from the element's closest surface ancestor
      const surfaceElement = element.closest('[data-surface-id]');
      const resolvedSurfaceId = surfaceId || surfaceElement?.getAttribute('data-surface-id') || 'main';
      const sourceComponentId = id;
      const timestamp = new Date().toISOString();
      
      // Resolve action context - convert all path references to actual values
      // According to A2UI v0.9 spec, context values are DynamicValue:
      // - string, number, boolean (direct literals)
      // - {path: string} (data binding)
      // - FunctionCall (not supported yet)
      const resolvedContext: any = {};
      if (finalAction.context) {
        for (const [key, value] of Object.entries(finalAction.context)) {
          // If value is an object with path property, resolve it from data model
          if (value && typeof value === 'object' && !Array.isArray(value) && 'path' in value && propertyResolver && resolvedSurfaceId) {
            // Resolve path binding: {path: "/some/path"} -> actual value from data model
            resolvedContext[key] = propertyResolver.resolveValue(value, resolvedSurfaceId);
            console.log(`🔗 Resolved context[${key}] from path ${(value as any).path}:`, resolvedContext[key]);
          } else {
            // Direct literal value (string, number, boolean) or already resolved value
            resolvedContext[key] = value;
          }
        }
      }
      
      // Create A2UI standard action message (client_to_server.json format)
      const a2uiActionMessage = {
        action: {
          name: finalAction.name,
          surfaceId: resolvedSurfaceId,
          sourceComponentId: sourceComponentId,
          timestamp: timestamp,
          context: resolvedContext
        }
      };
      
      console.log('📤 A2UI standard action message:', JSON.stringify(a2uiActionMessage, null, 2));
      
      // Pass the standard A2UI action message to handler
      handleAction(a2uiActionMessage);
    });
  }

  return element;
}

/**
 * Attach children to button after all components are created
 * This is called from message-handlers after the component tree is built
 */
export function attachButtonChildren(
  buttonElement: HTMLElement,
  componentElements: Map<string, HTMLElement>
): void {
  const childrenIdsStr = buttonElement.dataset.buttonChildren;
  if (!childrenIdsStr) return;

  try {
    const childrenIds: string[] = JSON.parse(childrenIdsStr);
    childrenIds.forEach((childId: string) => {
      const childElement = componentElements.get(childId);
      if (childElement && !buttonElement.contains(childElement)) {
        // Only append if not already attached
        buttonElement.appendChild(childElement);
        console.log(`🔗 Attached ${childId} to button ${buttonElement.getAttribute('data-component-id')}`);
      }
    });
  } catch (error) {
    console.error('Failed to parse button children IDs:', error);
  }
}
