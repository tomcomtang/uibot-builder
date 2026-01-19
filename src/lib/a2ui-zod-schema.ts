/**
 * A2UI v0.9 Zod Schema
 * 从 JSON Schema 手动转换为 Zod，用于 AI SDK 的 Output.object()
 * 
 * 注意：这是简化版本，完整转换需要处理所有组件类型
 */

import { z } from 'zod';

// CreateSurface Message
const CreateSurfaceMessage = z.object({
  createSurface: z.object({
    surfaceId: z.string(),
    catalogId: z.string(),
  }),
}).strict();

// Component 基础结构（简化版）
const Component = z.object({
  id: z.string(),
  component: z.enum([
    'Text', 'Image', 'Icon', 'Video', 'AudioPlayer',
    'Row', 'Column', 'List', 'Card', 'Tabs', 'Modal', 'Divider',
    'Button', 'TextField', 'CheckBox', 'ChoicePicker', 'Slider', 'DateTimeInput'
  ]),
  weight: z.number().optional(),
}).passthrough(); // 允许其他属性

// UpdateComponents Message
const UpdateComponentsMessage = z.object({
  updateComponents: z.object({
    surfaceId: z.string(),
    components: z.array(Component),
  }),
}).strict();

// UpdateDataModel Message
const UpdateDataModelMessage = z.object({
  updateDataModel: z.object({
    surfaceId: z.string(),
    actorId: z.string(),
    updates: z.array(z.object({
      path: z.string(),
      value: z.any(),
      hlc: z.string(),
      pos: z.string().optional(),
    })),
    versions: z.record(z.string()),
  }),
}).strict();

// DeleteSurface Message
const DeleteSurfaceMessage = z.object({
  deleteSurface: z.object({
    surfaceId: z.string(),
  }),
}).strict();

// A2UI Message Union
export const A2UIMessage = z.union([
  CreateSurfaceMessage,
  UpdateComponentsMessage,
  UpdateDataModelMessage,
  DeleteSurfaceMessage,
]);

// A2UI Response (数组格式)
export const A2UIResponseSchema = z.array(A2UIMessage).min(1);

// 导出类型
export type A2UIMessageType = z.infer<typeof A2UIMessage>;
export type A2UIResponseType = z.infer<typeof A2UIResponseSchema>;
