# THE VELVET VAULT - Claude Code CLI Execution Guide

## How to Use These Prompts with Claude Code

---

## FILE ORGANIZATION & USAGE

You now have **4 master prompt files** ready for Claude Code CLI:

```
1. velvet-vault-master-prompt.md
   ├─ Complete site architecture
   ├─ Design system (colors, typography)
   ├─ Navigation structure
   ├─ Technical stack
   └─ All requirements for full build

2. image-generation-prompts.md
   ├─ Universal luxury style rules (use with EVERY image)
   ├─ 10 section categories (hero, brands, products, etc.)
   ├─ 70-120 organized image prompts
   └─ Web optimization checklist

3. admin-backend-spec.md
   ├─ Admin dashboard features
   ├─ Product upload workflow (5 steps)
   ├─ Database schema (SQL)
   ├─ WhatsApp integration
   ├─ File upload infrastructure
   └─ API endpoints

4. VELVET-VAULT-BUILD-GUIDE.md
   ├─ Quick start instructions
   ├─ Project directory structure
   ├─ Core dependencies
   ├─ Database setup (migrations)
   ├─ Deployment checklist
   └─ Troubleshooting guide
```

---

## WORKFLOW: Using These with Claude Code CLI

### Phase 1: Site Architecture & Setup

**Command:**
```bash
claude --task "Build the complete site architecture for The Velvet Vault"
```

**Input Prompt:**
```
Review: /path/to/velvet-vault-master-prompt.md

Then execute:
1. Create complete project directory structure (see VELVET-VAULT-BUILD-GUIDE.md)
2. Initialize Next.js 14 project with TypeScript
3. Install all dependencies from package.json
4. Setup Tailwind CSS with custom color palette
5. Create all core layout files (app/layout.tsx, globals.css)
6. Setup Supabase client and authentication
7. Create React context providers (Auth, Cart, Wishlist, Theme)
8. Generate TypeScript types/interfaces for all data models
9. Create shadcn/ui component structure
10. Setup environment variables template (.env.example)

Output all files to: /home/claude/velvet-vault/

Ensure:
- TypeScript strict mode
- Responsive design (mobile-first)
- Accessibility (WCAG 2.1 Level AA)
- Performance optimized (lazy loading, image optimization)
```

### Phase 2: Frontend Components & Pages

**Command:**
```bash
claude --task "Build all public-facing pages and components"
```

**Input Prompt:**
```
Create all frontend pages and components for The Velvet Vault:

PUBLIC PAGES:
├─ app/(public)/page.tsx (Homepage with all sections)
├─ app/(public)/brands/page.tsx (Brand showcase)
├─ app/(public)/brands/[brand]/page.tsx (Individual brand pages)
├─ app/(public)/products/page.tsx (Product search/listing)
├─ app/(public)/products/[slug]/page.tsx (Product detail)
├─ app/(public)/collections/page.tsx
├─ app/(public)/collections/[id]/page.tsx
├─ app/(public)/journal/page.tsx (Blog listing)
├─ app/(public)/journal/[slug]/page.tsx (Blog post)
├─ app/(public)/about/page.tsx
└─ app/(public)/contact/page.tsx

COMPONENTS:
├─ components/common/Navbar.tsx
├─ components/common/Footer.tsx
├─ components/common/Header.tsx
├─ components/home/HeroSection.tsx
├─ components/home/FeaturedCollections.tsx
├─ components/home/BrandShowcase.tsx
├─ components/home/BestSellers.tsx
├─ components/products/ProductCard.tsx
├─ components/products/ProductGallery.tsx
├─ components/products/ProductDetails.tsx
└─ [all others in structure]

Design Requirements:
- Ultra-minimal luxury aesthetic
- Color palette: #FFFFFF, #FAF8F5, #111111, #C8A96A
- Typography: Serif headlines (Cormorant), Sans body (Poppins)
- Framer Motion animations (smooth, 60fps)
- Responsive: 375px, 768px, 1024px, 1920px breakpoints
- Lazy loading images
- Accessible navigation

Reference: velvet-vault-master-prompt.md sections on Design System & Homepage Sections
```

### Phase 3: Admin Backend & Dashboard

