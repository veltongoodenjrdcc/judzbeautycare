# CLAUDE.md — One-Page Premium Website Template

> **You are Claude Code working in VS Code on a production one-page website for a real, paying client. This document is your single source of truth — read it end-to-end before writing a line of code. This template is designed to be reused across many clients with minimal rework. The operator's differentiation is ridiculous turnaround time without sacrificing quality. Every hour matters. Do not improvise on requirements — execute them.**

---

## 0. The Client Variables Block

> **OPERATOR:** Fill this section in before handing off to Claude Code. Every value appears throughout the site — do it once here, then use Find-and-Replace across the project for anything that was missed. Keep placeholder tokens in ALL_CAPS_WITH_UNDERSCORES format.

```
BUSINESS_NAME:              [e.g. Edmond Law]
BUSINESS_TAGLINE:           [short, under 8 words — e.g. "Experience service with a difference."]
BUSINESS_SHORT_DESCRIPTION: [one sentence, 15–25 words, explains what the business does]
BUSINESS_LONG_DESCRIPTION:  [three to four sentences for the About section]

OWNER_NAME:                 [full name of the person who runs the business]
OWNER_TITLE:                [e.g. "Founder & Lead Stylist", "Attorney-at-Law"]
OWNER_BIO:                  [2–3 paragraph bio for the Proof section — credentials, years in field, specialisations, why they do this work]
OWNER_PHOTO:                [path to owner headshot, or Unsplash placeholder URL if not provided]

INDUSTRY:                   [e.g. "law", "beauty services", "catering", "accounting"]
SERVICES:                   [3–6 services, each with name + 1-sentence description]
LOCATION_CITY:              [e.g. Portmore]
LOCATION_REGION:            [e.g. St. Catherine]
LOCATION_COUNTRY:           [e.g. Jamaica]
LOCATION_ADDRESS:           [full street address — or "By appointment only" if home-based]
SERVICE_AREA:               [e.g. "Island-wide", "Kingston and surrounding parishes"]

HOURS:                      [e.g. "Mon–Fri 9:00–5:00, Sat 10:00–2:00"]

CTA_MODE:                   [whatsapp | email]      ← defaults to whatsapp
WHATSAPP_NUMBER:            [international format, no plus or spaces: e.g. 18768273362]
EMAIL:                      [e.g. hello@business.com]
PHONE:                      [display format: e.g. 876-827-3362]

INSTAGRAM_URL:              [or leave blank]
FACEBOOK_URL:               [or leave blank]
TIKTOK_URL:                 [or leave blank]
GOOGLE_BUSINESS_URL:        [Google Business Profile share link, or leave blank]
GOOGLE_REVIEW_CTA_URL:      [short link to leave a review, or leave blank]
GOOGLE_RATING:              [e.g. "4.9", or leave blank if no reviews yet]
GOOGLE_REVIEW_COUNT:        [e.g. "27", or leave blank]

BRAND_COLOR_PRIMARY:        [hex, deep & confident — e.g. #0B1F3A]
BRAND_COLOR_ACCENT:         [hex, complementary accent — e.g. #2E7BB8]
BRAND_COLOR_HIGHLIGHT:      [hex, sparingly-used punctuation colour — e.g. #C9A961]
LOGO_PATH:                  [/assets/logo.png]
FAVICON_PATH:               [/assets/favicon.png]

FONT_PAIRING:               [one of: editorial | modern-minimal | playful | luxury | warm-artisan | technical | soft-feminine]
                            ← see Section 4.2 Font Roster for guidance on matching industry

DOMAIN:                     [e.g. business.com]
```

**The WhatsApp prefilled message** (used everywhere a WhatsApp link appears) is:

```
Hi [OWNER_NAME], I'm reaching out from your website about [BUSINESS_NAME]. I'd love to [chat about your services | book a consultation | learn more].
```

Encode as URL parameter on every `wa.me` link: `https://wa.me/[WHATSAPP_NUMBER]?text=[URL_ENCODED_MESSAGE]`. Vary the verb block (`chat about your services` / `book a consultation` / `learn more`) by CTA location so analytics can distinguish sources later.

---

## 1. Hard Constraints (non-negotiable)

