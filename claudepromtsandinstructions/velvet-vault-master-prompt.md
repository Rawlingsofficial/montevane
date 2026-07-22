# THE VELVET VAULT - Master Site Prompt
## Ultra-Premium Luxury Multi-Brand Handbag Boutique

---

## EXECUTIVE BRIEF

Build an ultra-premium luxury multi-brand handbag eCommerce website that rivals the world's finest luxury retailers. This is an **exclusive luxury boutique** (not a marketplace) specializing only in authentic handbags from 12 of the world's most prestigious fashion houses.

**Target Aesthetic:** Fusion of high-end fashion boutique + luxury art gallery + premium jewelry showroom + five-star luxury hotel.

---

## DESIGN SYSTEM

### Color Palette (Strict)
- **Primary Background:** Pure White (#FFFFFF)
- **Secondary Background:** Warm Ivory (#FAF8F5)
- **Primary Text:** Rich Black (#111111)
- **Secondary Text:** Soft Charcoal (#5A5A5A)
- **Borders:** Very Subtle (#ECECEC)
- **Accent:** Champagne Gold (#C8A96A)
- **Buttons:** Black (#111111)
- **Button Text:** White (#FFFFFF)
- **Hover State:** Champagne Gold (#C8A96A)
- **Dark Footer:** Deep Black (#0D0D0D)

### Typography (Web Optimized)
- **Headlines (H1-H3):** Elegant Serif (Cormorant Garamond, Adobe Caslon, or Playfair Display)
- **Body Text:** Modern Luxury Sans Serif (Inter, Poppins, or Outfit)
- **Line Height:** 1.6–1.8 for readability
- **Font Weights:** Thin (200–300) for premium feel
- **Letter Spacing:** +0.5px to +1px for luxury
- **Magazine Editorial Quality**

### Spacing & Layout
- Ultra Minimal aesthetic
- Large white spaces between sections
- Premium breathing room (40px–80px section gaps)
- Perfect typography hierarchy
- No clutter whatsoever
- Every pixel feels expensive
- Responsive: Mobile (375px) → Desktop (1920px+)

### Animations & Interactions
- Apple-level smoothness (60fps)
- Louis Vuitton / Hermès level polish
- Buttery smooth transitions (200–400ms easing)
- Subtle hover effects (no jarring changes)
- Smooth page transitions
- Glass effects only where tasteful
- Premium loading animations
- Micro-interactions on all buttons

### Images
- **Dominate the experience** (large, editorial)
- **Photorealistic luxury fashion campaign quality**
- Perfect lighting, no AI artifacts
- Real stitching, real leather, real hardware
- No fake textures, no plastic appearance
- Properly optimized for web (WebP, lazy loading, responsive srcset)

---

## NAVIGATION ARCHITECTURE

### Header
- Transparent on hero section
- Becomes white on scroll
- Sticky on mobile
- Elements: Logo (centered), Search, Wishlist, Account, Shopping Bag
- Country & Currency selectors
- Mega menu with brand previews

### Main Navigation
1. **Home** → Hero + Featured Collections
2. **New Arrivals** → Latest products with editorial styling
3. **Brands** → 12 brand pages (immersive gallery experience)
4. **Collections** → Curated thematic collections
5. **About** → Brand story, craftsmanship, luxury experience
6. **Journal** → Editorial blog, luxury lifestyle content
7. **Contact** → Concierge support

### Brands (12 Total)
Hermès | Chanel | Louis Vuitton | LOEWE | Gucci | Prada | Saint Laurent | Dior | Celine | Burberry | Givenchy | Chloé

---

## HOMEPAGE SECTIONS

### 1. Hero Section
- Massive cinematic luxury editorial photography
- Elegant headline (thin typography, large)
- Minimal subheading
- Single premium CTA button
- Very subtle motion/parallax
- Full-width responsive image

### 2. Featured Collections
- Large luxury cards (hover zoom effect)
- Magazine-style grid layout
- Rich imagery
- Elegant typography overlay

### 3. Shop by Brand
- Premium logo grid (12 brands)
- Minimal spacing, lots of white space
- Elegant hover animations
- Direct navigation to brand pages

### 4. Best Sellers / New Arrivals
- Luxury product cards
- Huge photography
- No clutter
- Quick add to cart
- Wishlist toggle
- Premium hover effects
- Price, brand, name only

### 5. Editorial Section
- Luxury campaign photography
- Elegant typography
- Minimal storytelling
- Link to Journal/Blog

### 6. Why Shop With Us
- **Authenticity Guaranteed** – Every bag authenticated
- **Secure Worldwide Delivery** – Premium packaging, tracking
- **Luxury Packaging** – Unboxing experience
- **Personal Concierge** – Dedicated customer care

### 7. Newsletter
- Minimal form (email input only)
- Premium imagery background
- Generous copy space

### 8. Footer
- Beautiful luxury footer (dark background #0D0D0D)
- Newsletter section
- Store information
- Customer Care links
- Shipping / Returns / Privacy / Terms
- Social: TikTok only (elegant icon)
- Thin typography, champagne gold hovers
- Web optimized, fast load

---

## PRODUCT PAGE EXPERIENCE

### Gallery Section
- Large hero image (main product photo)
- Related images carousel/grid below
- Fullscreen zoom on hover
- Gallery thumbnails for quick navigation
- Responsive: 1-column mobile, 2-column tablet, hero-only desktop

### Product Details
- Brand name (champagne gold accent)
- Product name (elegant serif, large)
- Price (rich black)
- Availability status
- Quick Add to Cart button
- Wishlist toggle
- Share buttons (minimal, elegant)

### Product Information (Accordions)
- **Description** → Elegant product storytelling
- **Details** → Materials, dimensions, weight
- **Shipping** → Worldwide, delivery times
- **Authenticity** → Certification details
- **Returns** → Easy 30-day returns policy

### Related Products
- Minimal carousel
- Same brand products
- Premium spacing
- No autoscroll

---

## ADMIN BACKEND STRUCTURE

### Product Upload Interface
- **Main Image Upload:**
  - Drag & drop or file picker
  - Preview before save
  - Auto-optimize for web (WebP, responsive sizes)
  - Label: "Main Product Photo"

- **Related Images (4–5 additional):**
  - Sequential upload field
  - Drag to reorder
  - Individual delete buttons
  - Preview grid
  - Labels: "Angle Shot", "Detail/Interior", "Side View", "Back View", "Lifestyle"

- **Product Information Fields:**
  - Brand (dropdown: 12 brands)
  - Product Name
  - SKU
  - Price (USD)
  - Description (rich text editor)
  - Materials (text)
  - Dimensions (W × H × D)
  - Weight
  - Color
  - Availability (In Stock / Pre-Order / Sold Out)
  - Collection (dropdown)

- **Contact Integration:**
  - WhatsApp Number field (E.164 format, e.g., +237XXXXXXXXX)
  - Display on product page: "Contact us on WhatsApp"
  - Generate WhatsApp link for inquiries

- **SEO Fields:**
  - Meta title
  - Meta description
  - Slug (auto-generate from product name)

### Dashboard Features
- Product inventory overview
- New arrivals management
- Collection management
- Order tracking (basic)
- Customer inquiries log
- Analytics overview (traffic, conversions, top products)

### Authentication
- Secure admin login (email + password)
- JWT token-based sessions
- Role-based access (Admin only for MVP)

---

## TECHNICAL STACK

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (custom config matching color palette)
- **Animation:** Framer Motion + GSAP
- **Components:** shadcn/ui (customized for luxury aesthetic)
- **State Management:** React Query (TanStack Query)
- **Database:** Supabase (PostgreSQL)
- **Image Optimization:** Next.js Image, WebP conversion, lazy loading
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend (newsletter, order confirmations)
- **Payment:** Stripe (secure checkout)
- **Hosting:** Vercel (optimal Next.js deployment)
- **CDN:** Vercel Edge Network
- **Analytics:** Vercel Analytics + Posthog (optional)
- **SEO:** Next.js built-in SEO, structured data (JSON-LD)

---

## PERFORMANCE REQUIREMENTS

- **Core Web Vitals:** All green (LCP, FID, CLS)
- **Page Load:** <2s on fast 3G, <1s on fiber
- **Lighthouse Score:** 90+ across all metrics
- **Image Optimization:** WebP with JPG fallback, responsive srcset
- **Lazy Loading:** Intersection Observer for below-fold images
- **Caching:** Aggressive browser caching, Vercel edge caching
- **Compression:** Gzip + Brotli

---

## ACCESSIBILITY

- WCAG 2.1 Level AA compliance
- Semantic HTML5 markup
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios ≥4.5:1
- Alt text for all product images
- Focus indicators visible
- Mobile touch targets ≥48×48px

---

## MOBILE EXPERIENCE

- Responsive design (mobile-first)
- Touch-friendly buttons & spacing
- Optimized navigation (hamburger menu)
- Fast image loading (low bandwidth friendly)
- Readable text sizes (minimum 16px)
- Thumb-zone optimized buttons
- Simplified checkout (one-tap Apple Pay / Google Pay)

---

## DEPLOYMENT CHECKLIST

- [ ] Environment variables configured (.env.local)
- [ ] Supabase database migrations run
- [ ] Stripe keys set up
- [ ] Image CDN configured
- [ ] SSL certificate active
- [ ] DNS records configured
- [ ] Robots.txt & sitemap.xml generated
- [ ] Google Analytics / Tag Manager installed
- [ ] Email templates tested
- [ ] Admin dashboard secured
- [ ] Payment processing tested
- [ ] Backup strategy in place

---

## BRAND POSITIONING

**The Velvet Vault** is an **independent luxury multi-brand boutique**, not affiliated with any fashion house. Position as:
- Carefully curated selection of world's finest handbags
- Expert authentication & quality assurance
- Exclusive access to rare & limited editions
- Personal concierge service
- Premium customer experience
- Timeless elegance meets modern convenience

---

## SUCCESS METRICS

- Page load time <2s
- Mobile conversion rate >2%
- Customer satisfaction >4.8/5
- Product authenticity trust score >95%
- Newsletter signup rate >15%
- Return visitor rate >40%
- Average order value >$2,500
- Cart abandonment <65%

---

**End Master Prompt**
