# Chaparral Finance — Site web

Site vitrine de [Chaparral Finance](https://chaparral-finance.com), banque d'affaires dédiée aux PME.

## Stack

Site statique bilingue généré avec [Astro](https://astro.build) et [Tailwind CSS](https://tailwindcss.com).

| Domaine | Langue | Pages |
|---|---|---|
| chaparral-finance.fr | Français | `src/pages/fr/` (servies sans préfixe `/fr` via réécriture d'hôte) |
| chaparral-finance.com | Anglais | `src/pages/` (racine) |

Les visiteurs situés en France arrivant sur le `.com` sont redirigés vers le `.fr`
(règle `redirects` de `vercel.json` basée sur `x-vercel-ip-country`). Chaque page
porte des liens `hreflang` croisés vers son équivalent dans l'autre langue.

```
src/
├── layouts/Base.astro        # <head> commun, hreflang, structure de page
├── components/
│   ├── Header.astro          # Barre de navigation (variantes par page)
│   ├── MobileMenu.astro      # Menu mobile plein écran
│   └── Footer.astro          # Pied de page (FR/EN via prop locale)
├── pages/                    # Pages ANGLAISES (chaparral-finance.com)
│   ├── index.astro …         # + sitemap-en.xml.ts / sitemap-fr.xml.ts
│   └── fr/                   # Pages FRANÇAISES (chaparral-finance.fr)
│       └── index.astro …
├── data/transactions.json    # Les transactions (source unique, bilingue)
└── input.css                 # Directives Tailwind
public/                       # Fichiers servis tels quels (robots, favicon…)
```

- **Transactions** : pour ajouter une opération, ajouter une entrée en tête de
  `src/data/transactions.json` avec `order: 1` (et décaler les autres `order`),
  en renseignant aussi les champs anglais `sector_en`, `deal_type_en`,
  `description_en`. Les pages d'accueil affichent automatiquement les
  5 premières entrées.
- **Images / favicons** : hébergées sur Cloudinary et ImageKit (CDN externes).
- **Formulaire de contact** : envoyé via [formsubmit.co](https://formsubmit.co) vers `contact@chaparral-finance.fr` (aucun backend requis).
- **SEO** : sitemaps par langue générés au build (`/sitemap-en.xml`, `/sitemap-fr.xml`), référencés dans `public/robots.txt`.

## Développement

```bash
npm install
npm run dev        # serveur local avec rechargement à chaud
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build
```

## Déploiement (Vercel)

Le dépôt est connecté à Vercel : chaque push sur `main` déclenche un build
(`npm run build`) et un déploiement en production ; chaque pull request génère
une URL de prévisualisation.

`vercel.json` active `cleanUrls`, ce qui sert `/transactions`, `/contacts` et
`/legals` sans extension `.html` (même comportement que l'ancien hébergement
Apache/OVH).

### Migration depuis OVH (une seule fois)

1. Dans **Settings → Domains** du projet Vercel, ajouter `chaparral-finance.com` et `www.chaparral-finance.com`.
2. Dans la zone DNS OVH : `chaparral-finance.com` → enregistrement `A` vers `76.76.21.21`, et `www` → `CNAME` vers `cname.vercel-dns.com`.
3. Attendre la propagation DNS et l'émission du certificat SSL (automatique).
4. Vérifier le site, puis résilier l'hébergement web OVH (conserver le domaine, la zone DNS et les e-mails).
