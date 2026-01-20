/**
 * Form Components Creator (TextField, CheckBox, Slider, DateTimeInput, ChoicePicker)
 */
import { PropertyResolver } from '../property-resolver';

export function createTextFieldElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'a2ui-textfield-container';
  container.setAttribute('data-component-id', id);

  // Label
  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.className = 'a2ui-textfield-label';
    labelElement.textContent = String(label);
    container.appendChild(labelElement);
  }

  // Input
  const input = document.createElement(properties.variant === 'longText' ? 'textarea' : 'input');
  input.className = 'a2ui-textfield-input';
  
  // Mark data binding for value if using DynamicString with path
  if (properties.value && typeof properties.value === 'object' && properties.value.path) {
    input.dataset.bindingValuePath = properties.value.path;
  }

  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (value !== null && value !== undefined) {
    if (input instanceof HTMLInputElement) {
      input.value = String(value);
    } else if (input instanceof HTMLTextAreaElement) {
      input.value = String(value);
    }
  }

  // Set input type based on variant
  if (input instanceof HTMLInputElement) {
    if (properties.variant === 'number') {
      input.type = 'number';
    } else if (properties.variant === 'obscured') {
      input.type = 'password';
    } else {
      input.type = 'text';
    }
  }

  // Handle input change
  input.addEventListener('input', () => {
    // TODO: Update data model if value is bound
    console.log(`TextField ${id} value changed:`, input.value);
  });

  container.appendChild(input);
  return container;
}

export function createCheckBoxElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'a2ui-checkbox-container';
  container.setAttribute('data-component-id', id);

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'a2ui-checkbox-input';

  // Mark data binding for value if using DynamicBoolean with path
  if (properties.value && typeof properties.value === 'object' && properties.value.path) {
    input.dataset.bindingValuePath = properties.value.path;
  }

  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (typeof value === 'boolean') {
    input.checked = value;
  }

  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement('label');
    labelElement.className = 'a2ui-checkbox-label';
    labelElement.textContent = String(label);
    labelElement.appendChild(input);
    container.appendChild(labelElement);
  } else {
    container.appendChild(input);
  }

  // Handle change
  input.addEventListener('change', () => {
    // TODO: Update data model if value is bound
    console.log(`CheckBox ${id} value changed:`, input.checked);
  });

  return container;
}

export function createSliderElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'a2ui-slider-container';
  container.setAttribute('data-component-id', id);

  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement('div');
    labelElement.className = 'a2ui-slider-label';
    labelElement.textContent = String(label);
    container.appendChild(labelElement);
  }

  const sliderWrapper = document.createElement('div');
  sliderWrapper.style.display = 'flex';
  sliderWrapper.style.alignItems = 'center';
  sliderWrapper.style.gap = '14px';
  sliderWrapper.style.width = '100%';

  const input = document.createElement('input');
  input.type = 'range';
  input.className = 'a2ui-slider-input';
  input.min = String(properties.min ?? 0);
  input.max = String(properties.max ?? 100);

  // Mark data binding for value if using DynamicNumber with path
  if (properties.value && typeof properties.value === 'object' && properties.value.path) {
    input.dataset.bindingValuePath = properties.value.path;
  }

  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  if (value !== null && value !== undefined) {
    input.value = String(value);
  }

  const valueDisplay = document.createElement('span');
  valueDisplay.className = 'a2ui-slider-value';
  valueDisplay.textContent = input.value;

  // Update value display on input
  input.addEventListener('input', () => {
    valueDisplay.textContent = input.value;
    // TODO: Update data model if value is bound
    console.log(`Slider ${id} value changed:`, input.value);
  });

  sliderWrapper.appendChild(input);
  sliderWrapper.appendChild(valueDisplay);
  container.appendChild(sliderWrapper);

  return container;
}

export function createDateTimeInputElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'a2ui-datetime-container';
  container.setAttribute('data-component-id', id);

  const enableDate = properties.enableDate !== false;
  const enableTime = properties.enableTime !== false;

  // Mark data binding for value if using DynamicString with path
  if (properties.value && typeof properties.value === 'object' && properties.value.path) {
    container.dataset.bindingValuePath = properties.value.path;
  }

  const value = propertyResolver.resolveValue(properties.value, surfaceId);
  
  if (enableDate && enableTime) {
    const input = document.createElement('input');
    input.type = 'datetime-local';
    input.className = 'a2ui-datetime-input';
    if (value) {
      input.value = String(value);
    }
    container.appendChild(input);
  } else if (enableDate) {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = 'a2ui-datetime-input';
    if (value) {
      input.value = String(value);
    }
    container.appendChild(input);
  } else if (enableTime) {
    const input = document.createElement('input');
    input.type = 'time';
    input.className = 'a2ui-datetime-input';
    if (value) {
      input.value = String(value);
    }
    container.appendChild(input);
  }

  // Handle change
  const input = container.querySelector('input');
  if (input) {
    input.addEventListener('change', () => {
      // TODO: Update data model if value is bound
      console.log(`DateTimeInput ${id} value changed:`, input.value);
    });
  }

  return container;
}

export function createChoicePickerElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): HTMLElement {
  const container = document.createElement('div');
  container.className = 'a2ui-choicepicker-container';
  container.setAttribute('data-component-id', id);

  const label = propertyResolver.resolveValue(properties.label, surfaceId);
  if (label) {
    const labelElement = document.createElement('div');
    labelElement.className = 'a2ui-choicepicker-label';
    labelElement.textContent = String(label);
    container.appendChild(labelElement);
  }

  const variant = properties.variant || 'mutuallyExclusive';
  const isMultiple = variant === 'multipleSelection';

  // Mark data binding for value if using DynamicStringList with path
  if (properties.value && typeof properties.value === 'object' && properties.value.path) {
    container.dataset.bindingValuePath = properties.value.path;
  }

  const selectedValues = propertyResolver.resolveValue(properties.value, surfaceId);
  const selectedSet = new Set(Array.isArray(selectedValues) ? selectedValues : []);

  const options = properties.options || [];
  options.forEach((option: any) => {
    const optionLabel = propertyResolver.resolveValue(option.label, surfaceId);
    const optionValue = option.value;

    const optionContainer = document.createElement('div');
    optionContainer.className = 'a2ui-choicepicker-option';

    const input = document.createElement('input');
    input.type = isMultiple ? 'checkbox' : 'radio';
    if (!isMultiple) {
      input.name = `choicepicker-${id}`;
    }
    input.value = optionValue;
    input.checked = selectedSet.has(optionValue);

    const labelElement = document.createElement('label');
    labelElement.className = 'a2ui-choicepicker-option-label';
    labelElement.textContent = String(optionLabel || optionValue);
    labelElement.appendChild(input);

    optionContainer.appendChild(labelElement);
    container.appendChild(optionContainer);

    // Handle change
    input.addEventListener('change', () => {
      // TODO: Update data model if value is bound
      console.log(`ChoicePicker ${id} value changed:`, optionValue, input.checked);
    });
  });

  return container;
}
