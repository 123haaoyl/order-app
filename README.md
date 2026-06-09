# 点餐小程序

一个纯前端点餐页面，适合放到 GitHub Pages、Netlify 或任意静态网站托管平台。

直接打开 `index.html` 就能使用。

如果已经部署云端，但只想本地演示完整流程，可以访问：

```text
index.html?demo=1
admin.html?demo=1
```

演示模式不会写入云数据库。顾客端提交的订单会保存在当前浏览器本地存储里，后台演示页需要先输入任意邮箱和密码登录，再读取这些本地订单。

## 修改菜品

用 VS Code 打开 `data.js`，每道菜长这样：

```js
{
  id: "fuzhou-lychee-pork",
  name: "福州荔枝肉",
  category: "经典福州菜",
  price: 58,
  image: "🍖",
  tag: "必点",
  description: "酸甜红亮，外酥里嫩，保留老福州荔枝形刀工",
}
```

- `id`：每道菜唯一，不能重复。
- `name`：菜名。
- `category`：分类，会自动显示在左侧。
- `price`：价格，只写数字。
- `image`：可以放 emoji，也可以换成图片地址。
- `tag`：小标签，不需要可以留空字符串 `""`。
- `description`：菜品描述。
- `stock`：库存数量。
- `specs`：规格组，比如份量、辣度、冰量、甜度。
- 当前内置菜单为福州菜 / 烟台山新派闽味主题，包含佛跳墙、荔枝肉、红蟳米糕、鱼丸、肉燕、锅边糊等菜品；更换 `SHOP_CONFIG.menuVersion` 会自动清理旧的本地菜品编辑缓存。

## 当前版本功能

顾客端：

- 店铺公告、营业时间、地址、电话。
- 深色 / 浅色样式切换，并记住用户选择。
- 到店 / 外卖切换，扫码桌号可用 `?table=A08` 自动带入。
- 分类、搜索、月售和库存展示。
- 菜品规格、购物车、移动端底部结算条、打包费、配送费、支付方式字段。
- 下单前校验桌号、外卖地址和起送金额。
- 加菜、刷新、状态流转等关键操作有即时反馈和轻量动效。
- 已部署 Vercel + Neon 时提交订单到云数据库；使用 `?demo=1` 时保存为本地演示订单。
- 本地订单中心保留最近订单，线上提交失败时会先做本地备份，避免丢单。

商家后台：

- 登录后查看订单。
- 老板看板可按日期查看当日订单数、营业额、待处理和热销排行。
- 订单筛选、搜索、导出 CSV、删除订单。
- 订单状态流转：待接单、后厨备餐、出餐、完成、取消。
- 云端后台使用 Vercel API 登录并读取 Neon 订单；使用 `?demo=1` 时进入本地演示后台，仍需要先通过登录页。
- 菜品管理可新增、删除、编辑分类、价格、库存、上架状态；新增菜品可选择 icon、分类和自定义规格，并同步到顾客端本地演示。
- 分类管理可新增、重命名、删除空分类；菜品右上角小标签可在菜品管理里直接编辑。
- 桌台管理可编辑区域、座位数、空闲/占用状态；顾客端可选择空闲桌号。
- 打印配置入口。

需要第三方服务后续接入：

- 微信 / 支付宝真实支付。
- 退款流程。
- 小票打印机自动打单。
- PDA 后厨端。

## 上线到 GitHub Pages

1. 在 GitHub 新建仓库，比如 `order-app`。
2. 把本文件夹里的所有文件上传到仓库根目录。
3. 进入仓库的 `Settings` -> `Pages`。
4. `Source` 选择 `Deploy from a branch`。
5. `Branch` 选择 `main`，目录选择 `/root`。
6. 保存后等 1 到 3 分钟，GitHub 会生成访问地址。

以后要改菜单，只需要编辑 `data.js`，提交后线上页面会自动更新。

## 接入免费云端后台

当前推荐免费组合：Vercel 托管页面和 API，Neon 提供 Postgres 数据库。

1. 在 Neon 新建免费 Postgres 项目。
2. 复制 Neon 的 `DATABASE_URL` 连接字符串。
3. 在 Vercel 导入这个 GitHub 仓库。
4. 在 Vercel 项目 `Settings` -> `Environment Variables` 添加：
   - `DATABASE_URL`：Neon 数据库连接字符串。
   - `ADMIN_EMAIL`：后台登录邮箱。
   - `ADMIN_PASSWORD`：后台登录密码。
5. 重新部署 Vercel。

部署后，顾客端提交订单会写入 Neon 的 `orders` 表。后台页面 `admin.html` 使用 `ADMIN_EMAIL` 和 `ADMIN_PASSWORD` 登录后读取、流转、删除云端订单。

本地演示仍然可用：

```text
index.html?demo=1
admin.html?demo=1
```

后台地址：

```text
https://123haaoyl.github.io/order-app/admin.html
```

客户端地址：

```text
https://123haaoyl.github.io/order-app/
```

## 文件说明

- `index.html`：页面结构。
- `styles.css`：页面样式。
- `app.js`：点餐、购物车、订单生成逻辑。
- `admin.html`：后台页面。
- `admin.js`：后台登录、订单读取、状态更新逻辑。
- `data.js`：菜品数据，长期维护主要改这里。
- `api/`：Vercel Serverless API，负责登录和订单读写。
- `package.json`：云端 API 依赖配置。
- `supabase-config.js`：旧版兼容空配置。
- `supabase-schema.sql`：旧版 Supabase 备份 SQL，不再是主路径。
