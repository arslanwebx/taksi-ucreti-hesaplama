# Codex Master Prompt — Production-Ready Taxi Fare Website

Rebuild the existing WordPress website **https://taksiucreti-hesaplama.blog/** as a complete custom website in this GitHub repository.

The final result must be a **100% production-ready, fast, secure, accessible, SEO-safe, technically correct, visually polished static website** that can be deployed directly using these exact Cloudflare settings:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Version command: npx wrangler deploy
Root directory: /
```

Do not change these commands. Configure the repository, dependencies, framework output, Wrangler configuration, redirects, scripts, and project structure so these commands work reliably from the repository root with no build errors.

Before editing, inspect the repository and the current live website. Preserve useful existing content, existing search intent, important URLs, author information, calculator logic, and any valid analytics configuration. Replace WordPress completely. The final website must not require WordPress, PHP, MySQL, plugins, server-side rendering, or a runtime database.

Do not add featured images to blog posts, city pages, airport pages, or guides at this stage.

---

## 1. Required technology

Use:

- Astro
- TypeScript with strict mode
- Static site generation
- Minimal client-side JavaScript
- Reusable components
- Centralized structured data
- Cloudflare-compatible static output
- Wrangler for deployment
- Semantic HTML
- Lightweight custom CSS

Do not use:

- Next.js
- React for the full site
- Server-side rendering
- Databases
- PHP
- WordPress APIs
- Heavy UI frameworks
- Unnecessary animation libraries
- Large icon libraries
- Runtime Node.js APIs
- Anything incompatible with the required Cloudflare deployment commands

The project must work with:

```bash
npm install
npm run build
npx wrangler deploy
```

Do not finish until all commands work successfully or are validated as far as the available environment allows.

---

## 2. Cloudflare and Wrangler configuration

Create one root-level Wrangler configuration file:

```text
wrangler.jsonc
```

Do not create both `wrangler.jsonc` and `wrangler.toml`.

Configure Wrangler so:

```bash
npx wrangler deploy
```

publishes the Astro build output from:

```text
dist/
```

The configuration must support the exact Cloudflare settings:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Version command: npx wrangler deploy
Root directory: /
```

Requirements:

- Repository root must be the working directory.
- `npm run build` must generate the final deployable output.
- Output directory must be `dist`.
- No additional deploy command must be required.
- No manual file upload must be required.
- No dashboard-only post-build step must be required.
- No deprecated Wrangler configuration.
- No incompatible Cloudflare Pages or Workers settings.
- No environment-specific hardcoding that breaks previews.
- Production canonical URLs must always use:

```text
https://taksiucreti-hesaplama.blog/
```

Create a stable `package.json` with compatible dependency versions and at least:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "wrangler deploy"
  }
}
```

Use only necessary dependencies and avoid version conflicts.

---

## 3. Preserve existing SEO value and URLs

Preserve all valuable existing URLs exactly wherever possible.

Important URLs include:

```text
/
/istanbul-taksi-ucreti/
/ankara-taksi-ucreti/
/izmir-taksi-ucreti/
/antalya-taksi-ucreti/
/istanbul-havalimani-taksi-ucreti/
/sehirler/
/taksi-rehberi/
/hakkimizda/
/iletisim/
/gizlilik-politikasi/
/kullanim-kosullari/
/yazar/oguzhan-arslan/
```

Do not rename existing city URLs only to add the word `hesaplama`.

Example:

```text
Keep:
/istanbul-taksi-ucreti/

