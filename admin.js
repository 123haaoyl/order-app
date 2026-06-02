const config = window.ORDER_APP_SUPABASE || {};
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
const todayCount = document.querySelector("#today-count");
const todayTotal = document.querySelector("#today-total");
const newCount = document.querySelector("#new-count");

const statusLabels = {
  new: "新订单",
  preparing: "制作中",
  done: "已完成",
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

function renderStats(orders) {
  const today = new Date().toDateString();
  const todaysOrders = orders.filter((order) => new Date(order.created_at).toDateString() === today);
  todayCount.textContent = todaysOrders.length;
  todayTotal.textContent = currency(todaysOrders.reduce((sum, order) => sum + Number(order.total || 0), 0));
  newCount.textContent = orders.filter((order) => order.status === "new").length;
}

function renderOrderItems(items) {
  if (!Array.isArray(items) || !items.length) {
    return `<div class="admin-muted">无菜品明细</div>`;
  }

  return items
    .map(
      (item) => `
        <div class="order-line">
          <span>${escapeHtml(item.name)} × ${Number(item.quantity || 0)}</span>
          <strong>${currency(item.subtotal)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderOrders(orders) {
  renderStats(orders);

  if (!orders.length) {
    ordersList.innerHTML = `<div class="empty-state">暂无订单</div>`;
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card" data-order-id="${order.id}">
          <div class="order-card-header">
            <div>
              <p class="eyebrow">#${order.id} · ${formatTime(order.created_at)}</p>
              <h3>${escapeHtml(order.table_no || "未填桌号")}</h3>
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
            <span>${escapeHtml(order.note || "无备注")}</span>
            <strong>${currency(order.total)}</strong>
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
  const selectedStatus = statusFilter.value;
  let query = client.from("orders").select("*").order("created_at", { ascending: false }).limit(200);
  if (selectedStatus !== "all") {
    query = query.eq("status", selectedStatus);
  }

  const { data, error } = await query;
  if (error) {
    ordersList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    return;
  }

  renderOrders(data || []);
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

signInButton.addEventListener("click", signIn);
signOutButton.addEventListener("click", signOut);
refreshOrders.addEventListener("click", loadOrders);
statusFilter.addEventListener("change", loadOrders);

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
