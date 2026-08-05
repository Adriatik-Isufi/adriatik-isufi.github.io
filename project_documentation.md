# Project Documentation

## Mobile Performance Optimization

- **Description:** Reduced mobile LCP and initial network work with responsive AVIF/WebP hero images, inlined critical CSS, early font discovery, delayed analytics download, on-demand EmailJS loading, lazy video sources, optimized logo assets, deferred below-the-fold rendering, and observer-based scroll behavior. A local production Lighthouse mobile run scored 95 (LCP 2.9s, FCP 0.9s, TBT 13ms, CLS 0).
- **Location:** `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `components/reviews-section.tsx`, `scripts/optimize-images.mjs`, `scripts/optimize-critical-css.mjs`.
- **Configuration:** `npm run build` generates ignored image variants under `public/optimized/`, exports the static site, and post-processes exported HTML to inline critical CSS and preload the generated Latin font. `npm run dev` generates the image variants only.
- **Interactions:** Contact submissions retain the existing EmailJS service, template, and public key. Analytics calls queue immediately; the Google bundle loads on first interaction or after ten seconds. Video sources attach only near the viewport.

## Scroll and Overlay Regression Fix

- **Description:** Reverted the `content-visibility: auto` optimization on below-the-fold sections. It caused two regressions: navigation anchors stopped part-way because unrendered sections reported a 900px placeholder height while the smooth scroll was in flight, and the success-story and review overlays were clipped inside their section because the implied `contain: paint` turns the section into the containing block for `position: fixed` descendants. Anchor targets now clear the fixed header via `scroll-padding-top` instead.
- **Location:** `app/globals.css`.
- **Configuration:** `scroll-padding-top: 4.5rem` on `html`, matching the 4rem fixed header plus spacing. Update it if the header height changes.
- **Interactions:** `scrollToSection()` in `app/page.tsx` uses `element.scrollIntoView()`, which honours `scroll-padding-top`, so no per-section `scroll-mt` classes are needed. The remaining performance work (lazy images/videos/Lottie, deferred analytics, generated image variants, inlined critical CSS) is unaffected.

## PWA Manifest and Content Security Policy Fixes

- **Description:** Removed the manifest's references to `/favicon.svg` and `/apple-touch-icon.png`, neither of which exists in `public/`, which produced a 404 and a Chrome "Error while trying to use the following icon from the Manifest" warning. Added a padded maskable PWA icon, allow-listed the Google Ads conversion hosts that the `AW-*` tag needs, and paired the deprecated `apple-mobile-web-app-capable` meta with the standard `mobile-web-app-capable`.
- **Location:** `public/manifest.json`, `app/layout.tsx`, `scripts/optimize-images.mjs`.
- **Configuration:** The manifest points at build-generated `public/optimized/logo-blue-180.png` and `public/optimized/icon-maskable-512.png`. The maskable icon insets the logo to the centre 60% on an opaque background so Android's mask cannot crop it. The CSP `script-src` allows `googleads.g.doubleclick.net` and `www.googleadservices.com`; `frame-src` allows `td.doubleclick.net` and `www.googletagmanager.com`.
- **Interactions:** Because `public/optimized/` is git-ignored, both icons are produced by `scripts/optimize-images.mjs` during `npm run build`; adding manifest icons means adding them to that script too. The remaining `ad.doubleclick.net` `ERR_BLOCKED_BY_CLIENT` console entry comes from client-side ad blockers and is not fixable from the site.
