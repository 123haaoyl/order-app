import { getAdminToken, sendJson } from "../_db.js";

function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "不支持的请求方法" });
  }

  const email = getAdminEmail();
  const password = getAdminPassword();
  if (!email || !password) {
    return sendJson(res, 500, { error: "后台账号还没有配置，请在 Vercel 环境变量里设置 ADMIN_EMAIL 和 ADMIN_PASSWORD。" });
  }

  const body = req.body || {};
  if (String(body.email || "").trim().toLowerCase() !== email.toLowerCase() || String(body.password || "") !== password) {
    return sendJson(res, 401, { error: "邮箱或密码不正确，请重新输入。" });
  }

  return sendJson(res, 200, { ok: true, email, token: getAdminToken() });
}
