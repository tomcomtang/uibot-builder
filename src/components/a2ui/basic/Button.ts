/**
 * A2UI Button 组件
 * 基础按钮组件
 */

export interface ButtonProps {
  id: string;
  text: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  action?: any;
}

export class A2UIButton {
  /**
   * 渲染 Button 组件
   */
  static render(comp: ButtonProps, surfaceId: string, handleAction: (action: any, surfaceId: string) => void): HTMLElement {
    const el = document.createElement('button');
    el.className = `a2ui-button button-${comp.variant || 'primary'}`;
    el.textContent = comp.text;
    el.dataset.componentId = comp.id;

    if (comp.action) {
      el.addEventListener('click', () => {
        handleAction(comp.action, surfaceId);
      });
    }

    return el;
  }
}