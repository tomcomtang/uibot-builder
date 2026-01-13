/**
 * A2UI Divider 组件
 * 分割线组件
 */

export interface DividerProps {
  id: string;
  direction?: 'horizontal' | 'vertical';
}

export class A2UIDivider {
  /**
   * 渲染 Divider 组件
   */
  static render(comp: DividerProps): HTMLElement {
    const el = document.createElement('hr');
    el.className = `a2ui-divider divider-${comp.direction || 'horizontal'}`;
    return el;
  }
}