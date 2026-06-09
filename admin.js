const config = window.ORDER_APP_SUPABASE || {};
const menuItems = Array.isArray(window.MENU_ITEMS) ? window.MENU_ITEMS : [];
const tables = Array.isArray(window.TABLES) ? window.TABLES : [];
const forceDemoMode = new URLSearchParams(window.location.search).get("demo") === "1";
const hasConfig =
  !forceDemoMode &&
  config.url &&
  config.anonKey &&
  !String(config.anonKey).includes("PASTE_YOUR_SUPABASE");

const client = hasConfig && window.supabase?.createClient
  ? window.supabase.createClient(config.url, config.anonKey)
  : null;
const LOCAL_ORDERS_KEY = "customer-orders";
const MENU_OVERRIDES_KEY = "order-menu-overrides";
const CUSTOM_MENU_KEY = "order-custom-menu-items";
const DELETED_MENU_KEY = "order-deleted-menu-ids";
const TABLE_OVERRIDES_KEY = "order-table-overrides";
const MENU_VERSION_KEY = "order-menu-version";

const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#dashboard");
const signInButton = document.querySelector("#sign-in");
const signOutButton = document.querySelector("#sign-out");
const emailInput = document.querySelector("#admin-email");
const passwordInput = document.querySelector("#admin-password");
const authMessage = document.querySelector("#auth-message");
const ordersList = document.querySelector("#orders-list");
const refreshOrders = document.querySelector("#refresh-orders");
const overviewDate = document.querySelector("#overview-date");
const statusFilter = document.querySelector("#status-filter");
const orderSearch = document.querySelector("#order-search");
const orderDate = document.querySelector("#order-date");
const exportOrders = document.querySelector("#export-orders");
const todayCount = document.querySelector("#today-count");
const todayTotal = document.querySelector("#today-total");
const newCount = document.querySelector("#new-count");
const appToast = document.querySelector("#app-toast");
const dishFormDialog = document.querySelector("#dish-form-dialog");
const openDishForm = document.querySelector("#open-dish-form");
const closeDishForm = document.querySelector("#close-dish-form");
const newDishName = document.querySelector("#new-dish-name");
const newDishCategory = document.querySelector("#new-dish-category");
const newDishCustomCategoryWrap = document.querySelector("#new-dish-custom-category-wrap");
const newDishCustomCategory = document.querySelector("#new-dish-custom-category");
const newDishPrice = document.querySelector("#new-dish-price");
const newDishStock = document.querySelector("#new-dish-stock");
const newDishTag = document.querySelector("#new-dish-tag");
const newDishDescription = document.querySelector("#new-dish-description");
const newDishIconCustom = document.querySelector("#new-dish-icon-custom");
const dishIconOptions = document.querySelector("#dish-icon-options");
const specBuilder = document.querySelector("#spec-builder");
const addSpecGroup = document.querySelector("#add-spec-group");
const saveNewDish = document.querySelector("#save-new-dish");

if (forceDemoMode) {
  const customerLink = document.querySelector('a[href="./index.html"]');
  if (customerLink) customerLink.href = "./index.html?demo=1";
}

let latestOrders = [];
let toastTimer = null;
let selectedNewDishIcon = "🍽️";
let draftSpecs = [];

const statusLabels = {
  new: "待接单",
  preparing: "后厨备餐",
  served: "出餐",
  done: "完成",
  canceled: "已取消",
};

const dishIconList = ["🍜", "🍱", "🥟", "🍗", "🐟", "🥘", "🥒", "🥗", "🧋", "🍋", "🍚", "🍛", "🍲", "🥩", "🍤", "🍣", "🍔", "🍟", "🌮", "🍰", "☕", "🥤", "🍽️"];

function currency(value) {
  return `¥${Number(value || 0).toFixed(0)}`;
}

function slugify(value) {
  const ascii = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return ascii || `dish-${Date.now().toString(36)}`;
}

function makeDishId(name) {
  const base = slugify(name);
  let id = base;
  let index = 1;
  while (menuItems.some((item) => item.id === id)) {
    id = `${base}-${index}`;
    index += 1;
  }
  return id;
}

function getMenuCategories() {
  return [...new Set(menuItems.map((item) => item.category).filter(Boolean))];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  if (!appToast) return;
  window.clearTimeout(toastTimer);
  appToast.textContent = message;
  appToast.hidden = false;
  toastTimer = window.setTimeout(() => {
    appToast.hidden = true;
  }, 2200);
}

function readStorageObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function readStorageArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeStorageObject(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function writeStorageArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function syncMenuVersion() {
  const menuVersion = String(window.SHOP_CONFIG?.menuVersion || "");
  if (!menuVersion || localStorage.getItem(MENU_VERSION_KEY) === menuVersion) return;
  [LOCAL_ORDERS_KEY, MENU_OVERRIDES_KEY, CUSTOM_MENU_KEY, DELETED_MENU_KEY].forEach((key) => {
    localStorage.removeItem(key);
  });
  localStorage.setItem(MENU_VERSION_KEY, menuVersion);
}

function normalizeTableStatus(status) {
  return status === "occupied" ? "occupied" : "idle";
}

function applyLocalDataOverrides() {
  readStorageArray(CUSTOM_MENU_KEY).forEach((dish) => {
    if (!dish?.id) return;
    const existing = menuItems.find((item) => item.id === dish.id);
    if (existing) {
      Object.assign(existing, dish);
    } else {
      menuItems.push(dish);
    }
  });

  const deletedIds = new Set(readStorageArray(DELETED_MENU_KEY));
  for (let index = menuItems.length - 1; index >= 0; index -= 1) {
    if (deletedIds.has(menuItems[index].id)) {
      menuItems.splice(index, 1);
    }
  }

  const menuOverrides = readStorageObject(MENU_OVERRIDES_KEY);
  menuItems.forEach((item) => {
    const override = menuOverrides[item.id];
    item.isActive = override?.isActive !== false;
    if (!override) return;
    item.category = String(override.category || item.category);
    item.price = Math.max(0, Number(override.price ?? item.price));
    item.stock = Math.max(0, Number(override.stock ?? item.stock));
  });

  const tableOverrides = readStorageObject(TABLE_OVERRIDES_KEY);
  tables.forEach((table) => {
    const override = tableOverrides[table.id];
    table.area = override?.area || table.area || "";
    table.seats = Math.max(1, Number(override?.seats ?? table.seats ?? 1));
    table.status = normalizeTableStatus(override?.status || table.status);
  });
}

function saveMenuOverride(dishId, patch) {
  const overrides = readStorageObject(MENU_OVERRIDES_KEY);
  const current = overrides[dishId] || {};
  overrides[dishId] = { ...current, ...patch };
  writeStorageObject(MENU_OVERRIDES_KEY, overrides);
  Object.assign(menuItems.find((item) => item.id === dishId) || {}, overrides[dishId]);
}

function saveTableOverride(tableId, patch) {
  const overrides = readStorageObject(TABLE_OVERRIDES_KEY);
  const current = overrides[tableId] || {};
  const table = tables.find((item) => item.id === tableId);
  const nextStatus = patch.status ?? current.status ?? table?.status ?? "idle";
  overrides[tableId] = { ...current, ...patch, status: normalizeTableStatus(nextStatus) };
  writeStorageObject(TABLE_OVERRIDES_KEY, overrides);
  Object.assign(table || {}, overrides[tableId]);
}

function renderNewDishCategories() {
  newDishCategory.innerHTML = [
    ...getMenuCategories().map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
    `<option value="__custom__">新建分类</option>`,
  ].join("");
}

function renderIconOptions() {
  dishIconOptions.innerHTML = dishIconList
    .map(
      (icon) => `
        <button class="icon-choice ${icon === selectedNewDishIcon ? "active" : ""}" data-dish-icon="${escapeHtml(icon)}" type="button" aria-label="选择 ${escapeHtml(icon)}">
          ${escapeHtml(icon)}
        </button>
      `,
    )
    .join("");
}

function renderSpecBuilder() {
  if (!draftSpecs.length) {
    specBuilder.innerHTML = `<div class="empty-state">还没有规格。可添加“份量”“辣度”“冰量”等规格组。</div>`;
    return;
  }

  specBuilder.innerHTML = draftSpecs
    .map(
      (group, groupIndex) => `
        <div class="spec-editor-card" data-spec-index="${groupIndex}">
          <div class="spec-editor-head">
            <label class="admin-field">
              <span>规格组</span>
              <input data-spec-name="${groupIndex}" type="text" value="${escapeHtml(group.name)}" placeholder="例如：份量" />
            </label>
            <button class="danger-button" data-remove-spec-group="${groupIndex}" type="button">删除组</button>
          </div>
          <div class="spec-option-editor">
            ${(group.options || [])
              .map(
                (option, optionIndex) => `
                  <div class="spec-option-row">
                    <input data-spec-option-label="${groupIndex}:${optionIndex}" type="text" value="${escapeHtml(option.label)}" placeholder="选项名" />
                    <input data-spec-option-price="${groupIndex}:${optionIndex}" type="number" min="0" step="1" value="${Number(option.priceDelta || 0)}" aria-label="加价" />
                    <button class="danger-button" data-remove-spec-option="${groupIndex}:${optionIndex}" type="button">删除</button>
                  </div>
                `,
              )
              .join("")}
          </div>
          <button class="ghost-button" data-add-spec-option="${groupIndex}" type="button">添加选项</button>
        </div>
      `,
    )
    .join("");
}

function resetDishForm() {
  newDishName.value = "";
  newDishPrice.value = "28";
  newDishStock.value = "50";
  newDishTag.value = "";
  newDishDescription.value = "";
  newDishCustomCategory.value = "";
  selectedNewDishIcon = "🍽️";
  newDishIconCustom.value = "";
  draftSpecs = [
    { name: "份量", options: [{ label: "标准", priceDelta: 0 }, { label: "大份", priceDelta: 6 }] },
    { name: "辣度", options: [{ label: "不辣", priceDelta: 0 }, { label: "微辣", priceDelta: 0 }] },
  ];
  renderNewDishCategories();
  newDishCustomCategoryWrap.hidden = newDishCategory.value !== "__custom__";
  renderIconOptions();
  renderSpecBuilder();
}

function openNewDishDialog() {
  resetDishForm();
  dishFormDialog.showModal();
}

function getDraftSpecs() {
  return draftSpecs
    .map((group) => ({
      name: String(group.name || "").trim(),
      options: (group.options || [])
        .map((option) => ({
          label: String(option.label || "").trim(),
          priceDelta: Math.max(0, Number(option.priceDelta || 0)),
        }))
        .filter((option) => option.label),
    }))
    .filter((group) => group.name && group.options.length);
}

function collectNewDishPayload() {
  const name = newDishName.value.trim();
  if (!name) throw new Error("请填写菜品名称");

  const category = newDishCategory.value === "__custom__"
    ? newDishCustomCategory.value.trim()
    : newDishCategory.value;
  if (!category) throw new Error("请选择或填写分类");

  const icon = newDishIconCustom.value.trim() || selectedNewDishIcon || "🍽️";
  return {
    id: makeDishId(name),
    name,
    category,
    price: Math.max(0, Number(newDishPrice.value || 0)),
    image: icon,
    tag: newDishTag.value.trim(),
    rank: menuItems.length + 1,
    stock: Math.max(0, Number(newDishStock.value || 0)),
    description: newDishDescription.value.trim() || "新上架菜品",
    isActive: true,
    specs: getDraftSpecs(),
  };
}

function saveCustomDish(dish) {
  const customItems = readStorageArray(CUSTOM_MENU_KEY);
  dish.isCustom = true;
  customItems.push(dish);
  writeStorageArray(CUSTOM_MENU_KEY, customItems);
  menuItems.push(dish);
  renderMenuAdmin();
  renderNewDishCategories();
}

function deleteDish(dishId) {
  if (!window.confirm("确定删除这个菜品吗？")) return;

  const customItems = readStorageArray(CUSTOM_MENU_KEY);
  const isCustomDish = customItems.some((item) => item.id === dishId);
  const nextCustomItems = customItems.filter((item) => item.id !== dishId);
  writeStorageArray(CUSTOM_MENU_KEY, nextCustomItems);

  if (!isCustomDish) {
    const deletedIds = new Set(readStorageArray(DELETED_MENU_KEY));
    deletedIds.add(dishId);
    writeStorageArray(DELETED_MENU_KEY, [...deletedIds]);
  }

  const overrides = readStorageObject(MENU_OVERRIDES_KEY);
  delete overrides[dishId];
  writeStorageObject(MENU_OVERRIDES_KEY, overrides);

  const index = menuItems.findIndex((item) => item.id === dishId);
  if (index >= 0) menuItems.splice(index, 1);
  renderMenuAdmin();
  renderNewDishCategories();
  showToast("菜品已删除，顾客端刷新后生效");
}

function saveNewDishFromForm() {
  try {
    const dish = collectNewDishPayload();
    saveCustomDish(dish);
    dishFormDialog.close();
    showToast(`${dish.name} 已新增，顾客端刷新后可点餐`);
  } catch (error) {
    showToast(error.message || "菜品保存失败");
  }
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "未知时间");
  return date.toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toDateInputValue(date = new Date()) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function getOrderDateValue(order) {
  const date = new Date(order.created_at);
  if (Number.isNaN(date.getTime())) return "";
  return toDateInputValue(date);
}

function getOverviewDateValue() {
  if (!overviewDate.value) overviewDate.value = toDateInputValue();
  return overviewDate.value;
}

function getOverviewOrders(orders) {
  const selectedDate = getOverviewDateValue();
  return orders.filter((order) => getOrderDateValue(order) === selectedDate);
}

function showAuthMessage(message) {
  authMessage.textContent = message || "";
}

function setSessionView(isSignedIn) {
  loginPanel.hidden = isSignedIn;
  dashboard.hidden = !isSignedIn;
  signOutButton.hidden = !isSignedIn;
}

function readLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeLocalOrders(orders) {
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
}

function getLocalOrderId(order, index) {
  return order.id || `LOCAL-${index + 1}`;
}

function getDemoOrders() {
  return readLocalOrders().map((order, index) => {
    const status = order.status || "new";
    return {
      ...order,
      id: getLocalOrderId(order, index),
      status,
      status_label: statusLabels[status] || order.status_label || "待接单",
      created_at: order.created_at || new Date().toISOString(),
      source: order.source || "local",
    };
  });
}

function updateLocalOrderStatus(orderId, status) {
  const orders = readLocalOrders().map((order, index) => {
    const id = getLocalOrderId(order, index);
    if (String(id) !== String(orderId)) return order;
    return {
      ...order,
      id,
      status,
      status_label: statusLabels[status] || status,
    };
  });
  writeLocalOrders(orders);
  latestOrders = getDemoOrders();
  renderOrders();
  showToast(`订单状态已改为${statusLabels[status] || status}`);
}

function getOrderTotal(order) {
  return Number(order.payable ?? order.total ?? 0);
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
    const orderDateValue = new Date(order.created_at);
    const inStatus = status === "all" || order.status === status;
    const inKeyword = !keyword || getOrderKeyword(order).includes(keyword);
    const inDate =
      !dateValue ||
      (!Number.isNaN(orderDateValue.getTime()) && orderDateValue.toISOString().slice(0, 10) === dateValue);
    return inStatus && inKeyword && inDate;
  });
}

