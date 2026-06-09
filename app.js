const menuItems = Array.isArray(window.MENU_ITEMS) ? window.MENU_ITEMS : [];
const tables = Array.isArray(window.TABLES) ? window.TABLES : [];
const shopConfig = window.SHOP_CONFIG || {};

const categoryList = document.querySelector("#category-list");
const menuList = document.querySelector("#menu-list");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const subtotalTotal = document.querySelector("#subtotal-total");
const packingTotal = document.querySelector("#packing-total");
const deliveryTotal = document.querySelector("#delivery-total");
const searchInput = document.querySelector("#search-input");
const searchRow = document.querySelector(".search-row");
const tableInput = document.querySelector("#table-input");
const tableSelect = document.querySelector("#table-select");
const tableField = document.querySelector("#table-field");
const tablePickerField = document.querySelector("#table-picker-field");
const tableBoundField = document.querySelector("#table-bound-field");
const noteInput = document.querySelector("#note-input");
const addressInput = document.querySelector("#address-input");
const deliveryTime = document.querySelector("#delivery-time");
const paymentMethod = document.querySelector("#payment-method");
const submitOrder = document.querySelector("#submit-order");
const resetCart = document.querySelector("#reset-cart");
const orderTypeTabs = document.querySelector("#order-type-tabs");
const takeawayFields = document.querySelector("#takeaway-fields");
const dialog = document.querySelector("#order-dialog");
const orderOutput = document.querySelector("#order-output");
const closeDialog = document.querySelector("#close-dialog");
const printOrder = document.querySelector("#print-order");
const dishDialog = document.querySelector("#dish-dialog");
const closeDishDialog = document.querySelector("#close-dish-dialog");
const dishDialogTag = document.querySelector("#dish-dialog-tag");
const dishDialogTitle = document.querySelector("#dish-dialog-title");
const dishDialogBody = document.querySelector("#dish-dialog-body");
const addConfiguredDish = document.querySelector("#add-configured-dish");
const localOrdersList = document.querySelector("#local-orders-list");
const refreshLocalOrders = document.querySelector("#refresh-local-orders");
const mobileCartBar = document.querySelector("#mobile-cart-bar");
const mobileCartCount = document.querySelector("#mobile-cart-count");
const mobileCartTotal = document.querySelector("#mobile-cart-total");
const mobileCheckout = document.querySelector("#mobile-checkout");
const appToast = document.querySelector("#app-toast");

let activeCategory = "全部";
let orderType = "dinein";
let selectedDish = null;
let selectedSpecIndexes = {};
let toastTimer = null;
const CART_STORAGE_KEY = "order-cart";
const CUSTOMER_ORDERS_KEY = "customer-orders";
const MENU_OVERRIDES_KEY = "order-menu-overrides";
const CUSTOM_MENU_KEY = "order-custom-menu-items";
const DELETED_MENU_KEY = "order-deleted-menu-ids";
const TABLE_OVERRIDES_KEY = "order-table-overrides";
const MENU_VERSION_KEY = "order-menu-version";
const CATEGORY_CONFIG_KEY = "order-category-config";
syncMenuVersion();
applyLocalOverrides();
let cart = loadCart();

const forceDemoMode = new URLSearchParams(window.location.search).get("demo") === "1";
let categories = getMenuCategories();
const supabaseClient = createSupabaseClient();

function createSupabaseClient() {
  if (forceDemoMode) return null;

  const config = window.ORDER_APP_SUPABASE || {};
  const hasConfig =
    config.url &&
    config.anonKey &&
    !String(config.anonKey).includes("PASTE_YOUR_SUPABASE");

  if (!hasConfig || !window.supabase?.createClient) {
    return null;
  }

  return window.supabase.createClient(config.url, config.anonKey);
}

function configureDemoLinks() {
  if (!forceDemoMode) return;
  const adminLink = document.querySelector('a[href="./admin.html"]');
  if (adminLink) adminLink.href = "./admin.html?demo=1";
}

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

function writeStorageArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function syncMenuVersion() {
  const menuVersion = String(shopConfig.menuVersion || "");
  if (!menuVersion || localStorage.getItem(MENU_VERSION_KEY) === menuVersion) return;
  [CART_STORAGE_KEY, CUSTOMER_ORDERS_KEY, MENU_OVERRIDES_KEY, CUSTOM_MENU_KEY, DELETED_MENU_KEY, CATEGORY_CONFIG_KEY].forEach((key) => {
    localStorage.removeItem(key);
  });
  localStorage.setItem(MENU_VERSION_KEY, menuVersion);
}

function getDefaultCategories() {
  return [...new Set(menuItems.map((item) => item.category).filter(Boolean))];
}

function getMenuCategories() {
  const savedCategories = readStorageArray(CATEGORY_CONFIG_KEY).map((category) => String(category).trim()).filter(Boolean);
  const allCategories = savedCategories.length ? savedCategories : getDefaultCategories();
  return ["全部", ...new Set(allCategories)];
}

function applyLocalOverrides() {
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
    if (!override) {
      item.isActive = item.isActive !== false;
      return;
    }
    item.category = String(override.category || item.category);
    item.price = Math.max(0, Number(override.price ?? item.price));
    item.stock = Math.max(0, Number(override.stock ?? item.stock));
    item.tag = String(override.tag ?? item.tag ?? "");
    item.isActive = override.isActive !== false;
  });

  const tableOverrides = readStorageObject(TABLE_OVERRIDES_KEY);
  tables.forEach((table) => {
    const override = tableOverrides[table.id];
    table.status = override?.status || table.status || "idle";
    table.area = override?.area || table.area || "";
    table.seats = Math.max(1, Number(override?.seats ?? table.seats ?? 1));
  });
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

function bumpCartBadge() {
  cartCount.classList.remove("is-bumping");
  void cartCount.offsetWidth;
  cartCount.classList.add("is-bumping");
}

function getCartEntryStock(entry) {
  const dish = menuItems.find((item) => item.id === entry?.dishId);
  return Math.max(0, Number(dish?.stock || 0));
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {};
    return Object.fromEntries(
      Object.entries(saved)
        .map(([key, value]) => {
          if (typeof value === "number") {
            const dish = menuItems.find((item) => item.id === key);
            return dish ? [buildCartKey(dish, defaultSpecs(dish)), buildCartEntry(dish, defaultSpecs(dish), value)] : null;
          }
          const dish = menuItems.find((item) => item.id === value?.dishId && item.isActive !== false);
          if (!dish) return null;
          return [key, value];
        })
        .filter(Boolean),
    );
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCustomerOrders() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMER_ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCustomerOrder(order) {
  const orders = loadCustomerOrders();
  orders.unshift(order);
  localStorage.setItem(CUSTOMER_ORDERS_KEY, JSON.stringify(orders.slice(0, 20)));
}

function getMonthlyOrderCounts() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  return loadCustomerOrders().reduce((counts, order) => {
    if (!String(order.created_at || "").startsWith(currentMonth)) return counts;
    (order.items || []).forEach((item) => {
      const quantity = Number(item.quantity || 0);
      if (!quantity) return;
      if (item.id) counts[item.id] = (counts[item.id] || 0) + quantity;
      if (item.name) counts[item.name] = (counts[item.name] || 0) + quantity;
    });
    return counts;
  }, {});
}

function getBaseMonthlySales(item) {
  const configuredSales = Number(item.monthlySales ?? item.monthly_sales ?? item.sales ?? 0);
  if (configuredSales > 0) return configuredSales;
  const rank = Number(item.rank || 10);
  const stock = Number(item.stock || 0);
  return Math.max(18, 240 - rank * 14 + Math.min(stock, 80));
}

function getMonthlySales(item, monthlyCounts) {
  return getBaseMonthlySales(item) + Number(monthlyCounts[item.id] || monthlyCounts[item.name] || 0);
}

