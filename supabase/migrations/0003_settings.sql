-- Montévane — store settings
--
-- A singleton table (always exactly one row, id fixed to 1) for the
-- store-level configuration described in admin-backend-spec.md ("Store
-- Configuration"). Payment/shipping settings are deliberately not modeled
-- here — there's no Stripe or shipping integration wired up yet, so fields
-- for them would be inert UI with nothing behind them.

create table store_settings (
  id integer primary key default 1,
  store_name text not null default 'Montévane',
  store_email text,
  support_email text,
  whatsapp_number text,
  newsletter_sender_email text,
  updated_at timestamptz not null default now(),
  constraint store_settings_singleton check (id = 1)
);

insert into store_settings (id) values (1);

create trigger store_settings_set_updated_at
  before update on store_settings
  for each row execute function set_updated_at();

alter table store_settings enable row level security;

create policy "admins can view store settings"
  on store_settings for select
  using (auth.role() = 'authenticated');

create policy "admins can update store settings"
  on store_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
