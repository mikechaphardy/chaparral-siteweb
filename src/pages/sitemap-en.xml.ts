// Sitemap du site anglais (chaparral-finance.com) : énumère les pages
// à la racine de src/pages.
const pages = Object.keys(import.meta.glob('./*.astro')).map((p) =>
  p.replace('./', '').replace('.astro', '').replace(/^index$/, '')
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
