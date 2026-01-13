/**
 * A2UI Timeline 组件
 * 时间轴组件
 */

export interface TimelineProps {
  id: string;
  items?: any[];
  dataBinding?: string;
}

export class A2UITimeline {
  /**
   * 渲染 Timeline 组件
   */
  static render(comp: TimelineProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-timeline';
    container.dataset.componentId = comp.id;

    const items = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.items || [];

    if (Array.isArray(items)) {
      items.forEach((item: any, index: number) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'a2ui-timeline-item';

        const dot = document.createElement('div');
        dot.className = 'a2ui-timeline-dot';
        if (item.color) {
          dot.style.backgroundColor = item.color;
        }

        const content = document.createElement('div');
        content.className = 'a2ui-timeline-content';

        if (item.time) {
          const time = document.createElement('div');
          time.className = 'a2ui-timeline-time';
          time.textContent = item.time;
          content.appendChild(time);
        }

        if (item.title) {
          const title = document.createElement('div');
          title.className = 'a2ui-timeline-title';
          title.textContent = item.title;
          content.appendChild(title);
        }

        if (item.description) {
          const desc = document.createElement('div');
          desc.className = 'a2ui-timeline-description';
          desc.textContent = item.description;
          content.appendChild(desc);
        }

        itemEl.appendChild(dot);
        itemEl.appendChild(content);
        container.appendChild(itemEl);
      });
    }

    return container;
  }
}