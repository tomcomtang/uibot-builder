# A2UI Schema 集成测试指南

## 实现的功能

✅ **方式2：JSON Schema 结构化输出**

### 核心改进

1. **自动读取 Schema 文件**
   ```typescript
   const getA2UISchema = () => {
     const schemaPath = join(process.cwd(), 'src/lib/a2ui-schema.json');
     const schemaContent = readFileSync(schemaPath, 'utf-8');
     return JSON.parse(schemaContent);
   };
   ```

2. **智能触发检测**
   - 检测用户消息中的触发词
   - 只有 UI 请求才使用结构化输出
   - 普通对话仍使用文本回复

3. **使用新的 AI SDK 语法**
   ```typescript
   // 使用 Output.object() 而不是已弃用的 generateObject
   streamConfig.output = Output.object({
     schema: a2uiSchema,  // 直接使用 JSON Schema
   });
   ```

### 工作流程

```
用户输入 "创建一个卡片" 
    ↓
检测到触发词 → isUIRequest = true
    ↓
读取 a2ui-schema.json
    ↓
配置 Output.object({ schema })
    ↓
AI 严格按照 Schema 返回 JSON
    ↓
前端解析并渲染 UI
```

### 优势

| 特性 | 旧方式（硬编码提示词） | 新方式（JSON Schema） |
|------|-------------------|-------------------|
| **格式严格性** | 依赖 AI 理解提示词 | Schema 强制验证 |
| **维护性** | 修改需要改代码 | 只需修改 JSON 文件 |
| **错误率** | 可能格式不正确 | 保证格式正确性 |
| **扩展性** | 难以添加新组件 | 在 Schema 中添加即可 |

## 测试方法

### 1. 启动项目
```bash
npm run dev
```

### 2. 测试 UI 生成
发送包含触发词的消息：
- "创建一个用户卡片"
- "生成一个按钮"
- "make a form"
- "show me a list"

### 3. 测试普通对话
发送普通消息：
- "你好"
- "今天天气怎么样"
- "解释一下 JavaScript"

### 4. 查看控制台日志
```
🎯 Is UI request: true/false
📋 Using A2UI JSON Schema for structured output
```

## 复用指南

如果你想在其他项目中复用这个机制：

### 1. 复制核心文件
```
src/lib/a2ui-schema.json     # Schema 定义
src/pages/api/chat.ts        # API 实现
```

### 2. 修改触发词
```typescript
const TRIGGER_WORDS = /你的|触发词|正则表达式/;
```

### 3. 替换 AI 服务
```typescript
// 替换为你的 AI 服务
const aiClient = createOpenAI({ apiKey: '...' });
// 或
const aiClient = createAnthropic({ apiKey: '...' });
```

### 4. 自定义 Schema
修改 `a2ui-schema.json` 或创建你自己的 Schema 文件。

## 注意事项

1. **AI SDK 版本**：确保使用 AI SDK 6+ 以支持 `Output.object()`
2. **Schema 验证**：AI 会严格按照 Schema 生成，确保 Schema 正确
3. **错误处理**：如果 Schema 加载失败，会回退到提示词模式
4. **性能**：结构化输出可能比纯文本稍慢，但格式更可靠

## 总结

现在你已经成功实现了 **方式2：JSON Schema 结构化输出**！

这种方式结合了：
- ✅ Schema 文件的严格性
- ✅ 智能触发检测
- ✅ 向后兼容的错误处理
- ✅ 最新的 AI SDK 语法

你可以基于这个实现来构建你自己的结构化 AI 输出系统。