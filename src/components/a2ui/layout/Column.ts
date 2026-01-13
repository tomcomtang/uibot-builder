/**
 * A2UI Column 组件
 * 垂直布局容器组件
 */

export interface ColumnProps {
  id: string;
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  children?: any[];
}

export class A2UIColumn {
  /**
   * 渲染 Column 组件
   */
  static render(comp: ColumnProps, surfaceId: string, renderComponent: (child: any, surfaceId: string) => HTMLElement | null): HTMLElement {
    const el = document.createElement('div');
    el.className = `a2ui-column align-${comp.alignment || 'start'}`;
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