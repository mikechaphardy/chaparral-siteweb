// Sitemap du site anglais (chaparral-finance.com) : pages à la racine de
// src/pages, plus la version italienne (sous /it, canonique sur le .com
// car non liée à un domaine propre).
const pages = Object.keys(import.meta.glob('./*.astro')).map((p) =>
  p.replace('./', '').replace('.astro', '').replace(/^index$/, '')
);
const itPages = Object.keys(import.meta.glob('./it/*.astro')).map((p) =>
  p.replace('./it/', 'it/').replace('.astro', '').replace(/^it\/index$/, 'it')
);

export function GET() {
  const urls = [...pages, ...itPages]
    .map((p) => `<url><loc>https://www.chaparral-finance.com/${p}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
