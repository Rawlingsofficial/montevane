# THE VELVET VAULT - Complete Build & Deployment Guide
## Claude Code CLI Ready | Production-Grade Luxury eCommerce

---

## QUICK START (Claude Code CLI)

### Prerequisites
```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Check installation
claude --version
```

### Project Initialization
```bash
# Clone repo or create new project
cd /path/to/velvet-vault
claude init

# Install dependencies
npm install
npm install next typescript tailwindcss framer-motion gsap @supabase/supabase-js react-hook-form zod stripe @stripe/react-stripe-js @stripe/stripe-js next-image-export-optimizer
npm install --save-dev @types/node @types/react sharp
```

### Environment Setup
Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[pk_live_...]
STRIPE_SECRET_KEY=[sk_live_...]
STRIPE_WEBHOOK_SECRET=[whsec_...]

# Resend (Email)
RESEND_API_KEY=[re_...]

# Image Processing
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[cloud-name]
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=[preset]

# Admin/Security
NEXTAUTH_SECRET=[generate with: openssl rand -base64 32]
ADMIN_EMAIL_WHITELIST=admin@velvetvault.com

# Domain
NEXT_PUBLIC_SITE_URL=https://velvetvault.com
NODE_ENV=production
```

### Run Locally
```bash
npm run dev
# Open http://localhost:3000
# Admin: http://localhost:3000/admin
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Connect project
vercel link

# Deploy
vercel env pull          # Pull env vars
vercel deploy            # Deploy staging
vercel --prod            # Deploy production

