const menuItems = Array.isArray(window.MENU_ITEMS) ? window.MENU_ITEMS : [];
const categoryList = document.querySelector("#category-list");
const menuList = document.querySelector("#menu-list");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const searchInput = document.querySelector("#search-input");
const tableInput = document.querySelector("#table-input");
const noteInput = document.querySelector("#note-input");
const submitOrder = document.querySelector("#submit-order");
const resetCart = document.querySelector("#reset-cart");
const dialog = document.querySelector("#order-dialog");
const orderOutput = document.querySelector("#order-output");
const closeDialog = document.querySelector("#close-dialog");
const printOrder = document.querySelector("#print-order");

let activeCategory = "全部";
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
  return `¥${Number(value).toFixed(0)}`;
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("order-cart")) || {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem("order-cart", JSON.stringify(cart));
}

function getQuantity(id) {
  return cart[id] || 0;
}

function setQuantity(id, quantity) {
  if (quantity <= 0) {
    delete cart[id];
  } else {
    cart[id] = quantity;
  }
  saveCart();
  render();
}

function getFilteredItems() {
  const keyword = searchInput.value.trim().toLowerCase();
  return menuItems.filter((item) => {
    const inCategory = activeCategory === "全部" || item.category === activeCategory;
    const inKeyword =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);
    return inCategory && inKeyword;
  });
}

function renderCategories() {
  categoryList.innerHTML = categories
    .map(
      (category) => `
        <button class="category-button ${category === activeCategory ? "active" : ""}" data-category="${category}" type="button">
          ${category}
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
      const quantity = getQuantity(item.id);
      return `
        <article class="dish-card">
          <div class="dish-image">${item.image || "🍽️"}</div>
          <div class="dish-info">
            <div class="dish-title-row">
              <h3>${item.name}</h3>
              ${item.tag ? `<span class="dish-tag">${item.tag}</span>` : ""}
            </div>
            <p>${item.description}</p>
            <div class="dish-bottom">
              <strong>${currency(item.price)}</strong>
              <div class="stepper" aria-label="${item.name} 数量">
                <button data-action="decrease" data-id="${item.id}" type="button">−</button>
                <span>${quantity}</span>
                <button data-action="increase" data-id="${item.id}" type="button">+</button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function getCartItems() {
  return Object.entries(cart)
    .map(([id, quantity]) => {
      const item = menuItems.find((dish) => dish.id === id);
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean);
}

function renderCart() {
  const items = getCartItems();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalCount;
  cartTotal.textContent = currency(totalPrice);
  submitOrder.disabled = totalCount === 0;

  if (!items.length) {
    cartList.innerHTML = `<div class="empty-state">还没有选择菜品</div>`;
    return;
  }

  cartList.innerHTML = items
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>${currency(item.price)} × ${item.quantity}</span>
          </div>
          <div class="stepper compact">
            <button data-action="decrease" data-id="${item.id}" type="button">−</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${item.id}" type="button">+</button>
          </div>
        </div>
      `,
    )
    .join("");
}

function render() {
  renderCategories();
  renderMenu();
  renderCart();
}

function createOrderText() {
  const items = getCartItems();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = [
    `桌号：${tableInput.value.trim() || "未填写"}`,
    `时间：${new Date().toLocaleString("zh-CN")}`,
    "",
    "菜品：",
    ...items.map((item) => `- ${item.name} × ${item.quantity} = ${currency(item.price * item.quantity)}`),
    "",
    `合计：${currency(total)}`,
    `备注：${noteInput.value.trim() || "无"}`,
  ];
  return lines.join("\n");
}

function createOrderPayload() {
  const items = getCartItems().map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  }));
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    table_no: tableInput.value.trim(),
    note: noteInput.value.trim(),
    items,
    total,
    order_text: createOrderText(),
  };
}

async function submitOrderToBackend() {
  const payload = createOrderPayload();

  if (!supabaseClient) {
    throw new Error("后台还没有配置 Supabase anon public key");
  }

  const { error } = await supabaseClient.from("orders").insert(payload);
  if (error) {
    throw new Error(error.message || "订单提交失败");
  }

  return payload;
}

document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category;
    render();
    return;
  }

  const stepperButton = event.target.closest("[data-action]");
  if (stepperButton) {
    const id = stepperButton.dataset.id;
    const current = getQuantity(id);
    const next = stepperButton.dataset.action === "increase" ? current + 1 : current - 1;
    setQuantity(id, next);
  }
});

searchInput.addEventListener("input", renderMenu);

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
    orderOutput.textContent = `订单已提交到后台\n\n${payload.order_text}`;
    cart = {};
    saveCart();
    render();
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

render();
