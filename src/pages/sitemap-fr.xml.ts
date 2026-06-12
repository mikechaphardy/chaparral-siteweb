// Sitemap du site français (chaparral-finance.fr) : énumère les pages
// de src/pages/fr, servies sans préfixe /fr grâce à la réécriture d'hôte.
const pages = Object.keys(import.meta.glob('./fr/*.astro')).map((p) =>
  p.replace('./fr/', '').replace('.astro', '').replace(/^index$/, '')
);

export function GET() {
  const urls = pages
    .map((p) => `<url><loc>https://www.chaparral-finance.fr/${p}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
