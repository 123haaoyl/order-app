-- 在 Supabase Dashboard -> SQL Editor 里运行这段 SQL。
-- 运行前，把文件末尾 insert 语句里的 your@email.com 换成你的后台登录邮箱。

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  order_type text not null default 'dinein',
  table_no text not null default '',
  delivery_address text not null default '',
  delivery_time text not null default '',
  payment_method text not null default '',
  coupon_id text not null default '',
  coupon_name text not null default '',
  note text not null default '',
  items jsonb not null,
  subtotal numeric(10, 2) not null default 0,
  packing_fee numeric(10, 2) not null default 0,
  delivery_fee numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  payable numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status text not null default 'new',
  order_text text not null default ''
);

alter table public.orders add column if not exists order_type text not null default 'dinein';
alter table public.orders add column if not exists delivery_address text not null default '';
alter table public.orders add column if not exists delivery_time text not null default '';
alter table public.orders add column if not exists payment_method text not null default '';
alter table public.orders add column if not exists coupon_id text not null default '';
alter table public.orders add column if not exists coupon_name text not null default '';
alter table public.orders add column if not exists subtotal numeric(10, 2) not null default 0;
alter table public.orders add column if not exists packing_fee numeric(10, 2) not null default 0;
alter table public.orders add column if not exists delivery_fee numeric(10, 2) not null default 0;
alter table public.orders add column if not exists discount numeric(10, 2) not null default 0;
alter table public.orders add column if not exists payable numeric(10, 2) not null default 0;

create table if not exists public.app_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.order_system_notes (
  id bigint generated always as identity primary key,
  module text not null,
  title text not null,
  content text not null default '',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
alter table public.app_admins enable row level security;
alter table public.order_system_notes enable row level security;

create or replace function public.is_order_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant usage on schema public to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;
grant execute on function public.is_order_admin() to anon, authenticated;

drop policy if exists "Anyone can create orders" on public.orders;
drop policy if exists "Admins can read orders" on public.orders;
drop policy if exists "Admins can update orders" on public.orders;

create policy "Anyone can create orders"
on public.orders
for insert
to anon, authenticated
with check (
  jsonb_typeof(items) = 'array'
  and total >= 0
  and payable >= 0
);

create policy "Admins can read orders"
on public.orders
for select
to authenticated
using (public.is_order_admin());

create policy "Admins can update orders"
on public.orders
for update
to authenticated
using (public.is_order_admin())
with check (public.is_order_admin());

-- 把 your@email.com 换成你的后台登录邮箱，再运行这一行。
insert into public.app_admins (email)
values ('your@email.com')
on conflict (email) do nothing;