function renderStats(orders) {
  const overviewOrders = getOverviewOrders(orders);
  todayCount.textContent = overviewOrders.length;
  todayTotal.textContent = currency(overviewOrders.reduce((sum, order) => sum + getOrderTotal(order), 0));
  newCount.textContent = overviewOrders.filter((order) => order.status === "new").length;
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
  renderHotDishes(getOverviewOrders(latestOrders));

  if (!filteredOrders.length) {
    ordersList.innerHTML = `<div class="empty-state">${client ? "暂无订单" : "暂无本地演示订单，先在客户端提交一单"}</div>`;
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
            <div class="order-card-actions">
              <button class="danger-button" data-delete-order="${escapeHtml(order.id)}" type="button">删除</button>
              <strong>${currency(getOrderTotal(order))}</strong>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

async function loadOrders() {
  if (!client) {
    latestOrders = getDemoOrders();
    renderOrders();
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
      <span>操作</span>
    </div>
    ${menuItems
      .map(
        (item) => `
          <div class="admin-table-row editable-row" data-dish-id="${escapeHtml(item.id)}">
            <span>${escapeHtml(item.image)} ${escapeHtml(item.name)}</span>
            <input data-menu-field="category" type="text" value="${escapeHtml(item.category)}" aria-label="${escapeHtml(item.name)} 分类" />
            <input data-menu-field="price" type="number" min="0" step="1" value="${Number(item.price || 0)}" aria-label="${escapeHtml(item.name)} 价格" />
            <input data-menu-field="stock" type="number" min="0" step="1" value="${Number(item.stock || 0)}" aria-label="${escapeHtml(item.name)} 库存" />
            <select data-menu-field="isActive" aria-label="${escapeHtml(item.name)} 上架状态">
              <option value="true" ${item.isActive !== false ? "selected" : ""}>上架</option>
              <option value="false" ${item.isActive === false ? "selected" : ""}>下架</option>
            </select>
            <span>
              <button class="danger-button" data-delete-dish="${escapeHtml(item.id)}" type="button">删除</button>
            </span>
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
        <div class="table-card" data-table-id="${escapeHtml(table.id)}">
          <p class="eyebrow">${escapeHtml(table.area)}</p>
          <h3>${escapeHtml(table.id)}</h3>
          <label class="admin-field compact-field">
            <span>区域</span>
            <input data-table-field="area" type="text" value="${escapeHtml(table.area)}" />
          </label>
          <label class="admin-field compact-field">
            <span>座位</span>
            <input data-table-field="seats" type="number" min="1" step="1" value="${Number(table.seats || 1)}" />
          </label>
          <label class="admin-field compact-field">
            <span>状态</span>
            <select data-table-field="status">
              <option value="idle" ${normalizeTableStatus(table.status) === "idle" ? "selected" : ""}>空闲</option>
              <option value="occupied" ${normalizeTableStatus(table.status) === "occupied" ? "selected" : ""}>占用</option>
            </select>
          </label>
          <small>二维码：?table=${escapeHtml(table.id)}</small>
        </div>
      `,
    )
    .join("");
}

function renderStaticModules() {
  renderMenuAdmin();
  renderTables();
}

async function signIn() {
  if (!client) {
    if (!emailInput.value.trim() || !passwordInput.value) {
      showAuthMessage("请输入邮箱和密码");
      return;
    }
    setSessionView(true);
    showAuthMessage("");
    renderStaticModules();
    await loadOrders();
    showToast("已进入演示后台");
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
  showAuthMessage("已退出后台");
}

async function updateStatus(orderId, status) {
  if (!client) {
    updateLocalOrderStatus(orderId, status);
    return;
  }

  const { error } = await client.from("orders").update({ status }).eq("id", orderId);
  if (error) {
    ordersList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    return;
  }
  await loadOrders();
  showToast(`订单状态已改为${statusLabels[status] || status}`);
}

async function deleteOrder(orderId) {
  if (!window.confirm("确定删除这笔订单吗？")) return;

  if (!client) {
    const nextOrders = readLocalOrders().filter((order, index) => String(getLocalOrderId(order, index)) !== String(orderId));
    writeLocalOrders(nextOrders);
    latestOrders = getDemoOrders();
    renderOrders();
    showToast("订单已删除");
    return;
  }

  const { error } = await client.from("orders").delete().eq("id", orderId);
  if (error) {
    showToast(error.message || "订单删除失败");
    return;
  }
  await loadOrders();
  showToast("订单已删除");
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
    items: (order.items || []).map((item) => `${item.name}x${item.quantity}`).join(";"),
  }));
  const header = ["订单号", "时间", "类型", "状态", "桌号", "地址", "实付", "菜品"];
  const csv = [
    header.join(","),
    ...rows.map((row) =>
      [row.id, row.time, row.type, row.status, row.table, row.address, row.total, row.items]
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
  showToast("订单 CSV 已导出");
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
refreshOrders.addEventListener("click", async () => {
  await loadOrders();
  showToast("订单已刷新");
});
overviewDate.addEventListener("change", () => {
  renderStats(latestOrders);
  renderHotDishes(getOverviewOrders(latestOrders));
  showToast("看板日期已更新");
});
statusFilter.addEventListener("change", renderOrders);
orderSearch.addEventListener("input", renderOrders);
orderDate.addEventListener("change", renderOrders);
exportOrders.addEventListener("click", exportOrderCsv);

ordersList.addEventListener("change", (event) => {
  const select = event.target.closest(".status-select");
  if (!select) return;
  updateStatus(select.dataset.orderId, select.value);
});

ordersList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-order]");
  if (!deleteButton) return;
  deleteOrder(deleteButton.dataset.deleteOrder);
});

document.querySelector("#menu-admin-list").addEventListener("change", (event) => {
  const field = event.target.closest("[data-menu-field]");
  if (!field) return;
  const row = field.closest("[data-dish-id]");
  const dishId = row?.dataset.dishId;
  const dish = menuItems.find((item) => item.id === dishId);
  if (!dish) return;

  const patch = {};
  if (field.dataset.menuField === "price" || field.dataset.menuField === "stock") {
    patch[field.dataset.menuField] = Math.max(0, Number(field.value || 0));
  } else if (field.dataset.menuField === "isActive") {
    patch.isActive = field.value === "true";
  } else {
    patch[field.dataset.menuField] = field.value.trim() || dish[field.dataset.menuField];
  }
  saveMenuOverride(dishId, patch);
  renderMenuAdmin();
  showToast("菜品信息已保存，顾客端刷新后生效");
});

document.querySelector("#menu-admin-list").addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-dish]");
  if (!deleteButton) return;
  deleteDish(deleteButton.dataset.deleteDish);
});

