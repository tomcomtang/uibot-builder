/**
 * A2UI Audio 组件
 * 音频播放器组件
 */

export interface AudioProps {
  id: string;
  src?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  dataBinding?: string;
}

export class A2UIAudio {
  /**
   * 渲染 Audio 组件
   */
  static render(comp: AudioProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-audio-container';
    container.dataset.componentId = comp.id;

    const audio = document.createElement('audio');
    audio.className = 'a2ui-audio';
    audio.controls = comp.controls !== false;
    audio.autoplay = comp.autoplay || false;
    audio.loop = comp.loop || false;

    const src = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.src;
    
    if (src) {
      audio.src = src;
    }

    container.appendChild(audio);
    return container;
  }
}