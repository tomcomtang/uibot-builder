/**
 * A2UI Property Value Resolver
 * Handles literal values and data binding resolution
 */

import type { A2UIPropertyValue } from './types';

export class PropertyResolver {
  private dataModels: Map<string, any>;

  constructor(dataModels: Map<string, any>) {
    this.dataModels = dataModels;
  }

  /**
   * Resolve property value (literal or data binding)
   */
  resolveValue(property: A2UIPropertyValue | any, surfaceId?: string): any {
    if (!property) return undefined;
    
    // Handle string values
    if (typeof property === 'string') {
      return property;
    }
    
    // Handle DynamicString
    if (property.literalString !== undefined) {
      return property.literalString;
    }
    
    // Handle DynamicNumber
    if (property.literalNumber !== undefined) {
      return property.literalNumber;
    }
    
    // Handle DynamicBoolean
    if (property.literalBoolean !== undefined) {
      return property.literalBoolean;
    }
    
    // Handle DynamicStringList
    if (property.literalStringList !== undefined) {
      return property.literalStringList;
    }
    
    // Handle data binding with path
    if (property.path !== undefined && surfaceId) {
      return this.resolveDataBinding(property.path, surfaceId);
    }
    
    return property;
  }

  /**
   * Resolve data binding path
   */
  private resolveDataBinding(path: string, surfaceId: string): any {
    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) return `[Data: ${path}]`;

    // Simple JSON Pointer resolution
    const pathSegments = path.replace(/^\//, '').split('/');
    let value = dataModel;

    for (const segment of pathSegments) {
      if (value && typeof value === 'object') {
        value = value[segment];
      } else {
        return `[Data: ${path}]`;
      }
    }

    return value;
  }

  /**
   * Set data binding value
   */
  setBindingValue(path: string, value: any, surfaceId: string): void {
    const dataModel = this.dataModels.get(surfaceId);
    if (!dataModel) return;

    const pathSegments = path.replace(/^\//, '').split('/');
    let obj = dataModel;

    for (let i = 0; i < pathSegments.length - 1; i++) {
      if (!obj[pathSegments[i]]) obj[pathSegments[i]] = {};
      obj = obj[pathSegments[i]];
    }

    obj[pathSegments[pathSegments.length - 1]] = value;
  }
}