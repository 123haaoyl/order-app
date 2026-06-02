const menuItems = Array.isArray(window.MENU_ITEMS) ? window.MENU_ITEMS : [];
const shopConfig = window.SHOP_CONFIG || {};
const coupons = Array.isArray(window.COUPONS) ? window.COUPONS : [];
const memberProfile = window.MEMBER_PROFILE || {};

const categoryList = document.querySelector("#category-list");
const menuList = document.querySelector("#menu-list");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const subtotalTotal = document.querySelector("#subtotal-total");
const packingTotal = document.querySelector("#packing-total");
const deliveryTotal = document.querySelector("#delivery-total");
const discountTotal = document.querySelector("#discount-total");
const searchInput = document.querySelector("#search-input");
const tableInput = document.querySelector("#table-input");
const tableField = document.querySelector("#table-field");
const noteInput = document.querySelector("#note-input");
const addressInput = document.querySelector("#address-input");
const deliveryTime = document.querySelector("#delivery-time");
const paymentMethod = document.querySelector("#payment-method");
const couponSelect = document.querySelector("#coupon-select");
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
const couponDialog = document.querySelector("#coupon-dialog");
const couponDialogList = document.querySelector("#coupon-dialog-list");
const closeCouponDialog = document.querySelector("#close-coupon-dialog");
const localOrdersList = document.querySelector("#local-orders-list");
const refreshLocalOrders = document.querySelector("#refresh-local-orders");

let activeCategory = "全部";
let quickFilter = "all";
let orderType = "dinein";
let selectedCouponId = "auto";
let selectedDish = null;
let selectedSpecIndexes = {};
let cart = loadCart();

const categories = ["全部", ...new Set(menuItems.map((item) => item.category))];
const supabaseClient = createSupabaseClient();

function createSupabaseClient() {
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

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("order-cart")) || {};
    return Object.fromEntries(
      Object.entries(saved)
        .map(([key, value]) => {
          if (typeof value === "number") {
            const dish = menuItems.find((item) => item.id === key);
            return dish ? [buildCartKey(dish, defaultSpecs(dish)), buildCartEntry(dish, defaultSpecs(dish), value)] : null;
          }
          return [key, value];
        })
        .filter(Boolean),
    );
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem("order-cart", JSON.stringify(cart));
}

function loadCustomerOrders() {
  try {
    return JSON.parse(localStorage.getItem("customer-orders")) || [];
  } catch {
    return [];
  }
}

function saveCustomerOrder(order) {
  const orders = loadCustomerOrders();
  orders.unshift(order);
  localStorage.setItem("customer-orders", JSON.stringify(orders.slice(0, 20)));
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
    cart[key].quantity = quantity;
  }
  saveCart();
  render();
}

function addDishToCart(dish, specs) {
  const key = buildCartKey(dish, specs);
  if (!cart[key]) {
    cart[key] = buildCartEntry(dish, specs, 0);
  }
  cart[key].quantity += 1;
  saveCart();
  render();
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

function getAvailableCoupons(subtotal) {
  return coupons.filter((coupon) => subtotal >= Number(coupon.threshold || 0));
}

function getCouponDiscount(coupon, subtotal) {
  if (!coupon) return 0;
  if (subtotal < Number(coupon.threshold || 0)) return 0;
  if (coupon.type === "discount") {
    return Math.round(subtotal * (1 - Number(coupon.value || 1)));
  }
  return Number(coupon.value || 0);
}

function getSelectedCoupon(subtotal) {
  const available = getAvailableCoupons(subtotal);
  if (selectedCouponId === "none") return null;
  if (selectedCouponId !== "auto") {
    return available.find((coupon) => coupon.id === selectedCouponId) || null;
  }
  return available
    .map((coupon) => ({ coupon, discount: getCouponDiscount(coupon, subtotal) }))
    .sort((a, b) => b.discount - a.discount)[0]?.coupon || null;
}

function getTotals() {
  const subtotal = getSubtotal();
  const packingFee = getPackingFee();
  const deliveryFee = getDeliveryFee();
  const coupon = getSelectedCoupon(subtotal);
  const discount = getCouponDiscount(coupon, subtotal);
  const payable = Math.max(0, subtotal + packingFee + deliveryFee - discount);
  return { subtotal, packingFee, deliveryFee, coupon, discount, payable };
}

function renderShop() {
  document.querySelector("#shop-name").textContent = shopConfig.name || "云上小馆";
  document.querySelector("#shop-subtitle").textContent = shopConfig.subtitle || "";
  document.querySelector("#shop-announcement").textContent = shopConfig.announcement || "";
  document.querySelector("#business-hours").textContent = `营业 ${shopConfig.businessHours || "全天"}`;
  document.querySelector("#shop-address").textContent = shopConfig.address || "";
  document.querySelector("#shop-phone").textContent = shopConfig.phone || "";
  renderMember();
}

function bindTableFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const table = params.get("table") || params.get("desk");
  if (table) {
    tableInput.value = table;
  }
  document.querySelector("#bound-table").textContent = tableInput.value.trim() || "未选择";
}

