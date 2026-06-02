const config = window.ORDER_APP_SUPABASE || {};
const shopConfig = window.SHOP_CONFIG || {};
const menuItems = Array.isArray(window.MENU_ITEMS) ? window.MENU_ITEMS : [];
const tables = Array.isArray(window.TABLES) ? window.TABLES : [];
const coupons = Array.isArray(window.COUPONS) ? window.COUPONS : [];
const memberProfile = window.MEMBER_PROFILE || {};
const hasConfig =
  config.url &&
  config.anonKey &&
  !String(config.anonKey).includes("PASTE_YOUR_SUPABASE");

const client = hasConfig && window.supabase?.createClient
  ? window.supabase.createClient(config.url, config.anonKey)
  : null;

const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#dashboard");
const signInButton = document.querySelector("#sign-in");
const signOutButton = document.querySelector("#sign-out");
const emailInput = document.querySelector("#admin-email");
const passwordInput = document.querySelector("#admin-password");
const authMessage = document.querySelector("#auth-message");
const ordersList = document.querySelector("#orders-list");
const refreshOrders = document.querySelector("#refresh-orders");
const statusFilter = document.querySelector("#status-filter");
const orderSearch = document.querySelector("#order-search");
const orderDate = document.querySelector("#order-date");
const exportOrders = document.querySelector("#export-orders");
const todayCount = document.querySelector("#today-count");
const todayTotal = document.querySelector("#today-total");
const newCount = document.querySelector("#new-count");
const discountSpend = document.querySelector("#discount-spend");

let latestOrders = [];

const statusLabels = {
  new: "待接单",
  preparing: "后厨备餐",
  served: "出餐",
  done: "完成",
  canceled: "已取消",
};

function currency(value) {
  return `¥${Number(value || 0).toFixed(0)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTime(value) {
  return new Date(value).toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function showAuthMessage(message) {
  authMessage.textContent = message || "";
}

function setSessionView(isSignedIn) {
  loginPanel.hidden = isSignedIn;
  dashboard.hidden = !isSignedIn;
  signOutButton.hidden = !isSignedIn;
}

function getOrderTotal(order) {
  return Number(order.payable ?? order.total ?? 0);
}

function getOrderDiscount(order) {
  return Number(order.discount || 0);
}

function getOrderTypeLabel(order) {
  return order.order_type === "takeaway" ? "外卖" : "到店";
}

function getOrderKeyword(order) {
  return [
    order.id,
    order.table_no,
    order.delivery_address,
    order.payment_method,
    ...(Array.isArray(order.items) ? order.items.map((item) => item.name) : []),
  ]
    .join(" ")
    .toLowerCase();
}

function applyOrderFilters(orders) {
  const status = statusFilter.value;
  const keyword = orderSearch.value.trim().toLowerCase();
  const dateValue = orderDate.value;

  return orders.filter((order) => {
    const inStatus = status === "all" || order.status === status;
    const inKeyword = !keyword || getOrderKeyword(order).includes(keyword);
    const inDate = !dateValue || new Date(order.created_at).toISOString().slice(0, 10) === dateValue;
    return inStatus && inKeyword && inDate;
  });
}

function renderStats(orders) {
  const today = new Date().toDateString();
  const todaysOrders = orders.filter((order) => new Date(order.created_at).toDateString() === today);
  todayCount.textContent = todaysOrders.length;
  todayTotal.textContent = currency(todaysOrders.reduce((sum, order) => sum + getOrderTotal(order), 0));
  newCount.textContent = orders.filter((order) => order.status === "new").length;
  discountSpend.textContent = currency(todaysOrders.reduce((sum, order) => sum + getOrderDiscount(order), 0));
}

function renderHotDishes(orders) {
  const dishMap = new Map();
  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      const current = dishMap.get(item.name) || { name: item.name, quantity: 0, amount: 0 };
      current.quantity += Number(item.quantity || 0);
      current.amount += Number(item.subtotal || 0);
      dishMap.set(item.name, current);
    });
  });

  const hotItems = [...dishMap.values()]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 8);

  document.querySelector("#hot-dish-list").innerHTML = hotItems.length
    ? hotItems
        .map(
          (item, index) => `
            <div class="compact-row">
              <span>#${index + 1} ${escapeHtml(item.name)}</span>
              <strong>${item.quantity} 份 · ${currency(item.amount)}</strong>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">暂无热销数据</div>`;
}

