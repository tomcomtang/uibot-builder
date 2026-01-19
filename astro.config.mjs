import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import edgeone from '@edgeone/astro';

export default defineConfig({
  output: 'server',
  adapter: edgeone(),
  integrations: [react()]
});
