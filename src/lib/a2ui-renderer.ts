/**
 * A2UI Renderer - 基于 A2UI v0.9 协议的渲染引擎
 * 支持声明式 UI 渲染和数据绑定
 */

import { 
  A2UIText, A2UIImage, A2UIButton, A2UIDivider,
  A2UIRow, A2UIColumn, A2UIList, A2UICard,
  A2UITextField, A2UICheckBox,
  A2UIChart, A2UIProgress, A2UIBadge, A2UIStatistic,
  A2UIVideo, A2UIAudio, A2UIGallery,
  A2UICalendar, A2UITimeline, A2UITree, A2UICarousel
} from '../components/a2ui/index';

interface A2UIMessage {
  type: 'createSurface' | 'updateComponents' | 'updateDataModel' | 'deleteSurface';
  surfaceId?: string;
  components?: any[];
  dataModel?: Record<string, any>;
}

export class A2UIRenderer {
  private container: HTMLElement;
  private surfaces: Map<string, HTMLElement> = new Map();
  private dataModels: Map<string, any> = new Map();
  private componentElements: Map<string, HTMLElement> = new Map();

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * 处理 A2UI 消息
   */
  processMessage(message: A2UIMessage) {
    switch (message.type) {
      case 'createSurface':
        this.createSurface(message.surfaceId!, message.components!, message.dataModel);
        break;
      case 'updateComponents':
        this.updateComponents(message.surfaceId!, message.components!);
        break;
      case 'updateDataModel':
        this.updateDataModel(message.surfaceId!, message.dataModel!);
        break;
      case 'deleteSurface':
        this.deleteSurface(message.surfaceId!);
        break;
    }
  }

  /**
   * 创建 Surface
   */
  private createSurface(surfaceId: string, components: any[], dataModel?: any) {
    const surfaceEl = document.createElement('div');
    surfaceEl.className = 'a2ui-surface';
    surfaceEl.dataset.surfaceId = surfaceId;

    // 存储数据模型
    if (dataModel) {
      this.dataModels.set(surfaceId, dataModel);
    }

    // 渲染组件
    components.forEach(comp => {
      const compEl = this.renderComponent(comp, surfaceId);
      if (compEl) {
        surfaceEl.appendChild(compEl);
      }
    });

    this.surfaces.set(surfaceId, surfaceEl);
    this.container.appendChild(surfaceEl);
  }

  /**
   * 更新组件
   */
  private updateComponents(surfaceId: string, components: any[]) {
    const surface = this.surfaces.get(surfaceId);
    if (!surface) return;

    // 清空并重新渲染
    surface.innerHTML = '';
    components.forEach(comp => {
      const compEl = this.renderComponent(comp, surfaceId);
      if (compEl) {
        surface.appendChild(compEl);
      }
    });
  }

  /**
   * 更新数据模型
   */
  private updateDataModel(surfaceId: string, dataModel: any) {
    const existingModel = this.dataModels.get(surfaceId) || {};
    this.dataModels.set(surfaceId, { ...existingModel, ...dataModel });

    // 重新渲染所有绑定了数据的组件
    const surface = this.surfaces.get(surfaceId);
    if (surface) {
      this.updateBoundComponents(surface, surfaceId);
    }
  }

  /**
   * 删除 Surface
   */
  private deleteSurface(surfaceId: string) {
    const surface = this.surfaces.get(surfaceId);
    if (surface) {
      surface.remove();
      this.surfaces.delete(surfaceId);
      this.dataModels.delete(surfaceId);
    }
  }

