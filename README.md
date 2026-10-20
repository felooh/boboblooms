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

Each gallery is a folder in `photos/<category>/`. Drop `.jpg`, `.png` or `.webp` files in, and they appear on that
category page, sorted by filename. No code change is needed. Keep photos under about 2000px on the long side.

Photos are watermarked automatically. `photos/` holds the clean originals, which are never published.
`scripts/watermark.mjs` stamps the Bobo Blooms badge (`photos/watermark.png`) onto a copy of each one in
`public/images/<category>/`, which is what the site serves. It runs before `npm run dev` and `npm run build`, so on
Vercel it happens on every deploy. Run `npm run watermark` to update the copies while the dev server is running.

- To remove a photo, delete it from `photos/`. Also delete its copy in `public/images/` on your machine (that folder
  isn't committed, so deploys are always clean).
- Photos listed in `UNVERIFIED` in `scripts/watermark.mjs` are copied without the badge because they may be someone
  else's work. Delete them, or remove them from the list if they're genuinely ours.
- Category card images: `photos/covers/<category>.jpg`. If a category has no cover, its first photo is used.
- Hero image: `public/images/hero.jpg` (not watermarked).
- Category names and descriptions: `src/lib/categories.ts`. To add a new category, add an entry there and create its folder.
- Phone number, WhatsApp number, location, hours: `src/lib/site.ts`.

## Deploy (Vercel)

1. Push this repo to GitHub, then import it at <https://vercel.com/new>. The default settings work.
2. In the Vercel project, open **Settings → Domains** and add both `boboblooms.org` and `www.boboblooms.org`.
3. At your domain registrar, update DNS as Vercel instructs (usually an `A` record for `boboblooms.org` and a `CNAME`
   for `www`). Remove the old Google Sites `ghs.googlehosted.com` records.

Vercel issues HTTPS certificates for both addresses automatically. Old Google Sites URLs such as `/flowers/bouquets` and
`/contact-us` redirect to their new pages (see `next.config.ts`).
# boboblooms
