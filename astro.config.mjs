import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pixory.cl/',
  output: 'hybrid',
  adapter: netlify(),
  integrations: [tailwind(), react(), sitemap()],
});
