/**
 * A2UI Component Factory
 * Creates DOM elements from A2UI component definitions
 */

import type { A2UIComponent } from './types';
import { PropertyResolver } from './property-resolver';
import { createTextElement } from './components/text';
import { createImageElement } from './components/image';
import { createButtonElement } from './components/button';
import { createCardElement } from './components/card';
import { createRowElement, createColumnElement, createListElement } from './components/layout';
import { createDividerElement, createIconElement } from './components/other';
import { createVideoElement } from './components/video';
import { createAudioElement } from './components/audio';
import { createTextFieldElement, createCheckBoxElement, createSliderElement, createDateTimeInputElement, createChoicePickerElement } from './components/form';
import { createChartElement } from './components/chart';

export class ComponentFactory {
  private propertyResolver: PropertyResolver;
  private componentElements: Map<string, HTMLElement>;
  private actionHandler: (action: any) => void;

  constructor(
    propertyResolver: PropertyResolver, 
    componentElements: Map<string, HTMLElement>,
    actionHandler: (action: any) => void
  ) {
    this.propertyResolver = propertyResolver;
    this.componentElements = componentElements;
    this.actionHandler = actionHandler;
  }

  /**
   * Create component element from A2UI v0.9 component definition
   */
  createComponent(component: A2UIComponent, surfaceId: string): HTMLElement {
    const { id, component: componentType, weight, ...properties } = component;

    // Create element based on component type (v0.9 format)
    let element: HTMLElement;
    
    switch (componentType) {
      case 'Text':
        element = createTextElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'Image':
        element = createImageElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'Button':
        element = createButtonElement(id, properties, this.componentElements, this.actionHandler, this.propertyResolver, surfaceId);
        break;
      case 'Card':
        element = createCardElement(id, properties);
        break;
      case 'Row':
        element = createRowElement(id, properties);
        break;
      case 'Column':
        element = createColumnElement(id, properties);
        break;
      case 'List':
        element = createListElement(id, properties, surfaceId);
        break;
      case 'Divider':
        element = createDividerElement(id, properties);
        break;
      case 'Icon':
        element = createIconElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'Video':
        element = createVideoElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'AudioPlayer':
        element = createAudioElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'TextField':
        element = createTextFieldElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'CheckBox':
        element = createCheckBoxElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'Slider':
        element = createSliderElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'DateTimeInput':
        element = createDateTimeInputElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'ChoicePicker':
        element = createChoicePickerElement(id, properties, surfaceId, this.propertyResolver);
        break;
      case 'Chart':
        // Chart is async, create placeholder first
        element = document.createElement('div');
        element.className = 'a2ui-chart-loading';
        element.textContent = 'Loading chart...';
        // Async load chart
        createChartElement(id, properties, surfaceId, this.propertyResolver).then(chartElement => {
          element.replaceWith(chartElement);
          this.componentElements.set(id, chartElement);
        }).catch(error => {
          console.error(`❌ Failed to create chart ${id}:`, error);
          element.className = 'a2ui-chart-error';
          element.textContent = `Chart error: ${error}`;
        });
        break;
      default:
        console.warn(`Unknown component type: ${componentType}`);
        element = createTextElement(id, { text: `Unknown component: ${componentType}` }, surfaceId, this.propertyResolver);
    }

    // Apply weight for flex layout (CSS flex-grow)
    if (weight !== undefined) {
      element.style.flexGrow = weight.toString();
    }

    return element;
  }

}