1. **Single HTML file.** This is a one-page site. Everything lives in `index.html`. Sections are anchor-linked, not separate pages. No client-side routing, no JS frameworks.
2. **Zero build tools.** Plain HTML + CSS + vanilla JS. Uploadable to GitHub Pages as static files.
3. **WCAG 2.2 Level AA compliance** — every section must pass the checklist in Section 10.
4. **Mobile-first, mobile-perfect.** 360px Android is the primary target. Animations that hurt mobile (parallax, heavy blur, large transforms) must be disabled or replaced under 768px.
5. **One centralised CTA strategy** — every action in the entire site funnels to the same place: either WhatsApp (default) or email, based on `CTA_MODE`. No competing CTAs, no distractions.
6. **No Lorem Ipsum, ever.** If the operator hasn't filled in copy, write plausible real copy using the variables block. Never ship placeholder text.
7. **Reusability over bespoke.** This is a template. Any creative choice that can't be turned off via CSS variables or swapped via the variables block is a mistake. When in doubt, make it swappable.
8. **`prefers-reduced-motion`** — every non-essential animation is wrapped in a media query respecting this.
9. **Single CSS file** at `assets/css/styles.css`. Single JS file at `assets/js/main.js`. No inline `<style>` except for page-specific JSON-LD schema.

---

## 2. The Page Structure (fixed order, every build)

The sections appear in this exact order in every instance of this template. This is not a suggestion — consistency is what makes it a template.

```
1.  Sticky Navigation                ← logo, anchor links, primary CTA button
2.  Hero                             ← H1, sub, dual CTA, background image carousel
3.  Social Proof Strip               ← Google rating + review count (if available) OR trust badges
4.  About / Story                    ← short narrative + owner photo
5.  Services / Offerings             ← 3–6 service cards with icons
6.  The Proof                        ← owner bio, credentials, "Why trust me" — the differentiation
7.  Testimonials                     ← real reviews, aggregate rating repeated, "Leave a review" CTA
8.  FAQ                              ← 8–12 accordion questions
9.  Final CTA Banner                 ← full-width, the money shot
10. Contact + Location               ← hours, address, map, contact methods
11. Footer                           ← logo, tagline, social, copyright
12. Floating CTA button              ← persistent WhatsApp/email float, mobile-prominent
```

Every section below has a specific, non-negotiable structure. Deviate only by content, never by order or purpose.

---

## 3. Section-by-Section Specification

### 3.1 Sticky Navigation
- Logo left (image + business name in display font)
- Anchor nav: `About · Services · Proof · Reviews · FAQ · Contact`
- Primary CTA button on the right — text matches `CTA_MODE` (e.g. "Message on WhatsApp" / "Email Us")
- Hamburger menu under 980px with slide-down panel
- `aria-current="location"` on the anchor for the section currently in viewport (use IntersectionObserver to set this dynamically)

### 3.2 Hero
- Full-viewport height (`min-height: 100svh`)
- **Background**: CSS-only crossfading image carousel (4 images, 32s cycle, staggered `@keyframes`) sitting BEHIND a semi-transparent overlay in `BRAND_COLOR_PRIMARY` at ~82% opacity. Images at 35% opacity. Effective visibility ~18% — atmospheric, not competitive with text.
- Eyebrow text (uppercase letter-spaced), H1 with italic emphasis span on 1–2 words, sub-paragraph
- Dual CTA: primary button (CTA_MODE action) + ghost button (scroll to `#services` or `#faq`)
- Pull-quote card floating to the right on desktop containing the `BUSINESS_TAGLINE` — becomes full-width below hero on mobile
- Subtle scroll cue at the bottom (vertical text "Scroll" with animated underline, hidden on mobile)

### 3.3 Social Proof Strip
Two variants — use whichever the operator has data for:
- **If Google rating exists:** Render as ★★★★★ `GOOGLE_RATING` · Based on `GOOGLE_REVIEW_COUNT` Google Reviews — linking to `GOOGLE_BUSINESS_URL`. Five solid stars in `BRAND_COLOR_HIGHLIGHT`, rating in large display font, count in small-caps eyebrow style.
- **If no Google rating yet:** Render three trust signals as small cards (e.g. "Locally Owned", "[X] Years Serving [LOCATION_CITY]", "By-Appointment Availability"). Pull specifics from the variables block.

### 3.4 About / Story
- Two-column grid: narrative left, owner photo right (reversed on mobile, image first)
- 2–3 paragraphs from `BUSINESS_LONG_DESCRIPTION`
- A 2×2 stat grid below the narrative (e.g. "Years in Business", "Clients Served", "Service Areas", "Specialisations") — populate from variables, hide any stat if no data
- End with a CTA link: "Work with [OWNER_NAME] →" pointing to `#final-cta`

### 3.5 Services / Offerings
- Section eyebrow + H2 + intro paragraph
- Card grid — 3 columns desktop, 2 columns tablet, 1 column mobile
- Each card: thin Font Awesome icon (free tier only — see Section 5), service name, 2-sentence description, subtle "Ask about this →" link that triggers a WhatsApp/email with a pre-filled message mentioning that specific service
- Hover lift: `translateY(-6px)` + soft navy shadow
- Cards keyboard-focusable (`tabindex="0"`), keyboard-activatable

