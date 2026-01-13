/**
 * A2UI Statistic 组件
 * 统计数值组件
 */

export interface StatisticProps {
  id: string;
  title?: string;
  value?: number | string;
  prefix?: string;
  suffix?: string;
  description?: string;
  dataBinding?: string;
}

export class A2UIStatistic {
  /**
   * 渲染 Statistic 组件
   */
  static render(comp: StatisticProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-statistic';
    container.dataset.componentId = comp.id;

    if (comp.title) {
      const title = document.createElement('div');
      title.className = 'a2ui-statistic-title';
      title.textContent = comp.title;
      container.appendChild(title);
    }

    const value = document.createElement('div');
    value.className = 'a2ui-statistic-value';
    
    const valueData = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.value || 0;
    
    if (comp.prefix) {
      const prefix = document.createElement('span');
      prefix.className = 'a2ui-statistic-prefix';
      prefix.textContent = comp.prefix;
      value.appendChild(prefix);
    }

    const number = document.createElement('span');
    number.className = 'a2ui-statistic-number';
    number.textContent = String(valueData);
    value.appendChild(number);

    if (comp.suffix) {
      const suffix = document.createElement('span');
      suffix.className = 'a2ui-statistic-suffix';
      suffix.textContent = comp.suffix;
      value.appendChild(suffix);
    }

    container.appendChild(value);

    if (comp.description) {
      const desc = document.createElement('div');
      desc.className = 'a2ui-statistic-description';
      desc.textContent = comp.description;
      container.appendChild(desc);
    }

    return container;
  }
}