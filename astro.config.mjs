import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chaparral-finance.com',
  // Génère transactions.html, contacts.html… (servis sans extension par
  // Vercel via cleanUrls, comme sur l'ancien hébergement Apache)
  build: { format: 'file' },
  compressHTML: false,
  integrations: [
    sitemap({
      // cleanUrls sert les pages sans extension : le sitemap doit
      // référencer les URLs canoniques (/transactions, pas /transactions.html)
      serialize(item) {
        item.url = item.url.replace(/\.html$/, '');
        return item;
      },
    }),
  ],
});