# View logs
vercel logs
```

---

## PROJECT STRUCTURE

```
velvet-vault/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, providers)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + Tailwind
│   │
│   ├── (public)/
│   │   ├── brands/
│   │   │   ├── page.tsx           # Brands showcase
│   │   │   └── [brand]/page.tsx   # Individual brand pages
│   │   ├── products/
│   │   │   ├── page.tsx           # Product listing / search
│   │   │   └── [slug]/page.tsx    # Product detail page
│   │   ├── collections/
│   │   │   ├── page.tsx           # Collections
│   │   │   └── [id]/page.tsx      # Collection detail
│   │   ├── journal/
│   │   │   ├── page.tsx           # Blog/journal listing
│   │   │   └── [slug]/page.tsx    # Blog post
│   │   ├── about/page.tsx         # About page
│   │   └── contact/page.tsx       # Contact page
│   │
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Admin layout (sidebar)
│   │   │   ├── page.tsx           # Admin dashboard
│   │   │   ├── login/page.tsx     # Admin login
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       # Products inventory
│   │   │   │   ├── new/page.tsx   # Create product
│   │   │   │   └── [id]/edit/page.tsx  # Edit product
│   │   │   ├── collections/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── middleware.ts          # Auth guard for /admin routes
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── products/
│   │   │   ├── route.ts           # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       ├── route.ts       # GET, PUT, DELETE (single)
│   │   │       ├── duplicate/route.ts
│   │   │       └── analytics/route.ts
│   │   ├── images/
│   │   │   ├── upload/route.ts    # File upload handler
│   │   │   └── [id]/route.ts      # DELETE image
│   │   ├── collections/route.ts
│   │   ├── orders/route.ts
│   │   └── analytics/route.ts
│   │
│   └── error.tsx                  # Global error boundary
│
├── components/
│   ├── common/
│   │   ├── Navbar.tsx             # Main navigation
│   │   ├── Footer.tsx
│   │   ├── Header.tsx             # Sticky header
│   │   ├── SearchBar.tsx
│   │   ├── Cart.tsx               # Shopping cart drawer
│   │   ├── Wishlist.tsx
│   │   └── Newsletter.tsx          # Newsletter signup
│   │
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedCollections.tsx
│   │   ├── BrandShowcase.tsx
│   │   ├── BestSellers.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── EditorialSection.tsx
│   │   └── WhyShopWithUs.tsx
│   │
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductAccordion.tsx
│   │   ├── RelatedProducts.tsx
│   │   └── AddToCart.tsx
│   │
│   ├── admin/
│   │   ├── AdminNav.tsx            # Admin sidebar
│   │   ├── ProductForm.tsx         # Reusable form for create/edit
│   │   ├── ImageUploader.tsx       # Main + related images upload
│   │   ├── ProductTable.tsx        # Inventory list
│   │   ├── OrderTable.tsx
│   │   ├── AnalyticsCards.tsx
│   │   ├── AnalyticsChart.tsx
│   │   ├── CollectionForm.tsx
│   │   └── SettingsForm.tsx
│   │
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── card.tsx
│       ├── modal.tsx
│       ├── tabs.tsx
│       ├── accordion.tsx
│       ├── form.tsx
│       ├── dropdown-menu.tsx
│       ├── toast.tsx
│       └── skeleton.tsx
│
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── supabase-admin.ts          # Admin client (service role)
│   ├── stripe.ts                  # Stripe client
│   ├── auth.ts                    # JWT & auth utilities
│   ├── api-client.ts              # API wrapper
│   ├── image-utils.ts             # Image processing (Sharp)
│   ├── validation.ts              # Zod schemas
│   ├── constants.ts               # App constants (brands, collections)
│   └── utils.ts                   # General utilities
│
├── hooks/
│   ├── useAuth.ts                 # Auth context hook
│   ├── useCart.ts                 # Cart context hook
│   ├── useWishlist.ts             # Wishlist context hook
│   ├── useProducts.ts             # React Query hook for products
│   ├── useOrders.ts               # Orders hook
│   └── useImageUpload.ts          # Image upload with progress
│
├── contexts/
│   ├── AuthContext.tsx            # Authentication state
│   ├── CartContext.tsx            # Shopping cart state
│   ├── WishlistContext.tsx        # Wishlist state
│   └── ThemeContext.tsx           # Theme/design tokens
│
├── types/
│   ├── index.ts                   # Global type definitions
│   ├── product.ts
│   ├── order.ts
│   ├── user.ts
│   └── api.ts
│
├── styles/
│   └── globals.css                # Tailwind + custom CSS
│
├── public/
│   ├── images/                    # Static images
│   ├── fonts/                     # Custom fonts (Cormorant, Poppins)
│   ├── icons/                     # SVG icons
│   └── favicon.ico
│
├── .env.local                      # Environment variables (local)
├── .env.production                 # Production env (Vercel)
├── .gitignore
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json
├── package-lock.json
└── README.md
```

---

## CORE DEPENDENCIES

```json
{
  "dependencies": {
    "next": "14.0.0+",
    "react": "18.2.0+",
    "typescript": "5.0+",
    "tailwindcss": "3.3+",
    "framer-motion": "10.16+",
    "gsap": "3.12+",
    "@supabase/supabase-js": "2.38+",
    "@supabase/auth-helpers-nextjs": "0.7+",
    "react-hook-form": "7.46+",
    "zod": "3.22+",
    "@stripe/react-stripe-js": "2.4+",
    "@stripe/stripe-js": "2.1+",
    "stripe": "13.8+",
    "resend": "0.17+",
    "react-query": "3.39+",
    "@tanstack/react-query": "5.0+",
    "axios": "1.5+",
    "clsx": "2.0+",
    "tailwind-merge": "2.2+",
    "next-image-export-optimizer": "1.17+"
  },
  "devDependencies": {
    "@types/node": "20.0+",
    "@types/react": "18.2+",
    "@types/react-dom": "18.2+",
    "sharp": "0.33+",
    "autoprefixer": "10.4+",
    "postcss": "8.4+",
    "eslint": "8.48+",
    "eslint-config-next": "14.0+"
  }
}
```

---

## DATABASE SETUP (SUPABASE)

### 1. Create Supabase Project
```bash
# Go to supabase.com
# Create new project (PostgreSQL 15+)
# Wait for database initialization
```

### 2. Run Migrations
Create `/supabase/migrations/001_initial_schema.sql`:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  color TEXT NOT NULL,
  materials TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  weight TEXT NOT NULL,
  description TEXT NOT NULL,
  authenticity_notes TEXT,
  main_image_url TEXT NOT NULL,
  main_image_alt TEXT,
  related_images JSONB,
  collection TEXT NOT NULL,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  whatsapp_number TEXT,
  whatsapp_enabled BOOLEAN DEFAULT TRUE,
  contact_message_template TEXT,
  availability_status TEXT DEFAULT 'in_stock',
  condition TEXT DEFAULT 'new',
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  view_count INTEGER DEFAULT 0,
  wishlist_count INTEGER DEFAULT 0,
  CONSTRAINT valid_price CHECK (price > 0)
);

-- Collections table
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  cover_image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  stripe_payment_intent_id TEXT,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_email, product_id)
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  subscribed BOOLEAN DEFAULT TRUE
);

-- Audit log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_collection ON products(collection);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_orders_email ON orders(user_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_wishlists_email ON wishlists(user_email);

-- RLS Policies (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read on published products
CREATE POLICY "Published products visible to all"
  ON products FOR SELECT
  USING (status = 'published' AND published_at <= NOW());

-- Allow authenticated users to view their orders
CREATE POLICY "Users can view their orders"
  ON orders FOR SELECT
  USING (user_email = auth.jwt() ->> 'email');
```

