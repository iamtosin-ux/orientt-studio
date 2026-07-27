# SEO Checklist — Orientt Studio

The technical/on-page SEO is **built and live** (see "Shipped" below). What's left
are the **off-site** steps that code can't do — these are what actually move
rankings for competitive terms like "design studio London". Work top-to-bottom.

---

## 1. Google Search Console (do first)

1. Go to <https://search.google.com/search-console> and add the property
   `https://orientt.com` (use the **URL prefix** property).
2. Choose the **HTML tag** verification method. Copy the token from the
   `content="..."` attribute.
3. Set it in Vercel → Project → Settings → Environment Variables:
   `NEXT_PUBLIC_GOOGLE_VERIFICATION=<token>` (Production), then redeploy.
   The verification `<meta>` tag renders automatically (wired in `src/app/layout.tsx`).
4. Back in Search Console, click **Verify**.
5. Submit the sitemap: Search Console → **Sitemaps** → enter `sitemap.xml`.
6. Use **URL Inspection** → *Request indexing* for `/` and `/work/indemni`.

## 2. Google Business Profile (drives the local pack)

This is the single biggest lever for "design studio / agency **London**".

1. Create a profile at <https://business.google.com>.
2. Category: **Website designer** (add secondary: *Graphic designer*, *Marketing agency*).
3. Use the **London** address (or a service-area business if no public address);
   list service areas: **London, Hertfordshire, England**.
4. Match the name/phone/site (NAP) exactly to the site and structured data.
5. Add photos, a description echoing the site copy, and collect a few reviews.

## 3. Validate the structured data

- Rich Results Test: <https://search.google.com/test/rich-results> → enter
  `https://orientt.com`. Confirm the **ProfessionalService** / **Organization**
  blocks parse with no errors.
- Schema Markup Validator: <https://validator.schema.org>.

## 4. Off-site authority (ongoing)

- **Backlinks**: get listed on design directories (Awwwards, Dribbble, Clutch,
  DesignRush, The Dots) and any client sites ("Designed by Orientt" footer link).
- **Content**: publish more case studies under `content/work/*.mdx` — each new
  one auto-appears in the sitemap and adds indexable, keyword-relevant pages.
- **Consistency**: keep NAP identical across the site, Business Profile, and
  every directory listing.

## 5. Nice-to-haves

- Add Bing Webmaster Tools (<https://www.bing.com/webmasters>) — feeds some LLMs.
- Add a `NEXT_PUBLIC_SITE_URL` env var in Vercel if the canonical domain ever
  changes (currently defaults to `https://orientt.com`).

---

## Shipped (already live, no action needed)

- Rich metadata: title template, description, keywords, authors, category.
- Open Graph + Twitter cards + a branded `opengraph-image`.
- JSON-LD: `ProfessionalService` + `Organization` + `WebSite`, with London
  address, London/Hertfordshire/England service area, Cal.com booking action,
  and `knowsAbout`/`makesOffer` service list (also feeds LLM answers).
- Per-page canonicals; case studies emit `CreativeWork` + `BreadcrumbList`.
- Dynamic `sitemap.xml` (all routes) and `robots.txt` pointing to it.
- `metadataBase` set so all OG/canonical URLs are absolute.