  /**
   * 渲染单个组件
   */
  private renderComponent(comp: any, surfaceId: string): HTMLElement | null {
    const { type, id } = comp;

    switch (type) {
      case 'Text':
        return A2UIText.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Image':
        return A2UIImage.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Divider':
        return A2UIDivider.render(comp);
      case 'Row':
        return A2UIRow.render(comp, surfaceId, this.renderComponent.bind(this));
      case 'Column':
        return A2UIColumn.render(comp, surfaceId, this.renderComponent.bind(this));
      case 'List':
        return A2UIList.render(comp, surfaceId, this.resolveBinding.bind(this), this.renderComponent.bind(this), this.dataModels);
      case 'Card':
        return A2UICard.render(comp, surfaceId, this.renderComponent.bind(this));
      case 'Button':
        return A2UIButton.render(comp, surfaceId, this.handleAction.bind(this));
      case 'TextField':
        return A2UITextField.render(comp, surfaceId, this.resolveBinding.bind(this), this.setBindingValue.bind(this));
      case 'CheckBox':
        return A2UICheckBox.render(comp, surfaceId, this.resolveBinding.bind(this), this.setBindingValue.bind(this));
      case 'Slider':
        return this.renderSlider(comp, surfaceId);
      case 'Table':
        return this.renderTable(comp, surfaceId);
      case 'Chart':
        return A2UIChart.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Progress':
        return A2UIProgress.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Badge':
        return A2UIBadge.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Statistic':
        return A2UIStatistic.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Video':
        return A2UIVideo.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Audio':
        return A2UIAudio.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Gallery':
        return A2UIGallery.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Calendar':
        return A2UICalendar.render(comp, surfaceId, this.resolveBinding.bind(this), this.setBindingValue.bind(this));
      case 'Timeline':
        return A2UITimeline.render(comp, surfaceId, this.resolveBinding.bind(this));
      case 'Tree':
        return A2UITree.render(comp, surfaceId, this.resolveBinding.bind(this), this.setBindingValue.bind(this));
      case 'Carousel':
        return A2UICarousel.render(comp, surfaceId, this.resolveBinding.bind(this));
      default:
        console.warn(`Unknown component type: ${type}`);
        return null;
    }
  }