Run migrations via Supabase dashboard or CLI:
```bash
supabase migration up
```

---

## IMAGE STORAGE (SUPABASE)

### Create Storage Buckets
```bash
# Via Supabase dashboard → Storage → New Bucket

# Public buckets:
1. products (public)
2. brands (public)
3. editorial (public)

# Configuration per bucket:
├─ Allowed MIME types: image/jpeg, image/png, image/webp
├─ Max file size: 20MB
└─ Caching: Public, 30-day max-age
```

### Upload Policy
```sql
-- Allow authenticated users to upload to their product folder
CREATE POLICY "Admins can upload product images"
  ON storage.objects FOR INSERT
  USING (
    bucket_id IN ('products', 'brands', 'editorial')
    AND auth.role() = 'authenticated'
  );

-- Allow public read
CREATE POLICY "Public access to images"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('products', 'brands', 'editorial'));
```

---

## STRIPE SETUP

### Webhook Events to Track
```
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
```

### Webhook Endpoint
```
POST /api/webhooks/stripe
├─ Verify signature with STRIPE_WEBHOOK_SECRET
├─ Handle payment_intent.succeeded → Create order
├─ Handle charge.refunded → Update order status
└─ Return 200 to acknowledge receipt
```

---

## EMAIL SETUP (RESEND)

### Email Templates

**Order Confirmation:**
```
Subject: Order Confirmed #{order_number}
From: orders@velvetvault.com

Hi {customer_name},

Thank you for your purchase! Your order #{order_number} has been confirmed.

Order Details:
├─ Order Date: {date}
├─ Total: ${total}
├─ Estimated Delivery: {date + 5-7 days}
└─ Tracking: [Will be sent when shipped]

Items:
{items_list}

View Your Order: {link_to_order_page}

If you have questions, contact us: support@velvetvault.com

Best regards,
The Velvet Vault Team
```

**Newsletter Welcome:**
```
Subject: Welcome to The Velvet Vault
From: hello@velvetvault.com

Welcome to The Velvet Vault – your gateway to the world's finest luxury handbags.

Exclusive benefits for subscribers:
├─ Early access to new arrivals
├─ Curated collection picks
├─ Luxury lifestyle insights
└─ Exclusive offers (coming soon)

Explore Now: {link_to_collections}

[Unsubscribe](#)
```

**Password Reset:**
```
Subject: Reset Your Password
From: no-reply@velvetvault.com

Click the link below to reset your admin password:
{reset_link}

Link expires in 24 hours.
```

---

## PERFORMANCE OPTIMIZATION

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={productImage}
  alt="Product name"
  width={800}
  height={800}
  priority={false}  // lazy load below fold
  sizes="(max-width: 768px) 100vw, 50vw"
  className="aspect-square object-cover"
/>
```

### Caching Strategy
```
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '[project-id].supabase.co',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  compress: true,
  swcMinify: true,
});
```

### Static Generation
```typescript
// Leverage ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map(p => ({ slug: p.slug }));
}
```

---

## MONITORING & ANALYTICS

### Setup
```bash
# Vercel Analytics (built-in)
# Posthog (optional)
npm install posthog-js

