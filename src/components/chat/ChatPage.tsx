import React from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { allMockExamples } from '../../lib/a2ui-mock-data';

const ChatPage: React.FC = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  // 命令映射
  const commandMap: Record<string, keyof typeof allMockExamples> = {
    '1': 'userProfile',
    '用户资料': 'userProfile',
    'user profile': 'userProfile',
    '个人资料': 'userProfile',
    
    '2': 'contactForm',
    '联系表单': 'contactForm',
    'contact form': 'contactForm',
    '表单': 'contactForm',
    
    '3': 'productList',
    '产品列表': 'productList',
    'product list': 'productList',
    '商品列表': 'productList',
    
    '4': 'settingsPanel',
    '设置面板': 'settingsPanel',
    'settings panel': 'settingsPanel',
    '设置': 'settingsPanel',

    '5': 'table',
    '数据表格': 'table',
    'table': 'table',
    '表格': 'table',

    '6': 'dataVisualization',
    '数据展示': 'dataVisualization',
    'data visualization': 'dataVisualization',
    '图表': 'dataVisualization',
    'chart': 'dataVisualization',

    '7': 'media',
    '媒体组件': 'media',
    'media': 'media',
    '视频': 'media',
    'video': 'media',

    '8': 'advanced',
    '高级组件': 'advanced',
    'advanced': 'advanced',
    '日历': 'advanced',
    'calendar': 'advanced'
  };

  // 处理发送消息
  const handleSendMessage = async (messageText: string) => {
    // 检查是否是 A2UI 命令
    const demoType = commandMap[messageText.toLowerCase()];
    
    if (demoType) {
      // 显示 A2UI 演示 - 这里需要自定义逻辑，因为useChat不直接支持
      // 暂时发送给AI处理
      sendMessage({ text: messageText });
    } else {
      // 发送给AI处理
      sendMessage({ text: messageText });
    }
  };

  return (
    <main className="chat-section">
      {/* 固定的卡片背景 - 独立层 */}
      <div className="chat-background"></div>
      
      {/* 聊天内容区域 - 独立层 */}
      <ChatMessages 
        messages={messages} 
        status={status}
        commandMap={commandMap}
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