import React from 'react';
import { useCustomChat } from './useCustomChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatPage: React.FC = () => {
  const { messages, sendMessage, status } = useCustomChat();

  // 处理发送消息
  const handleSendMessage = async (messageText: string) => {
    // 发送给AI处理
    await sendMessage({ text: messageText });
  };

  return (
    <main className="chat-section">
      {/* 固定的卡片背景 - 独立层 */}
      <div className="chat-background"></div>
      
      {/* 聊天内容区域 - 独立层 */}
      <ChatMessages 
        messages={messages} 
        status={status}
      />
      
      {/* 固定的输入框 - 独立层 */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={status !== 'ready'}
      />
    </main>
  );
};

export default ChatPage;