# Chaparral Finance — Site web

Site vitrine de [Chaparral Finance](https://chaparral-finance.com), banque d'affaires dédiée aux PME.

## Structure

Site 100 % statique, sans étape de build :

| Fichier | Page |
|---|---|
| `index.html` | Accueil |
| `transactions.html` | Transactions |
| `contacts.html` | Contact |
| `legals.html` | Mentions légales |

- **Images / favicons** : hébergées sur Cloudinary et ImageKit (CDN externes).
- **Formulaire de contact** : envoyé via [formsubmit.co](https://formsubmit.co) vers `contact@chaparral-finance.fr` (aucun backend requis).
- **SEO** : `sitemap.xml` et `robots.txt` à la racine.
- **CSS** : Tailwind compilé statiquement dans `assets/styles.css`.

## CSS (Tailwind)

Le CSS est précompilé : `assets/styles.css` est généré à partir des classes
utilisées dans les fichiers HTML. **Après tout ajout ou modification de classes
Tailwind dans le HTML, régénérer le fichier :**

```bash
npx -y tailwindcss@3.4.17 -c tailwind.config.js -i src/input.css -o assets/styles.css --minify
```

puis commiter `assets/styles.css` avec les changements HTML.

## Déploiement (Vercel)

Le dépôt est connecté à Vercel : chaque push sur `main` déclenche automatiquement un déploiement en production, chaque pull request génère une URL de prévisualisation.

`vercel.json` active `cleanUrls`, ce qui sert `/transactions`, `/contacts` et `/legals` sans extension `.html` (même comportement que l'ancien hébergement Apache/OVH).

### Mise en place initiale

1. Sur [vercel.com](https://vercel.com), **Add New → Project**, importer ce dépôt GitHub.
2. Framework preset : **Other** — aucune commande de build, output directory : racine. Déployer.
3. Dans **Settings → Domains** du projet, ajouter `chaparral-finance.com` et `www.chaparral-finance.com`.
4. Chez le registrar (OVH), pointer le DNS vers Vercel :
   - `chaparral-finance.com` → enregistrement `A` vers `76.76.21.21`
   - `www` → `CNAME` vers `cname.vercel-dns.com`
5. Attendre la propagation DNS et l'émission du certificat SSL (automatique).
6. Vérifier le site en production, puis résilier l'hébergement web OVH (conserver la zone DNS / le domaine, et les e-mails s'ils sont chez OVH).

## Développement local

Aucun outillage requis :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
