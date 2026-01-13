/**
 * A2UI Carousel 组件
 * 轮播图组件
 */

export interface CarouselProps {
  id: string;
  items?: any[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  dataBinding?: string;
}

export class A2UICarousel {
  /**
   * 渲染 Carousel 组件
   */
  static render(comp: CarouselProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-carousel';
    container.dataset.componentId = comp.id;

    const items = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return container;
    }

    let currentIndex = 0;

    // 创建轮播容器
    const track = document.createElement('div');
    track.className = 'a2ui-carousel-track';

    // 创建轮播项
    items.forEach((item: any, index: number) => {
      const slide = document.createElement('div');
      slide.className = 'a2ui-carousel-slide';
      
      if (typeof item === 'string') {
        const img = document.createElement('img');
        img.src = item;
        img.alt = `Slide ${index + 1}`;
        slide.appendChild(img);
      } else if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.alt || `Slide ${index + 1}`;
        slide.appendChild(img);
        
        if (item.title || item.description) {
          const caption = document.createElement('div');
          caption.className = 'a2ui-carousel-caption';
          
          if (item.title) {
            const title = document.createElement('h3');
            title.textContent = item.title;
            caption.appendChild(title);
          }
          
          if (item.description) {
            const desc = document.createElement('p');
            desc.textContent = item.description;
            caption.appendChild(desc);
          }
          
          slide.appendChild(caption);
        }
      }

      track.appendChild(slide);
    });

    container.appendChild(track);

    // 创建导航箭头
    if (comp.showArrows !== false) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'a2ui-carousel-prev';
      prevBtn.innerHTML = '❮';
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        this.updateCarousel(track, currentIndex);
      });

      const nextBtn = document.createElement('button');
      nextBtn.className = 'a2ui-carousel-next';
      nextBtn.innerHTML = '❯';
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        this.updateCarousel(track, currentIndex);
      });

      container.appendChild(prevBtn);
      container.appendChild(nextBtn);
    }

    // 创建指示点
    if (comp.showDots !== false) {
      const dots = document.createElement('div');
      dots.className = 'a2ui-carousel-dots';

      items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'a2ui-carousel-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          currentIndex = index;
          this.updateCarousel(track, currentIndex);
          this.updateDots(dots, currentIndex);
        });

        dots.appendChild(dot);
      });

      container.appendChild(dots);
    }

    // 自动播放
    if (comp.autoplay) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        this.updateCarousel(track, currentIndex);
        const dots = container.querySelector('.a2ui-carousel-dots');
        if (dots) this.updateDots(dots as HTMLElement, currentIndex);
      }, comp.interval || 3000);
    }

    return container;
  }

  private static updateCarousel(track: HTMLElement, index: number) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  private static updateDots(dotsContainer: HTMLElement, index: number) {
    const dots = dotsContainer.querySelectorAll('.a2ui-carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
}