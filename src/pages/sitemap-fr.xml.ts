// Sitemap de la version française : pages de src/pages/fr, servies sous
// /fr sur chaparral-finance.com (le domaine .fr n'est qu'une redirection).
const pages = Object.keys(import.meta.glob('./fr/*.astro')).map((p) =>
  p.replace('./fr/', 'fr/').replace('.astro', '').replace(/^fr\/index$/, 'fr')
);

export function GET() {
  const urls = pages
    .map((p) => `<url><loc>https://www.chaparral-finance.com/${p}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
