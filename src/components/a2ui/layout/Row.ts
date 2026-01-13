/**
 * A2UI Row 组件
 * 水平布局容器组件
 */

export interface RowProps {
  id: string;
  alignment?: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround';
  children?: any[];
}

export class A2UIRow {
  /**
   * 渲染 Row 组件
   */
  static render(comp: RowProps, surfaceId: string, renderComponent: (child: any, surfaceId: string) => HTMLElement | null): HTMLElement {
    const el = document.createElement('div');
    el.className = `a2ui-row align-${comp.alignment || 'start'}`;
    el.dataset.componentId = comp.id;

    if (comp.children) {
      comp.children.forEach((child: any) => {
        const childEl = renderComponent(child, surfaceId);
        if (childEl) el.appendChild(childEl);
      });
    }

    return el;
  }
}