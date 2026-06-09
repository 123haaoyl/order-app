import { ensureSchema, getErrorMessage, getSql, isAdminRequest, sendJson } from "./_db.js";

const MENU_CONFIG_KEY = "menu";

function normalizeMenuState(value = {}) {
  const menuVersion = String(value.menuVersion || "");
  const overrides = value.overrides && typeof value.overrides === "object" && !Array.isArray(value.overrides)
    ? value.overrides
    : {};
  const customItems = Array.isArray(value.customItems) ? value.customItems.filter((item) => item && item.id) : [];
  const deletedIds = Array.isArray(value.deletedIds)
    ? value.deletedIds.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  const categories = Array.isArray(value.categories)
    ? value.categories.map((item) => String(item || "").trim()).filter(Boolean)
    : [];

  return { menuVersion, overrides, customItems, deletedIds, categories };
}

export default async function handler(req, res) {
  try {
    if (!["GET", "PUT"].includes(req.method)) {
      return sendJson(res, 405, { error: "不支持的请求方法" });
    }
    if (req.method === "PUT" && !isAdminRequest(req)) {
      return sendJson(res, 401, { error: "请先登录后台" });
    }

    await ensureSchema();
    const sql = getSql();

    if (req.method === "GET") {
      const rows = await sql`select value from app_config where key = ${MENU_CONFIG_KEY}`;
      return sendJson(res, 200, { menu: normalizeMenuState(rows[0]?.value || {}) });
    }

    const menu = normalizeMenuState(req.body || {});
    const rows = await sql`
      insert into app_config (key, value, updated_at)
      values (${MENU_CONFIG_KEY}, ${JSON.stringify(menu)}::jsonb, now())
      on conflict (key) do update
      set value = excluded.value, updated_at = now()
      returning value, updated_at
    `;
    return sendJson(res, 200, { ok: true, menu: normalizeMenuState(rows[0]?.value || menu), updated_at: rows[0]?.updated_at });
  } catch (error) {
    return sendJson(res, 500, { error: getErrorMessage(error, "菜单服务暂时不可用") });
  }
}
