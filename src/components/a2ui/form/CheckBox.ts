/**
 * A2UI CheckBox 组件
 * 复选框组件
 */

export interface CheckBoxProps {
  id: string;
  label?: string;
  dataBinding?: string;
}

export class A2UICheckBox {
  /**
   * 渲染 CheckBox 组件
   */
  static render(
    comp: CheckBoxProps, 
    surfaceId: string,
    resolveBinding: (path: string, surfaceId: string) => any,
    setBindingValue: (path: string, value: any, surfaceId: string) => void
  ): HTMLElement {
    const container = document.createElement('label');
    container.className = 'a2ui-checkbox-container';
    container.dataset.componentId = comp.id;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'a2ui-checkbox-input';

    if (comp.dataBinding) {
      const checked = resolveBinding(comp.dataBinding, surfaceId);
      input.checked = !!checked;

      // 双向绑定
      input.addEventListener('change', () => {
        setBindingValue(comp.dataBinding!, input.checked, surfaceId);
      });
    }

    const label = document.createElement('span');
    label.className = 'a2ui-checkbox-label';
    label.textContent = comp.label || '';

    container.appendChild(input);
    container.appendChild(label);
    return container;
  }
}