/**
 * A2UI Video 组件
 * 视频播放器组件
 */

export interface VideoProps {
  id: string;
  src?: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  width?: string;
  height?: string;
  dataBinding?: string;
}

export class A2UIVideo {
  /**
   * 渲染 Video 组件
   */
  static render(comp: VideoProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-video-container';
    container.dataset.componentId = comp.id;

    const video = document.createElement('video');
    video.className = 'a2ui-video';
    video.controls = comp.controls !== false;
    video.autoplay = comp.autoplay || false;
    video.loop = comp.loop || false;
    video.muted = comp.muted || false;

    const src = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.src;
    
    if (src) {
      video.src = src;
    }

    if (comp.poster) {
      video.poster = comp.poster;
    }

    if (comp.width) video.style.width = comp.width;
    if (comp.height) video.style.height = comp.height;

    container.appendChild(video);
    return container;
  }
}