**Command:**
```bash
claude --task "Build complete admin dashboard and backend"
```

**Input Prompt:**
```
Create admin backend for The Velvet Vault:

ADMIN PAGES:
├─ app/(admin)/admin/login/page.tsx
├─ app/(admin)/admin/page.tsx (Dashboard)
├─ app/(admin)/admin/products/page.tsx (Inventory)
├─ app/(admin)/admin/products/new/page.tsx
├─ app/(admin)/admin/products/[id]/edit/page.tsx
├─ app/(admin)/admin/collections/page.tsx
├─ app/(admin)/admin/orders/page.tsx
├─ app/(admin)/admin/analytics/page.tsx
└─ app/(admin)/admin/settings/page.tsx

ADMIN COMPONENTS:
├─ components/admin/AdminNav.tsx (Sidebar)
├─ components/admin/ProductForm.tsx (Reusable form)
├─ components/admin/ImageUploader.tsx (Main + Related images)
├─ components/admin/ProductTable.tsx
├─ components/admin/OrderTable.tsx
├─ components/admin/AnalyticsCards.tsx
└─ [see admin-backend-spec.md for full list]

API ROUTES (in app/api/):
├─ auth/login, logout, reset-password
├─ products (GET, POST, PUT, DELETE)
├─ images/upload
├─ collections
├─ orders
├─ analytics
└─ admin/settings

Features per admin-backend-spec.md:
- JWT authentication (30-day expiry)
- Rate limiting (login)
- Drag & drop image upload
- Image optimization (Sharp)
- Product form validation (Zod)
- Supabase storage integration
- WhatsApp number field (E.164 format)
- SEO fields (meta title, description, slug)
- Collections management
- Order tracking
- Analytics dashboard

Output all files to: /home/claude/velvet-vault/app/(admin)/
```

### Phase 4: Database & Backend Logic

**Command:**
```bash
claude --task "Setup database and backend services"
```

**Input Prompt:**
```
Setup Supabase database and backend services:

1. Create SQL migrations:
   ├─ profiles table
   ├─ products table (with all fields)
   ├─ collections table
   ├─ orders table
   ├─ wishlists table
   ├─ newsletter_subscribers
   ├─ audit_logs
   ├─ Create all indexes
   └─ Setup Row Level Security (RLS) policies

2. Create lib/ utilities:
   ├─ lib/supabase.ts (Client)
   ├─ lib/supabase-admin.ts (Service role)
   ├─ lib/auth.ts (JWT, session management)
   ├─ lib/stripe.ts (Stripe client)
   ├─ lib/image-utils.ts (Sharp image processing)
   ├─ lib/validation.ts (Zod schemas)
   ├─ lib/api-client.ts (Fetch wrapper)
   └─ lib/constants.ts (Brands, collections, constants)

3. Create hooks/:
   ├─ useAuth.ts
   ├─ useCart.ts
   ├─ useWishlist.ts
   ├─ useProducts.ts (React Query)
   ├─ useOrders.ts
   └─ useImageUpload.ts

4. Setup authentication:
   ├─ JWT token generation
   ├─ Session management
   ├─ Password reset flow
   └─ Admin login security

5. Image upload pipeline:
   ├─ File validation (type, size)
   ├─ Sharp compression (WebP + JPG)
   ├─ Supabase storage upload
   ├─ Generate responsive sizes
   └─ Return signed URLs

Reference: admin-backend-spec.md (Database Schema section)
Reference: VELVET-VAULT-BUILD-GUIDE.md (Database Setup)
```

### Phase 5: Image Generation & Prompts

**Command:**
```bash
claude --task "Execute image generation prompts"
```

