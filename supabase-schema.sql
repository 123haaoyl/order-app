-- 在 Supabase Dashboard -> SQL Editor 里运行这段 SQL。
-- 运行后，顾客页面可以新增订单；订单查看请在 Supabase 的 Table Editor 里看 public.orders。

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  table_no text not null default '',
  note text not null default '',
  items jsonb not null,
  total numeric(10, 2) not null default 0,
  status text not null default 'new',
  order_text text not null default ''
);

alter table public.orders enable row level security;

drop policy if exists "Anyone can create orders" on public.orders;

create policy "Anyone can create orders"
on public.orders
for insert
to anon, authenticated
with check (
  jsonb_typeof(items) = 'array'
  and total >= 0
);

