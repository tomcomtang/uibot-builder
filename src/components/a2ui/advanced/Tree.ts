/**
 * A2UI Tree 组件
 * 树形结构组件
 */

export interface TreeProps {
  id: string;
  data?: any[];
  dataBinding?: string;
}

export class A2UITree {
  /**
   * 渲染 Tree 组件
   */
  static render(comp: TreeProps, surfaceId: string, resolveBinding: (path: string, surfaceId: string) => any): HTMLElement {
    const container = document.createElement('div');
    container.className = 'a2ui-tree';
    container.dataset.componentId = comp.id;

    const data = comp.dataBinding 
      ? resolveBinding(comp.dataBinding, surfaceId) 
      : comp.data || [];

    if (Array.isArray(data)) {
      data.forEach((node: any) => {
        const nodeEl = this.renderTreeNode(node, 0);
        container.appendChild(nodeEl);
      });
    }

    return container;
  }

  private static renderTreeNode(node: any, level: number): HTMLElement {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'a2ui-tree-node';
    nodeEl.style.paddingLeft = `${level * 20}px`;

    const nodeContent = document.createElement('div');
    nodeContent.className = 'a2ui-tree-node-content';

    if (node.children && node.children.length > 0) {
      const toggle = document.createElement('span');
      toggle.className = 'a2ui-tree-toggle';
      toggle.textContent = '▶';
      toggle.addEventListener('click', () => {
        const isExpanded = nodeEl.classList.contains('expanded');
        if (isExpanded) {
          nodeEl.classList.remove('expanded');
          toggle.textContent = '▶';
          // 隐藏子节点
          const children = nodeEl.querySelectorAll('.a2ui-tree-node');
          children.forEach(child => (child as HTMLElement).style.display = 'none');
        } else {
          nodeEl.classList.add('expanded');
          toggle.textContent = '▼';
          // 显示直接子节点
          const children = nodeEl.querySelectorAll(':scope > .a2ui-tree-node');
          children.forEach(child => (child as HTMLElement).style.display = 'block');
        }
      });
      nodeContent.appendChild(toggle);
    }

    const label = document.createElement('span');
    label.className = 'a2ui-tree-label';
    label.textContent = node.label || node.title || '';
    nodeContent.appendChild(label);

    nodeEl.appendChild(nodeContent);

    // 渲染子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        const childEl = this.renderTreeNode(child, level + 1);
        childEl.style.display = 'none'; // 默认折叠
        nodeEl.appendChild(childEl);
      });
    }

    return nodeEl;
  }
}