  /**
   * 渲染 Text 组件
   */
  private renderText(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('p');
    el.className = `a2ui-text text-${comp.size || 'medium'}`;
    el.dataset.componentId = comp.id;

    // 如果 text 以 / 开头，则解析 dataBinding；否则直接使用静态文本
    let text: string;
    if (comp.text && comp.text.startsWith('/')) {
      text = this.resolveBinding(comp.text, surfaceId) ?? '';
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

  /**
   * 渲染 Image 组件
   */
  private renderImage(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('img');
    el.className = 'a2ui-image';
    
    // 支持 dataBinding，优先使用 dataBinding 解析的值
    const url = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
      : comp.url;
    el.src = url || '';
    el.alt = comp.alt || '';
    
    if (comp.width) el.style.width = comp.width;
    if (comp.height) el.style.height = comp.height;

    return el;
  }

  /**
   * 渲染 Divider 组件
   */
  private renderDivider(comp: any): HTMLElement {
    const el = document.createElement('hr');
    el.className = `a2ui-divider divider-${comp.direction || 'horizontal'}`;
    return el;
  }

  /**
   * 渲染 Row 组件
   */
  private renderRow(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('div');
    el.className = `a2ui-row align-${comp.alignment || 'start'}`;
    el.dataset.componentId = comp.id;

    if (comp.children) {
      comp.children.forEach((child: any) => {
        const childEl = this.renderComponent(child, surfaceId);
        if (childEl) el.appendChild(childEl);
      });
    }

    return el;
  }

  /**
   * 渲染 Column 组件
   */
  private renderColumn(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('div');
    el.className = `a2ui-column align-${comp.alignment || 'start'}`;
    el.dataset.componentId = comp.id;

    if (comp.children) {
      comp.children.forEach((child: any) => {
        const childEl = this.renderComponent(child, surfaceId);
        if (childEl) el.appendChild(childEl);
      });
    }

    return el;
  }

  /**
   * 渲染 List 组件
   */
  private renderList(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('div');
    el.className = 'a2ui-list';
    el.dataset.componentId = comp.id;

    const items = this.resolveBinding(comp.dataBinding, surfaceId);
    
    if (Array.isArray(items) && comp.itemTemplate) {
      items.forEach((item: any, index: number) => {
        // 创建临时数据模型
        const tempModel = { ...this.dataModels.get(surfaceId), item, index };
        const tempSurfaceId = `${surfaceId}_item_${index}`;
        this.dataModels.set(tempSurfaceId, tempModel);

        const itemEl = this.renderComponent(comp.itemTemplate, tempSurfaceId);
        if (itemEl) el.appendChild(itemEl);
      });
    }

    return el;
  }

  /**
   * 渲染 Card 组件
   */
  private renderCard(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('div');
    el.className = `a2ui-card elevation-${comp.elevation || 1}`;
    el.dataset.componentId = comp.id;

    if (comp.children) {
      comp.children.forEach((child: any) => {
        const childEl = this.renderComponent(child, surfaceId);
        if (childEl) el.appendChild(childEl);
      });
    }

    return el;
  }

  /**
   * 渲染 Button 组件
   */
  private renderButton(comp: any, surfaceId: string): HTMLElement {
    const el = document.createElement('button');
    el.className = `a2ui-button button-${comp.variant || 'primary'}`;
    el.textContent = comp.text;
    el.dataset.componentId = comp.id;

    if (comp.action) {
      el.addEventListener('click', () => {
        this.handleAction(comp.action, surfaceId);
      });
    }

    return el;
  }

  /**
   * 渲染 TextField 组件
   */
  private renderTextField(comp: any, surfaceId: string): HTMLElement {
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
      const value = this.resolveBinding(comp.dataBinding, surfaceId);
      input.value = value || '';

      // 双向绑定
      input.addEventListener('input', () => {
        this.setBindingValue(comp.dataBinding, input.value, surfaceId);
      });
    }

    container.appendChild(input);
    return container;
  }

  /**
   * 渲染 CheckBox 组件
   */
  private renderCheckBox(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('label');
    container.className = 'a2ui-checkbox-container';
    container.dataset.componentId = comp.id;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'a2ui-checkbox-input';

    if (comp.dataBinding) {
      const checked = this.resolveBinding(comp.dataBinding, surfaceId);
      input.checked = !!checked;

      // 双向绑定
      input.addEventListener('change', () => {
        this.setBindingValue(comp.dataBinding, input.checked, surfaceId);
      });
    }

    const label = document.createElement('span');
    label.className = 'a2ui-checkbox-label';
    label.textContent = comp.label || '';

    container.appendChild(input);
    container.appendChild(label);
    return container;
  }

  /**
   * 渲染 Slider 组件
   */
  private renderSlider(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-slider-container';
    container.dataset.componentId = comp.id;

    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'a2ui-slider-input';
    input.min = String(comp.min || 0);
    input.max = String(comp.max || 100);
    input.step = String(comp.step || 1);

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'a2ui-slider-value';

    if (comp.dataBinding) {
      const value = this.resolveBinding(comp.dataBinding, surfaceId);
      input.value = String(value || comp.min || 0);
      valueDisplay.textContent = input.value;

      // 双向绑定
      input.addEventListener('input', () => {
        const numValue = parseFloat(input.value);
        this.setBindingValue(comp.dataBinding, numValue, surfaceId);
        valueDisplay.textContent = input.value;
      });
    }

    container.appendChild(input);
    container.appendChild(valueDisplay);
    return container;
  }





  /**
   * 渲染 Table 组件
   */
  private renderTable(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-table-container';
    container.dataset.componentId = comp.id;

    const table = document.createElement('table');
    table.className = 'a2ui-table';

    // 表头
    if (comp.columns) {
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      
      comp.columns.forEach((col: any) => {
        const th = document.createElement('th');
        th.className = 'a2ui-table-header';
        th.textContent = col.title || col.key;
        if (col.width) th.style.width = col.width;
        headerRow.appendChild(th);
      });
      
      thead.appendChild(headerRow);
      table.appendChild(thead);
    }

    // 表体
    if (comp.dataSource || comp.dataBinding) {
      const tbody = document.createElement('tbody');
      
      const data = comp.dataBinding 
        ? this.resolveBinding(comp.dataBinding, surfaceId) 
        : comp.dataSource;
      
      if (Array.isArray(data)) {
        data.forEach((row: any, index: number) => {
          const tr = document.createElement('tr');
          tr.className = 'a2ui-table-row';
          
          comp.columns.forEach((col: any) => {
            const td = document.createElement('td');
            td.className = 'a2ui-table-cell';
            
            if (col.render) {
              // 自定义渲染
              td.innerHTML = col.render(row[col.key], row, index);
            } else {
              td.textContent = row[col.key] || '';
            }
            
            tr.appendChild(td);
          });
          
          tbody.appendChild(tr);
        });
      }
      
      table.appendChild(tbody);
    }

    container.appendChild(table);
    return container;
  }

  /**
   * 渲染 Chart 组件
   */
  private renderChart(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-chart-container';
    container.dataset.componentId = comp.id;

    const canvas = document.createElement('canvas');
    canvas.className = 'a2ui-chart';
    canvas.width = comp.width || 400;
    canvas.height = comp.height || 300;

    // 简化的图表渲染（使用 Canvas 2D）
    const ctx = canvas.getContext('2d');
    if (ctx && comp.data) {
      this.drawChart(ctx, comp);
    }

    container.appendChild(canvas);
    return container;
  }

  /**
   * 渲染 Progress 组件
   */
  private renderProgress(comp: any, surfaceId: string): HTMLElement {
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
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
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

  /**
   * 渲染 Badge 组件
   */
  private renderBadge(comp: any, surfaceId: string): HTMLElement {
    const badge = document.createElement('span');
    badge.className = `a2ui-badge badge-${comp.variant || 'default'}`;
    badge.dataset.componentId = comp.id;

    const text = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
      : comp.text || '';
    
    badge.textContent = String(text);

    if (comp.color) {
      badge.style.backgroundColor = comp.color;
    }

    return badge;
  }

  /**
   * 渲染 Statistic 组件
   */
  private renderStatistic(comp: any, surfaceId: string): HTMLElement {
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
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
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

  /**
   * 渲染 Video 组件
   */
  private renderVideo(comp: any, surfaceId: string): HTMLElement {
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
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
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

  /**
   * 渲染 Audio 组件
   */
  private renderAudio(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-audio-container';
    container.dataset.componentId = comp.id;

    const audio = document.createElement('audio');
    audio.className = 'a2ui-audio';
    audio.controls = comp.controls !== false;
    audio.autoplay = comp.autoplay || false;
    audio.loop = comp.loop || false;

    const src = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
      : comp.src;
    
    if (src) {
      audio.src = src;
    }

    container.appendChild(audio);
    return container;
  }

  /**
   * 渲染 Gallery 组件
   */
  private renderGallery(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-gallery';
    container.dataset.componentId = comp.id;

    const images = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
      : comp.images || [];

    if (Array.isArray(images)) {
      images.forEach((imgData: any, index: number) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'a2ui-gallery-item';

        const img = document.createElement('img');
        img.className = 'a2ui-gallery-image';
        img.src = typeof imgData === 'string' ? imgData : imgData.url;
        img.alt = typeof imgData === 'object' ? imgData.alt || '' : '';
        
        img.addEventListener('click', () => {
          this.openGalleryModal(images, index);
        });

        imgContainer.appendChild(img);
        container.appendChild(imgContainer);
      });
    }

    return container;
  }

  /**
   * 渲染 Calendar 组件
   */
  private renderCalendar(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-calendar';
    container.dataset.componentId = comp.id;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 日历头部
    const header = document.createElement('div');
    header.className = 'a2ui-calendar-header';
    
    const monthYear = document.createElement('h3');
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    header.appendChild(monthYear);

    // 星期标题
    const weekdays = document.createElement('div');
    weekdays.className = 'a2ui-calendar-weekdays';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.className = 'a2ui-calendar-weekday';
      dayEl.textContent = day;
      weekdays.appendChild(dayEl);
    });

    // 日期网格
    const grid = document.createElement('div');
    grid.className = 'a2ui-calendar-grid';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 填充空白日期
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'a2ui-calendar-day empty';
      grid.appendChild(emptyDay);
    }

    // 填充实际日期
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'a2ui-calendar-day';
      dayEl.textContent = String(day);
      
      if (day === currentDate.getDate()) {
        dayEl.classList.add('today');
      }

      dayEl.addEventListener('click', () => {
        container.querySelectorAll('.a2ui-calendar-day.selected').forEach(el => el.classList.remove('selected'));
        dayEl.classList.add('selected');
      });

      grid.appendChild(dayEl);
    }

