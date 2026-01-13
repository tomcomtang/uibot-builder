/**
 * A2UI Image 组件
 * 基础图片显示组件
 */

export interface ImageProps {
  id: string;
  url?: string;
  alt?: string;
  width?: string;
  height?: string;
  dataBinding?: string;
}

export class A2UIImage {
  /**
   * 渲染 Image 组件
   */
  static render(comp: ImageProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const el = document.createElement('img');
    el.className = 'a2ui-image';
    
    // 支持 dataBinding，优先使用 dataBinding 解析的值
    const url = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.url;
    el.src = url || '';
    el.alt = comp.alt || '';
    
    if (comp.width) el.style.width = comp.width;
    if (comp.height) el.style.height = comp.height;

    return el;
  }
}