# Google Analytics
npm install next-gtag
```

### Key Metrics to Track
```
Core Web Vitals:
├─ LCP (Largest Contentful Paint) <2.5s
├─ FID (First Input Delay) <100ms
└─ CLS (Cumulative Layout Shift) <0.1

Ecommerce Metrics:
├─ Conversion rate (goal: >2%)
├─ Cart abandonment rate (goal: <65%)
├─ Average order value (goal: >$2,500)
├─ Customer acquisition cost
└─ Return customer rate (goal: >40%)

Product Metrics:
├─ Product view count
├─ Wishlist add rate
├─ Click-to-cart rate
└─ Top performing products
```

---

## DEPLOYMENT CHECKLIST

### Pre-Launch
- [ ] All environment variables configured
- [ ] Supabase database setup & migrations run
- [ ] Stripe keys live (not test)
- [ ] Resend email verified domain
- [ ] Image CDN URLs tested
- [ ] Admin account created
- [ ] Payment processing tested (test order)
- [ ] Email templates tested
- [ ] Mobile responsive verified
- [ ] Lighthouse score >90 across all metrics
- [ ] SSL certificate active
- [ ] Domain DNS records configured
- [ ] Analytics tracking installed
- [ ] Error monitoring setup (Sentry recommended)
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Robots.txt & sitemap.xml created

### Post-Launch
- [ ] Google Search Console verified
- [ ] Google Analytics tracking confirmed
- [ ] Favicon displays correctly
- [ ] 404 page working
- [ ] Newsletter signup working
- [ ] WhatsApp links generate correctly
- [ ] Cart/checkout flow tested end-to-end
- [ ] Admin dashboard fully accessible
- [ ] Backups running (Supabase snapshots)
- [ ] Monitoring alerts configured
- [ ] Customer support email monitored
- [ ] Social links (TikTok) working

---

## TROUBLESHOOTING

### Common Issues

**Images Not Loading:**
```
1. Check Supabase storage bucket is public
2. Verify NEXT_PUBLIC_SUPABASE_URL is correct
3. Clear Next.js cache: rm -rf .next
4. Check image MIME type in storage
```

**Authentication Issues:**
```
1. Verify NEXTAUTH_SECRET is set in .env.local
2. Check JWT token expiry (30 days)
3. Clear cookies in browser DevTools → Application
4. Ensure admin email exists in auth.users table
```

**Stripe Webhooks Not Firing:**
```
1. Verify webhook endpoint is publicly accessible
2. Check STRIPE_WEBHOOK_SECRET matches dashboard
3. Confirm webhook events selected (payment_intent.succeeded)
4. Monitor logs: vercel logs --tail
5. Test webhook: stripe trigger payment_intent.succeeded
```

**Slow Image Loading:**
```
1. Verify Sharp is installed (image optimization)
2. Check image file sizes (<200KB target)
3. Enable Vercel Image Optimization
4. Use WebP format with JPG fallback
5. Implement lazy loading (loading="lazy")
```

---

## USEFUL COMMANDS

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Production build
npm run lint               # Run ESLint

# Supabase
supabase start             # Local Supabase stack
supabase db push           # Push migrations
supabase migration new name # Create migration

# Deployment
vercel                     # Deploy preview
vercel --prod             # Deploy production
vercel env pull           # Pull env from Vercel
vercel logs               # View deployment logs

# Database
npm run db:seed           # Seed initial data
npm run db:reset          # Reset database
npm run db:migrate        # Run migrations

# Testing
npm run test              # Run tests
npm run test:e2e          # Run E2E tests
```

---

## NEXT STEPS

1. **Clone/Initialize Project**
   ```bash
   git clone <repo>
   cd velvet-vault
   npm install
   ```

2. **Setup Environment**
   - Create Supabase project
   - Create Stripe account
   - Configure `.env.local`

3. **Run Locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

4. **Build & Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

5. **Launch**
   - Add products via admin
   - Configure analytics
   - Monitor performance
   - Gather customer feedback

---

## SUPPORT & RESOURCES

- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Stripe:** https://stripe.com/docs
- **Vercel:** https://vercel.com/docs

---

**Last Updated:** July 2026
**Build Status:** Production Ready
**Status:** 🟢 Ready for Deployment

