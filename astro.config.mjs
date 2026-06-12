import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chaparral-finance.com',
  // Génère transactions.html, contacts.html… (servis sans extension par
  // Vercel via cleanUrls, comme sur l'ancien hébergement Apache)
  build: { format: 'file' },
  compressHTML: false,
});
