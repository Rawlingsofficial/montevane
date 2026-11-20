# Montévane image guide

Every image on the storefront shows a real piece we list. No generated or
stock imagery: it misrepresents the stock and puts Merchant Center at risk.

## Where images come from

| Folder | What | Built by |
| --- | --- | --- |
| `public/images/gallery/` | Page banners: real products cut from their photos, on stone plinths in a quiet gallery. `<id>.webp` (desktop, pieces right) and `<id>_m.webp` (phone, pieces low). `loupe-*` are close-ups cut from product photos. | `node --env-file=.env.local scripts/compose-gallery.mjs` |
| `public/images/showcase/` | Portrait still lifes for the home tiles and mega menu. | `node --env-file=.env.local scripts/compose-showcase.mjs` |
| `public/images/web_optimized/` | Logos only. | — |
| Product photos | Uploaded with each product (R2). | admin |

Re-run the two scripts when stock changes; `ONLY=home-hero,cat-watches` limits
a run. Which products each scene shows is in `lib/catalog/gallery.json` and
`lib/catalog/showcase.json` (used for alt text and the hero's "On view" placard).

## Choosing pieces

- Scenes, layouts and piece pools are at the top of `scripts/compose-gallery.mjs`.
- `pins` fixes a scene's pieces by slug (the home hero's three icons).
- The picker prefers pieces not yet used in other scenes, so banners don't repeat.
- All-white pieces are skipped (they vanish on ivory), except the Himalaya.

## Own photography (to come)

Photos we take ourselves — the Miami space, packaging, a piece being inspected —
are welcome. Keep them natural, on light backgrounds, and never with a
lookalike or unlisted piece.
