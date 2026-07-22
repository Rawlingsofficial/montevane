# THE VELVET VAULT - Admin Backend Specification

## ADMIN DASHBOARD ARCHITECTURE

### Overview
Secure admin panel for product management, image uploads, inventory control, and customer communication. Built with Next.js 14, TypeScript, Supabase, and shadcn/ui.

---

## AUTHENTICATION & SECURITY

### Admin Login
- Email + Password authentication
- JWT token-based sessions (30-day expiry)
- Password reset via email (Resend)
- Rate limiting (5 failed attempts → 15-minute lockout)
- Admin-only access (single role for MVP)
- Secure session cookies (httpOnly, Secure, SameSite)

### Database Users Table (Supabase Auth)
```sql
-- auth.users (Supabase managed)
-- email, password_hash, created_at, confirmed_at

-- profiles table (custom)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## PRODUCT MANAGEMENT INTERFACE

### Dashboard Overview
- Product inventory count (total, in stock, pre-order, sold out)
- Recent uploads (last 5 products)
- Order summary (total revenue this month, recent orders)
- Quick stats (top 3 products, conversion rate, average order value)
- Navigation: Products | Collections | Orders | Analytics | Settings

---

## PRODUCT UPLOAD WORKFLOW

### Step 1: Product Information

Form Fields:
```
Brand (Dropdown)
├─ Hermès
├─ Chanel
├─ Louis Vuitton
├─ LOEWE
├─ Gucci
├─ Prada
├─ Saint Laurent
├─ Dior
├─ Celine
├─ Burberry
├─ Givenchy
└─ Chloé

Product Name (Text Input, required)
├─ Max 100 characters
├─ Placeholder: "Lady Dior Lambskin Bag"
└─ Auto-generate slug from name

SKU (Text Input, required)
├─ Unique identifier
├─ Format: BRAND-COLOR-SIZE-SERIAL
└─ Example: CHLOE-BLK-MED-2847

Price (Number Input, required)
├─ USD currency
├─ Min: $500, Max: $50,000
└─ Format: 0.00

Color (Text Input, required)
├─ Single color or color combination
└─ Examples: "Black", "Caramel", "Burgundy & Gold"

Description (Rich Text Editor, required)
├─ Product storytelling
├─ Materials, craftsmanship
├─ Heritage and significance
└─ Max 1000 characters

Materials (Text Input, required)
├─ Examples: "Full-grain lambskin leather, gold-tone hardware"
└─ Separate multiple materials with commas

Dimensions (Text Input, required)
├─ Format: W × H × D (in inches)
└─ Example: "14 × 10 × 5"

Weight (Text Input, required)
├─ Format: in ounces or pounds
└─ Example: "2.5 lbs"

Collection (Dropdown, required)
├─ New Arrivals
├─ Best Sellers
├─ Limited Edition
├─ Seasonal
└─ Classic Heritage

Availability Status (Dropdown, required)
├─ In Stock
├─ Pre-Order (with expected date)
├─ Sold Out
└─ Coming Soon

Condition (Dropdown, required)
├─ New/Never Carried
├─ Like New (worn 1–2 times)
├─ Excellent (minimal wear)
└─ Very Good (some visible wear)

Authenticity Notes (Text Area, optional)
├─ Certificate details
├─ Authentication markers
└─ Provenance information
```

### Step 2: Main Product Image Upload

Interface:
```
Upload Main Product Photo
├─ Drag & drop zone or file picker
├─ Accepted: JPG, PNG (auto-convert to WebP)
├─ Max file size: 20MB
├─ Recommended: 3000×3000px minimum
└─ Real-time preview thumbnail

Quality Checks:
├─ Image aspect ratio validation
├─ Minimum resolution warning
├─ File size optimization
└─ Auto-crop suggestions for centered composition

