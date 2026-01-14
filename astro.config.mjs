import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  integrations: [react()],
  vite: {
    define: {
      'process.env.GOOGLE_GENERATIVE_AI_API_KEY': JSON.stringify(process.env.GOOGLE_GENERATIVE_AI_API_KEY),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(process.env.DEEPSEEK_API_KEY),
    }
  },
  // 确保环境变量在服务器端可用
  env: {
    schema: {
      DEEPSEEK_API_KEY: {
        context: 'server',
        access: 'secret',
      }
    }
  }
});
