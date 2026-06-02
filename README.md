# 点餐小程序

一个纯前端点餐页面，适合放到 GitHub Pages、Netlify 或任意静态网站托管平台。

直接打开 `index.html` 就能使用。

## 修改菜品

用 VS Code 打开 `data.js`，每道菜长这样：

```js
{
  id: "beef-noodle",
  name: "招牌牛肉面",
  category: "主食",
  price: 28,
  image: "🍜",
  tag: "热卖",
  description: "牛腱肉、手工面、浓郁清汤底",
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

## 当前版本功能

顾客端：

- 店铺公告、营业时间、地址、电话。
- 到店 / 外卖切换，扫码桌号可用 `?table=A08` 自动带入。
- 分类、搜索、热门排行、猜你喜欢、库存展示。
- 菜品规格、购物车、打包费、配送费、优惠券、支付方式字段。
- 提交订单到 Supabase，并在本地订单中心保留最近订单。
- 会员积分 / 余额展示字段。

商家后台：

- 登录后查看订单。
- 订单筛选、搜索、导出 CSV。
- 订单状态流转：待接单、后厨备餐、出餐、完成、取消。
- 老板看板：今日订单、今日金额、待处理、优惠支出、热销排行。
- 店铺设置、菜品管理、桌台管理、营销活动、会员管理、打印配置入口。

需要第三方服务后续接入：

- 微信 / 支付宝真实支付。
- 退款、会员余额真实扣款。
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

## 接入 Supabase 后台

顾客提交订单后，会写入 Supabase 的 `orders` 表。后台页面是 `admin.html`，需要 Supabase Auth 登录后才能查看订单。

1. 打开 Supabase 项目。
2. 进入 `SQL Editor`。
3. 新建 query，把 `supabase-schema.sql` 里的内容粘贴进去。
4. 把 SQL 末尾的 `your@email.com` 改成你的后台登录邮箱。
5. 运行 SQL。
6. 进入 `Authentication` -> `Users`。
7. 用同一个邮箱创建后台用户，并设置密码。
8. 进入 `Project Settings` -> `API`。
9. 复制 `anon public` key。
10. 打开 `supabase-config.js`，把 key 填进去。
11. 把修改后的文件提交到 GitHub。

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
- `supabase-config.js`：Supabase 项目配置。
- `supabase-schema.sql`：Supabase 建表和权限 SQL。
