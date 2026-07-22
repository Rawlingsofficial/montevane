-- Montévane — storage buckets for product/brand/editorial imagery
--
-- Fixes a real bug from the original spec: `CREATE POLICY ... FOR INSERT
-- USING (...)` is invalid Postgres — INSERT-only policies must use
-- WITH CHECK, not USING. Running the original SQL as written fails.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('products', 'products', true, 20971520, array['image/jpeg', 'image/png', 'image/webp']),
  ('brands', 'brands', true, 20971520, array['image/jpeg', 'image/png', 'image/webp']),
  ('editorial', 'editorial', true, 20971520, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "public can read vault images"
  on storage.objects for select
  using (bucket_id in ('products', 'brands', 'editorial'));

create policy "admins can upload vault images"
  on storage.objects for insert
  with check (
    bucket_id in ('products', 'brands', 'editorial')
    and auth.role() = 'authenticated'
  );

create policy "admins can update vault images"
  on storage.objects for update
  using (
    bucket_id in ('products', 'brands', 'editorial')
    and auth.role() = 'authenticated'
  )
  with check (
    bucket_id in ('products', 'brands', 'editorial')
    and auth.role() = 'authenticated'
  );

create policy "admins can delete vault images"
  on storage.objects for delete
  using (
    bucket_id in ('products', 'brands', 'editorial')
    and auth.role() = 'authenticated'
  );
