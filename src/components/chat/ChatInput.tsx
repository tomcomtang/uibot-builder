import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false); // 防止重复发送

  // 自动调整 textarea 高度
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  // 发送消息
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || sendingRef.current) {
      console.log('Send blocked:', { trimmedMessage: !!trimmedMessage, disabled, sending: sendingRef.current });
      return;
    }
    
    sendingRef.current = true;
    console.log('Sending message:', trimmedMessage);
    
    onSendMessage(trimmedMessage);
    setMessage('');
    
    // 重置高度
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // 延迟重置发送状态，防止快速重复点击
    setTimeout(() => {
      sendingRef.current = false;
    }, 1000);
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 点击容器时聚焦输入框
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    textareaRef.current?.focus();
  };

  return (
    <div className="chat-input-wrapper">
      <div 
        ref={containerRef}
        className="chat-input-container"
        onClick={handleContainerClick}
      >
        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || sendingRef.current}
          rows={1}
        />
        <button 
          className="send-button"
          onClick={handleSend}
          disabled={disabled || !message.trim() || sendingRef.current}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;