function renderMember() {
  document.querySelector("#member-phone").textContent = memberProfile.phone || "未登录";
  document.querySelector("#member-points").textContent = Number(memberProfile.points || 0);
  document.querySelector("#member-balance").textContent = currency(memberProfile.balance || 0);
  document.querySelector("#member-orders").textContent = loadCustomerOrders().length;
}

function getFilteredItems() {
  const keyword = searchInput.value.trim().toLowerCase();
  return menuItems
    .filter((item) => {
      const inCategory = activeCategory === "全部" || item.category === activeCategory;
      const inKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);
      const inQuick =
        quickFilter === "all" ||
        (quickFilter === "hot" && Number(item.rank || 99) <= 5) ||
        (quickFilter === "recommend" && ["招牌", "推荐", "热卖", "人气"].includes(item.tag)) ||
        (quickFilter === "available" && Number(item.stock || 0) > 0);
      return inCategory && inKeyword && inQuick;
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
              <span>热度 #${Number(item.rank || 0)}</span>
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

function renderCoupons() {
  const subtotal = getSubtotal();
  const available = getAvailableCoupons(subtotal);
  couponSelect.innerHTML = [
    `<option value="auto">自动最优</option>`,
    `<option value="none">不使用</option>`,
    ...coupons.map((coupon) => {
      const disabled = available.some((item) => item.id === coupon.id) ? "" : "disabled";
      return `<option value="${escapeHtml(coupon.id)}" ${disabled}>${escapeHtml(coupon.name)} · 满 ${coupon.threshold}</option>`;
    }),
  ].join("");
  couponSelect.value = selectedCouponId;
}

function renderCart() {
  const items = getCartItems();
  const totalCount = getTotalCount();
  const totals = getTotals();

  cartCount.textContent = totalCount;
  subtotalTotal.textContent = currency(totals.subtotal);
  packingTotal.textContent = currency(totals.packingFee);
  deliveryTotal.textContent = currency(totals.deliveryFee);
  discountTotal.textContent = totals.discount ? `-${currency(totals.discount)}` : currency(0);
  cartTotal.textContent = currency(totals.payable);
  submitOrder.disabled = totalCount === 0;
  takeawayFields.hidden = orderType !== "takeaway";
  tableField.hidden = orderType !== "dinein";

  if (!items.length) {
    cartList.innerHTML = `<div class="empty-state">还没有选择菜品</div>`;
    renderCoupons();
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
  renderCoupons();
}

function renderOrderType() {
  orderTypeTabs.querySelectorAll("[data-order-type]").forEach((button) => {
    button.classList.toggle("active", button.dataset.orderType === orderType);
  });
}

function renderLocalOrders() {
  const orders = loadCustomerOrders();
  renderMember();
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
              <p class="eyebrow">${escapeHtml(order.created_at)}</p>
              <h3>${escapeHtml(order.order_type === "takeaway" ? "外卖订单" : `桌号 ${order.table_no || "未填"}`)}</h3>
            </div>
            <span class="dish-tag">${escapeHtml(order.status_label || "待接单")}</span>
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
  renderMenu();
  renderOrderType();
  renderCart();
  bindTableFromUrl();
}

function createOrderText(payload = createOrderPayload(false)) {
  const lines = [
    `类型：${payload.order_type === "takeaway" ? "外卖" : "到店"}`,
    `桌号：${payload.table_no || "未填写"}`,
    `时间：${new Date().toLocaleString("zh-CN")}`,
    "",
    "菜品：",
    ...payload.items.map((item) => `- ${item.name}（${item.spec_text}）× ${item.quantity} = ${currency(item.subtotal)}`),
    "",
    `菜品总价：${currency(payload.subtotal)}`,
    `打包费：${currency(payload.packing_fee)}`,
    `配送费：${currency(payload.delivery_fee)}`,
    `优惠：-${currency(payload.discount)}`,
    `实付：${currency(payload.payable)}`,
    `支付方式：${payload.payment_method}`,
    `备注：${payload.note || "无"}`,
  ];
  return lines.join("\n");
}

function createOrderPayload(includeText = true) {
  const totals = getTotals();
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
    coupon_id: totals.coupon?.id || "",
    coupon_name: totals.coupon?.name || "",
    note: noteInput.value.trim(),
    items,
    subtotal: totals.subtotal,
    packing_fee: totals.packingFee,
    delivery_fee: totals.deliveryFee,
    discount: totals.discount,
    payable: totals.payable,
    total: totals.payable,
    status: "new",
    status_label: "待接单",
    created_at: new Date().toLocaleString("zh-CN"),
  };

  return includeText ? { ...payload, order_text: createOrderText(payload) } : payload;
}

async function submitOrderToBackend() {
  const payload = createOrderPayload();

  if (!supabaseClient) {
    throw new Error("后台还没有配置 Supabase anon public key");
  }

  const extendedPayload = {
    order_type: payload.order_type,
    table_no: payload.table_no,
    delivery_address: payload.delivery_address,
    delivery_time: payload.delivery_time,
    payment_method: payload.payment_method,
    coupon_id: payload.coupon_id,
    coupon_name: payload.coupon_name,
    note: payload.note,
    items: payload.items,
    subtotal: payload.subtotal,
    packing_fee: payload.packing_fee,
    delivery_fee: payload.delivery_fee,
    discount: payload.discount,
    payable: payload.payable,
    total: payload.total,
    status: payload.status,
    order_text: payload.order_text,
  };

  const { error } = await supabaseClient.from("orders").insert(extendedPayload);
  if (!error) return payload;

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

  return payload;
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

function showCouponDialog() {
  if (sessionStorage.getItem("coupon-dialog-seen")) return;
  sessionStorage.setItem("coupon-dialog-seen", "1");
  couponDialogList.innerHTML = coupons
    .map(
      (coupon) => `
        <div class="coupon-card">
          <strong>${escapeHtml(coupon.name)}</strong>
          <span>满 ${coupon.threshold} 可用 · 有效期 ${escapeHtml(coupon.validUntil)}</span>
        </div>
      `,
    )
    .join("");
  couponDialog.showModal();
}

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category;
    render();
    return;
  }

  const quickButton = event.target.closest("[data-quick-filter]");
  if (quickButton) {
    quickFilter = quickButton.dataset.quickFilter;
    document.querySelectorAll("[data-quick-filter]").forEach((button) => {
      button.classList.toggle("active", button === quickButton);
    });
    renderMenu();
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
  document.querySelector("#bound-table").textContent = tableInput.value.trim() || "未选择";
});
couponSelect.addEventListener("change", () => {
  selectedCouponId = couponSelect.value;
  renderCart();
});

resetCart.addEventListener("click", () => {
  cart = {};
  saveCart();
  render();
});

submitOrder.addEventListener("click", async () => {
  const previousText = submitOrder.textContent;
  submitOrder.disabled = true;
  submitOrder.textContent = "提交中...";

  try {
    const payload = await submitOrderToBackend();
    saveCustomerOrder(payload);
    orderOutput.textContent = `订单已提交到后台\n\n${payload.order_text}`;
    cart = {};
    saveCart();
    render();
    renderLocalOrders();
  } catch (error) {
    orderOutput.textContent = `${error.message}\n\n下面是本地订单内容，请先不要关闭：\n\n${createOrderText()}`;
  } finally {
    submitOrder.textContent = previousText;
    render();
    dialog.showModal();
  }
});

closeDialog.addEventListener("click", () => dialog.close());
printOrder.addEventListener("click", () => window.print());
closeDishDialog.addEventListener("click", () => dishDialog.close());
closeCouponDialog.addEventListener("click", () => couponDialog.close());
refreshLocalOrders.addEventListener("click", renderLocalOrders);

renderShop();
bindTableFromUrl();
render();
renderLocalOrders();
setTimeout(showCouponDialog, 500);
