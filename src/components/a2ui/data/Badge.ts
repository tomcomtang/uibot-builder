/**
 * A2UI Badge 组件
 * 徽章组件
 */

export interface BadgeProps {
  id: string;
  text?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  color?: string;
  dataBinding?: string;
}

export class A2UIBadge {
  /**
   * 渲染 Badge 组件
   */
  static render(comp: BadgeProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const badge = document.createElement('span');
    badge.className = `a2ui-badge badge-${comp.variant || 'default'}`;
    badge.dataset.componentId = comp.id;

    const text = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.text || '';
    
    badge.textContent = String(text);

    if (comp.color) {
      badge.style.backgroundColor = comp.color;
    }

    return badge;
  }
}