Target:
istanbul taksi ücreti hesaplama
istanbul taksi ücreti
istanbul taksi hesaplama
istanbul taksi tarifesi
istanbul taksi km ücreti
```

Do not create competing pages such as:

```text
/istanbul-taksi-hesaplama/
/istanbul-taksi-ucreti-hesaplama/
```

Use one authoritative URL per city.

If an old WordPress URL cannot be preserved, create one direct permanent redirect to the closest relevant final page.

Do not:

- Create redirect chains
- Redirect unrelated deleted pages to the homepage
- Produce redirect loops
- Create multiple live URLs for the same content
- Allow `www`, non-`www`, HTTP, HTTPS, slash, and non-slash duplicates

Use one consistent trailing-slash format sitewide.

---

## 4. Redirect migration

Create Cloudflare-compatible redirects for:

- Old WordPress category URLs
- Old tag archives
- Date archives
- Attachment pages
- Changed slugs
- Duplicate URL variations
- Old pagination URLs
- Legacy author URLs
- HTTP to HTTPS
- `www` to the preferred host
- Incorrect capitalization where relevant

Use direct `301` redirects.

Create:

```text
public/_redirects
```

Rules must point directly to final canonical URLs.

Do not use 410 unless a URL has no relevant replacement and is genuinely obsolete.

---

## 5. Recommended project architecture

Use a clean, scalable structure suitable for many future city, airport, route, and guide pages.

```text
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── MobileNav.astro
│   ├── Breadcrumbs.astro
│   ├── TaxiCalculator.astro
│   ├── CityCalculator.astro
│   ├── FareTable.astro
│   ├── RouteTable.astro
│   ├── CityCard.astro
│   ├── SourceBox.astro
│   ├── UpdateNotice.astro
│   ├── AuthorBox.astro
│   ├── RelatedPages.astro
│   ├── TableOfContents.astro
│   ├── SeoHead.astro
│   └── JsonLd.astro
│
├── data/
│   ├── site.ts
│   ├── navigation.ts
│   ├── footer.ts
│   ├── redirects.ts
│   ├── cities/
│   │   ├── istanbul.ts
│   │   ├── ankara.ts
│   │   ├── izmir.ts
│   │   └── antalya.ts
│   └── airports/
│
├── content/
│   ├── cities/
│   ├── airports/
│   ├── guides/
│   ├── routes/
│   └── pages/
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── ContentLayout.astro
│   ├── CityLayout.astro
│   ├── AirportLayout.astro
│   └── HubLayout.astro
│
├── pages/
├── styles/
│   ├── global.css
│   ├── tokens.css
│   └── utilities.css
│
└── utils/
    ├── calculateFare.ts
    ├── seo.ts
    ├── schema.ts
    ├── dates.ts
    └── validation.ts
```

Use central data files so fare values are not duplicated across page content, calculators, tables, and structured data.

---

## 6. Central site configuration

Create one central site configuration file containing:

- Site name
- Production URL
- Default title pattern
- Default meta description
- Contact email
- Author
- Publisher
- Social links
- Analytics ID if already valid
- Navigation
- Footer links
- Default Open Graph settings
- Legal entity wording
- Current year handling

Do not scatter these values across multiple files.

---

## 7. Central taxi tariff data

Create one structured tariff source for each city.

Each city configuration should support:

```text
City name
Slug
Opening fee
Per-kilometre fee
Minimum fare
Waiting fee
Taxi categories
Taxi category multipliers
Night tariff rule
Extra charges
Tariff effective date
Last verified date
Official source name
Official source URL
Local notes
Airport relationships
District information
Popular route data
```

The homepage calculator, city calculators, visible tariff tables, route examples, and schema must read from the same source.

Do not manually repeat tariff numbers in multiple files.

Do not invent missing values.

If a value cannot be verified, mark it clearly for manual review and do not publish a false figure.

---

## 8. Homepage SEO strategy

The homepage must target:

```text
taksi ücreti hesaplama
```

Supporting variations:

```text
taksi hesaplama
taksi fiyat hesaplama
taksimetre hesaplama
taksi km hesaplama
şehir taksi ücreti hesaplama
```

Use:

```text
SEO title:
Taksi Ücreti Hesaplama 2026 | Şehir ve KM’ye Göre

H1:
Taksi Ücreti Hesaplama

