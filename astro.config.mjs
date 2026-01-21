import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import edgeone from '@edgeone/astro';

/**
 * Astro Environment Variables Configuration for EdgeOne Pages
 * 
 * EdgeOne Pages injects environment variables into process.env at runtime.
 * For server-side API routes, use process.env.VAR_NAME directly.
 * 
 * Important: 
 * 1. Set GEMINI_API_KEY in EdgeOne Console > Environment Variables
 * 2. After setting env vars, redeploy the project
 * 
 * Note: We don't use vite.define here because EdgeOne injects env vars
 * at runtime via process.env, not at build time.
 */
export default defineConfig({
  output: 'server',
  adapter: edgeone(),
  integrations: [react()]
});
