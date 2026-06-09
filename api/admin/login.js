import { findAdminAccount, getAdminAccounts, getAdminToken, sendJson } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "不支持的请求方法" });
  }

  if (!getAdminAccounts().length) {
    return sendJson(res, 500, { error: "后台账号还没有配置，请在 Vercel 环境变量里设置 ADMIN_EMAIL / ADMIN_PASSWORD，或设置 ADMIN_USERS。" });
  }

  const body = req.body || {};
  const account = findAdminAccount(body.email, body.password);
  if (!account) {
    return sendJson(res, 401, { error: "账号或密码不正确，请重新输入。" });
  }

  return sendJson(res, 200, { ok: true, email: account.username, token: getAdminToken(account.username, account.password) });
}