### 3.6 The Proof — THE DIFFERENTIATOR SECTION
This is the critical section. The operator's core promise is that the business owner can solve the client's problem. Prove it.

- Asymmetric 2-column layout: owner photo (taller, image-right) + content (image-left)
- Eyebrow: "Meet [OWNER_NAME]"
- H2: positioned as authority statement (e.g. "Twenty years. Thousands of closings. Zero surprises.")
- `OWNER_BIO` content — 2-3 paragraphs of credentials, experience, specialisations, personal "why"
- A credentials strip below the bio — 3-4 pieces of proof: qualifications, years, awards, professional associations — each as a small horizontal card with icon and text
- Embedded pull-quote from the owner in large italic display font (their personal philosophy / mission statement) — e.g. "I don't take a client I can't help." Use variables block field `OWNER_PULL_QUOTE` if provided; else construct one from the bio.
- End with primary CTA button

### 3.7 Testimonials
- Eyebrow: "Client Voices" (or industry-appropriate variant)
- Repeat the aggregate rating badge from Section 3.3 at the top (intentional repetition — social proof compounds)
- Grid of 3–6 testimonial cards. Mobile: horizontal-snap scroll carousel (CSS `scroll-snap-type`), showing one at a time.
- Card: `fa-quote-left` icon in `BRAND_COLOR_ACCENT` at top-left, quote in italic display font, reviewer name + optional role beneath
- "Verified Google Review" attribution on each if sourced from Google
- **Leave-a-review CTA** directly beneath the grid: "Worked with us? We'd love to hear about your experience." with a button linking to `GOOGLE_REVIEW_CTA_URL`. Skip entirely if that field is blank.

### 3.8 FAQ — THE PAIN POINT SOLVER
This section is explicitly designed to reduce the volume of repetitive pre-sale questions the operator's clients receive.

- Eyebrow: "Questions & Answers"
- H2: "The questions we hear most often."
- Short intro: "Quick answers to what clients usually ask. If yours isn't here, just message us."
- Accordion using native `<details>` / `<summary>` for zero-JS accessibility. Custom-styled: gold plus/minus icon, smooth expand, border bottom on each row.
- **First pass — inject 8–10 assumed FAQs** based on `INDUSTRY` and `SERVICES`. Claude Code should write these using educated inference from the variables block. Template examples below — rewrite to the specific industry:

  Standard template questions that adapt to any business:
  1. How do I get started / book a consultation?
  2. How much does [primary service] cost? (Answer: range + "exact quote depends on scope, message us for specifics")
  3. How long does [primary service] take?
  4. Where are you located / do you offer remote / mobile services?
  5. What areas do you serve?
  6. What happens during the first meeting / consultation?
  7. Do you offer [payment plans / emergency appointments / after-hours availability]?
  8. What makes you different from [other X in area]?
  9. Do you work with [common client type for this industry]?
  10. What should I bring / prepare before we start?

- After the FAQ, insert a callout: "Still have questions? [CTA button linking to primary CTA]"
- **Second pass reminder**: When the operator provides a call transcript or notes from a conversation with the business owner, the FAQ block is the primary place to inject those refined, specific questions. Replace the assumed ones where the real ones contradict.

### 3.9 Final CTA Banner
The emotional money shot. Full-viewport-width dark section in `BRAND_COLOR_PRIMARY`.

- Centered content, generous vertical padding (`clamp(6rem, 12vw, 10rem)`)
- H2 in large display font, 2-sentence urgency-building paragraph
- Single giant primary CTA button — oversized by deliberate design
- Small supportive text below the button: phone number + email as fallback options

### 3.10 Contact + Location
- 2-column grid: info left, map right
- Left column: 4 info blocks with thin icons (Visit, Call/Message, Email, Hours). Each value is a clickable link where appropriate (`tel:`, `mailto:`, `wa.me`). Skip Address block entirely if business is home-based with no public address.
- Right column: embedded Google Maps iframe (lazy-loaded, `title` attribute). Skip entirely if no public address.
- For service-area-only businesses without a physical location, replace the map with a "Service Area" block listing parishes/cities served, styled as a pill grid.

### 3.11 Footer
- 3 or 4 columns depending on social links available
- Col 1: logo, tagline, 1-line description
- Col 2: quick links (same anchors as nav)
- Col 3: contact info condensed
- Col 4 (if social exists): social icon links with `aria-label` on each
- Bottom strip: `© [YEAR] [BUSINESS_NAME]. All rights reserved.` + a subtle disclaimer relevant to industry (optional, e.g. legal disclaimer for law; "results may vary" for beauty)