function renderOrderItems(items) {
  if (!Array.isArray(items) || !items.length) {
    return `<div class="admin-muted">无菜品明细</div>`;
  }

  return items
    .map(
      (item) => `
        <div class="order-line">
          <span>${escapeHtml(item.name)} × ${Number(item.quantity || 0)} ${item.spec_text ? `· ${escapeHtml(item.spec_text)}` : ""}</span>
          <strong>${currency(item.subtotal)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderOrders() {
  const filteredOrders = applyOrderFilters(latestOrders);
  renderStats(latestOrders);
  renderHotDishes(latestOrders);

  if (!filteredOrders.length) {
    ordersList.innerHTML = `<div class="empty-state">暂无订单</div>`;
    return;
  }

  ordersList.innerHTML = filteredOrders
    .map(
      (order) => `
        <article class="order-card ${order.status === "new" ? "is-new" : ""}" data-order-id="${order.id}">
          <div class="order-card-header">
            <div>
              <p class="eyebrow">#${order.id} · ${formatTime(order.created_at)} · ${getOrderTypeLabel(order)}</p>
              <h3>${escapeHtml(order.order_type === "takeaway" ? order.delivery_address || "未填地址" : order.table_no || "未填桌号")}</h3>
            </div>
            <select class="status-select" data-order-id="${order.id}" aria-label="订单 #${order.id} 状态">
              ${Object.entries(statusLabels)
                .map(
                  ([value, label]) => `
                    <option value="${value}" ${order.status === value ? "selected" : ""}>${label}</option>
                  `,
                )
                .join("")}
            </select>
          </div>
          <div class="order-lines">${renderOrderItems(order.items)}</div>
          <div class="order-card-footer">
            <span>${escapeHtml(order.note || "无备注")} · ${escapeHtml(order.payment_method || "未记录支付")}</span>
            <strong>${currency(getOrderTotal(order))}</strong>
          </div>
        </article>
      `,
    )
    .join("");
}

async function loadOrders() {
  if (!client) {
    ordersList.innerHTML = `<div class="empty-state">Supabase 配置不可用</div>`;
    return;
  }

  ordersList.innerHTML = `<div class="empty-state">加载中...</div>`;
  const { data, error } = await client.from("orders").select("*").order("created_at", { ascending: false }).limit(500);
  if (error) {
    ordersList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    return;
  }

  latestOrders = data || [];
  renderOrders();
}

function renderMenuAdmin() {
  document.querySelector("#menu-admin-list").innerHTML = `
    <div class="admin-table-row head">
      <span>菜品</span>
      <span>分类</span>
      <span>价格</span>
      <span>库存</span>
      <span>状态</span>
    </div>
    ${menuItems
      .map(
        (item) => `
          <div class="admin-table-row">
            <span>${escapeHtml(item.image)} ${escapeHtml(item.name)}</span>
            <span>${escapeHtml(item.category)}</span>
            <span>${currency(item.price)}</span>
            <span>${Number(item.stock || 0)}</span>
            <span class="dish-tag">${Number(item.stock || 0) > 0 ? "上架" : "下架"}</span>
          </div>
        `,
      )
      .join("")}
  `;
}

function renderTables() {
  document.querySelector("#table-admin-list").innerHTML = tables
    .map(
      (table) => `
        <div class="table-card">
          <p class="eyebrow">${escapeHtml(table.area)}</p>
          <h3>${escapeHtml(table.id)}</h3>
          <span>${Number(table.seats || 0)} 人桌</span>
          <strong>${table.status === "reserved" ? "预定" : table.status === "occupied" ? "占用" : "空闲"}</strong>
          <small>二维码：?table=${escapeHtml(table.id)}</small>
        </div>
      `,
    )
    .join("");
}

function renderMarketing() {
  document.querySelector("#coupon-admin-list").innerHTML = `
    <div class="admin-table-row head">
      <span>活动</span>
      <span>门槛</span>
      <span>优惠</span>
      <span>有效期</span>
    </div>
    ${coupons
      .map(
        (coupon) => `
          <div class="admin-table-row">
            <span>${escapeHtml(coupon.name)}</span>
            <span>满 ${Number(coupon.threshold || 0)}</span>
            <span>${coupon.type === "discount" ? `${Math.round(Number(coupon.value || 1) * 100)} 折` : currency(coupon.value)}</span>
            <span>${escapeHtml(coupon.validUntil)}</span>
          </div>
        `,
      )
      .join("")}
  `;
}

function renderMembers() {
  const phone = memberProfile.phone || "示例会员";
  document.querySelector("#member-admin-list").innerHTML = `
    <div class="admin-table-row head">
      <span>会员</span>
      <span>余额</span>
      <span>积分</span>
      <span>消费记录</span>
    </div>
    <div class="admin-table-row">
      <span>${escapeHtml(phone)}</span>
      <span>${currency(memberProfile.balance || 0)}</span>
      <span>${Number(memberProfile.points || 0)}</span>
      <span>${latestOrders.length} 单</span>
    </div>
  `;
}

function renderSettings() {
  document.querySelector("#shop-settings").innerHTML = `
    <div class="setting-card">
      <span>店名</span>
      <strong>${escapeHtml(shopConfig.name)}</strong>
      <p>${escapeHtml(shopConfig.announcement)}</p>
    </div>
    <div class="setting-card">
      <span>营业时间</span>
      <strong>${escapeHtml(shopConfig.businessHours)}</strong>
      <p>${escapeHtml(shopConfig.address)}</p>
    </div>
    <div class="setting-card">
      <span>配送</span>
      <strong>起送 ${currency(shopConfig.minOrderAmount)}</strong>
      <p>${escapeHtml(shopConfig.deliveryRange)} · 配送费 ${currency(shopConfig.deliveryFee)}</p>
    </div>
    <div class="setting-card">
      <span>打包费</span>
      <strong>${currency(shopConfig.packingFeePerDish)} / 件</strong>
      <p>${escapeHtml(shopConfig.phone)}</p>
    </div>
  `;
}

function renderStaticModules() {
  renderMenuAdmin();
  renderTables();
  renderMarketing();
  renderMembers();
  renderSettings();
}

async function signIn() {
  if (!client) {
    showAuthMessage("Supabase 配置不可用");
    return;
  }

  signInButton.disabled = true;
  signInButton.textContent = "登录中...";
  showAuthMessage("");

  const { error } = await client.auth.signInWithPassword({
    email: emailInput.value.trim(),
    password: passwordInput.value,
  });

  signInButton.disabled = false;
  signInButton.textContent = "进入后台";

  if (error) {
    showAuthMessage(error.message);
    return;
  }

  setSessionView(true);
  renderStaticModules();
  await loadOrders();
}

async function signOut() {
  await client?.auth.signOut();
  setSessionView(false);
  passwordInput.value = "";
}

async function updateStatus(orderId, status) {
  const { error } = await client.from("orders").update({ status }).eq("id", orderId);
  if (error) {
    ordersList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    return;
  }
  await loadOrders();
}

function exportOrderCsv() {
  const rows = applyOrderFilters(latestOrders).map((order) => ({
    id: order.id,
    time: formatTime(order.created_at),
    type: getOrderTypeLabel(order),
    status: statusLabels[order.status] || order.status,
    table: order.table_no || "",
    address: order.delivery_address || "",
    total: getOrderTotal(order),
    discount: getOrderDiscount(order),
    items: (order.items || []).map((item) => `${item.name}x${item.quantity}`).join(";"),
  }));
  const header = ["订单号", "时间", "类型", "状态", "桌号", "地址", "实付", "优惠", "菜品"];
  const csv = [
    header.join(","),
    ...rows.map((row) =>
      [row.id, row.time, row.type, row.status, row.table, row.address, row.total, row.discount, row.items]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll("[data-admin-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-admin-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
    document.querySelectorAll("[data-admin-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.adminPanel === button.dataset.adminTab);
    });
  });
});

signInButton.addEventListener("click", signIn);
signOutButton.addEventListener("click", signOut);
refreshOrders.addEventListener("click", loadOrders);
statusFilter.addEventListener("change", renderOrders);
orderSearch.addEventListener("input", renderOrders);
orderDate.addEventListener("change", renderOrders);
exportOrders.addEventListener("click", exportOrderCsv);

ordersList.addEventListener("change", (event) => {
  const select = event.target.closest(".status-select");
  if (!select) return;
  updateStatus(select.dataset.orderId, select.value);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !loginPanel.hidden) {
    signIn();
  }
});

async function boot() {
  renderStaticModules();
  if (!client) {
    showAuthMessage("Supabase 配置不可用");
    return;
  }

  const { data } = await client.auth.getSession();
  const isSignedIn = Boolean(data.session);
  setSessionView(isSignedIn);
  if (isSignedIn) {
    await loadOrders();
  }
}

boot();