function makeLocalOrderId() {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  return `LOCAL-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function formatDisplayTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "未知时间");
  return date.toLocaleString("zh-CN", { hour12: false });
}

function prepareStoredOrder(payload, source) {
  return {
    ...payload,
    id: payload.id || makeLocalOrderId(),
    source,
    created_at: payload.created_at || new Date().toISOString(),
    status_label: payload.status_label || "待接单",
  };
}

function defaultSpecs(dish) {
  return (dish.specs || []).map((group) => ({
    name: group.name,
    label: group.options?.[0]?.label || "默认",
    priceDelta: Number(group.options?.[0]?.priceDelta || 0),
  }));
}

function specsFromSelection(dish) {
  return (dish.specs || []).map((group, index) => {
    const option = group.options?.[selectedSpecIndexes[index] || 0] || group.options?.[0] || {};
    return {
      name: group.name,
      label: option.label || "默认",
      priceDelta: Number(option.priceDelta || 0),
    };
  });
}

function getUnitPrice(dish, specs) {
  return Number(dish.price || 0) + specs.reduce((sum, spec) => sum + Number(spec.priceDelta || 0), 0);
}

function formatSpecs(specs) {
  return specs.map((spec) => `${spec.name}:${spec.label}`).join(" / ");
}

function buildCartKey(dish, specs) {
  return `${dish.id}::${specs.map((spec) => `${spec.name}-${spec.label}`).join("|")}`;
}

function buildCartEntry(dish, specs, quantity = 1) {
  return {
    key: buildCartKey(dish, specs),
    dishId: dish.id,
    name: dish.name,
    category: dish.category,
    image: dish.image,
    tag: dish.tag,
    specs,
    unitPrice: getUnitPrice(dish, specs),
    quantity,
  };
}

function setQuantity(key, quantity) {
  if (quantity <= 0) {
    delete cart[key];
  } else if (cart[key]) {
    const stock = getCartEntryStock(cart[key]);
    if (stock <= 0) {
      showToast(`${cart[key].name} 已售罄`);
      delete cart[key];
    } else {
      const nextQuantity = Math.min(quantity, stock);
      if (nextQuantity < quantity) showToast(`${cart[key].name} 库存只剩 ${stock} 份`);
      cart[key].quantity = nextQuantity;
    }
  }
  saveCart();
  render();
}

function addDishToCart(dish, specs) {
  const stock = Math.max(0, Number(dish.stock || 0));
  if (stock <= 0) {
    showToast(`${dish.name} 已售罄`);
    return;
  }
  const key = buildCartKey(dish, specs);
  if (!cart[key]) {
    cart[key] = buildCartEntry(dish, specs, 0);
  }
  if (cart[key].quantity >= stock) {
    showToast(`${dish.name} 库存只剩 ${stock} 份`);
    return;
  }
  cart[key].quantity += 1;
  saveCart();
  render();
  bumpCartBadge();
  showToast(`${dish.name} 已加入购物车`);
}

function getCartItems() {
  return Object.values(cart).filter((item) => item && item.quantity > 0);
}

function getTotalCount() {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

function getSubtotal() {
  return getCartItems().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

function getPackingFee() {
  if (orderType !== "takeaway") return 0;
  return getTotalCount() * Number(shopConfig.packingFeePerDish || 0);
}

function getDeliveryFee() {
  return orderType === "takeaway" ? Number(shopConfig.deliveryFee || 0) : 0;
}

function getTotals() {
  const subtotal = getSubtotal();
  const packingFee = getPackingFee();
  const deliveryFee = getDeliveryFee();
  const payable = Math.max(0, subtotal + packingFee + deliveryFee);
  return { subtotal, packingFee, deliveryFee, payable };
}

function renderShop() {
  document.querySelector("#shop-name").textContent = shopConfig.name || "云上小馆";
  document.querySelector("#shop-subtitle").textContent = shopConfig.subtitle || "";
  document.querySelector("#shop-announcement").textContent = shopConfig.announcement || "";
  document.querySelector("#business-hours").textContent = `营业 ${shopConfig.businessHours || "全天"}`;
  document.querySelector("#shop-address").textContent = shopConfig.address || "";
  document.querySelector("#shop-phone").textContent = shopConfig.phone || "";
}

function bindTableFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const table = params.get("table") || params.get("desk");
  if (table) {
    tableInput.value = table;
  }
  updateBoundTable();
}

function getTableStatusLabel(status) {
  return status === "occupied" ? "占用" : "空闲";
}

function updateBoundTable() {
  const tableValue = tableInput.value.trim();
  document.querySelector("#bound-table").textContent = tableValue || "未选择";
  if (tableSelect && tableSelect.value !== tableValue) {
    const hasOption = [...tableSelect.options].some((option) => option.value === tableValue);
    tableSelect.value = hasOption ? tableValue : "";
  }
}

function renderTableSelect() {
  if (!tableSelect) return;
  const selectedValue = tableInput.value.trim();
  tableSelect.innerHTML = [
    `<option value="">请选择桌号</option>`,
    ...tables.map((table) => {
      const disabled = table.status === "occupied" ? "disabled" : "";
      const selected = selectedValue === table.id ? "selected" : "";
      return `<option value="${escapeHtml(table.id)}" ${disabled} ${selected}>${escapeHtml(table.id)} · ${escapeHtml(table.area)} · ${Number(table.seats || 0)} 人 · ${getTableStatusLabel(table.status)}</option>`;
    }),
  ].join("");
}

function getFilteredItems() {
  const keyword = searchInput.value.trim().toLowerCase();
  return menuItems
    .filter((item) => {
      const isActive = item.isActive !== false;
      const inCategory = activeCategory === "全部" || item.category === activeCategory;
      const inKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);
      return isActive && inCategory && inKeyword;
    })
    .sort((a, b) => Number(a.rank || 99) - Number(b.rank || 99));
}

function renderCategories() {
  categoryList.innerHTML = categories
    .map(
      (category) => `
        <button class="category-button ${category === activeCategory ? "active" : ""}" data-category="${escapeHtml(category)}" type="button">
          ${escapeHtml(category)}
        </button>
      `,
    )
    .join("");
}

function renderMenu() {
  const items = getFilteredItems();
  const monthlyCounts = getMonthlyOrderCounts();
  if (!items.length) {
    menuList.innerHTML = `<div class="empty-state">没有找到相关菜品</div>`;
    return;
  }

  menuList.innerHTML = items
    .map((item) => {
      const soldOut = Number(item.stock || 0) <= 0;
      return `
        <article class="dish-card">
          <div class="dish-image">${escapeHtml(item.image || "🍽️")}</div>
          <div class="dish-info">
            <div class="dish-title-row">
              <h3>${escapeHtml(item.name)}</h3>
              ${item.tag ? `<span class="dish-tag">${escapeHtml(item.tag)}</span>` : ""}
            </div>
            <p>${escapeHtml(item.description)}</p>
            <div class="dish-meta">
              <span>库存 ${Number(item.stock || 0)}</span>
              <span>月售 ${getMonthlySales(item, monthlyCounts)}</span>
            </div>
            <div class="dish-bottom">
              <strong>${currency(item.price)}</strong>
              <button class="add-dish-button" data-open-dish="${escapeHtml(item.id)}" type="button" ${soldOut ? "disabled" : ""}>
                ${soldOut ? "售罄" : "选规格"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCart() {
  const items = getCartItems();
  const totalCount = getTotalCount();
  const totals = getTotals();

  cartCount.textContent = totalCount;
  subtotalTotal.textContent = currency(totals.subtotal);
  packingTotal.textContent = currency(totals.packingFee);
  deliveryTotal.textContent = currency(totals.deliveryFee);
  cartTotal.textContent = currency(totals.payable);
  submitOrder.disabled = totalCount === 0;
  takeawayFields.hidden = orderType !== "takeaway";
  if (mobileCartBar && mobileCartCount && mobileCartTotal) {
    mobileCartBar.hidden = totalCount === 0;
    mobileCartCount.textContent = `${totalCount} 件已选`;
    mobileCartTotal.textContent = currency(totals.payable);
    document.body.classList.toggle("has-mobile-cart", totalCount > 0);
  }

  if (!items.length) {
    cartList.innerHTML = `<div class="empty-state">还没有选择菜品</div>`;
    return;
  }

  cartList.innerHTML = items
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(formatSpecs(item.specs))}</span>
            <span>${currency(item.unitPrice)} × ${item.quantity}</span>
          </div>
          <div class="cart-actions">
            <div class="stepper compact">
              <button data-action="decrease" data-key="${escapeHtml(item.key)}" type="button">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-key="${escapeHtml(item.key)}" type="button">+</button>
            </div>
            <button class="text-button" data-action="remove" data-key="${escapeHtml(item.key)}" type="button">移除</button>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderOrderType() {
  orderTypeTabs.querySelectorAll("[data-order-type]").forEach((button) => {
    button.classList.toggle("active", button.dataset.orderType === orderType);
  });
}

function renderTableFields() {
  const showTableFields = orderType === "dinein";
  if (!showTableFields) {
    tableInput.value = "";
    if (tableSelect) tableSelect.value = "";
  }
  tableField.hidden = !showTableFields;
  if (tablePickerField) tablePickerField.hidden = !showTableFields;
  if (tableBoundField) tableBoundField.hidden = !showTableFields;
  searchRow?.classList.toggle("table-hidden", !showTableFields);
  updateBoundTable();
}

function renderLocalOrders() {
  const orders = loadCustomerOrders();
  if (!orders.length) {
    localOrdersList.innerHTML = `<div class="empty-state">暂无订单</div>`;
    return;
  }

  localOrdersList.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card">
          <div class="order-card-header">
            <div>
              <p class="eyebrow">${escapeHtml(formatDisplayTime(order.created_at))}</p>
              <h3>${escapeHtml(order.order_type === "takeaway" ? "外卖订单" : `桌号 ${order.table_no || "未填"}`)}</h3>
            </div>
            <span class="dish-tag">${escapeHtml(order.source === "local" ? "本地演示" : order.status_label || "待接单")}</span>
          </div>
          <div class="order-lines">
            ${(order.items || [])
              .map(
                (item) => `
                  <div class="order-line">
                    <span>${escapeHtml(item.name)} × ${Number(item.quantity || 0)}</span>
                    <strong>${currency(item.subtotal)}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="order-card-footer">
            <span>${escapeHtml(order.note || "无备注")}</span>
            <strong>${currency(order.payable)}</strong>
          </div>
        </article>
      `,
    )
    .join("");
}

function render() {
  renderCategories();
  renderTableSelect();
  renderMenu();
  renderOrderType();
  renderTableFields();
  renderCart();
}

function createOrderText(payload = createOrderPayload(false)) {
  const lines = [
    `类型：${payload.order_type === "takeaway" ? "外卖" : "到店"}`,
    `桌号：${payload.table_no || "未填写"}`,
    `时间：${formatDisplayTime(payload.created_at)}`,
    "",
    "菜品：",
    ...payload.items.map((item) => `- ${item.name}（${item.spec_text}）× ${item.quantity} = ${currency(item.subtotal)}`),
    "",
    `菜品总价：${currency(payload.subtotal)}`,
    `打包费：${currency(payload.packing_fee)}`,
    `配送费：${currency(payload.delivery_fee)}`,
    `实付：${currency(payload.payable)}`,
    `支付方式：${payload.payment_method}`,
    `备注：${payload.note || "无"}`,
  ];
  return lines.join("\n");
}

function createOrderPayload(includeText = true) {
  const totals = getTotals();
  const createdAt = new Date().toISOString();
  const items = getCartItems().map((item) => ({
    id: item.dishId,
    name: item.name,
    category: item.category,
    specs: item.specs,
    spec_text: formatSpecs(item.specs),
    price: item.unitPrice,
    quantity: item.quantity,
    subtotal: item.unitPrice * item.quantity,
  }));

  const payload = {
    order_type: orderType,
    table_no: orderType === "dinein" ? tableInput.value.trim() : "",
    delivery_address: orderType === "takeaway" ? addressInput.value.trim() : "",
    delivery_time: orderType === "takeaway" ? deliveryTime.value : "",
    payment_method: paymentMethod.value,
    note: noteInput.value.trim(),
    items,
    subtotal: totals.subtotal,
    packing_fee: totals.packingFee,
    delivery_fee: totals.deliveryFee,
    payable: totals.payable,
    total: totals.payable,
    status: "new",
    status_label: "待接单",
    created_at: createdAt,
  };

  return includeText ? { ...payload, order_text: createOrderText(payload) } : payload;
}

function getOrderValidationMessage() {
  const totals = getTotals();
  if (!getCartItems().length) return "请先选择菜品。";
  if (orderType === "dinein" && !tableInput.value.trim()) return "堂食订单需要填写桌号。";
  if (orderType === "takeaway" && !addressInput.value.trim()) return "外卖订单需要填写收货地址。";
  if (orderType === "takeaway" && totals.subtotal < Number(shopConfig.minOrderAmount || 0)) {
    return `外卖起送金额为 ${currency(shopConfig.minOrderAmount)}，还差 ${currency(Number(shopConfig.minOrderAmount || 0) - totals.subtotal)}。`;
  }
  return "";
}

async function submitOrderToBackend() {
  const payload = createOrderPayload();

  if (!supabaseClient) {
    return prepareStoredOrder(payload, "local");
  }

  const extendedPayload = {
    order_type: payload.order_type,
    table_no: payload.table_no,
    delivery_address: payload.delivery_address,
    delivery_time: payload.delivery_time,
    payment_method: payload.payment_method,
    note: payload.note,
    items: payload.items,
    subtotal: payload.subtotal,
    packing_fee: payload.packing_fee,
    delivery_fee: payload.delivery_fee,
    payable: payload.payable,
    total: payload.total,
    status: payload.status,
    order_text: payload.order_text,
  };

  const { error } = await supabaseClient.from("orders").insert(extendedPayload);
  if (!error) return prepareStoredOrder(payload, "supabase");

  const legacyPayload = {
    table_no: payload.table_no,
    note: payload.note,
    items: payload.items,
    total: payload.total,
    status: payload.status,
    order_text: payload.order_text,
  };
  const legacyResult = await supabaseClient.from("orders").insert(legacyPayload);
  if (legacyResult.error) {
    throw new Error(legacyResult.error.message || error.message || "订单提交失败");
  }

  return prepareStoredOrder(payload, "supabase");
}

function openDishDialog(dishId) {
  selectedDish = menuItems.find((item) => item.id === dishId);
  if (!selectedDish) return;

  selectedSpecIndexes = {};
  dishDialogTag.textContent = selectedDish.tag || selectedDish.category;
  dishDialogTitle.textContent = selectedDish.name;
  renderDishDialog();
  dishDialog.showModal();
}

function renderDishDialog() {
  const specs = specsFromSelection(selectedDish);
  dishDialogBody.innerHTML = `
    <div class="dish-dialog-summary">
      <div class="dish-image large">${escapeHtml(selectedDish.image || "🍽️")}</div>
      <div>
        <p>${escapeHtml(selectedDish.description)}</p>
        <strong>${currency(getUnitPrice(selectedDish, specs))}</strong>
      </div>
    </div>
    ${(selectedDish.specs || [])
      .map(
        (group, groupIndex) => `
          <div class="spec-group">
            <h3>${escapeHtml(group.name)}</h3>
            <div class="spec-options">
              ${(group.options || [])
                .map(
                  (option, optionIndex) => `
                    <button class="${(selectedSpecIndexes[groupIndex] || 0) === optionIndex ? "active" : ""}" data-spec-group="${groupIndex}" data-spec-option="${optionIndex}" type="button">
                      ${escapeHtml(option.label)}${option.priceDelta ? ` +${currency(option.priceDelta)}` : ""}
                    </button>
                  `,
                )
                .join("")}
            </div>
          </div>
        `,
      )
      .join("")}
  `;
}

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category;
    render();
    return;
  }

  const orderTypeButton = event.target.closest("[data-order-type]");
  if (orderTypeButton) {
    orderType = orderTypeButton.dataset.orderType;
    render();
    return;
  }

  const openDishButton = event.target.closest("[data-open-dish]");
  if (openDishButton) {
    openDishDialog(openDishButton.dataset.openDish);
    return;
  }

  const stepperButton = event.target.closest("[data-action]");
  if (stepperButton) {
    const key = stepperButton.dataset.key;
    const current = cart[key]?.quantity || 0;
    if (stepperButton.dataset.action === "increase") {
      setQuantity(key, current + 1);
    } else if (stepperButton.dataset.action === "decrease") {
      setQuantity(key, current - 1);
    } else if (stepperButton.dataset.action === "remove") {
      setQuantity(key, 0);
    }
  }
});