**Input Instructions:**
```
For each image section in image-generation-prompts.md:

1. Copy the prompt
2. ALWAYS append: [Universal Style Rule] at the end
3. Use with your preferred image generator:
   - Midjourney: /imagine [prompt]
   - DALL-E: Use full prompt text
   - Runway: Text-to-Image model
   - Adobe Firefly: Generative Fill

Example (Hero Section):

PROMPT:
"A breathtaking luxury multi-brand handbag boutique interior displaying 
carefully curated authentic designer handbags from the world's leading 
fashion houses in a sophisticated gallery environment. Warm ivory stone, 
champagne gold accents, sculptural display tables, dramatic architectural 
lighting, museum-quality presentation, timeless elegance, editorial luxury 
atmosphere.

[APPEND UNIVERSAL STYLE RULE - see image-generation-prompts.md]"

Generation Strategy:
├─ Tier 1 (Essential - 90 images for launch):
│  ├─ 5 hero images
│  ├─ 12 brand banners
│  ├─ 5 images per product (60 total for 12 bags)
│  ├─ 8 editorial images
│  └─ 6 footer/newsletter images
│
├─ Tier 2 (Premium - 100+ additional):
│  ├─ 7 more editorial images
│  ├─ 4 collection images
│  ├─ 2-4 close-up details per product
│  └─ 6 brand story images
│
└─ Tier 3 (Ongoing - expand over time):
   ├─ Seasonal collections
   ├─ Lifestyle photography
   └─ Campaign imagery

File Organization (after generation):
velvet-vault/public/images/
├─ hero/ (5 images)
├─ brands/ (12 images, one per brand)
├─ products/ (5 per product)
├─ editorial/ (8-15 images)
├─ collections/ (8-12 images)
└─ other/ (footer, newsletter, etc.)

Update app/lib/constants.ts with image URLs
```

---

## STEP-BY-STEP EXECUTION PLAN

### Week 1: Foundation
```
Day 1-2: Site Architecture
├─ Run Phase 1: Site setup
├─ Initialize Git repo
└─ Setup .env files

Day 3-4: Frontend
├─ Run Phase 2: Pages & components
├─ Test responsive design
└─ Verify animations

Day 5: Database
├─ Run Phase 4: Supabase setup
├─ Create tables & indexes
└─ Test connections
```

### Week 2: Backend & Polish
```
Day 1-2: Admin Backend
├─ Run Phase 3: Admin dashboard
├─ Test product upload workflow
├─ Verify image optimization

Day 3-4: Integration
├─ Connect all APIs
├─ Test auth flow
├─ Test cart/checkout

Day 5: Performance
├─ Run Lighthouse audits
├─ Optimize images
├─ Setup caching
```

### Week 3: Images & Launch Prep
```
Day 1-3: Image Generation
├─ Run Phase 5: Generate 70-120 images
├─ Optimize for web
├─ Organize and upload to Supabase

Day 4: Testing & QA
├─ End-to-end testing
├─ Mobile testing
├─ Cross-browser testing

Day 5: Launch Prep
├─ Setup monitoring
├─ Configure analytics
├─ Final security check
```

---

## EXACT PROMPT TEMPLATES FOR CLAUDE CODE

### Template 1: Page/Component Creation
```
Create the [COMPONENT_NAME] component for The Velvet Vault.

Requirements from master prompt:
- Design System: [Reference specific section]
- Functionality: [List features]
- Props/Props: [Define interfaces]
- Styling: [Tailwind classes, colors]
- Animations: [Framer Motion specs]
- Accessibility: [ARIA labels, semantic HTML]

Output:
- TypeScript file with full typing
- Fully styled with Tailwind
- Responsive (mobile-first)
- Accessible (WCAG 2.1 Level AA)
- Optimized for performance

Reference: velvet-vault-master-prompt.md [SECTION]
```

### Template 2: API Route Creation
```
Create the API route: [ROUTE_PATH]

Specification:
- Method: [GET/POST/PUT/DELETE]
- Authentication: [Required/Optional]
- Database operations: [Query/Mutation]
- Validation: [Zod schema]
- Response format: [JSON structure]
- Error handling: [Status codes]

Implementation:
- TypeScript with strict typing
- Proper error handling
- Input validation
- Authentication check (if needed)
- Rate limiting (if needed)
- Logging for debugging

Reference: admin-backend-spec.md [SECTION]
```

### Template 3: Database/Schema
```
Create Supabase migrations for: [TABLE_NAME]

Schema:
[SQL table definition]

Indexes:
[List indexes for performance]

RLS Policies:
[Security rules]

Validation:
- Data type constraints
- Unique constraints
- Foreign key relationships

Reference: VELVET-VAULT-BUILD-GUIDE.md (Database Setup)
```

---

## COMMON COMMAND PATTERNS

