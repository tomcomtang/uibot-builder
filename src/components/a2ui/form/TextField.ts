/**
 * A2UI TextField 组件
 * 文本输入框组件
 */

export interface TextFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  dataBinding?: string;
}

export class A2UITextField {
  /**
   * 渲染 TextField 组件
   */
  static render(
    comp: TextFieldProps, 
    surfaceId: string,
    resolveBinding: (path: string, surfaceId: string) => any,
    setBindingValue: (path: string, value: any, surfaceId: string) => void
  ): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-textfield-container';
    container.dataset.componentId = comp.id;

    if (comp.label) {
      const label = document.createElement('label');
      label.className = 'a2ui-textfield-label';
      label.textContent = comp.label;
      container.appendChild(label);
    }

    const input = comp.multiline ? document.createElement('textarea') : document.createElement('input');
    input.className = 'a2ui-textfield-input';
    input.placeholder = comp.placeholder || '';

    if (comp.dataBinding) {
      const value = resolveBinding(comp.dataBinding, surfaceId);
      input.value = value || '';

      // 双向绑定
      input.addEventListener('input', () => {
        setBindingValue(comp.dataBinding!, input.value, surfaceId);
      });
    }

    container.appendChild(input);
    return container;
  }
}