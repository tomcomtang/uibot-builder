/**
 * Chart Component Creator
 * Uses Chart.js for rendering charts
 */
import { PropertyResolver } from '../property-resolver';

// Load Chart.js from CDN if not already loaded
const loadChartJS = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).Chart) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Chart.js'));
    document.head.appendChild(script);
  });
};

export async function createChartElement(
  id: string,
  properties: any,
  surfaceId: string,
  propertyResolver: PropertyResolver
): Promise<HTMLElement> {
  const container = document.createElement('div');
  container.className = 'a2ui-chart-container';
  container.setAttribute('data-component-id', id);

  // Load Chart.js
  try {
    await loadChartJS();
  } catch (error) {
    console.error('❌ Failed to load Chart.js:', error);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'a2ui-chart-error';
    errorDiv.textContent = 'Failed to load chart library';
    container.appendChild(errorDiv);
    return container;
  }

  const Chart = (window as any).Chart;
  if (!Chart) {
    console.error('❌ Chart.js not available');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'a2ui-chart-error';
    errorDiv.textContent = 'Chart library not available';
    container.appendChild(errorDiv);
    return container;
  }

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.className = 'a2ui-chart-canvas';
  container.appendChild(canvas);

  // Resolve properties
  const chartType = properties.type || 'bar';
  const title = propertyResolver.resolveValue(properties.title, surfaceId);
  const xLabel = propertyResolver.resolveValue(properties.xLabel, surfaceId);
  const yLabel = propertyResolver.resolveValue(properties.yLabel, surfaceId);
  const data = properties.data || [];

  // Prepare chart data based on type
  let chartData: any;
  let chartOptions: any;

  if (chartType === 'pie' || chartType === 'doughnut') {
    // Pie/Doughnut chart: data should be [{label: string, value: number}]
    chartData = {
      labels: data.map((item: any) => item.label || item.x || ''),
      datasets: [{
        data: data.map((item: any) => item.value || item.y || 0),
        backgroundColor: [
          'rgba(102, 51, 238, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }]
    };
    chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)',
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        title: title ? {
          display: true,
          text: String(title),
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        } : undefined
      }
    };
  } else if (chartType === 'radar' || chartType === 'polarArea') {
    // Radar/PolarArea chart: similar to pie
    chartData = {
      labels: data.map((item: any) => item.label || item.x || ''),
      datasets: [{
        label: title ? String(title) : 'Data',
        data: data.map((item: any) => item.value || item.y || 0),
        backgroundColor: 'rgba(102, 51, 238, 0.2)',
        borderColor: 'rgba(102, 51, 238, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(102, 51, 238, 0.8)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(102, 51, 238, 0.8)'
      }]
    };
    chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        }
      },
      scales: chartType === 'radar' ? {
        r: {
          beginAtZero: true,
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        }
      } : undefined
    };
  } else {
    // Line/Bar chart: data should be [{x: string, y: number}] or [{label: string, value: number}]
    const labels = data.map((item: any) => item.x || item.label || '');
    const values = data.map((item: any) => item.y || item.value || 0);

    chartData = {
      labels: labels,
      datasets: [{
        label: title ? String(title) : 'Data',
        data: values,
        backgroundColor: chartType === 'bar' 
          ? 'rgba(102, 51, 238, 0.8)'
          : 'rgba(102, 51, 238, 0.1)',
        borderColor: 'rgba(102, 51, 238, 0.8)',
        borderWidth: 2,
        fill: chartType === 'line',
        tension: chartType === 'line' ? 0.4 : 0,
        pointBackgroundColor: 'rgba(102, 51, 238, 0.8)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(102, 51, 238, 0.8)'
      }]
    };
    chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: !!title,
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        },
        title: title ? {
          display: true,
          text: String(title),
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        } : undefined
      },
      scales: {
        x: {
          title: {
            display: !!xLabel,
            text: xLabel ? String(xLabel) : '',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: !!yLabel,
            text: yLabel ? String(yLabel) : '',
            color: 'rgba(255, 255, 255, 0.7)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    };
  }

  // Create chart
  try {
    const chartInstance = new Chart(canvas, {
      type: chartType,
      data: chartData,
      options: chartOptions
    });
    // Store chart instance for potential updates
    (container as any).chartInstance = chartInstance;
    console.log(`📊 Chart created: ${id} (${chartType})`);
  } catch (error: any) {
    console.error(`❌ Failed to create chart ${id}:`, error);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'a2ui-chart-error';
    errorDiv.textContent = `Chart error: ${error?.message || error}`;
    container.innerHTML = '';
    container.appendChild(errorDiv);
  }

  return container;
}
