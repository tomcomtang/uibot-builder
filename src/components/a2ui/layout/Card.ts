/**
 * A2UI Card 组件
 * 卡片容器组件
 */

export interface CardProps {
  id: string;
  elevation?: number;
  children?: any[];
}

export class A2UICard {
  /**
   * 渲染 Card 组件
   */
  static render(comp: CardProps, surfaceId: string, renderComponent: (child: any, surfaceId: string) => HTMLElement | null): HTMLElement {
    const el = document.createElement('div');
    el.className = `a2ui-card elevation-${comp.elevation || 1}`;
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