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
