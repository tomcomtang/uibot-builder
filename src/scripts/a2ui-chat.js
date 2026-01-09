// A2UI 聊天逻辑
(function() {
  // 删除不需要的元素
  function removeUnwantedElements() {
    const selectors = [
      '[class*="styles-module__uOGawG__wrapper"]',
      '[class*="styles-module__Rkd4lW__banner"]'
    ];
    
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
  }
  
  // 强制删除 main 下除了 header 之外的所有直接子元素
  function cleanMainElement() {
    const main = document.querySelector('main.Layout-module__fmZ1UG__main');
    if (main) {
      // 获取所有直接子元素
      const children = Array.from(main.children);
      children.forEach(child => {
        // 只保留 header 标签
        if (child.tagName.toLowerCase() !== 'header') {
          child.remove();
        }
      });
    }
  }
  
  // 监听并删除重复的 __content div
  function preventDuplicateContent() {
    const contentDivs = document.querySelectorAll('#__content');
    if (contentDivs.length > 1) {
      console.warn(`⚠️ 检测到 ${contentDivs.length} 个 #__content，删除多余的...`);
      // 保留第一个，删除其他的
      contentDivs.forEach((div, index) => {
        if (index > 0) {
          console.log(`删除第 ${index + 1} 个 #__content:`, div);
          div.remove();
        }
      });
    }
  }
  
  // 删除重复的 Layout-module__fmZ1UG__layout div
  function preventDuplicateLayout() {
    const layoutDivs = document.querySelectorAll('.Layout-module__fmZ1UG__layout');
    if (layoutDivs.length > 1) {
      console.warn(`⚠️ 检测到 ${layoutDivs.length} 个 .Layout-module__fmZ1UG__layout，删除多余的...`);
      // 删除后面的，保留第一个
      layoutDivs.forEach((div, index) => {
        if (index > 0) {
          console.log(`删除第 ${index + 1} 个 layout div:`, div);
          div.remove();
        }
      });
    }
  }
  
  // 删除重复的 Footer
  function preventDuplicateFooter() {
    const footers = document.querySelectorAll('.Footer-module__rnk_JG__footer');
    if (footers.length > 1) {
      console.warn(`⚠️ 检测到 ${footers.length} 个 Footer，删除多余的...`);
      // 删除后面的，保留第一个
      footers.forEach((footer, index) => {
        if (index > 0) {
          console.log(`删除第 ${index + 1} 个 Footer:`, footer);
          footer.remove();
        }
      });
    }
  }
  
  // 删除重复的 Header（保留第一个）
  function preventDuplicateHeader() {
    const headers = document.querySelectorAll('.Header-module__arFiJq__header');
    if (headers.length > 1) {
      console.warn(`⚠️ 检测到 ${headers.length} 个 Header，删除多余的...`);
      // 删除后面的，保留第一个
      headers.forEach((header, index) => {
        if (index > 0) {
          console.log(`删除第 ${index + 1} 个 Header:`, header);
          header.remove();
        }
      });
    }
  }
  
  // 修改原始 Header 的文案和样式
  function customizeHeader() {
    const header = document.querySelector('.Header-module__arFiJq__header');
    if (header) {
      // 替换所有文本内容中的 Evervault 为 EdgeOne
      const walker = document.createTreeWalker(header, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      textNodes.forEach(node => {
        if (node.nodeValue && node.nodeValue.includes('Evervault')) {
          node.nodeValue = node.nodeValue.replace(/Evervault/g, 'EdgeOne');
        }
      });
      
      // 设置 Header 背景透明
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.borderBottom = 'none';
    }
  }
  
  // 页面加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      removeUnwantedElements();
      cleanMainElement();
      preventDuplicateContent();
      preventDuplicateLayout();
      preventDuplicateFooter();
      preventDuplicateHeader();
      customizeHeader();
    });
  } else {
    removeUnwantedElements();
    cleanMainElement();
    preventDuplicateContent();
    preventDuplicateLayout();
    preventDuplicateFooter();
    preventDuplicateHeader();
    customizeHeader();
  }
  
  // 监听动态加载的元素 - 持续清理
  const observer = new MutationObserver(() => {
    removeUnwantedElements();
    cleanMainElement();
    preventDuplicateContent(); // 防止重复的 __content
    preventDuplicateLayout(); // 防止重复的 layout
    preventDuplicateFooter(); // 防止重复的 Footer
    preventDuplicateHeader(); // 防止重复的 Header
    customizeHeader(); // 自定义 Header
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // 每隔 100ms 强制清理一次（防止异步脚本添加内容）
  setInterval(() => {
    cleanMainElement();
    preventDuplicateContent(); // 定期检查并删除重复的 __content
    preventDuplicateLayout(); // 定期检查并删除重复的 layout
    preventDuplicateFooter(); // 定期检查并删除重复的 Footer
    preventDuplicateHeader(); // 定期检查并删除重复的 Header
    customizeHeader(); // 自定义 Header
  }, 100);
  
  // A2UI 聊天交互逻辑
  const chatToggle = document.getElementById('a2uiChatToggle');
  const chatPanel = document.getElementById('a2uiChatPanel');
  const closeChat = document.getElementById('a2uiCloseChat');
  const sendBtn = document.getElementById('a2uiSendBtn');
  const userInput = document.getElementById('a2uiUserInput');
  const messages = document.getElementById('a2uiMessages');
  const surface = document.getElementById('a2uiSurface');

  chatToggle.addEventListener('click', () => {
    chatPanel.classList.add('active');
    userInput.focus();
  });

  closeChat.addEventListener('click', () => {
    chatPanel.classList.remove('active');
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    const loading = document.createElement('div');
    loading.className = 'a2ui-loading';
    loading.textContent = 'AI 正在思考';
    loading.id = 'a2ui-loading';
    messages.appendChild(loading);
    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      document.getElementById('a2ui-loading')?.remove();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.text();
      renderA2UI(data);
    } catch (error) {
      document.getElementById('a2ui-loading')?.remove();
      addMessage(`❌ ${error.message}`, 'ai');
    }
  }

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `a2ui-message ${type}`;
    
    const content = document.createElement('div');
    content.className = 'a2ui-message-content';
    content.textContent = text;
    
    div.appendChild(content);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderA2UI(data) {
    surface.innerHTML = '<div class="a2ui-message ai"><div class="a2ui-message-content">🚧 A2UI 渲染开发中...</div></div>';
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
