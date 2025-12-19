import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://pixory.cl/',
  output: 'server',
  adapter: netlify(),
  trailingSlash: 'always', // Ensure consistent URLs with trailing slashes
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/styleguide') &&
        !page.includes('/colores')
    })
  ],
});