### Start Fresh Build
```bash
# 1. Setup project structure
claude --task "Initialize The Velvet Vault project structure"

# 2. Install dependencies
npm install

# 3. Setup Supabase
claude --task "Create Supabase database schema and migrations"

# 4. Run migrations
supabase migration up

# 5. Build frontend
claude --task "Build all public pages and components"

# 6. Build admin
claude --task "Build admin dashboard"

# 7. Dev server
npm run dev
```

### Modify Existing Component
```bash
claude --task "Update [component name] to [requirement]"

# Example:
# claude --task "Update ProductCard to show wishlist count badge"
```

### Add New Feature
```bash
claude --task "Add [feature name] to The Velvet Vault"

# Specify:
# - What pages/components affected
# - Database changes needed
# - API endpoints needed
# - Design/styling requirements
```

### Optimize for Performance
```bash
claude --task "Optimize [section] for performance"

# Specify:
# - Current performance metrics
# - Target metrics
# - Constraints (budget)
```

---

## VALIDATION CHECKLIST

After each phase, verify:

**Phase 1 (Setup):**
- [ ] Project structure created
- [ ] Dependencies installed
- [ ] TypeScript configured
- [ ] Tailwind CSS working
- [ ] Environment files created

**Phase 2 (Frontend):**
- [ ] All pages created
- [ ] Components render without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Navigation working
- [ ] Images loading correctly

**Phase 3 (Admin):**
- [ ] Admin login working
- [ ] Product form validated
- [ ] Image upload functional
- [ ] Dashboard displaying data
- [ ] CRUD operations working

**Phase 4 (Database):**
- [ ] Tables created in Supabase
- [ ] Migrations run successfully
- [ ] RLS policies configured
- [ ] Storage buckets created
- [ ] Data persisting correctly

**Phase 5 (Images):**
- [ ] 70-120 images generated
- [ ] Images optimized for web
- [ ] Images uploaded to Supabase
- [ ] URLs working in components
- [ ] Lazy loading functioning

---

## PROMPT PRIORITY ORDER

If time is limited, prioritize in this order:

```
1. MUST HAVE (Foundation):
   ├─ Site architecture & setup
   ├─ Homepage & core pages
   ├─ Admin product upload
   ├─ Database schema
   └─ Basic product images (main views)

2. SHOULD HAVE (Polish):
   ├─ All admin features
   ├─ All product detail images
   ├─ Editorial images
   ├─ Performance optimization
   └─ Analytics setup

3. NICE TO HAVE (Complete):
   ├─ Brand story content
   ├─ Journal/blog posts
   ├─ Advanced analytics
   ├─ Social integrations
   └─ A/B testing setup
```

---

## TROUBLESHOOTING PROMPTS

If Claude Code encounters issues:

**Issue: Component not rendering**
```
claude --task "Debug and fix [component name] - 
error message: [error]"
```

**Issue: Database connection failing**
```
claude --task "Diagnose and fix Supabase connection issue"
```

**Issue: Image upload not working**
```
claude --task "Debug image upload in admin - 
verify Sharp configuration and Supabase storage"
```

**Issue: Auth not working**
```
claude --task "Debug JWT authentication flow"
```

---

## FINAL DEPLOYMENT

When ready to deploy:

```bash
# 1. Run final build
npm run build

# 2. Run tests
npm run test

# 3. Deploy to Vercel
vercel --prod

# 4. Verify deployment
# - Check Lighthouse scores
# - Test payment flow
# - Verify images loading
# - Test admin dashboard

# 5. Monitor
# - Watch error logs
# - Track performance
# - Monitor analytics
```

---

## ADDITIONAL RESOURCES

**Inside Your Prompts:**
- velvet-vault-master-prompt.md → Complete site blueprint
- image-generation-prompts.md → All image specs
- admin-backend-spec.md → Backend architecture
- VELVET-VAULT-BUILD-GUIDE.md → Deployment guide

**External Resources:**
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs
- Tailwind: https://tailwindcss.com/docs
- Stripe: https://stripe.com/docs

---

**Status:** Ready for Claude Code CLI Execution
**Last Updated:** July 2026
**Next Step:** Run Phase 1 Setup Command