Actions:
├─ Preview large (modal)
├─ Replace image
├─ Auto-optimize (compress to 200KB)
└─ Save & Continue to Step 3
```

**Database Column:**
```sql
main_image_url TEXT, -- Supabase Storage URL
main_image_alt TEXT, -- Auto-generated: "[Brand] [Product Name]"
```

### Step 3: Related Images Upload (4–5 Additional Photos)

Interface:
```
Upload Related Product Images (4–5 Photos)
├─ Sequential upload fields (labeled)
│  ├─ Image 1: "Angle Shot" (45° view recommended)
│  ├─ Image 2: "Detail/Interior" (open bag or close-up)
│  ├─ Image 3: "Side View"
│  ├─ Image 4: "Back View"
│  └─ Image 5: "Lifestyle Shot" (optional)
│
├─ Individual Drag & Drop zones
│  ├─ Drag to reorder
│  ├─ Replace individual image
│  └─ Delete individual image
│
├─ Batch Preview Grid
│  ├─ Show 4–5 thumbnail previews
│  ├─ Click thumbnail to preview full size
│  └─ Clear visual feedback on upload status
│
└─ Actions
   ├─ Upload all at once (parallel)
   ├─ Validate all before save
   └─ Progress bar (visual feedback)

Quality Checks:
├─ Minimum 3 images required
├─ All images same quality standards
└─ Recommended dimensions: 2000×2000px minimum

Validation:
├─ No duplicates (hash comparison)
├─ All images valid format
├─ File size optimization per image
└─ Aspect ratio consistency
```

**Database Columns:**
```sql
related_images JSONB, -- Array of image objects
-- Structure:
-- [
--   { url: "...", alt: "...", position: 0, label: "Angle Shot" },
--   { url: "...", alt: "...", position: 1, label: "Detail" },
--   ...
-- ]
```

### Step 4: Contact Integration

```
Product Contact Configuration
│
├─ WhatsApp Number Input (E.164 Format, required)
│  ├─ Format: +[country code][phone number]
│  ├─ Example: +237XXXXXXXXX (Cameroon)
│  ├─ Validation: Phone number regex check
│  └─ Test button: "Send Test Message"
│
├─ Message Template (Auto-generated, preview)
│  ├─ Pre-filled: "Hi! I'm interested in the [Product Name]..."
│  └─ Customers can customize before sending
│
├─ Contact Method Display Toggle
│  ├─ Show WhatsApp on product page?
│  ├─ Default position: Below price, above Add to Cart
│  └─ Label: "Contact us on WhatsApp for inquiries"
│
└─ WhatsApp Link Generation
   └─ Button generates: https://wa.me/[phone]?text=[message]
```

**Database Columns:**
```sql
whatsapp_number TEXT, -- E.164 format
whatsapp_enabled BOOLEAN DEFAULT TRUE,
contact_message_template TEXT, -- Custom or default
```

### Step 5: SEO & Publishing

```
SEO Configuration
├─ Meta Title (auto-generated, editable)
│  ├─ Format: "[Product Name] - [Brand] | The Velvet Vault"
│  └─ Max 60 characters
│
├─ Meta Description (auto-generated, editable)
│  ├─ Format: "[Brand] [Product Name]. Authentic luxury handbag..."
│  └─ Max 160 characters
│
├─ URL Slug (auto-generated, editable)
│  ├─ Sanitized from product name
│  └─ Example: "chanel-classic-flap-black-lambskin"
│
└─ Publishing Status
   ├─ Draft (not public)
   ├─ Published (live immediately)
   └─ Scheduled (publish at specific date/time)

