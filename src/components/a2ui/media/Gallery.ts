/**
 * A2UI Gallery 组件
 * 图片画廊组件
 */

export interface GalleryProps {
  id: string;
  images?: any[];
  dataBinding?: string;
}

export class A2UIGallery {
  /**
   * 渲染 Gallery 组件
   */
  static render(
    comp: GalleryProps, 
    surfaceId: string, 
    resolveBinding: (path: string, surfaceId: string) => any,
    openGalleryModal: (images: any[], index: number) => void
  ): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-gallery';
    container.dataset.componentId = comp.id;

    const images = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
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
          openGalleryModal(images, index);
        });

        imgContainer.appendChild(img);
        container.appendChild(imgContainer);
      });
    }

    return container;
  }
}