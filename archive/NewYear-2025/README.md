# Christmas 2024 Promotion Archive

This folder contains the Christmas promotional materials from December 2025.

## Contents

- **promo-popup.tsx** - React component for the Christmas promotional popup
- **christmas-promo.png** - Christmas promotional image (10% discount offer)

## How to Reactivate for Next Year

1. Copy `promo-popup.tsx` back to the `components/` folder
2. Copy `christmas-promo.png` back to the `public/` folder
3. In `app/page.tsx`, add the import:
   ```typescript
   import { PromoPopup } from "@/components/promo-popup"
   ```
4. In `app/page.tsx`, add the component inside the main return:
   ```tsx
   <PromoPopup />
   ```

## Notes

- The popup appears 1.5 seconds after page load
- Users can minimize it to a floating button
- Update the image and text as needed for the new promotion