    container.appendChild(header);
    container.appendChild(weekdays);
    container.appendChild(grid);

    return container;
  }

  /**
   * 渲染 Timeline 组件
   */
  private renderTimeline(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-timeline';
    container.dataset.componentId = comp.id;

    const items = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
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

  /**
   * 渲染 Tree 组件
   */
  private renderTree(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-tree';
    container.dataset.componentId = comp.id;

    const data = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
      : comp.data || [];

    if (Array.isArray(data)) {
      data.forEach((node: any) => {
        const nodeEl = this.renderTreeNode(node, 0);
        container.appendChild(nodeEl);
      });
    }

    return container;
  }

  /**
   * 渲染 Carousel 组件
   */
  private renderCarousel(comp: any, surfaceId: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-carousel';
    container.dataset.componentId = comp.id;

    const items = comp.dataBinding 
      ? this.resolveBinding(comp.dataBinding, surfaceId) 
      : comp.items || [];

    if (Array.isArray(items) && items.length > 0) {
      const track = document.createElement('div');
      track.className = 'a2ui-carousel-track';

      items.forEach((item: any, index: number) => {
        const slide = document.createElement('div');
        slide.className = 'a2ui-carousel-slide';
        slide.dataset.index = String(index);

        if (item.image) {
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.alt || '';
          slide.appendChild(img);
        }

        if (item.title || item.description) {
          const content = document.createElement('div');
          content.className = 'a2ui-carousel-content';

          if (item.title) {
            const title = document.createElement('h3');
            title.textContent = item.title;
            content.appendChild(title);
          }

          if (item.description) {
            const desc = document.createElement('p');
            desc.textContent = item.description;
            content.appendChild(desc);
          }

          slide.appendChild(content);
        }

        track.appendChild(slide);
      });

      // 导航按钮
      const prevBtn = document.createElement('button');
      prevBtn.className = 'a2ui-carousel-btn a2ui-carousel-prev';
      prevBtn.innerHTML = '‹';

      const nextBtn = document.createElement('button');
      nextBtn.className = 'a2ui-carousel-btn a2ui-carousel-next';
      nextBtn.innerHTML = '›';

      // 指示器
      const indicators = document.createElement('div');
      indicators.className = 'a2ui-carousel-indicators';

      items.forEach((_, index: number) => {
        const dot = document.createElement('button');
        dot.className = 'a2ui-carousel-indicator';
        dot.dataset.index = String(index);
        if (index === 0) dot.classList.add('active');
        indicators.appendChild(dot);
      });

      // 轮播逻辑
      let currentIndex = 0;
      const updateCarousel = (index: number) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        indicators.querySelectorAll('.a2ui-carousel-indicator').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
      };

      prevBtn.addEventListener('click', () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        updateCarousel(newIndex);
      });

      nextBtn.addEventListener('click', () => {
        const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        updateCarousel(newIndex);
      });

      indicators.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.dataset.index) {
          updateCarousel(parseInt(target.dataset.index));
        }
      });

      container.appendChild(track);
      container.appendChild(prevBtn);
      container.appendChild(nextBtn);
      container.appendChild(indicators);

      // 自动播放
      if (comp.autoplay !== false) {
        setInterval(() => {
          const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          updateCarousel(newIndex);
        }, comp.interval || 3000);
      }
    }

    return container;
  }

  /**
   * 辅助方法：绘制图表
   */
  private drawChart(ctx: CanvasRenderingContext2D, comp: any) {
    const { width, height } = ctx.canvas;
    const { data, chartType = 'bar' } = comp;

    ctx.clearRect(0, 0, width, height);

    if (chartType === 'bar' && Array.isArray(data)) {
      const barWidth = width / data.length * 0.8;
      const maxValue = Math.max(...data.map((item: any) => item.value || 0));

      data.forEach((item: any, index: number) => {
        const barHeight = (item.value / maxValue) * (height - 40);
        const x = index * (width / data.length) + (width / data.length - barWidth) / 2;
        const y = height - barHeight - 20;

        ctx.fillStyle = item.color || '#6633ee';
        ctx.fillRect(x, y, barWidth, barHeight);

        // 标签
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label || '', x + barWidth / 2, height - 5);
      });
    }
  }

  /**
   * 辅助方法：渲染树节点
   */
  private renderTreeNode(node: any, level: number): HTMLElement {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'a2ui-tree-node';
    nodeEl.style.paddingLeft = `${level * 20}px`;

    const content = document.createElement('div');
    content.className = 'a2ui-tree-content';

    if (node.children && node.children.length > 0) {
      const toggle = document.createElement('span');
      toggle.className = 'a2ui-tree-toggle';
      toggle.textContent = '▶';
      
      let expanded = false;
      toggle.addEventListener('click', () => {
        expanded = !expanded;
        toggle.textContent = expanded ? '▼' : '▶';
        const childrenEl = nodeEl.querySelector('.a2ui-tree-children') as HTMLElement;
        if (childrenEl) {
          childrenEl.style.display = expanded ? 'block' : 'none';
        }
      });

      content.appendChild(toggle);
    }

    const label = document.createElement('span');
    label.className = 'a2ui-tree-label';
    label.textContent = node.label || node.title || '';
    content.appendChild(label);

    nodeEl.appendChild(content);

    if (node.children && node.children.length > 0) {
      const childrenEl = document.createElement('div');
      childrenEl.className = 'a2ui-tree-children';
      childrenEl.style.display = 'none';

      node.children.forEach((child: any) => {
        const childEl = this.renderTreeNode(child, level + 1);
        childrenEl.appendChild(childEl);
      });

      nodeEl.appendChild(childrenEl);
    }

    return nodeEl;
  }

  /**
   * 辅助方法：打开图片画廊模态框
   */
  private openGalleryModal(images: any[], startIndex: number) {
    // 简化实现，实际项目中可以使用更完善的模态框
    const modal = document.createElement('div');
    modal.className = 'a2ui-gallery-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.9); display: flex; align-items: center;
      justify-content: center; z-index: 1000;
    `;

    const img = document.createElement('img');
    img.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
    img.src = typeof images[startIndex] === 'string' ? images[startIndex] : images[startIndex].url;

    modal.appendChild(img);
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  }





  /**
   * 解析数据绑定（JSON Pointer）
   */
  private resolveBinding(binding: string | undefined, surfaceId: string): any {
    if (!binding) return undefined;

    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) return undefined;

    // 简化的 JSON Pointer 解析
    const path = binding.replace(/^\//, '').split('/');
    let value = dataModel;

    for (const key of path) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return undefined;
      }
    }

    return value;
  }

  /**
   * 设置数据绑定的值
   */
  private setBindingValue(binding: string, value: any, surfaceId: string) {
    if (!binding) return;

    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) return;

    const path = binding.replace(/^\//, '').split('/');
    let obj = dataModel;

    for (let i = 0; i < path.length - 1; i++) {
      if (!obj[path[i]]) obj[path[i]] = {};
      obj = obj[path[i]];
    }

    obj[path[path.length - 1]] = value;
  }

  /**
   * 更新绑定了数据的组件
   */
  private updateBoundComponents(surface: HTMLElement, surfaceId: string) {
    const components = surface.querySelectorAll('[data-component-id]');
    components.forEach(el => {
      // 这里可以实现更细粒度的更新
      // 目前简化处理
    });
  }

  /**
   * 处理 Action
   */
  private handleAction(action: any, surfaceId: string) {
    const dataModel = this.dataModels.get(surfaceId);
    
    // 触发自定义事件
    const event = new CustomEvent('a2ui:action', {
      detail: {
        actionName: action.name,
        actionData: action.data,
        dataModel
      }
    });
    this.container.dispatchEvent(event);
  }

  /**
   * 清空所有内容
   */
  clear() {
    this.container.innerHTML = '';
    this.surfaces.clear();
    this.dataModels.clear();
    this.componentElements.clear();
  }
}
