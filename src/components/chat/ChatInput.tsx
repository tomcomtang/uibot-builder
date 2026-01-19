import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false); // Prevent duplicate sends

  // Auto-adjust textarea height
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [message]);

  // Send message
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled || sendingRef.current) {
      return;
    }
    
    sendingRef.current = true;
    
    onSendMessage(trimmedMessage);
    setMessage('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Delay reset sending state to prevent rapid duplicate clicks
    setTimeout(() => {
      sendingRef.current = false;
    }, 1000);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Focus input when clicking container
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