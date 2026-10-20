# Bobo Blooms

Website for Bobo Blooms, florist at City Market, Nairobi. Built with Next.js (App Router) and Tailwind CSS.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Adding or removing photos

Each gallery is a folder in `public/images/<category>/`. Drop `.jpg`, `.png` or `.webp` files in, and they appear on
that category page, sorted by filename. No code change is needed. Keep photos under about 2000px on the long side.

- Category card images: `public/images/covers/<category>.jpg`. If a category has no cover, its first photo is used.
- Hero image: `public/images/hero.jpg`.
- Category names and descriptions: `src/lib/categories.ts`. To add a new category, add an entry there and create its folder.
- Phone number, WhatsApp number, location: `src/lib/site.ts`.

## Deploy (Vercel)

1. Push this repo to GitHub, then import it at <https://vercel.com/new>. The default settings work.
2. In the Vercel project, open **Settings → Domains** and add both `boboblooms.org` and `www.boboblooms.org`.
3. At your domain registrar, update DNS as Vercel instructs (usually an `A` record for `boboblooms.org` and a `CNAME`
   for `www`). Remove the old Google Sites `ghs.googlehosted.com` records.

Vercel issues HTTPS certificates for both addresses automatically. Old Google Sites URLs such as `/flowers/bouquets` and
`/contact-us` redirect to their new pages (see `next.config.ts`).
# boboblooms
