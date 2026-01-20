/**
 * Layout Components Creator (Row, Column, List)
 */

export function createRowElement(id: string, properties: any): HTMLElement {
  const element = document.createElement('div');
  element.className = 'a2ui-row';
  element.setAttribute('data-component-id', id);

  // UI v0.9 Row 使用 justify / align
  if (properties.justify) {
    const justify = properties.justify as string;
    const justifyClassMap: Record<string, string> = {
      start: 'align-start',
      center: 'align-center',
      end: 'align-end',
      spaceBetween: 'align-spaceBetween',
      spaceAround: 'align-spaceAround',
      spaceEvenly: 'align-spaceAround',
      stretch: 'align-start',
    };
    const cls = justifyClassMap[justify];
    if (cls) {
      element.classList.add(cls);
    }
  }

  if (properties.align) {
    const align = properties.align as string;
    const alignClassMap: Record<string, string> = {
      start: 'align-start',
      center: 'align-center',
      end: 'align-end',
      stretch: 'align-start',
    };
    const cls = alignClassMap[align];
    if (cls) {
      element.classList.add(cls);
    }
  }

  // 保留自定义 alignment 字段的向后兼容
  if (properties.alignment) {
    element.classList.add(`align-${properties.alignment}`);
  }

  return element;
}

export function createColumnElement(id: string, properties: any): HTMLElement {
  const element = document.createElement('div');
  element.className = 'a2ui-column';
  element.setAttribute('data-component-id', id);

  // UI v0.9 Column 同样使用 justify / align
  if (properties.justify) {
    const justify = properties.justify as string;
    const justifyClassMap: Record<string, string> = {
      start: 'align-start',
      center: 'align-center',
      end: 'align-end',
      spaceBetween: 'align-spaceBetween',
      spaceAround: 'align-spaceAround',
      spaceEvenly: 'align-spaceAround',
      stretch: 'align-start',
    };
    const cls = justifyClassMap[justify];
    if (cls) {
      element.classList.add(cls);
    }
  }

  if (properties.align) {
    const align = properties.align as string;
    const alignClassMap: Record<string, string> = {
      start: 'align-start',
      center: 'align-center',
      end: 'align-end',
      stretch: 'align-start',
    };
    const cls = alignClassMap[align];
    if (cls) {
      element.classList.add(cls);
    }
  }

  // 保留旧的 alignment 字段
  if (properties.alignment) {
    element.classList.add(`align-${properties.alignment}`);
  }

  return element;
}

export function createListElement(id: string, properties: any, _surfaceId: string): HTMLElement {
  const element = document.createElement('div');
  element.className = 'a2ui-list';
  element.setAttribute('data-component-id', id);

  if (properties.direction) {
    element.classList.add(`list-${properties.direction}`);
  }

  // 标记模板式 children（UI v0.9 ChildList 对象形式）
  if (properties.children && !Array.isArray(properties.children)) {
    const config = properties.children;
    if (config.componentId && config.path) {
      element.dataset.bindingListPath = config.path;
      element.dataset.templateComponentId = config.componentId;
    }
  }

  return element;
}
