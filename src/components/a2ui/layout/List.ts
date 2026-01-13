/**
 * A2UI List 组件
 * 列表容器组件，支持数据绑定和模板渲染
 */

export interface ListProps {
  id: string;
  dataBinding: string;
  itemTemplate: any;
}

export class A2UIList {
  /**
   * 渲染 List 组件
   */
  static render(
    comp: ListProps, 
    surfaceId: string, 
    resolveBinding: (path: string, surfaceId: string) => any,
    renderComponent: (child: any, surfaceId: string) => HTMLElement | null,
    dataModels: Map<string, any>
  ): HTMLElement {
    const el = document.createElement('div');
    el.className = 'a2ui-list';
    el.dataset.componentId = comp.id;

    const items = resolveBinding(comp.dataBinding, surfaceId);
    
    if (Array.isArray(items) && comp.itemTemplate) {
      items.forEach((item: any, index: number) => {
        // 创建临时数据模型
        const tempModel = { ...dataModels.get(surfaceId), item, index };
        const tempSurfaceId = `${surfaceId}_item_${index}`;
        dataModels.set(tempSurfaceId, tempModel);

        const itemEl = renderComponent(comp.itemTemplate, tempSurfaceId);
        if (itemEl) el.appendChild(itemEl);
      });
    }

    return el;
  }
}