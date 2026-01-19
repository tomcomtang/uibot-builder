/**
 * Custom Chat Hook - Replaces useChat, adapts to direct API call format
 * Maintains the same interface as useChat, but uses fetch internally for streaming responses
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

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message.text,
      parts: [{ type: 'text', text: message.text }]
    };

    setMessages(prev => [...prev, userMessage]);
    setStatus('submitted');

    // Create assistant message placeholder
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      parts: []
    };

    setMessages(prev => [...prev, assistantMessage]);
    setStatus('streaming');

    // Create AbortController
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
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          // Parse AI SDK format streaming data
          // Format: "0:{"type":"text-delta","textDelta":"..."}" or "0:{"type":"text","text":"..."}"
          const colonIndex = line.indexOf(':');
          if (colonIndex === -1) continue;

          try {
            const data = JSON.parse(line.slice(colonIndex + 1));
            
            if (data.type === 'text-delta' && data.textDelta) {
              accumulatedText += data.textDelta;
              // Update message content
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
              // Complete text (usually UI JSON) - replaces all previous incremental content
              // Even if text is empty, it indicates stream has ended
              if (data.text) {
                accumulatedText = data.text;
                hasReceivedFinalText = true;
              } else {
                // Empty text indicates stream ended
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
            // Ignore parsing errors
            console.warn('⚠️ Failed to parse stream chunk:', e, 'Line:', line.substring(0, 100));
          }
        }
      }

      // Ensure status is updated to ready
      setStatus('ready');
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setStatus('ready'); // Reset to ready state after abort
        return;
      }
      console.error('❌ Chat error:', error);
      
      // Update error message
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId
          ? {
              ...msg,
              content: `Error: ${error.message || 'Failed to get response'}`,
              parts: [{ type: 'text', text: `Error: ${error.message || 'Failed to get response'}` }]
            }
          : msg
      ));
      
      // Reset status to 'ready' after error so user can continue typing
      setStatus('ready');
    } finally {
      abortControllerRef.current = null;
    }
  }, [messages]);

  return {
    messages: messages.map(msg => ({
      ...msg,
      // Ensure compatibility with UIMessage format
      parts: msg.parts || [{ type: 'text', text: msg.content }]
    })) as any,
    status,
    sendMessage,
    isLoading: status === 'streaming' || status === 'submitted'
  };
}
