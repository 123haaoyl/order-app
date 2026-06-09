import { ensureSchema, getErrorMessage, getSql, normalizeOrder, sendJson } from "./_db.js";

function makeOrderId() {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  return `ORD-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function toNumber(value) {
  return Math.max(0, Number(value || 0));
}

function validateOrder(payload) {
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return "订单里没有菜品";
  }
  if (payload.order_type === "dinein" && !String(payload.table_no || "").trim()) {
    return "堂食订单需要桌号";
  }
  if (payload.order_type === "takeaway" && !String(payload.delivery_address || "").trim()) {
    return "外卖订单需要收货地址";
  }
  return "";
}

export default async function handler(req, res) {
  try {
    await ensureSchema();
    const sql = getSql();

    if (req.method === "GET") {
      const rows = await sql`select * from orders order by created_at desc limit 500`;
      return sendJson(res, 200, { orders: rows.map(normalizeOrder) });
    }

    if (req.method === "POST") {
      const payload = req.body || {};
      const validationMessage = validateOrder(payload);
      if (validationMessage) {
        return sendJson(res, 400, { error: validationMessage });
      }

      const id = payload.id || makeOrderId();
      const orderType = payload.order_type === "takeaway" ? "takeaway" : "dinein";
      const subtotal = toNumber(payload.subtotal);
      const packingFee = toNumber(payload.packing_fee);
      const deliveryFee = toNumber(payload.delivery_fee);
      const payable = toNumber(payload.payable || payload.total || subtotal + packingFee + deliveryFee);
      const rows = await sql`
        insert into orders (
          id,
          order_type,
          table_no,
          delivery_address,
          delivery_time,
          payment_method,
          note,
          items,
          subtotal,
          packing_fee,
          delivery_fee,
          payable,
          total,
          status,
          order_text,
          created_at,
          updated_at
        )
        values (
          ${id},
          ${orderType},
          ${String(payload.table_no || "")},
          ${String(payload.delivery_address || "")},
          ${String(payload.delivery_time || "")},
          ${String(payload.payment_method || "")},
          ${String(payload.note || "")},
          ${JSON.stringify(payload.items || [])}::jsonb,
          ${subtotal},
          ${packingFee},
          ${deliveryFee},
          ${payable},
          ${payable},
          ${String(payload.status || "new")},
          ${String(payload.order_text || "")},
          ${payload.created_at ? new Date(payload.created_at).toISOString() : new Date().toISOString()},
          now()
        )
        returning *
      `;
      return sendJson(res, 201, { order: normalizeOrder(rows[0]) });
    }

    if (req.method === "PATCH") {
      const id = String(req.query?.id || "").trim();
      const status = String(req.body?.status || "").trim();
      if (!id) return sendJson(res, 400, { error: "缺少订单号" });
      if (!["new", "preparing", "served", "done", "canceled"].includes(status)) {
        return sendJson(res, 400, { error: "订单状态无效" });
      }
      const rows = await sql`
        update orders
        set status = ${status}, updated_at = now()
        where id = ${id}
        returning *
      `;
      if (!rows.length) return sendJson(res, 404, { error: "没有找到这笔订单" });
      return sendJson(res, 200, { order: normalizeOrder(rows[0]) });
    }

    if (req.method === "DELETE") {
      const id = String(req.query?.id || "").trim();
      if (!id) return sendJson(res, 400, { error: "缺少订单号" });
      const rows = await sql`delete from orders where id = ${id} returning id`;
      if (!rows.length) return sendJson(res, 404, { error: "没有找到这笔订单" });
      return sendJson(res, 200, { ok: true });
    }

    return sendJson(res, 405, { error: "不支持的请求方法" });
  } catch (error) {
    return sendJson(res, 500, { error: getErrorMessage(error, "订单服务暂时不可用") });
  }
}