document.querySelector("#table-admin-list").addEventListener("change", (event) => {
  const field = event.target.closest("[data-table-field]");
  if (!field) return;
  const card = field.closest("[data-table-id]");
  const tableId = card?.dataset.tableId;
  const table = tables.find((item) => item.id === tableId);
  if (!table) return;

  const patch = {};
  if (field.dataset.tableField === "seats") {
    patch.seats = Math.max(1, Number(field.value || 1));
  } else if (field.dataset.tableField === "status") {
    patch.status = normalizeTableStatus(field.value);
  } else {
    patch.area = field.value.trim() || table.area;
  }
  saveTableOverride(tableId, patch);
  renderTables();
  showToast("桌台信息已保存，顾客端刷新后生效");
});

openDishForm.addEventListener("click", openNewDishDialog);
closeDishForm.addEventListener("click", () => dishFormDialog.close());
saveNewDish.addEventListener("click", saveNewDishFromForm);

newDishCategory.addEventListener("change", () => {
  newDishCustomCategoryWrap.hidden = newDishCategory.value !== "__custom__";
});

newDishIconCustom.addEventListener("input", () => {
  selectedNewDishIcon = newDishIconCustom.value.trim() || selectedNewDishIcon;
  renderIconOptions();
});

dishIconOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-dish-icon]");
  if (!button) return;
  selectedNewDishIcon = button.dataset.dishIcon;
  newDishIconCustom.value = "";
  renderIconOptions();
});

