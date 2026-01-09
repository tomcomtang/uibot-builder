# A2UI 电商助手 - Astro 版本

使用 Astro 框架实现的 A2UI 协议电商助手，完全照搬 A2UI JSON 规范，使用 JavaScript 实现。

## 特性

- ✅ 完整实现 A2UI 0.8 协议规范
- ✅ 使用 Astro 框架（SSR 模式）
- ✅ JavaScript/TypeScript 实现
- ✅ 支持流式 AI 响应
- ✅ 组件化 UI 渲染

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
npm run build
npm run preview
```

## 项目结构

```
├── src/
│   ├── layouts/          # 布局组件
│   │   └── Layout.astro
│   ├── pages/            # 页面
│   │   ├── index.astro   # 首页
│   │   └── api/          # API 路由
│   │       └── chat.ts   # AI 聊天接口
│   ├── components/       # A2UI 组件
│   │   ├── Card.astro
│   │   ├── Button.astro
│   │   └── ...
│   └── utils/            # 工具函数
│       └── a2ui.ts       # A2UI 协议实现
├── A2UI/                 # A2UI 官方规范文档
└── package.json
```

## A2UI 协议

本项目完整实现 A2UI 0.8 协议：

- Server → Client: JSONL 格式
  - `surfaceUpdate`: 更新 UI 组件
  - `dataModelUpdate`: 更新数据模型
  - `beginRendering`: 触发渲染

- Client → Server: A2A 协议
  - `userAction`: 用户操作
  - `error`: 错误报告

## 技术栈

- **框架**: Astro 4.x (SSR 模式)
- **语言**: TypeScript
- **AI**: OpenAI GPT-4
- **协议**: A2UI 0.8

## License

MIT
