/**
 * DeepSeek API 直接调用版本（类似 A2UI 使用 Google GenAI SDK 的方式）
 * 使用 Function Calling 方式，把 JSON Schema 放在 system prompt 里
 */

import type { APIRoute } from 'astro';
import { readFileSync } from 'fs';
import { join } from 'path';

// 读取 A2UI Schema
const getA2UISchema = () => {
  try {
    const schemaPath = join(process.cwd(), 'src/lib/a2ui-schema.json');
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    return JSON.parse(schemaContent);
  } catch (error) {
    console.error('❌ Failed to load A2UI schema:', error);
    throw new Error('A2UI schema not found');
  }
};

// A2UI v0.9 标准格式的系统提示词（包含 Schema）
const createA2UISystemPrompt = (a2uiSchema: any) => {
  return `You are an A2UI v0.9 compliant UI generator. You MUST return responses by calling the send_a2ui_json_to_client function.

## TRIGGER WORDS (use A2UI format):
创建, 制作, 生成, 设计, 显示, 展示, create, make, build, show, card, button, form, website, page, interface, 卡片, 按钮, 表单, 网站, 页面, 界面, top, richest, ranking, list, 排行, 榜单

## CRITICAL: Response Format
You MUST call the send_a2ui_json_to_client function with a valid A2UI JSON array. Each message in the array is an object with exactly ONE key: createSurface, updateComponents, updateDataModel, or deleteSurface.

## A2UI JSON Schema Reference:
---BEGIN A2UI JSON SCHEMA---
${JSON.stringify(a2uiSchema, null, 2)}
---END A2UI JSON SCHEMA---

## IMPORTANT RULES:
1. ALWAYS return a JSON array, not a single object
2. createSurface MUST have "surfaceId" (not "id") and "catalogId" (use "standard-catalog")
3. updateComponents MUST be an object with "surfaceId" and "components" array (not a direct array)
4. Components MUST use "component" field (not "type"), and properties directly (not in "props" object)
5. Component "id" field is REQUIRED
6. Component "children" is an array of component IDs (strings), not nested objects
7. Text component uses "text" and "variant" (h1, h2, h3, h4, h5, body, caption)
8. Row/Column use "justify" and "align" properties (not "justifyContent", "alignItems")
9. Button uses "action" object, not "actions" array
10. One component MUST have id="root"

## For non-UI requests, respond with normal text only.`;
};

// 检查是否为 UI 生成请求
const isUIRequest = (messageText: string): boolean => {
  return /创建|制作|生成|设计|显示|展示|create|make|build|show|card|button|form|website|page|interface|卡片|按钮|表单|网站|页面|界面|top|richest|ranking|list|排行|榜单/.test(messageText);
};

// 验证 A2UI JSON
const validateA2UIJSON = (jsonStr: string, schema: any): any[] => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!Array.isArray(parsed)) {
      throw new Error('A2UI JSON must be an array');
    }
    // 简单验证：检查是否有 A2UI 消息结构
    const hasA2UIStructure = parsed.some(msg => 
      msg.createSurface || msg.updateComponents || msg.updateDataModel || msg.deleteSurface
    );
    if (!hasA2UIStructure) {
      throw new Error('No valid A2UI message structure found');
    }
    return parsed;
  } catch (error) {
    throw new Error(`Invalid A2UI JSON: ${error}`);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('🚀 DeepSeek Direct API called');
    
    const { messages }: { messages: any[] } = await request.json();
    console.log('📨 Received messages:', messages);

    // 获取最后一条用户消息
    const lastMessage = messages[messages.length - 1];
    const lastMessageText = typeof lastMessage === 'string' 
      ? lastMessage 
      : lastMessage?.content || lastMessage?.text || '';
    
    const isUI = isUIRequest(lastMessageText);
    console.log('🎯 Is UI request:', isUI);

    const apiKey = process.env.DEEPSEEK_API_KEY || import.meta.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY not found');
    }

    // 构建消息列表
    const apiMessages: any[] = [];
    
    if (isUI) {
      // 如果是 UI 请求，添加 system prompt 和 function tool
      const a2uiSchema = getA2UISchema();
      const systemPrompt = createA2UISystemPrompt(a2uiSchema);
      
      apiMessages.push({
        role: 'system',
        content: systemPrompt
      });

      // 添加历史消息
      messages.slice(0, -1).forEach((msg: any) => {
        const content = typeof msg === 'string' ? msg : msg.content || msg.text || '';
        if (content) {
          apiMessages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content
          });
        }
      });

      // 添加当前用户消息
      apiMessages.push({
        role: 'user',
        content: lastMessageText
      });

      // 定义 Function Tool（类似 A2UI 的方式）
      const tools = [
        {
          type: 'function',
          function: {
            name: 'send_a2ui_json_to_client',
            description: 'Sends A2UI JSON to the client to render rich UI for the user. This tool can be called multiple times in the same call to render multiple UI surfaces.',
            parameters: {
              type: 'object',
              properties: {
                a2ui_json: {
                  type: 'string',
                  description: 'Valid A2UI JSON Schema array to send to the client. Must be a JSON string containing an array of A2UI messages.'
                }
              },
              required: ['a2ui_json']
            }
          }
        }
      ];

      // 调用 DeepSeek API（直接 HTTP 请求）
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: apiMessages,
          tools: tools,
          tool_choice: isUI ? 'auto' : 'none', // UI 请求时自动选择工具
          temperature: 0.05,
          stream: false // 先不用流式，简化处理
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ DeepSeek API error:', errorText);
        throw new Error(`DeepSeek API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ DeepSeek API response:', data);

      // 处理 Function Calling 响应
      const assistantMessage = data.choices[0]?.message;
      if (!assistantMessage) {
        throw new Error('No assistant message in response');
      }

      // 检查是否有 tool calls
      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        const toolCall = assistantMessage.tool_calls[0];
        if (toolCall.function.name === 'send_a2ui_json_to_client') {
          const a2uiJsonStr = toolCall.function.arguments;
          const a2uiSchema = getA2UISchema();
          const validatedMessages = validateA2UIJSON(a2uiJsonStr, a2uiSchema);
          
          console.log('✅ Validated A2UI messages:', validatedMessages);
          
          // 返回 A2UI JSON（作为文本内容，前端会解析）
          return new Response(JSON.stringify({
            role: 'assistant',
            content: JSON.stringify(validatedMessages)
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      // 如果没有 tool call，返回普通文本
      return new Response(JSON.stringify({
        role: 'assistant',
        content: assistantMessage.content || ''
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      // 非 UI 请求，普通对话
      messages.forEach((msg: any) => {
        const content = typeof msg === 'string' ? msg : msg.content || msg.text || '';
        if (content) {
          apiMessages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content
          });
        }
      });

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: apiMessages,
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';

      return new Response(JSON.stringify({
        role: 'assistant',
        content
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('❌ Chat API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