Meta description:
Şehrinizi ve mesafeyi seçerek güncel taksi ücretini hesaplayın. Açılış, kilometre, indi bindi ve bekleme tarifelerini inceleyin.
```

Homepage structure:

1. Header
2. H1
3. Short answer
4. Main multi-city calculator
5. Popular city calculator cards
6. City tariff comparison table
7. How taxi fares are calculated
8. Opening, kilometre, minimum, and waiting fees
9. Airport taxi guides
10. Data source and calculation methodology
11. General FAQs
12. Footer

The calculator must appear close to the top.

Do not place a long generic article before the calculator.

Do not duplicate full city content on the homepage.

Use short city summaries and descriptive links to city pages.

---

## 9. City keyword strategy

Use one authoritative page per city for both informational and calculation intent.

Example:

```text
URL:
/ankara-taksi-ucreti/

Primary keyword:
ankara taksi ücreti hesaplama

Secondary keywords:
ankara taksi ücreti
ankara taksi hesaplama
ankara taksi tarifesi
ankara taksi km ücreti
ankara indi bindi ücreti
```

Recommended metadata:

```text
Title:
Ankara Taksi Ücreti Hesaplama 2026 | Güncel Tarife

H1:
Ankara Taksi Ücreti Hesaplama 2026
```

Use the same strategy for İstanbul, İzmir, Antalya, and future city pages.

Do not create separate pages for close variations such as:

```text
ankara taksi ücreti
ankara taksi ücreti hesaplama
```

Keep them on one strong page.

---

## 10. Calculator requirements

Create one reusable calculator engine.

### Homepage calculator

Allow:

- City selection
- Distance in kilometres
- Waiting time in minutes
- Taxi category where applicable
- Optional toll, bridge, tunnel, motorway, or extra charge

Display:

- Opening fee
- Distance charge
- Waiting charge
- Minimum fare adjustment
- Additional charges
- Estimated total
- Tariff effective date
- Last verification date
- Link to the selected city page
- Clear estimate disclaimer

### City calculator

Each major city page must use the same component with that city preselected or fixed.

Requirements:

- Ankara page loads Ankara values only.
- İstanbul-only taxi categories must not appear on unrelated cities.
- Calculator output must be stable and not cause layout shift.
- Invalid input must be handled clearly.
- Calculator must work with keyboard only.
- Results must be understandable without technical knowledge.
- All important tariff values must also appear in crawlable HTML.

Do not put all useful information only inside client-side JavaScript.

---

## 11. City page structure

Each city page should contain:

1. Breadcrumbs
2. One H1
3. Short current-fare answer
4. City-specific calculator
5. Current tariff table
6. How the fare is calculated
7. Distance-based examples
8. Local route examples
9. Airport, station, or district information
10. Minimum fare
11. Waiting-time rules
12. Taxi categories where applicable
13. Tolls and additional charges
14. Official source
15. Effective date
16. Last verification date
17. City-specific FAQs
18. Related pages
19. Author or reviewer box

Do not use the exact same heading sequence and paragraph pattern on every city page.

Each city must provide real local value.

### İstanbul

Cover where verified:

- Sarı, turkuaz, and black taxi categories
- İstanbul Airport
- Sabiha Gökçen
- Bridges
- Tunnels
- Motorways
- Traffic and waiting
- Popular districts and routes

### Ankara

Cover:

- Kızılay
- AŞTİ
- Çankaya
- Keçiören
- Batıkent
- Sincan
- Esenboğa Airport
- Ankara-specific minimum and waiting fees

### İzmir

Cover:

- Konak
- Bornova
- Karşıyaka
- Adnan Menderes Airport
- Relevant district differences

### Antalya

Cover:

- Antalya Airport
- Lara
- Konyaaltı
- Kundu
- Belek
- Hotel areas
- Seasonal traffic effects

---

## 12. Existing content improvement

Import and improve all useful current content.

Fix:

- Duplicate H1 headings
- Duplicate publication dates
- Repetitive article templates
- Mixed English and Turkish labels
- Weak introductions
- Generic conclusions
- Unsupported claims
- Old tariff wording
- Missing effective dates
- Missing source details
- Incorrect night-tariff assumptions
- Incorrect taxi categories
- Weak internal linking
- Generic anchors
- Broken heading hierarchy
- Author sections appearing in table of contents
- Thin category pages
- Grammar and spelling problems
- Keyword stuffing
- Filler
- Repeated FAQ wording
- Duplicate meta descriptions

Use Turkish consistently.

Replace interface text such as:

```text
Author → Yazar Hakkında
By → Yazar:
Continue → Devamını Oku
Previous → Önceki Yazı
Next → Sonraki Yazı
Your name → Adınız
Your email → E-posta Adresiniz
Subject → Konu
Your message → Mesajınız
```

Do not add featured images.

Do not add placeholder stock images.

---

## 13. Category and hub structure

Preserve and improve:

```text
/sehirler/
/taksi-rehberi/
```

Add:

```text
/havalimani-taksi-ucretleri/
```

Only add `/rotalar/` when enough substantial route content exists.

### `/sehirler/`

Include:

- Clear introduction
- Search or filter
- Published city cards
- Tariff comparison table
- Last review dates
- Main calculator link
- Links to all published city pages
- No unsupported city pages

### `/taksi-rehberi/`

Use for informational guides such as:

- Taksi ücreti nasıl hesaplanır?
- İndi bindi ücreti nedir?
- Taksi bekleme ücreti nasıl hesaplanır?
- Gece taksi tarifesi var mı?
- Köprü ve otoyol ücretini kim öder?

### `/havalimani-taksi-ucretleri/`

Create a useful hub for airport guides.

Do not create empty, thin, or automated archive pages.

---

## 14. Future content system

The website must be structured so future content can be added safely without breaking SEO or design.

Create documented content schemas for:

- City pages
- Airport pages
- General guides
- Route pages
- Policy pages

Each future content item should support:

```text
Title
Slug
Meta title
Meta description
H1
Intro
Published date
Modified date
Author
Reviewer
Canonical URL
Category
Related pages
Primary keyword
Secondary keywords
FAQ items
Source references
Indexing status
```

Add validation that prevents:

- Duplicate slugs
- Missing titles
- Missing meta descriptions
- Multiple H1s
- Missing canonicals
- Invalid dates
- Empty content
- Missing source data on tariff pages

Document how to add new city and guide pages.

---

## 15. Header and navigation

Create a clean, compact, mobile-first header.

Recommended navigation:

```text
Ana Sayfa
Şehirler
Havalimanı Taksi Ücretleri
Taksi Rehberi
Hakkımızda
```

Requirements:

- Logo links to homepage
- Sticky only if it does not waste space or harm performance
- Accessible mobile menu
- Keyboard navigation
- `aria-expanded`
- Visible focus states
- No layout shift
- Minimal JavaScript
- Active-link state
- Proper spacing and alignment

---

## 16. Footer structure

Create a professional four-column footer.

### Calculator and cities

- Taksi Ücreti Hesaplama
- İstanbul Taksi Ücreti
- Ankara Taksi Ücreti
- İzmir Taksi Ücreti
- Antalya Taksi Ücreti
- Tüm Şehirler

### Guides

- Taksi Rehberi
- Havalimanı Taksi Ücretleri
- Taksi Ücreti Nasıl Hesaplanır?
- İndi Bindi Ücreti
- Taksi Bekleme Ücreti
- Veri Kaynakları ve Hesaplama Yöntemi

### Trust

- Hakkımızda
- İletişim
- Yazar
- Editoryal Politika
- Düzeltme Politikası

### Legal

- Gizlilik Politikası
- Çerez Politikası
- Kullanım Koşulları
- Sorumluluk Reddi

Add this visible disclaimer:

```text
Bu sitedeki hesaplamalar bilgilendirme amaçlı tahminlerdir. Trafik, bekleme süresi, güzergâh, köprü, tünel, otoyol ve yerel tarife değişiklikleri nedeniyle gerçek taksimetre tutarı farklı olabilir.
```

Add automatic copyright year:

```text
© [current year] Taksi Ücreti Hesaplama. Tüm hakları saklıdır.
```

Footer must be clean, evenly spaced, responsive, and easy to scan.

---

## 17. Policy and trust pages

Create or improve:

```text
/hakkimizda/
/iletisim/
/gizlilik-politikasi/
/cerez-politikasi/
/kullanim-kosullari/
/sorumluluk-reddi/
/veri-kaynaklari-ve-hesaplama-yontemi/
/duzeltme-politikasi/
/editoryal-politika/
/yazar/oguzhan-arslan/
```

### Hakkımızda

Explain:

- What the site does
- Who it helps
- How calculations work
- Data sources
- Review frequency
- Estimate limitations

### İletişim

Create a functional Cloudflare-compatible form.

Subject options:

```text
Tarife hatası bildir
Hesaplama sorunu
İçerik düzeltme talebi
Genel iletişim
```

For tariff reports, collect:

- City
- Reported tariff
- Effective date
- Official source
- Explanation

The form must have:

- Accessible labels
- Validation
- Clear error states
- Clear success state
- Privacy notice
- Spam protection that does not harm performance
- No fake submission behavior

### Gizlilik Politikası

Cover:

- Analytics
- Cookies
- Contact form data
- Technical logs
- Third-party services
- Retention
- User rights
- Contact details

### Çerez Politikası

Explain:

- Essential cookies
- Analytics cookies
- Consent behavior
- How users manage cookies

### Kullanım Koşulları

Cover:

- Informational use
- Estimate limitations
- User responsibility
- Intellectual property
- Availability
- External links
- Updates to terms

### Sorumluluk Reddi

Explain:

- Calculations are estimates
- Taximeter determines payable fare
- Tariffs can change
- Traffic and route conditions affect totals
- Tolls may be separate
- Users should verify important prices locally

### Data sources and calculation method

Explain:

- Source hierarchy
- Formula
- Minimum fare handling
- Waiting-time handling
- Rounding
- Extra charges
- Review schedule
- Verification dates

### Editorial policy

Explain:

- Research standards
- Official-source preference
- Human review
- Update process
- Conflict-of-interest policy
- No invented tariffs or credentials

### Correction policy

Explain:

- Error reporting
- Review process
- Correction process
- Update records

Use only truthful author information.

---

## 18. Internal linking

Build deliberate internal linking.

### Homepage links to

- Major city pages
- City hub
- Airport hub
- Main guides
- Methodology page

### City pages link to

- Homepage calculator
- City hub
- Relevant airport page
- Relevant guide
- Related city pages

### Airport pages link to

- Related city page
- Airport hub
- Homepage calculator
- Relevant route pages

Use descriptive anchors:

```text
İstanbul taksi ücreti hesaplama
Ankara taksi tarifesi
İzmir taksi kilometre ücreti
Antalya Havalimanı taksi ücreti
```

Avoid generic anchors such as:

```text
buraya tıklayın
devamını oku
daha fazla
```

Do not over-link or repeat the same anchor excessively.

---

## 19. Technical SEO

Implement without errors:

- Exactly one H1 per page
- Unique SEO title per page
- Unique meta description per page
- Self-referencing canonical
- Production-domain canonical URLs
- Open Graph metadata
- Twitter card metadata
- `<html lang="tr">`
- Semantic HTML
- Crawlable `<a href>` links
- Breadcrumbs
- XML sitemap
- `robots.txt`
- Custom 404 page
- Correct HTTP status behavior
- Clean URLs
- Consistent trailing slashes
- No query-parameter duplicates
- No accidental `noindex`
- No staging-domain canonicals
- No empty archives
- No broken links
- No orphan pages
- No duplicate titles
- No duplicate H1s
- No malformed schema
- No sitemap URLs returning non-200 responses

The sitemap must include only:

- Canonical URLs
- Indexable pages
- HTTP 200 pages
- Meaningful content pages

Use accurate `lastmod` values only after meaningful updates.

Create:

```text
/robots.txt
/sitemap-index.xml
```

A single sitemap is acceptable if the site is small, but the structure must be scalable.

---

## 20. Structured data

Add valid JSON-LD.

### Homepage

- `WebSite`
- `Organization`
- `WebApplication` where appropriate

### City, airport, and guide pages

- `WebPage`
- `Article` or `BlogPosting`
- `BreadcrumbList`
- `Person`

### Hub pages

- `CollectionPage`
- `ItemList`
- `BreadcrumbList`

Requirements:

- Schema must match visible content.
- Dates must be valid.
- URLs must be canonical.
- Author and publisher must be truthful.
- Do not add fake reviews or ratings.
- Do not add unsupported LocalBusiness schema.
- Only add FAQ schema when the FAQ is visible on the page.

---

## 21. UI and UX design requirements

Create a modern, clean, professional, trustworthy interface.

The design must feel custom, not like a generic WordPress theme.

Requirements:

- Mobile-first
- Strong visual hierarchy
- Generous but controlled spacing
- Consistent alignment
- Consistent border radius
- Consistent shadows
- Consistent card padding
- Consistent section spacing
- Clear content widths
- Comfortable reading line length
- Strong contrast
- Large enough touch targets
- No cramped blocks
- No misaligned buttons
- No uneven cards
- No overflow
- No horizontal scrolling
- No overlapping elements
- No large empty areas
- No visually noisy backgrounds
- No excessive gradients
- No excessive animation
- No stock-image dependence
- No featured images for content pages

Use a restrained design system with reusable tokens for:

```text
Colors
Spacing
Typography
Borders
Radius
Shadows
Containers
Breakpoints
Transitions
```

Recommended UI principles:

- Primary calculator card should be visually dominant.
- Main content blocks should be clearly separated.
- Tables must remain readable on mobile.
- Use cards only when they improve scanning.
- Avoid wrapping every paragraph in a card.
- Use clear labels and helper text.
- Use concise error messages.
- Use consistent button hierarchy.
- Use visible hover and focus states.
- Keep the header and footer visually balanced.
- Ensure all grids align perfectly.

Create a responsive layout that works at common viewport widths:

```text
320px
375px
768px
1024px
1280px
1440px
```

---

## 22. Typography

Use a fast system font stack or lightweight local font.

Requirements:

- Avoid external font blocking.
- Limit font weights.
- Use readable body size.
- Use consistent heading scale.
- Maintain good line height.
- Avoid overly wide paragraphs.
- Avoid tiny footer text.
- Avoid all-caps body text.
- Do not use decorative fonts.

Target readable content width around 65–75 characters per line for long-form text.

---

## 23. Accessibility

Meet strong practical accessibility standards.

Ensure:

- Keyboard-accessible calculator
- Keyboard-accessible menus
- Visible focus indicators
- Proper labels
- Accessible validation
- Correct table headers
- Skip-to-content link
- Sufficient contrast
- Semantic buttons and links
- Accessible mobile navigation
- Reduced-motion support
- Proper landmarks
- Logical heading order
- No empty buttons
- No icon-only controls without labels
- Correct `aria-live` behavior for calculator results
- No color-only status communication

---

## 24. Performance

Optimize aggressively for Cloudflare and mobile users.

Targets:

```text
LCP below 2.5 seconds
INP below 200 milliseconds
CLS below 0.1
```

Implement:

- Static HTML output
- Minimal JavaScript
- Hydrate only interactive components
- No heavy client framework
- No WordPress remnants
- No database calls
- No SSR
- Small CSS bundle
- System or local fonts
- Deferred analytics
- No render-blocking third-party scripts
- Explicit dimensions for visual elements
- Stable calculator result area
- Long-lived caching for hashed assets
- SVG icons
- No unused dependencies
- No large images
- No featured images
- No placeholder images
- No autoplay media
- No unnecessary preloads

Optimize HTML, CSS, and JavaScript output.

---

## 25. Analytics and consent

Inspect whether the existing site has a valid analytics ID.

If valid:

- Keep it in central configuration.
- Load it after main content.
- Avoid blocking rendering.
- Match privacy and cookie policies to actual implementation.

Do not invent an analytics ID.

Do not add a heavy consent management platform unless required.

---

## 26. Error handling and resilience

Create:

- Friendly custom 404 page
- Calculator validation
- Safe numeric parsing
- Protection against negative values
- Maximum reasonable input limits
- Graceful handling of missing tariff data
- Contact form error handling
- Build-time content validation
- No silent failures

The site must not break when a future city lacks an optional value.

---

## 27. Content quality rules

All content must:

- Answer the main question early
- Match real search intent
- Be informational, not promotional
- Use keywords naturally
- Avoid stuffing
- Use active voice
- Use concise paragraphs
- Use useful tables only where appropriate
- Explain technical terms plainly
- Use official sources where available
- State uncertainty honestly
- Avoid fabricated facts
- Avoid repeated city templates
- Avoid duplicate FAQs
- Avoid generic conclusions
- Avoid unnecessary word count
- Be written in natural Turkish

Do not publish unsupported claims.

---

## 28. No featured images

Do not add:

- Blog featured images
- City page featured images
- Airport page featured images
- Guide page featured images
- Placeholder hero photography
- Stock photography

The site should still look polished using:

- Typography
- Spacing
- Icons
- Cards
- Tables
- Subtle shapes
- CSS-only decorative elements
- Strong component design

---

## 29. Documentation

Create or update:

```text
README.md
SEO-MIGRATION-CHECKLIST.md
CONTENT-GUIDE.md
```

### README.md

Include:

- Project purpose
- Technology
- Local installation
- Development command
- Build command
- Deployment command
- Exact Cloudflare settings
- Wrangler setup
- Environment variables
- Content workflow
- Tariff update workflow
- New city workflow
- Redirect workflow
- Production-domain setup

Document exactly:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Version command: npx wrangler deploy
Root directory: /
```

