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

## 文件说明

- `index.html`：页面结构。
- `styles.css`：页面样式。
- `app.js`：点餐、购物车、订单生成逻辑。
- `data.js`：菜品数据，长期维护主要改这里。
