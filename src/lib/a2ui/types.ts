/**
 * A2UI v0.9 Standard Message Types and Interfaces
 * Based on Google's official A2UI specification
 */

export interface A2UICreateSurfaceMessage {
  createSurface: {
    surfaceId: string;
    catalogId: string;
  };
}

export interface A2UIUpdateComponentsMessage {
  updateComponents: {
    surfaceId: string;
    components: A2UIComponent[];
  };
}

export interface A2UIUpdateDataModelMessage {
  updateDataModel: {
    surfaceId: string;
    actorId: string;
    updates: A2UIDataUpdate[];
    versions: A2UIVersionVector;
  };
}

export interface A2UIDeleteSurfaceMessage {
  deleteSurface: {
    surfaceId: string;
  };
}

export type A2UIMessage = 
  | A2UICreateSurfaceMessage 
  | A2UIUpdateComponentsMessage 
  | A2UIUpdateDataModelMessage 
  | A2UIDeleteSurfaceMessage;

export interface A2UIComponent {
  id: string;
  component: string; // Component type name (e.g., "Text", "Card", "Button")
  weight?: number; // CSS flex-grow equivalent
  [key: string]: any; // Component-specific properties
}

export interface A2UIDataUpdate {
  path: string;
  value?: any;
  hlc: string; // Hybrid Logical Clock timestamp
  pos?: string; // Fractional index position
}

export interface A2UIVersionVector {
  [actorId: string]: string; // Actor ID -> HLC timestamp
}

// Dynamic value types
export type A2UIDynamicString = 
  | string 
  | { path: string }
  | A2UIFunctionCall;

export type A2UIDynamicNumber = 
  | number 
  | { path: string }
  | A2UIFunctionCall;

export type A2UIDynamicBoolean = 
  | boolean 
  | { path: string }
  | A2UILogicExpression;

export interface A2UIFunctionCall {
  call: string;
  args?: Record<string, any>;
  returnType?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any';
}

export interface A2UILogicExpression {
  and?: A2UILogicExpression[];
  or?: A2UILogicExpression[];
  not?: A2UILogicExpression;
  true?: boolean;
  false?: boolean;
}

export type A2UIChildList = 
  | string[] // Static list of component IDs
  | {
      componentId: string; // Template component ID
      path: string; // Path to data list
    }; // Dynamic list from data model

// Property value type (can be literal or dynamic)
export type A2UIPropertyValue = 
  | string 
  | number 
  | boolean 
  | string[]
  | { path: string }
  | { literalString?: string; path?: string }
  | { literalNumber?: number; path?: string }
  | { literalBoolean?: boolean; path?: string }
  | { literalStringList?: string[]; path?: string }
  | A2UIFunctionCall
  | A2UILogicExpression
  | any;