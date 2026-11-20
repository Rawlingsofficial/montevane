# The Velvet Vault - Web Asset Guide

This package contains high-end luxury fashion photography assets optimized for web development.

## Folder Structure
- `web_optimized/`: Contains WebP images in two sizes:
  - `[name].webp`: Desktop-optimized (max 1920px width, 80% quality).
  - `[name]_mobile.webp`: Mobile-optimized (max 768px width, 75% quality).
- `raw/`: Original high-resolution PNG generation results.

## Asset Catalog

### 1. Homepage & Layout
- `hero_1` to `hero_4`: Homepage hero banners (16:9).
- `about_boutique`: About Us page header.
- `newsletter_bg`: Email/Newsletter background with copy space.
- `footer_bg`: Dark textured marble for footer background.

### 2. Brand Banners (16:9)
- `banner_hermes`, `banner_chanel`, `banner_lv`, `banner_loewe`, `banner_gucci`, `banner_prada`, `banner_ysl`, `banner_dior`, `banner_celine`, `banner_burberry`, `banner_givenchy`, `banner_chloe`.

### 3. Product & Collection
- `product_front`, `product_45deg`, `product_side`, `product_interior`: Standard product detail angles.
- `collection_curated`, `collection_monochrome`: Featured collection banners (1:1).
- `feature_card_1`, `feature_card_2`: Individual product feature cards (1:1).

### 4. Lifestyle & Editorial
- `lifestyle_1` to `lifestyle_3`: Square lifestyle shots for blog/social.
- `editorial_setup`: Landscape editorial workspace shot.

## Implementation Tips
- Use `<picture>` tags to serve responsive WebP images.
- Set `loading="lazy"` for all images except the primary Hero.
- All images follow a consistent "Hasselblad 100MP" luxury aesthetic for brand coherence.
