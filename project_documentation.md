# Project Documentation

## Mobile Performance Optimization

- **Description:** Reduced mobile LCP and initial network work with responsive AVIF/WebP hero images, inlined critical CSS, early font discovery, delayed analytics download, on-demand EmailJS loading, lazy video sources, optimized logo assets, deferred below-the-fold rendering, and observer-based scroll behavior. A local production Lighthouse mobile run scored 95 (LCP 2.9s, FCP 0.9s, TBT 13ms, CLS 0).
- **Location:** `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `components/reviews-section.tsx`, `scripts/optimize-images.mjs`, `scripts/optimize-critical-css.mjs`.
- **Configuration:** `npm run build` generates ignored image variants under `public/optimized/`, exports the static site, and post-processes exported HTML to inline critical CSS and preload the generated Latin font. `npm run dev` generates the image variants only.
- **Interactions:** Contact submissions retain the existing EmailJS service, template, and public key. Analytics calls queue immediately; the Google bundle loads on first interaction or after ten seconds. Video sources attach only near the viewport. Sections below the hero use `content-visibility: auto` and render normally as the browser approaches them.
