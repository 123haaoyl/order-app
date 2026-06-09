const { shopConfig } = require("./data");

function currency(value) {
  return `¥${Number(value || 0).toFixed(0)}`;
}

function defaultSpecs(dish) {
  return (dish.specs || []).map((group) => ({
    name: group.name,
    label: group.options?.[0]?.label || "默认",
    priceDelta: Number(group.options?.[0]?.priceDelta || 0)
  }));
}

function getUnitPrice(dish, specs = defaultSpecs(dish)) {
  return Number(dish.price || 0) + specs.reduce((sum, spec) => sum + Number(spec.priceDelta || 0), 0);
}

function formatSpecs(specs = []) {
  return specs.map((spec) => `${spec.name}:${spec.label}`).join(" / ") || "默认";
}

function buildCartKey(dish, specs = defaultSpecs(dish)) {
  return `${dish.id}::${specs.map((spec) => `${spec.name}-${spec.label}`).join("|")}`;
}

function buildCartEntry(dish, specs = defaultSpecs(dish), quantity = 1) {
  return {
    key: buildCartKey(dish, specs),
    dishId: dish.id,
    name: dish.name,
    category: dish.category,
    image: dish.image,
    specs,
    specText: formatSpecs(specs),
    unitPrice: getUnitPrice(dish, specs),
    quantity
  };
}

function getCartItems(cart = {}) {
  return Object.values(cart).filter((item) => item && item.quantity > 0);
}

function getTotals(cart = {}, orderType = "dinein") {
  const items = getCartItems(cart);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const packingFee = orderType === "takeaway"
    ? items.reduce((sum, item) => sum + item.quantity * Number(shopConfig.packingFeePerDish || 0), 0)
    : 0;
  const deliveryFee = orderType === "takeaway" ? Number(shopConfig.deliveryFee || 0) : 0;
  return {
    subtotal,
    packingFee,
    deliveryFee,
    payable: subtotal + packingFee + deliveryFee,
    count: items.reduce((sum, item) => sum + item.quantity, 0)
  };
}

function createOrderPayload({ cart, orderType, tableNo, address, deliveryTime, paymentMethod, note }) {
  const totals = getTotals(cart, orderType);
  const createdAt = new Date().toISOString();
  const items = getCartItems(cart).map((item) => ({
    id: item.dishId,
    name: item.name,
    category: item.category,
    specs: item.specs,
    spec_text: item.specText,
    price: item.unitPrice,
    quantity: item.quantity,
    subtotal: item.unitPrice * item.quantity
  }));
  const lines = [
    `类型：${orderType === "takeaway" ? "外卖" : "到店"}`,
    `桌号：${tableNo || "未填写"}`,
    `时间：${createdAt}`,
    "",
    "菜品：",
    ...items.map((item) => `- ${item.name}（${item.spec_text}）× ${item.quantity} = ${currency(item.subtotal)}`),
    "",
    `实付：${currency(totals.payable)}`,
    `备注：${note || "无"}`
  ];

  return {
    order_type: orderType,
    table_no: orderType === "dinein" ? tableNo : "",
    delivery_address: orderType === "takeaway" ? address : "",
    delivery_time: orderType === "takeaway" ? deliveryTime : "",
    payment_method: paymentMethod,
    note,
    items,
    subtotal: totals.subtotal,
    packing_fee: totals.packingFee,
    delivery_fee: totals.deliveryFee,
    payable: totals.payable,
    total: totals.payable,
    status: "new",
    status_label: "待接单",
    created_at: createdAt,
    order_text: lines.join("\n")
  };
}

module.exports = {
  buildCartEntry,
  buildCartKey,
  createOrderPayload,
  currency,
  defaultSpecs,
  formatSpecs,
  getCartItems,
  getTotals,
  getUnitPrice
};
