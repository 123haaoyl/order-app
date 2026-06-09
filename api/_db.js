import { neon } from "@neondatabase/serverless";
import { createHash } from "node:crypto";

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

function normalizeAdminName(value) {
  return String(value || "").trim().toLowerCase();
}

function parseAdminUsers(value = "") {
  return String(value || "")
    .split(/[\n,;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const separatorIndex = entry.indexOf(":");
      if (separatorIndex <= 0) return null;
      const username = entry.slice(0, separatorIndex).trim();
      const password = entry.slice(separatorIndex + 1);
      if (!username || !password) return null;
      return { username, password };
    })
    .filter(Boolean);
}

export function getAdminAccounts() {
  const accounts = [];
  const legacyEmail = process.env.ADMIN_EMAIL || "";
  const legacyPassword = process.env.ADMIN_PASSWORD || "";
  if (legacyEmail && legacyPassword) {
    accounts.push({ username: legacyEmail, password: legacyPassword });
  }

  accounts.push(...parseAdminUsers(process.env.ADMIN_USERS));

  const seen = new Set();
  return accounts.filter((account) => {
    const normalizedName = normalizeAdminName(account.username);
    if (!normalizedName || seen.has(normalizedName)) return false;
    seen.add(normalizedName);
    return true;
  });
}

export function getAdminToken(username, password) {
  if (!username || !password) return "";
  return createHash("sha256").update(`${normalizeAdminName(username)}:${password}`).digest("hex");
}

export function findAdminAccount(username, password) {
  const normalizedName = normalizeAdminName(username);
  return getAdminAccounts().find(
    (account) => normalizeAdminName(account.username) === normalizedName && String(account.password) === String(password || ""),
  );
}

export function isAdminRequest(req) {
  const token = String(req.headers?.["x-admin-token"] || req.headers?.["X-Admin-Token"] || "");
  return Boolean(token && getAdminAccounts().some((account) => getAdminToken(account.username, account.password) === token));
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
    await sql`
      create table if not exists app_config (
        key text primary key,
        value jsonb not null default '{}'::jsonb,
        updated_at timestamptz not null default now()
      )
    `;
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
