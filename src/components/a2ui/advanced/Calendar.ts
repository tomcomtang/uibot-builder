/**
 * A2UI Calendar 组件
 * 日历组件
 */

export interface CalendarProps {
  id: string;
  value?: string;
  dataBinding?: string;
}

export class A2UICalendar {
  /**
   * 渲染 Calendar 组件
   */
  static render(
    comp: CalendarProps, 
    surfaceId: string,
    resolveBinding: (path: string, surfaceId: string) => any,
    setBindingValue: (path: string, value: any, surfaceId: string) => void
  ): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-calendar';
    container.dataset.componentId = comp.id;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 创建日历头部
    const header = document.createElement('div');
    header.className = 'a2ui-calendar-header';
    header.innerHTML = `
      <button class="a2ui-calendar-prev">&lt;</button>
      <span class="a2ui-calendar-title">${year}年${month + 1}月</span>
      <button class="a2ui-calendar-next">&gt;</button>
    `;

    // 创建星期标题
    const weekHeader = document.createElement('div');
    weekHeader.className = 'a2ui-calendar-week-header';
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    weekDays.forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.className = 'a2ui-calendar-week-day';
      dayEl.textContent = day;
      weekHeader.appendChild(dayEl);
    });

    // 创建日期网格
    const grid = document.createElement('div');
    grid.className = 'a2ui-calendar-grid';
    
    // 生成日期
    this.generateCalendarDays(grid, year, month, comp, surfaceId, setBindingValue);

    container.appendChild(header);
    container.appendChild(weekHeader);
    container.appendChild(grid);

    return container;
  }

  private static generateCalendarDays(
    grid: HTMLElement, 
    year: number, 
    month: number, 
    comp: CalendarProps,
    surfaceId: string,
    setBindingValue: (path: string, value: any, surfaceId: string) => void
  ) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayEl = document.createElement('div');
      dayEl.className = 'a2ui-calendar-day';
      dayEl.textContent = date.getDate().toString();

      if (date.getMonth() !== month) {
        dayEl.classList.add('other-month');
      }

      dayEl.addEventListener('click', () => {
        const dateStr = date.toISOString().split('T')[0];
        if (comp.dataBinding) {
          setBindingValue(comp.dataBinding, dateStr, surfaceId);
        }
        
        // 更新选中状态
        grid.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        dayEl.classList.add('selected');
      });

      grid.appendChild(dayEl);
    }
  }
}