### 3.12 Floating CTA Button
- Fixed bottom-right, 60px desktop / 54px mobile
- Green (`#25D366`) for WhatsApp or `BRAND_COLOR_ACCENT` for email, matching `CTA_MODE`
- Single Font Awesome icon inside, white
- `aria-label` describing the action
- Disappears when Final CTA Banner is in viewport (IntersectionObserver) to avoid double-prompting
- Respects safe-area-inset on iOS

---

## 4. Brand & Visual Direction

### 4.1 CSS Design Tokens
Set every token as a CSS custom property on `:root`. This is what makes the template truly reusable.

```css
:root {
  --color-primary: [BRAND_COLOR_PRIMARY];
  --color-primary-deep: [20% darker than primary];
  --color-accent: [BRAND_COLOR_ACCENT];
  --color-accent-light: [15% lighter than accent];
  --color-highlight: [BRAND_COLOR_HIGHLIGHT];
  --color-ivory: #F7F4ED;
  --color-bone: #EFEAE0;
  --color-ink: #0A0A0A;
  --color-muted: #5C6B7A;
  --color-line: rgba(0, 0, 0, 0.1);

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;

  --shadow-lg: 0 30px 80px -20px rgba(0, 0, 0, 0.2);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);

  --radius: 2px;
  --container-max: 1240px;
}
```

### 4.2 Typography — The Font Pairing Roster

Seven pre-vetted pairings with distinct personalities. Match the pairing to the brand, not the other way around. The operator selects one via `FONT_PAIRING` in the Variables Block; Claude Code loads the correct Google Fonts link and sets the `--font-display` and `--font-body` custom properties accordingly.

**Universal rules (apply to every pairing):**
- Load via Google Fonts with `<link rel="preconnect">` and `display=swap`
- Fluid sizing: `h1 { font-size: clamp(2.6rem, 6.5vw, 5.2rem); }` — set ranges once in CSS, never hardcode sizes. Adjust the upper bound by 10–15% for condensed display faces.
- Text scalable — use `rem` everywhere for text, never `px`
- The italic of the display face is used for emphasis spans inside H1/H2 (`<em>`) when the face has a true italic cut — note which pairings do/don't below
- **Never use as primary:** Inter, Roboto, Arial, Open Sans, Poppins, system-ui — these are the generic-AI-site defaults and will kill the premium feel

**How to choose:** the pairing should reinforce the feeling the business owner wants a client to have walking in. A spa isn't "editorial." A law firm isn't "playful." A structural engineer isn't "soft-feminine." When in doubt, lean conservative — understatement ages better than statement.

---

#### Pairing 1 — `editorial` (DEFAULT)
**Personality:** mature, authoritative, literary, considered
**Best for:** law, finance, accounting, high-end real estate, therapy, wealth management, luxury services for established clientele, any profession where gravitas sells

```
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-body: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
```
Google Fonts: `Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter+Tight:wght@300;400;500;600`
Display weights: 500, 600 · Italic: YES (use for emphasis) · Body weights: 300/400/500/600

---

#### Pairing 2 — `modern-minimal`
**Personality:** clean, technical-but-warm, Scandinavian, confident without shouting
**Best for:** tech consultancies, modern architects, design studios, SaaS, premium contractors, interior designers leaning minimalist, product-led businesses

```
--font-display: 'Fraunces', Georgia, serif;
--font-body: 'DM Sans', -apple-system, sans-serif;
```
Google Fonts: `Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=DM+Sans:wght@300;400;500;600`
Display weights: 400, 600 · Italic: YES · Body weights: 300/400/500/600
Note: Fraunces has optical sizing — use larger `opsz` axis values (100+) for H1s by adding `font-variation-settings: 'opsz' 120;` to headings.

---

#### Pairing 3 — `playful`
**Personality:** friendly, energetic, approachable, still grown-up
**Best for:** kids' services, creative studios, party planning, bakeries, lifestyle brands, content creators, boutique fitness, anything where "fun" is a selling point but cheesy would kill it

```
--font-display: 'Recoleta', 'Fraunces', Georgia, serif;
--font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
```
Because Recoleta is not on Google Fonts, fall back to a close free alternative:
```
--font-display: 'Fraunces', Georgia, serif;  /* with opsz=144 for that rounded display feel */
--font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
```
Google Fonts: `Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700`
Display weights: 500, 700 · Italic: OPTIONAL · Body weights: 300/400/500/600/700
Note: soften the design vocabulary too — `--radius: 8px` instead of `2px`, warmer backgrounds, slightly larger border-radius on cards.

