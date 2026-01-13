/**
 * A2UI Text 组件
 * 基础文本显示组件
 */

export interface TextProps {
  id: string;
  text?: string;
  size?: 'small' | 'medium' | 'large';
  style?: {
    color?: string;
    fontWeight?: string;
  };
}

export class A2UIText {
  /**
   * 渲染 Text 组件
   */
  static render(comp: TextProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const el = document.createElement('p');
    el.className = `a2ui-text text-${comp.size || 'medium'}`;
    el.dataset.componentId = comp.id;

    // 如果 text 以 / 开头，则解析 dataBinding；否则直接使用静态文本
    let text: string;
    if (comp.text && comp.text.startsWith('/')) {
      text = resolveBinding(comp.text, surfaceId) ?? '';
    } else {
      text = comp.text ?? '';
    }
    el.textContent = String(text);

    if (comp.style?.color) {
      el.style.color = comp.style.color;
    }
    if (comp.style?.fontWeight) {
      el.style.fontWeight = comp.style.fontWeight;
    }

    return el;
  }
}