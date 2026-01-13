/**
 * A2UI Chart 组件
 * 图表组件，支持Canvas 2D渲染
 */

export interface ChartProps {
  id: string;
  chartType?: 'bar' | 'line' | 'pie';
  width?: number;
  height?: number;
  data?: any;
}

export class A2UIChart {
  /**
   * 渲染 Chart 组件
   */
  static render(comp: ChartProps, surfaceId: string): HTMLElement {
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
   * 绘制图表
   */
  private static drawChart(ctx: CanvasRenderingContext2D, comp: ChartProps) {
    const { width, height } = ctx.canvas;
    const { data, chartType = 'bar' } = comp;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    if (!data || !Array.isArray(data)) return;

    switch (chartType) {
      case 'bar':
        this.drawBarChart(ctx, data, width, height);
        break;
      case 'line':
        this.drawLineChart(ctx, data, width, height);
        break;
      case 'pie':
        this.drawPieChart(ctx, data, width, height);
        break;
    }
  }

  private static drawBarChart(ctx: CanvasRenderingContext2D, data: any[], width: number, height: number) {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length;
    const maxValue = Math.max(...data.map((item: any) => item.value || 0));

    data.forEach((item: any, index: number) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = padding + index * barWidth;
      const y = height - padding - barHeight;

      ctx.fillStyle = item.color || '#6366f1';
      ctx.fillRect(x + 5, y, barWidth - 10, barHeight);

      // 绘制标签
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.label || '', x + barWidth / 2, height - 10);
    });
  }

  private static drawLineChart(ctx: CanvasRenderingContext2D, data: any[], width: number, height: number) {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(...data.map((item: any) => item.value || 0));

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((item: any, index: number) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = height - padding - (item.value / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // 绘制数据点
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.stroke();
  }

  private static drawPieChart(ctx: CanvasRenderingContext2D, data: any[], width: number, height: number) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    const total = data.reduce((sum: number, item: any) => sum + (item.value || 0), 0);

    let currentAngle = -Math.PI / 2;

    data.forEach((item: any) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;

      ctx.fillStyle = item.color || `hsl(${Math.random() * 360}, 70%, 60%)`;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();

      currentAngle += sliceAngle;
    });
  }
}