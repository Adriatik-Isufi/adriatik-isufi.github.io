# Project Documentation

## Mobile Performance Optimization

- **Description:** Reduced mobile LCP and initial network work with responsive hero images, deferred analytics download, on-demand EmailJS loading, lazy video sources, optimized logo assets, and DOM-based scroll reveals.
- **Location:** `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `scripts/optimize-images.mjs`.
- **Configuration:** `npm run build` and `npm run dev` generate ignored assets under `public/optimized/`.
- **Interactions:** Contact submissions retain the existing EmailJS service, template, and public key. Analytics calls queue before the deferred Google script loads. Video sources attach only near the viewport.