dishDialogBody.addEventListener("click", (event) => {
  const optionButton = event.target.closest("[data-spec-group]");
  if (!optionButton) return;
  selectedSpecIndexes[optionButton.dataset.specGroup] = Number(optionButton.dataset.specOption);
  renderDishDialog();
});

addConfiguredDish.addEventListener("click", () => {
  addDishToCart(selectedDish, specsFromSelection(selectedDish));
  dishDialog.close();
});

searchInput.addEventListener("input", renderMenu);
tableInput.addEventListener("input", () => {
  updateBoundTable();
});
tableSelect?.addEventListener("change", () => {
  tableInput.value = tableSelect.value;
  updateBoundTable();
});

resetCart.addEventListener("click", () => {
  cart = {};
  saveCart();
  render();
  showToast("购物车已清空");
});

submitOrder.addEventListener("click", async () => {
  const validationMessage = getOrderValidationMessage();
  if (validationMessage) {
    orderOutput.textContent = validationMessage;
    dialog.showModal();
    showToast(validationMessage);
    return;
  }

  const previousText = submitOrder.textContent;
  submitOrder.disabled = true;
  submitOrder.textContent = "提交中...";

  try {
    const payload = await submitOrderToBackend();
    saveCustomerOrder(payload);
    const successMessage = payload.source === "local"
      ? "演示订单已保存在本机，可到后台查看"
      : "订单已提交到后台";
    orderOutput.textContent = `${successMessage}\n\n${payload.order_text}`;
    cart = {};
    saveCart();
    render();
    renderLocalOrders();
    showToast(successMessage);
  } catch (error) {
    const fallbackPayload = prepareStoredOrder(createOrderPayload(), "local");
    saveCustomerOrder(fallbackPayload);
    renderLocalOrders();
    orderOutput.textContent = `${error.message}\n\n后台提交失败，订单已先保存在本机订单中心。购物车已保留，后台恢复后可以再次提交。\n\n${fallbackPayload.order_text}`;
  } finally {
    submitOrder.textContent = previousText;
    render();
    dialog.showModal();
  }
});

closeDialog.addEventListener("click", () => dialog.close());
printOrder.addEventListener("click", () => window.print());
closeDishDialog.addEventListener("click", () => dishDialog.close());
refreshLocalOrders.addEventListener("click", () => {
  renderLocalOrders();
  showToast("订单已刷新");
});
mobileCheckout?.addEventListener("click", () => {
  document.querySelector(".cart-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

configureDemoLinks();
renderShop();
bindTableFromUrl();
render();
renderLocalOrders();
