import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chaparral-finance.com',
  // Génère transactions.html, contacts.html… (servis sans extension par
  // Vercel via cleanUrls, comme sur l'ancien hébergement Apache)
  build: { format: 'file' },
  compressHTML: false,
  // Pas d'intégration @astrojs/sitemap : les sitemaps sont générés par
  // langue (src/pages/sitemap-{fr,en}.xml.ts) car les pages françaises
  // vivent sur chaparral-finance.fr et les autres sur le .com — un
  // sitemap unique référencerait le mauvais domaine.
});