addSpecGroup.addEventListener("click", () => {
  draftSpecs.push({ name: "新规格", options: [{ label: "默认", priceDelta: 0 }] });
  renderSpecBuilder();
});

specBuilder.addEventListener("input", (event) => {
  const nameInput = event.target.closest("[data-spec-name]");
  if (nameInput) {
    draftSpecs[Number(nameInput.dataset.specName)].name = nameInput.value;
    return;
  }

  const optionLabel = event.target.closest("[data-spec-option-label]");
  if (optionLabel) {
    const [groupIndex, optionIndex] = optionLabel.dataset.specOptionLabel.split(":").map(Number);
    draftSpecs[groupIndex].options[optionIndex].label = optionLabel.value;
    return;
  }

  const optionPrice = event.target.closest("[data-spec-option-price]");
  if (optionPrice) {
    const [groupIndex, optionIndex] = optionPrice.dataset.specOptionPrice.split(":").map(Number);
    draftSpecs[groupIndex].options[optionIndex].priceDelta = Math.max(0, Number(optionPrice.value || 0));
  }
});

specBuilder.addEventListener("click", (event) => {
  const removeGroup = event.target.closest("[data-remove-spec-group]");
  if (removeGroup) {
    draftSpecs.splice(Number(removeGroup.dataset.removeSpecGroup), 1);
    renderSpecBuilder();
    return;
  }

  const addOption = event.target.closest("[data-add-spec-option]");
  if (addOption) {
    draftSpecs[Number(addOption.dataset.addSpecOption)].options.push({ label: "新选项", priceDelta: 0 });
    renderSpecBuilder();
    return;
  }

  const removeOption = event.target.closest("[data-remove-spec-option]");
  if (removeOption) {
    const [groupIndex, optionIndex] = removeOption.dataset.removeSpecOption.split(":").map(Number);
    draftSpecs[groupIndex].options.splice(optionIndex, 1);
    renderSpecBuilder();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !loginPanel.hidden) {
    signIn();
  }
});

async function boot() {
  syncMenuVersion();
  applyLocalDataOverrides();
  if (!overviewDate.value) overviewDate.value = toDateInputValue();
  renderStaticModules();
  if (!client) {
    setSessionView(false);
    latestOrders = getDemoOrders();
    showAuthMessage("演示模式：输入任意邮箱和密码后进入后台");
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