Schema.org Structured Data (Auto-generated)
├─ Product type
├─ Brand
├─ Price
├─ Availability
├─ Image URLs
└─ Description
```

**Database Columns:**
```sql
meta_title TEXT,
meta_description TEXT,
slug TEXT UNIQUE,
status TEXT DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
published_at TIMESTAMP,
scheduled_at TIMESTAMP,
```

---

## COMPLETE PRODUCT SCHEMA (SUPABASE)

```sql
CREATE TABLE products (
  -- Identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Information
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  -- Pricing & Availability
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  availability_status TEXT DEFAULT 'in_stock',
  -- Status: 'in_stock', 'pre_order', 'sold_out', 'coming_soon'
  condition TEXT DEFAULT 'new',
  -- Condition: 'new', 'like_new', 'excellent', 'very_good'
  
  -- Product Details
  color TEXT NOT NULL,
  materials TEXT NOT NULL,
  dimensions TEXT NOT NULL, -- e.g., "14 x 10 x 5"
  weight TEXT NOT NULL, -- e.g., "2.5 lbs"
  description TEXT NOT NULL,
  authenticity_notes TEXT,
  
  -- Images
  main_image_url TEXT NOT NULL,
  main_image_alt TEXT,
  related_images JSONB, -- Array of image objects
  
  -- Organization
  collection TEXT NOT NULL,
  tags TEXT[], -- Array for filtering
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Contact
  whatsapp_number TEXT, -- E.164 format
  whatsapp_enabled BOOLEAN DEFAULT TRUE,
  contact_message_template TEXT,
  
  -- Status & Timestamps
  status TEXT DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  wishlist_count INTEGER DEFAULT 0,
  
  CONSTRAINT valid_price CHECK (price > 0),
  CONSTRAINT valid_dimensions CHECK (dimensions ~ '^\d+\s*×\s*\d+\s*×\s*\d+$')
);

-- Indexes for performance
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_collection ON products(collection);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
```

---

## ADMIN DASHBOARD FEATURES

### 1. Products Page (Main Inventory)

**List View:**
```
Products Table
├─ Columns: Thumbnail | Name | Brand | SKU | Price | Status | Action
├─ Sorting: By Name, Brand, Price, Created Date, Popularity
├─ Filtering:
│  ├─ Brand (multi-select)
│  ├─ Status (draft, published, scheduled)
│  ├─ Availability (in stock, pre-order, sold out)
│  ├─ Collection
│  └─ Price range slider
├─ Search: By name, brand, SKU
└─ Pagination: 20 items per page

Actions per Product:
├─ Edit (icon button)
├─ Duplicate (icon button)
├─ View Live (link to product page)
├─ Toggle Status (draft ↔ published)
├─ Delete (with confirmation modal)
└─ Bulk Actions: Select multiple → Publish All, Archive, Delete

Quick Stats:
├─ Total Products: XX
├─ Published: XX
├─ Draft: XX
├─ Pre-Order: XX
└─ Sold Out: XX
```

### 2. Upload New Product

**Modal/Page with Steps:**
```
Step 1: Product Information ✓ → Step 2: Main Image → Step 3: Related Images → Step 4: Contact → Step 5: SEO & Publish
├─ Progress indicator
├─ Save as Draft (always available)
├─ Save & Continue (validates current step)
└─ Back button (to previous step)

Validation Messages:
├─ Required fields highlighted
├─ Error messages inline
├─ Success confirmation modal on completion
└─ Auto-save to draft every 30 seconds
```

### 3. Collections Management

```
Collections Page
├─ List of all collections
├─ Create new collection (modal)
│  ├─ Name
│  ├─ Description
│  ├─ Cover image
│  └─ Featured status
├─ Edit collection (inline)
├─ Delete collection (with product reassignment)
└─ Reorder collections (drag & drop)
```

### 4. Orders Management

```
Orders Page
├─ Orders Table: Order ID | Customer | Total | Status | Date
├─ Filtering:
│  ├─ Status (pending, processing, shipped, delivered)
│  ├─ Date range
│  └─ Payment status
├─ Order Detail Modal:
│  ├─ Customer info
│  ├─ Shipping address
│  ├─ Product details
│  ├─ Payment info (last 4 digits)
│  └─ Status timeline
└─ Actions: Mark as shipped, view invoice, refund (if applicable)
```

### 5. Analytics Dashboard

```
Analytics Overview
├─ Key Metrics (cards)
│  ├─ Total Revenue (this month)
│  ├─ Total Orders (this month)
│  ├─ Conversion Rate
│  ├─ Average Order Value
│  └─ Repeat Customer Rate
│
├─ Charts
│  ├─ Revenue by Month (last 12 months)
│  ├─ Top 5 Best-Sellers
│  ├─ Traffic Sources
│  └─ Conversion Funnel
│
└─ Product Performance
   ├─ Product performance table: Name | Views | Wishlist | Orders | Revenue
   ├─ Filters: Date range, brand, collection
   └─ Export CSV
