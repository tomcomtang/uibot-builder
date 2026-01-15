/**
 * 自定义 Chat Hook - 替代 useChat，适配直接调用 DeepSeek API 的格式
 * 保持与 useChat 相同的接口，但内部使用 fetch 处理流式响应
 */

import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  parts?: Array<{ type: 'text'; text: string }>;
}

export type ChatStatus = 'ready' | 'streaming' | 'submitted' | 'error';

export interface UseCustomChatReturn {
  messages: ChatMessage[];
  status: ChatStatus;
  sendMessage: (message: { text: string }) => Promise<void>;
  isLoading: boolean;
}

export function useCustomChat(): UseCustomChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('ready');
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (message: { text: string }) => {
    if (!message.text.trim()) return;

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message.text,
      parts: [{ type: 'text', text: message.text }]
    };

    setMessages(prev => [...prev, userMessage]);
    setStatus('submitted');

    // 创建 assistant 消息占位符
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      parts: []
    };

    setMessages(prev => [...prev, assistantMessage]);
    setStatus('streaming');

    // 创建 AbortController
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            id: msg.id,
            role: msg.role,
            parts: msg.parts || [{ type: 'text', text: msg.content }]
          }))
        }),
        signal: abortController.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedText = '';
      let hasReceivedFinalText = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('📥 Stream finished, final accumulated text length:', accumulatedText.length);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          // 解析 AI SDK 格式的流式数据
          // 格式: "0:{"type":"text-delta","textDelta":"..."}" 或 "0:{"type":"text","text":"..."}"
          const colonIndex = line.indexOf(':');
          if (colonIndex === -1) continue;

          try {
            const data = JSON.parse(line.slice(colonIndex + 1));
            
            if (data.type === 'text-delta' && data.textDelta) {
              accumulatedText += data.textDelta;
              // 更新消息内容
              setMessages(prev => prev.map(msg => 
                msg.id === assistantMessageId
                  ? {
                      ...msg,
                      content: accumulatedText,
                      parts: [{ type: 'text', text: accumulatedText }]
                    }
                  : msg
              ));
            } else if (data.type === 'text') {
              // 完整文本（通常是 A2UI JSON）- 这会替换之前的所有增量内容
              // 即使 text 为空，也表示流结束了
              if (data.text) {
                accumulatedText = data.text;
                hasReceivedFinalText = true;
                console.log('✅ Received final text (A2UI JSON):', accumulatedText.substring(0, 200));
              } else {
                // 空文本表示流结束
                console.log('✅ Received empty text, stream ended');
                hasReceivedFinalText = true;
              }
              setMessages(prev => prev.map(msg => 
                msg.id === assistantMessageId
                  ? {
                      ...msg,
                      content: accumulatedText,
                      parts: [{ type: 'text', text: accumulatedText }]
                    }
                  : msg
              ));
            }
          } catch (e) {
            // 忽略解析错误
            console.warn('⚠️ Failed to parse stream chunk:', e, 'Line:', line.substring(0, 100));
          }
        }
      }

      // 确保状态更新为 ready
      console.log('✅ Stream processing complete, setting status to ready');
      setStatus('ready');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }
      console.error('❌ Chat error:', error);
      setStatus('error');
      
      // 更新错误消息
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId
          ? {
              ...msg,
              content: `Error: ${error.message || 'Failed to get response'}`,
              parts: [{ type: 'text', text: `Error: ${error.message || 'Failed to get response'}` }]
            }
          : msg
      ));
    } finally {
      abortControllerRef.current = null;
    }
  }, [messages]);

  return {
    messages: messages.map(msg => ({
      ...msg,
      // 确保兼容 UIMessage 格式
      parts: msg.parts || [{ type: 'text', text: msg.content }]
    })) as any,
    status,
    sendMessage,
    isLoading: status === 'streaming' || status === 'submitted'
  };
}