---

#### Pairing 4 — `luxury`
**Personality:** refined, unmistakably premium, aspirational, couture-adjacent
**Best for:** beauty salons, high-end spas, bespoke fashion, fine dining, luxury real estate, wedding planning, boutique hotels, jewellery, prestige services

```
--font-display: 'Playfair Display', 'Bodoni 72', Georgia, serif;
--font-body: 'Jost', -apple-system, sans-serif;
```
Google Fonts: `Playfair+Display:ital,wght@0,500;0,700;1,500&family=Jost:wght@300;400;500;600`
Display weights: 500, 700 · Italic: YES (essential to this pairing's elegance) · Body weights: 300/400/500/600
Note: Playfair has dramatic high-contrast strokes — this pairing needs generous tracking on H1s (`letter-spacing: -0.01em` or slight positive on smaller display sizes). Scale the H1 upper bound slightly larger: `clamp(3rem, 7vw, 5.8rem)`.

---

#### Pairing 5 — `warm-artisan`
**Personality:** handmade, rooted, human, a little vintage without being twee
**Best for:** cafes, coffee roasters, artisanal bakeries, craft makers, barbershops, tattoo parlours, small-batch producers, cottage industries, family businesses

```
--font-display: 'DM Serif Display', Georgia, serif;
--font-body: 'Outfit', -apple-system, sans-serif;
```
Google Fonts: `DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600`
Display weights: 400 only (it's a display-only face) · Italic: YES · Body weights: 300/400/500/600
Note: DM Serif Display is one-weight-only and maximally dramatic at large sizes — only use it for H1 and H2. For H3 and H4, use the body font at weight 600 for a hierarchical contrast.

---

#### Pairing 6 — `technical`
**Personality:** precise, engineered, trustworthy, factual without being cold
**Best for:** engineering firms, surveyors, medical practices, dentists, IT services, security firms, B2B services, inspections, laboratories

```
--font-display: 'Syne', 'Grotesk', sans-serif;
--font-body: 'Manrope', -apple-system, sans-serif;
```
Google Fonts: `Syne:wght@500;600;700;800&family=Manrope:wght@300;400;500;600;700`
Display weights: 600, 800 · Italic: NO (Syne has no italic — use weight contrast for emphasis instead) · Body weights: 300/400/500/600/700
Note: emphasis spans inside H1/H2 should use `font-weight: 800` rather than italic. This pairing uses no serifs — the personality comes from Syne's geometric-but-quirky letterforms.

---

#### Pairing 7 — `soft-feminine`
**Personality:** warm, elegant, considered, grown-up feminine (not bachelorette-party feminine)
**Best for:** aesthetics clinics, bridal services, florists, photographers, doulas, wellness coaches, boutique retail, lifestyle blogging, interior stylists

```
--font-display: 'Cormorant', Georgia, serif;
--font-body: 'Nunito Sans', -apple-system, sans-serif;
```
Google Fonts: `Cormorant:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Nunito+Sans:wght@300;400;500;600;700`
Display weights: 400, 500, 600 · Italic: YES (use liberally — this pairing is at its best with italic sub-heads) · Body weights: 300/400/500/600/700
Note: this is the lightest/airiest pairing. Offset with slightly heavier body weight as default (`font-weight: 400` with `font-weight: 500` for nav/UI) to keep readability. Warmer backgrounds (`--color-ivory: #FAF6F0`, `--color-bone: #F2ECE2`) pair naturally.

---

### 4.2.1 Fallback & Loading Strategy (all pairings)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="[full-pairing-url]&display=swap">
<link rel="stylesheet" href="[full-pairing-url]&display=swap">
```

`display=swap` is mandatory — it prevents invisible text flash and improves perceived load. Always include the system fallback chain in the CSS variable so pages remain readable if Google Fonts fails.

### 4.2.2 Swapping Pairings Mid-Build

If the operator decides the selected pairing doesn't fit after seeing the first pass, changing it should be a 3-line operation:
1. Update `FONT_PAIRING` value in the Variables Block
2. Replace the Google Fonts `<link>` in `<head>`
3. Update the `--font-display` and `--font-body` custom properties on `:root`

No other markup or CSS should reference specific font names — always go through the custom properties.

### 4.3 Motion Rules
- Scroll-reveal: opacity 0 → 1 + translateY(30px) → 0, 0.9s ease, IntersectionObserver triggered, staggered
- Hover lifts on cards: `translateY(-6px)` + soft shadow, 0.5s
- Nav underline on hover: width 0 → 100%, 0.4s
- Hero carousel: CSS-only `@keyframes` crossfade, 32s cycle, 4 images
- **No** parallax, marquee scrollers, typewriter effects, or cursor followers
- All motion wrapped in `@media (prefers-reduced-motion: no-preference)` or disabled by `@media (prefers-reduced-motion: reduce)`

### 4.4 Aesthetic Anchors
- Editorial. Mature. Confident. Restrained.
- `BRAND_COLOR_HIGHLIGHT` is a condiment — use for eyebrow text on dark sections, 32–40px horizontal accent lines, single decorative dots. Never buttons or large blocks.
- Generous whitespace. Asymmetric grids where they add elegance.
- Subtle noise/grain overlay on dark sections via SVG fractalNoise at low opacity.

---

## 5. Icons — Font Awesome Free Tier Only

Add to `<head>`:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">
```

Use **only** `fa-solid` and `fa-brands` prefixes. **Never** `fa-thin`, `fa-light`, `fa-duotone`, `fa-sharp` — those are Pro-only and fail silently.

Suggested icons by section:
- Services: pick one per service that matches the industry — e.g. `fa-house-chimney`, `fa-scissors`, `fa-utensils`, `fa-calculator`, `fa-dumbbell`, `fa-camera`, `fa-wrench`. If unsure, use `fa-check-to-slot` as a generic professional fallback.
- Proof credentials: `fa-award`, `fa-graduation-cap`, `fa-certificate`, `fa-clock-rotate-left`
- Contact: `fa-location-dot`, `fa-phone`, `fa-envelope`, `fa-clock`
- Social: `fa-brands fa-whatsapp`, `fa-brands fa-instagram`, `fa-brands fa-facebook-f`, `fa-brands fa-tiktok`
- Testimonials: `fa-solid fa-quote-left`
- Rating: `fa-solid fa-star`
- Hamburger: `fa-solid fa-bars` / `fa-solid fa-xmark`
- Floating CTA: `fa-brands fa-whatsapp` or `fa-solid fa-envelope`

If an icon renders as a square or question mark, the class is wrong or Pro-only. Swap for a solid free equivalent.

---

## 6. Stock Imagery Strategy

Unsplash CDN URLs (`images.unsplash.com/photo-...`) hotlink permissively under their license. Use them when the operator hasn't supplied owner/workspace photos.

Hero carousel default set (professional, industry-neutral):
```
https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80
https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80
https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80
https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80
```

For the owner photo placeholder when none is provided, use a neutral professional headshot from Unsplash with a descriptive alt text mentioning it's a stand-in. **Flag in a code comment** that this image must be swapped before launch.

Every `<img>` gets: descriptive `alt`, `loading="lazy"` (except hero's first image which is `loading="eager" fetchpriority="high"`), explicit `width` + `height` attributes to prevent CLS.

---

## 7. The CTA System (most important section)

The entire site exists to drive one action. Every CTA obeys these rules:

### 7.1 CTA Mode Resolution
- `CTA_MODE = whatsapp` (default): all primary CTAs open WhatsApp with the prefilled message
- `CTA_MODE = email`: all primary CTAs open `mailto:` with a prefilled subject and body

### 7.2 WhatsApp Link Construction
```
https://wa.me/[WHATSAPP_NUMBER]?text=[URL_ENCODED_MESSAGE]
```

The message varies by CTA location for analytics distinguishability. Use these exact prefills (URL-encode at build time):

- **Nav / Hero / Final Banner:** `Hi [OWNER_NAME], I'm messaging from your website. I'd like to learn more about [BUSINESS_NAME].`
- **Service cards:** `Hi [OWNER_NAME], I'm messaging from your website. I'd like to ask about your [SERVICE_NAME] service.`
- **FAQ "still have questions":** `Hi [OWNER_NAME], I'm messaging from your website. I have a question that isn't answered on your FAQ.`
- **Floating button:** `Hi [OWNER_NAME], I'm messaging from your website. I'd like to chat.`

All open in a new tab (`target="_blank"` + `rel="noopener"`).

### 7.3 Email Link Construction
```
mailto:[EMAIL]?subject=[ENCODED_SUBJECT]&body=[ENCODED_BODY]
```

Subject: `Enquiry from [BUSINESS_NAME] website`
Body: `Hi [OWNER_NAME],%0D%0A%0D%0AI'm reaching out from your website about [specific context].%0D%0A%0D%0A[leave space for user]%0D%0A%0D%0AThanks,%0D%0A`

### 7.4 CTA Density
Every section except the Social Proof Strip contains at least one CTA. Specifically:
- Hero: 1 primary + 1 ghost
- About: 1 inline text link
- Services: per-card links + 1 section-level button
- Proof: 1 primary button
- Testimonials: 1 leave-review link + site-wide CTA (via float)
- FAQ: 1 "still have questions" button
- Final CTA Banner: 1 oversized primary + phone/email support line
- Contact: clickable phone/email/WhatsApp in info blocks
- Floating button: persistent throughout

Count the CTAs on the page before shipping. Under 8 total = too few. Over 14 = cluttered.

### 7.5 CTA Button Copy Bank
Rotate these naturally so no button says the same thing twice in a row:
- "Message on WhatsApp"
- "Start the Conversation"
- "Ask a Question"
- "Book Your Consultation"
- "Get in Touch"
- "Let's Talk"
- "Reach Out"

For email mode, swap verbs accordingly: "Email Us", "Send an Email", "Write to Us", etc.

---

## 8. SEO Strategy (one-page specific)

### 8.1 Meta
- `<title>`: `[BUSINESS_NAME] — [ONE-LINE DESCRIPTION] in [LOCATION_CITY], [LOCATION_COUNTRY]`
- `<meta name="description">`: 150–160 chars, includes primary service + location + benefit
- Canonical URL
- Full Open Graph + Twitter card set
- `theme-color` meta matching `BRAND_COLOR_PRIMARY`

### 8.2 Schema (JSON-LD in `<head>`)
- `LocalBusiness` (or industry-specific subtype: `LegalService`, `BeautySalon`, `FoodEstablishment`, `AccountingService`, etc.) with NAP, geo, openingHours, priceRange, areaServed, sameAs (social URLs), aggregateRating if rating data exists
- `Person` schema for the owner linked from the Proof section
- `FAQPage` schema mirroring the FAQ section content
- `BreadcrumbList` (just Home → BusinessName for one-pagers)

### 8.3 Keyword targeting
Primary: `[primary service] [city]`, `[primary service] [country]`, `[business name]`
Long-tail: infer from industry + services — e.g. "how much does [service] cost [city]", "best [industry] near [city]"

Write copy with these keywords naturally distributed — never stuffed. Each section eyebrow, H2, and first paragraph are the high-weight slots.

### 8.4 Files at root
- `robots.txt` — allow all, points at sitemap
- `sitemap.xml` — for a one-pager, lists only the root URL (plus any anchor fragments Google might surface)
- `CNAME` — contains the domain
- `favicon.png` + apple-touch-icon

---

## 9. Accessibility — WCAG 2.2 AA Checklist

Run this checklist before declaring the site done. Every item:

- [ ] Skip-to-main-content link as first focusable element
- [ ] All images have meaningful `alt` (decorative = `alt=""` + `aria-hidden="true"`)
- [ ] Form fields have associated `<label>` elements (no placeholder-as-label)
- [ ] Form fields have appropriate `autocomplete` attributes
- [ ] Colour contrast ≥ 4.5:1 body / ≥ 3:1 large text & UI. Verify `BRAND_COLOR_PRIMARY` against ivory backgrounds — adjust `--color-primary-deep` if needed.
- [ ] Visible focus ring on every interactive element (`:focus-visible` with `BRAND_COLOR_ACCENT` outline, offset 3px)
- [ ] Logical tab order matches visual order
- [ ] All functionality keyboard-accessible
- [ ] Mobile menu uses `aria-expanded` and `aria-controls`
- [ ] FAQ uses native `<details>`/`<summary>` (works without JS)
- [ ] Headings in logical order, no skipped levels
- [ ] `<html lang="en">` (or appropriate lang)
- [ ] Unique descriptive `<title>`
- [ ] Colour is never the sole conveyor of meaning
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] `prefers-reduced-motion` respected throughout
- [ ] Text scalable — `rem` for text, never `px`
- [ ] No autoplay media
- [ ] Map iframe has `title` attribute and `loading="lazy"`
- [ ] `aria-current` set dynamically on the active nav link

---

## 10. Mobile-First Implementation Rules

- Write CSS mobile-first; use `@media (min-width: 768px)` and `(min-width: 1024px)` to scale up
- Breakpoints: 540px, 768px, 980px, 1200px
- Hamburger under 980px, slide-down panel, full-width tap targets
- Hero collapses to single column under 980px, pull-quote card moves below H1 and CTAs
- Services: 3 cols → 2 cols (768px) → 1 col (540px)
- Testimonials: static grid desktop → horizontal scroll-snap carousel on mobile
- Floating CTA: 54px mobile, honours `env(safe-area-inset-bottom)` for iOS
- Forms: full-width inputs, 16px font minimum to prevent iOS zoom
- Disable `background-attachment: fixed` (broken on iOS)
- Disable scroll-reveal translate on mobile (just fade-in)
- Verify horizontal overflow is zero on every viewport from 320px up

---

## 11. The File Structure

```
[project-root]/
├── index.html                 ← the whole site
├── CNAME                      ← contains: [DOMAIN]
├── robots.txt
├── sitemap.xml
├── 404.html                   ← branded 404, single CTA back to home
├── assets/
│   ├── css/styles.css         ← all styles
│   ├── js/main.js             ← nav, IntersectionObserver reveals, footer year, active-nav tracking
│   ├── logo.png
│   ├── favicon.png
│   └── images/                ← owner photo, any client-supplied imagery
└── README.md                  ← deployment notes, DNS, operator handoff
```

---

## 12. Build Order

Execute in this sequence. Do not skip ahead.

1. **Fill in the Variables Block** at the top of this document (operator does this, not Claude Code)
2. Create `assets/css/styles.css` — establish all design tokens, base typography, shared components
3. Create `assets/js/main.js` — nav toggle, reveal observer, footer year, active-nav tracking, floating CTA hide-on-final-banner
4. Build `index.html` in section order from Section 3 (Nav → Hero → Social Proof → About → Services → Proof → Testimonials → FAQ → Final CTA → Contact → Footer → Floating CTA)
5. After each section: verify it passes the accessibility checklist (Section 9) and mobile rules (Section 10)
6. Write 404.html matching the site styling
7. Write `robots.txt` and `sitemap.xml`
8. Write `README.md` with DNS / Formspree / GA4 handoff notes
9. Final QA pass: run the 16-point list in Section 13

---

## 13. Final QA Pass — 16-point check

Before declaring done:

1. **Text collision** at 360px, 375px, 390px, 412px, 768px, 1024px, 1440px. No overlap anywhere.
2. **Font Awesome render** — every icon visible (no squares/question marks). If any fail, swap for a free equivalent.
3. **Every CTA functional** — click each one, verify it opens the correct WhatsApp/email destination with the right prefilled message.
4. **Carousel doesn't overflow** on any viewport — `.hero` has `overflow: hidden`.
5. **Floating button doesn't collide** with the Final CTA Banner (hide-on-intersection works).
6. **Form labels aligned** and associated (if any forms exist on a variant).
7. **Focus rings visible** on every interactive element in both light and dark sections.
8. **Map iframe** has `title`, `loading="lazy"`, no horizontal overflow on mobile.
9. **`aria-current`** updates as you scroll through sections.
10. **Schema validation** — paste JSON-LD into Rich Results Test (mental check): no missing required fields, FAQPage mirrors actual FAQ content.
11. **Meta description length** 140–160 chars.
12. **No duplicate IDs** on the page.
13. **No TODO/FIXME/Lorem** copy remaining.
14. **Prefers-reduced-motion** honoured — test with browser setting toggled.
15. **WhatsApp prefilled messages** — URL-encoded correctly, contain the "from your website" phrase, vary by location.
16. **404 page works** and matches site styling.

---

## 14. The Operator's Second-Pass Workflow

This template is designed to be built in two passes:

**First pass** (first delivery to client, fastest possible turnaround):
- Variables block filled from intake form / initial brief
- FAQs injected as 8–10 assumed questions based on industry & services
- Testimonials use any reviews available or stand-in "Coming Soon" placeholder
- Owner bio uses whatever content operator has; flags gaps in code comments

**Second pass** (after operator receives call transcript, full photo set, real testimonials from client):
- FAQ block rewritten with real questions and answers from the transcript — this is the single highest-value refinement
- Assumed questions are replaced only where the transcript contradicts them; otherwise kept as supplementary
- Testimonials updated with real quotes
- Owner bio polished with specifics from the conversation
- Images swapped from Unsplash to client-supplied

Structure this so the second pass is a find-and-replace exercise, not a rebuild. Keep all content in the variables block wherever possible so the HTML itself barely changes between passes.

---

## 15. Out of Scope

Do not invent:
- E-commerce, payment processing, or cart functionality
- Client portals or login systems
- Appointment booking systems (Calendly etc.) — the central CTA is the booking mechanism
- Live chat widgets — the floating WhatsApp button is the live channel
- Multi-language support
- Dark mode toggle
- Newsletter systems

---

## 16. The Pact

The operator's differentiation is **ridiculous turnaround time without sacrificing quality**. That's only possible if this template holds its shape across every client. Every bespoke choice adds hours. Every templatised choice saves them.

When you're tempted to deviate because "it would look better," pause. If the deviation can be expressed as a CSS variable or variables-block field, express it that way and keep the structure. If it truly can't, flag it to the operator rather than silently forking the template.

Premium, restrained, fast. Read this file twice. Build it once.
