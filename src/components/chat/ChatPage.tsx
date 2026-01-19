import React from 'react';
import { useCustomChat } from './useCustomChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatPage: React.FC = () => {
  const { messages, sendMessage, status } = useCustomChat();

  // Handle sending messages
  const handleSendMessage = async (messageText: string) => {
    // Send to AI for processing
    await sendMessage({ text: messageText });
  };

  return (
    <main className="chat-section">
      {/* Fixed card background - separate layer */}
      <div className="chat-background"></div>
      
      {/* Chat content area - separate layer */}
      <ChatMessages 
        messages={messages} 
        status={status}
        onSendMessage={sendMessage}
      />
      
      {/* Fixed input field - separate layer */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={status !== 'ready'}
      />
    </main>
  );
};

export default ChatPage;