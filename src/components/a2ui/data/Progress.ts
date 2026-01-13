/**
 * A2UI Progress 组件
 * 进度条组件
 */

export interface ProgressProps {
  id: string;
  label?: string;
  value?: number;
  color?: string;
  showText?: boolean;
  dataBinding?: string;
}

export class A2UIProgress {
  /**
   * 渲染 Progress 组件
   */
  static render(comp: ProgressProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-progress-container';
    container.dataset.componentId = comp.id;

    if (comp.label) {
      const label = document.createElement('div');
      label.className = 'a2ui-progress-label';
      label.textContent = comp.label;
      container.appendChild(label);
    }

    const track = document.createElement('div');
    track.className = 'a2ui-progress-track';

    const bar = document.createElement('div');
    bar.className = 'a2ui-progress-bar';
    
    const value = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.value || 0;
    
    bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
    
    if (comp.color) {
      bar.style.backgroundColor = comp.color;
    }

    track.appendChild(bar);
    container.appendChild(track);

    if (comp.showText !== false) {
      const text = document.createElement('div');
      text.className = 'a2ui-progress-text';
      text.textContent = `${Math.round(value)}%`;
      container.appendChild(text);
    }

    return container;
  }
}