### SEO-MIGRATION-CHECKLIST.md

Include:

- Existing URL inventory
- Preserved URLs
- Redirected URLs
- Canonical checks
- Sitemap checks
- Robots checks
- Schema checks
- Broken-link checks
- Search Console launch checks
- Post-launch monitoring
- Cloudflare checks

### CONTENT-GUIDE.md

Include:

- How to create a city page
- How to create an airport page
- How to create a guide
- Required metadata
- Required source fields
- Internal-linking rules
- Non-duplication rules
- Publishing checklist

---

## 30. Mandatory final verification

Before finishing:

1. Run `npm install`.
2. Run `npm run build`.
3. Run `npx wrangler deploy` or validate the command as fully as possible.
4. Resolve dependency conflicts.
5. Resolve TypeScript errors.
6. Resolve Astro errors.
7. Resolve Wrangler errors.
8. Confirm `dist` is generated.
9. Confirm repository root is correct.
10. Confirm no additional build or deploy command is needed.
11. Confirm important existing URLs work.
12. Confirm redirects point directly to final URLs.
13. Confirm all canonicals use the production domain.
14. Confirm calculators work on mobile and desktop.
15. Confirm tariff data comes from central files.
16. Confirm one H1 per page.
17. Confirm titles and meta descriptions are unique.
18. Confirm sitemap and robots.txt exist.
19. Confirm no useful page has `noindex`.
20. Confirm no featured images were added.
21. Confirm the contact form has a real deployment-safe implementation.
22. Confirm policy and trust pages are complete.
23. Confirm no placeholder values remain unless clearly marked for manual review.
24. Confirm no broken links.
25. Confirm no mixed-language interface text.
26. Confirm no duplicate city content.
27. Confirm no unsupported night tariff.
28. Confirm taxi categories are city-specific.
29. Confirm footer structure and disclaimer are present.
30. Confirm layout is visually aligned at all required viewport sizes.
31. Confirm no horizontal overflow.
32. Confirm Core Web Vitals risks are minimized.
33. Confirm schema is valid.
34. Confirm the project is ready for production deployment.

At the end, provide a concise report containing:

- Files created
- Files changed
- URLs preserved
- Redirects added
- Cloudflare configuration
- Wrangler configuration
- Build result
- Deploy-command result
- SEO improvements
- Technical SEO improvements
- UI and UX improvements
- Performance improvements
- Remaining items requiring manual verification

Make reasonable decisions independently. Do not repeatedly ask for confirmation. Preserve existing rankings and URLs while improving architecture, design, speed, accessibility, content quality, technical SEO, crawlability, topical structure, and future scalability.