```

### 6. Settings Page

```
Admin Settings
├─ Store Configuration
│  ├─ Store name
│  ├─ Store email
│  ├─ Support email
│  └─ WhatsApp number (global fallback)
│
├─ Email Configuration
│  ├─ Newsletter sender email
│  ├─ Order confirmation template (preview)
│  └─ Send test email button
│
├─ Payment Settings
│  ├─ Stripe API keys (masked)
│  ├─ Test/Live mode toggle
│  └─ Supported currencies
│
├─ Shipping Configuration
│  ├─ Default shipping method
│  ├─ Flat rate or weight-based
│  └─ International shipping zones
│
└─ Admin Users
   ├─ List current admins
   ├─ Invite new admin (email)
   ├─ Remove admin (with confirmation)
   └─ Change admin password
```

---

## FILE UPLOAD INFRASTRUCTURE

### Image Upload Handling
```
Process Flow:
1. User selects image (drag & drop or file picker)
2. Client-side validation:
   ├─ File type check (JPG, PNG)
   ├─ File size check (<20MB)
   └─ Image dimension check (≥1500×1500px)
3. If valid → Auto-compress (Sharp library)
4. Generate WebP + JPG versions
5. Upload to Supabase Storage
   ├─ /products/[product-id]/main/
   ├─ /products/[product-id]/related/[index]/
   └─ /products/[product-id]/thumbnails/
6. Return signed URLs
7. Store URLs in database
8. Display confirmation
9. If invalid → Show error message

Storage Structure:
gs://velvet-vault-storage.appspot.com/
├─ products/
│  └─ [product-uuid]/
│     ├─ main/
│     │  ├─ image.webp
│     │  └─ image.jpg
│     ├─ related/
│     │  ├─ 0/image.webp
│     │  ├─ 1/image.webp
│     │  └─ ...
│     └─ thumbnails/
│        ├─ main-thumb.jpg
│        └─ related-thumb-[index].jpg
└─ backgrounds/ (for hero, banners)
   ├─ hero/
   ├─ brands/
   └─ editorial/
```

### Image Optimization (Sharp Library)
```
Settings per Image Type:

Main Product Image:
├─ Resize to: 3000×3000px (maintain aspect)
├─ Quality: 80–85%
├─ Format: WebP (primary), JPG (fallback)
└─ File size target: <200KB

Related Images:
├─ Resize to: 2000×2000px (maintain aspect)
├─ Quality: 75–80%
├─ Format: WebP, JPG
└─ File size target: <150KB

Thumbnails:
├─ Resize to: 400×400px
├─ Quality: 75%
├─ Format: JPG
└─ File size target: <30KB

Responsive Versions:
├─ Mobile (375px): 600×600px version
├─ Tablet (768px): 1200×1200px version
├─ Desktop (1920px): 2400×2400px version
└─ All with srcset for lazy loading
```

---

## WHATSAPP INTEGRATION

### Setup
```
WhatsApp Business API Integration:
├─ Message template: Pre-filled inquiry message
├─ Link format: https://wa.me/[phone]?text=[message]
├─ No webhook needed (MVP) — outbound only
└─ Track clicks in analytics
```

### On Product Page
```
Display (Below Price, Above CTA):
┌─────────────────────────────┐
│ 💬 Questions? Ask on WhatsApp│
│      [WhatsApp Button]      │
│  Opens WhatsApp with message:│
│  "Hi! I'm interested in the │
│  [Product Name]...           │
└─────────────────────────────┘

