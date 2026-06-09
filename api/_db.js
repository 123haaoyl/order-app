import { neon } from "@neondatabase/serverless";

let sqlClient;
let readyPromise;

export function sendJson(res, status, body) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.status(status).json(body);
}

export function getErrorMessage(error, fallback = "服务器处理失败") {
  const message = String(error?.message || error || "").toLowerCase();
  if (message.includes("database_url")) return "缺少 DATABASE_URL 环境变量，请先在 Vercel 里配置 Neon 数据库连接。";
  if (message.includes("password") || message.includes("authentication")) return "数据库连接认证失败，请检查 DATABASE_URL。";
  if (message.includes("network") || message.includes("fetch")) return "云数据库连接失败，请稍后重试。";
  return fallback;
}

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient;
}

export async function ensureSchema() {
  if (readyPromise) return readyPromise;
  readyPromise = (async () => {
    const sql = getSql();
    await sql`
      create table if not exists orders (
        id text primary key,
        order_type text not null default 'dinein',
        table_no text default '',
        delivery_address text default '',
        delivery_time text default '',
        payment_method text default '',
        note text default '',
        items jsonb not null default '[]'::jsonb,
        subtotal numeric not null default 0,
        packing_fee numeric not null default 0,
        delivery_fee numeric not null default 0,
        payable numeric not null default 0,
        total numeric not null default 0,
        status text not null default 'new',
        order_text text default '',
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )
    `;
    await sql`create index if not exists orders_created_at_idx on orders (created_at desc)`;
  })();
  return readyPromise;
}

export function normalizeOrder(row) {
  return {
    id: row.id,
    order_type: row.order_type,
    table_no: row.table_no || "",
    delivery_address: row.delivery_address || "",
    delivery_time: row.delivery_time || "",
    payment_method: row.payment_method || "",
    note: row.note || "",
    items: Array.isArray(row.items) ? row.items : [],
    subtotal: Number(row.subtotal || 0),
    packing_fee: Number(row.packing_fee || 0),
    delivery_fee: Number(row.delivery_fee || 0),
    payable: Number(row.payable ?? row.total ?? 0),
    total: Number(row.total ?? row.payable ?? 0),
    status: row.status || "new",
    order_text: row.order_text || "",
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
