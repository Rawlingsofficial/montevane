-- Montévane — initial schema
-- Run in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- profiles (admin accounts — single role for MVP, per admin-backend-spec.md)
-- ---------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- brands (the 12 houses — a real table instead of a hardcoded dropdown, so
-- adding a 13th brand is a data change, not a code deploy)
-- ---------------------------------------------------------------------------
create table brands (
  slug text primary key,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- collections
-- ---------------------------------------------------------------------------
create table collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  cover_image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger collections_set_updated_at
  before update on collections
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table products (
  id uuid primary key default gen_random_uuid(),

  brand_slug text not null references brands(slug),
  name text not null,
  sku text unique not null,
  slug text unique not null,

  price numeric(10, 2) not null check (price > 0),
  currency text not null default 'USD',

  color text not null,
  materials text not null,
  dimensions text not null,
  weight text not null,
  description text not null,
  authenticity_notes text,

  main_image_url text not null,
  main_image_alt text,
  related_images jsonb not null default '[]'::jsonb,

  collection_slug text not null references collections(slug),
  tags text[] not null default '{}',

  meta_title text,
  meta_description text,

  whatsapp_number text,
  whatsapp_enabled boolean not null default true,
  contact_message_template text,

  availability_status text not null default 'in_stock'
    check (availability_status in ('in_stock', 'pre_order', 'sold_out', 'coming_soon')),
  condition text not null default 'new'
    check (condition in ('new', 'like_new', 'excellent', 'very_good')),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  scheduled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references profiles(id),

  view_count integer not null default 0,
  wishlist_count integer not null default 0
);

create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

create index idx_products_brand_slug on products(brand_slug);
create index idx_products_collection_slug on products(collection_slug);
create index idx_products_status on products(status);
create index idx_products_created_at on products(created_at desc);

-- ---------------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------------
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_email text not null,
  user_name text not null,
  shipping_address jsonb not null,
  billing_address jsonb not null,
  items jsonb not null,
  subtotal numeric(10, 2) not null,
  shipping_cost numeric(10, 2) not null default 0,
  tax numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_method text,
  stripe_payment_intent_id text,
  tracking_number text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

create index idx_orders_email on orders(user_email);
create index idx_orders_status on orders(status);

-- ---------------------------------------------------------------------------
-- wishlists
-- ---------------------------------------------------------------------------
create table wishlists (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_email, product_id)
);

create index idx_wishlists_email on wishlists(user_email);

-- ---------------------------------------------------------------------------
-- newsletter subscribers
-- ---------------------------------------------------------------------------
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- audit logs
-- ---------------------------------------------------------------------------
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  changes jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- MVP has a single admin role (per admin-backend-spec.md), so "authenticated"
-- is equivalent to "admin" everywhere below — every row in `profiles` is an
-- admin account. There is no public sign-up.
-- ---------------------------------------------------------------------------

alter table profiles enable row level security;
alter table brands enable row level security;
alter table collections enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table wishlists enable row level security;
alter table newsletter_subscribers enable row level security;
alter table audit_logs enable row level security;

-- profiles: an admin can read their own row (and any other, since all rows
-- in this table are admins in the MVP model)
create policy "authenticated can view profiles"
  on profiles for select
  using (auth.role() = 'authenticated');

create policy "users can update their own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- brands: public catalogue read, admin-managed writes
create policy "public can view brands"
  on brands for select
  using (true);

create policy "admins can manage brands"
  on brands for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- collections: public catalogue read, admin-managed writes
create policy "public can view collections"
  on collections for select
  using (true);

create policy "admins can manage collections"
  on collections for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- products: public sees only published, released products; admins see/manage everything
create policy "public can view published products"
  on products for select
  using (status = 'published' and (published_at is null or published_at <= now()));

create policy "admins can manage products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- orders: a customer can see orders under their own email (forward-looking —
-- no customer auth exists yet), admins manage everything
create policy "customers can view their own orders"
  on orders for select
  using (user_email = (auth.jwt() ->> 'email'));

create policy "admins can manage orders"
  on orders for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- wishlists: a customer manages their own wishlist by email
create policy "customers can manage their own wishlist"
  on wishlists for all
  using (user_email = (auth.jwt() ->> 'email'))
  with check (user_email = (auth.jwt() ->> 'email'));

-- newsletter_subscribers: anyone can subscribe; only admins can read the list
create policy "anyone can subscribe"
  on newsletter_subscribers for insert
  with check (true);

create policy "admins can view subscribers"
  on newsletter_subscribers for select
  using (auth.role() = 'authenticated');

create policy "admins can manage subscribers"
  on newsletter_subscribers for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins can delete subscribers"
  on newsletter_subscribers for delete
  using (auth.role() = 'authenticated');

-- audit_logs: admin-read only; rows are written server-side with the
-- service-role key, which bypasses RLS entirely
create policy "admins can view audit logs"
  on audit_logs for select
  using (auth.role() = 'authenticated');
