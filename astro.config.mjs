import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://taksiucreti-hesaplama.blog',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