Button Styling:
├─ Green background (#25D366 WhatsApp brand)
├─ White text
├─ Icon + Text
├─ Hover effect (slight scale)
└─ Mobile: Full width, Desktop: Auto width
```

### Analytics
```
Track:
├─ WhatsApp button clicks per product
├─ Click-through rate
├─ Time to click (funnel metric)
└─ Geographic distribution of inquiries
```

---

## AUTHENTICATION & ROLE MANAGEMENT

### Admin Login Flow
```
1. User navigates to /admin/login
2. Enter email + password
3. System validates against Supabase Auth
4. If valid:
   ├─ Generate JWT token (30-day expiry)
   ├─ Store in secure httpOnly cookie
   ├─ Redirect to /admin/dashboard
   └─ Load profile from profiles table
5. If invalid:
   ├─ Show error message
   ├─ Increment failed attempts (rate limit: 5)
   └─ Lock account after 5 failures (15 min)

Session Management:
├─ Token refresh: Automatic (no re-login needed)
├─ Logout: Clear cookie, invalidate token
├─ Timeout: 30 days
└─ "Remember me" (stretch goal, not MVP)
```

### Password Reset
```
1. Click "Forgot Password" on login
2. Enter email address
3. System sends reset link via Resend
4. Email contains: Token + reset URL
5. User clicks link, enters new password
6. Confirm password change
7. Redirect to login
```

---

## API ENDPOINTS (Backend Routes)

```
Authentication:
POST   /api/auth/login                 (email, password)
POST   /api/auth/logout                ()
POST   /api/auth/reset-password        (email)
PUT    /api/auth/update-password       (old_password, new_password)

Products:
GET    /api/products                   (with filters, search, pagination)
POST   /api/products                   (create new product)
GET    /api/products/[id]              (fetch single product)
PUT    /api/products/[id]              (update product)
DELETE /api/products/[id]              (delete product)
POST   /api/products/[id]/duplicate    (clone product)
GET    /api/products/[id]/analytics    (view count, wishlist, sales)

Images:
POST   /api/images/upload              (single image upload)
POST   /api/images/bulk-upload         (multiple images at once)
DELETE /api/images/[id]                (delete image from storage)
GET    /api/images/[id]/variants       (fetch all image sizes)

Collections:
GET    /api/collections                ()
POST   /api/collections                (create collection)
PUT    /api/collections/[id]           (update collection)
DELETE /api/collections/[id]           (delete collection)

Orders:
GET    /api/orders                     (with filters)
GET    /api/orders/[id]                (fetch single order)
PUT    /api/orders/[id]/status         (update order status)

Analytics:
GET    /api/analytics/dashboard        (revenue, orders, conversion)
GET    /api/analytics/products         (product performance)
GET    /api/analytics/traffic          (visitors, sources)

Admin Settings:
GET    /api/admin/settings             ()
PUT    /api/admin/settings             (update settings)
POST   /api/admin/users/invite         (invite new admin)
DELETE /api/admin/users/[id]           (remove admin)
```

---

## SECURITY CHECKLIST

- [ ] JWT tokens with 30-day expiry
- [ ] Rate limiting on login (5 attempts, 15-min lockout)
- [ ] HTTPS only (no HTTP)
- [ ] CORS configured (admin.velvetvault.com only)
- [ ] CSRF protection on all POST/PUT/DELETE
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (React escapes by default + CSP headers)
- [ ] File upload validation (type, size, dimensions)
- [ ] Image CDN with signed URLs (time-limited access)
- [ ] Admin endpoints require authentication middleware
- [ ] Audit log for all product changes (who, what, when)
- [ ] Backup strategy (daily Supabase backups)

---

**End Admin Backend Specification**
