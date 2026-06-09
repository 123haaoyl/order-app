// 以后你主要改这个文件就能调整店铺、菜品和桌台。

window.SHOP_CONFIG = {
  menuVersion: "fuzhou-yantaishan-20260609-v5-100",
  name: "烟台山闽味小馆",
  subtitle: "福州菜、烟台山新派闽味，堂食外卖都可以",
  announcement: "主打福州菜与烟台山人气风味，现点现做，请留意取餐提醒",
  businessHours: "10:30-22:30",
  address: "福州仓山区仓前路 150 号附近",
  phone: "138-0000-8888",
  minOrderAmount: 20,
  packingFeePerDish: 1,
  deliveryFee: 6,
  deliveryRange: "3 公里",
  autoCancelMinutes: 15,
  serviceModes: ["dinein", "takeaway"],
};

window.TABLES = [
  { id: "A01", area: "大厅", seats: 2, status: "idle" },
  { id: "A08", area: "大厅", seats: 4, status: "idle" },
  { id: "B02", area: "包厢", seats: 8, status: "idle" },
];

window.MENU_ITEMS = [
  {
    id: "fotiaoqiang-cup",
    name: "佛跳墙小盅",
    category: "经典福州菜",
    price: 138,
    image: "🍲",
    tag: "招牌",
    rank: 1,
    stock: 18,
    monthlySales: 328,
    description: "鲍鱼、海参、蹄筋、瑶柱慢煨，单人小盅更适合日常点餐",
    specs: [
      { name: "规格", options: [{ label: "单人盅", priceDelta: 0 }, { label: "双人盅", priceDelta: 118 }] },
      { name: "汤底", options: [{ label: "经典浓汤", priceDelta: 0 }, { label: "花胶加浓", priceDelta: 38 }] },
    ],
  },
  {
    id: "fuzhou-lychee-pork",
    name: "福州荔枝肉",
    category: "经典福州菜",
    price: 58,
    image: "🍖",
    tag: "必点",
    rank: 2,
    stock: 46,
    monthlySales: 512,
    description: "酸甜红亮，外酥里嫩，保留老福州荔枝形刀工",
    specs: [
      { name: "份量", options: [{ label: "例份", priceDelta: 0 }, { label: "大份", priceDelta: 20 }] },
      { name: "口味", options: [{ label: "经典酸甜", priceDelta: 0 }, { label: "少甜", priceDelta: 0 }] },
    ],
  },
  {
    id: "nan-jian-gan",
    name: "南煎肝",
    category: "经典福州菜",
    price: 48,
    image: "🥢",
    tag: "老福州",
    rank: 5,
    stock: 34,
    monthlySales: 276,
    description: "猪肝薄切快煎，酸甜酱汁挂口，讲究火候",
    specs: [
      { name: "熟度", options: [{ label: "嫩口", priceDelta: 0 }, { label: "全熟", priceDelta: 0 }] },
      { name: "口味", options: [{ label: "经典酸甜", priceDelta: 0 }, { label: "少汁", priceDelta: 0 }] },
    ],
  },
  {
    id: "drunken-ribs",
    name: "十香醉排骨",
    category: "经典福州菜",
    price: 52,
    image: "🍖",
    tag: "人气",
    rank: 4,
    stock: 38,
    monthlySales: 368,
    description: "炸排骨裹十香酸甜汁，冷吃热吃都开胃",
    specs: [
      { name: "份量", options: [{ label: "例份", priceDelta: 0 }, { label: "大份", priceDelta: 18 }] },
      { name: "酱汁", options: [{ label: "标准", priceDelta: 0 }, { label: "多汁", priceDelta: 0 }] },
    ],
  },
  {
    id: "stir-fried-double-crisp",
    name: "爆炒双脆",
    category: "经典福州菜",
    price: 68,
    image: "🔥",
    tag: "锅气",
    rank: 8,
    stock: 28,
    monthlySales: 198,
    description: "腰花与海蜇头猛火快炒，脆嫩酸甜，适合下酒",
    specs: [
      { name: "口味", options: [{ label: "酸甜", priceDelta: 0 }, { label: "微辣", priceDelta: 0 }] },
    ],
  },
  {
    id: "clam-chicken-soup",
    name: "鸡汤汆海蚌",
    category: "经典福州菜",
    price: 98,
    image: "🦪",
    tag: "鲜汤",
    rank: 10,
    stock: 16,
    monthlySales: 156,
    description: "清鸡汤汆本港海蚌，汤清味鲜，保留闽菜重汤底的特点",
    specs: [
      { name: "规格", options: [{ label: "例份", priceDelta: 0 }, { label: "加海蚌", priceDelta: 36 }] },
    ],
  },
  {
    id: "red-crab-rice",
    name: "红蟳米糕",
    category: "烟台山新派",
    price: 128,
    image: "🦀",
    tag: "江景同款",
    rank: 3,
    stock: 20,
    monthlySales: 386,
    description: "红蟳膏香渗入糯米，虾米、香菇、干贝同焖，鲜香糯润",
    specs: [
      { name: "规格", options: [{ label: "半只红蟳", priceDelta: 0 }, { label: "整只红蟳", priceDelta: 88 }] },
    ],
  },
  {
    id: "sesame-oil-prawns",
    name: "香油明虾",
    category: "烟台山新派",
    price: 88,
    image: "🦐",
    tag: "海味",
    rank: 7,
    stock: 30,
    monthlySales: 248,
    description: "明虾煎香后淋热香油，虾壳酥、虾肉弹，适合分享",
    specs: [
      { name: "份量", options: [{ label: "6 只", priceDelta: 0 }, { label: "10 只", priceDelta: 48 }] },
      { name: "口味", options: [{ label: "香油原味", priceDelta: 0 }, { label: "蒜香", priceDelta: 0 }] },
    ],
  },
  {
    id: "minjiang-white-fish",
    name: "闽江白刀鱼",
    category: "烟台山新派",
    price: 98,
    image: "🐟",
    tag: "时令",
    rank: 9,
    stock: 14,
    monthlySales: 142,
    description: "清蒸白刀鱼，葱姜豉油提鲜，灵感来自闽江边烟台山餐厅风味",
    specs: [
      { name: "做法", options: [{ label: "清蒸", priceDelta: 0 }, { label: "葱油", priceDelta: 0 }] },
    ],
  },
  {
    id: "jasmine-smoked-chicken",
    name: "茉莉花茶熏鸡",
    category: "烟台山新派",
    price: 68,
    image: "🍗",
    tag: "创新",
    rank: 6,
    stock: 32,
    monthlySales: 286,
    description: "以福州茉莉花茶香入菜，鸡皮微脆，茶香清爽解腻",
    specs: [
      { name: "份量", options: [{ label: "半只", priceDelta: 0 }, { label: "整只", priceDelta: 58 }] },
      { name: "口味", options: [{ label: "茶香原味", priceDelta: 0 }, { label: "椒盐", priceDelta: 0 }] },
    ],
  },
  {
    id: "red-wine-oyster-tofu",
    name: "红糟海蛎豆腐煲",
    category: "烟台山新派",
    price: 58,
    image: "🥘",
    tag: "下饭",
    rank: 11,
    stock: 36,
    monthlySales: 226,
    description: "福州红糟、海蛎、嫩豆腐同煲，鲜甜带糟香",
    specs: [
      { name: "口味", options: [{ label: "红糟原味", priceDelta: 0 }, { label: "微辣", priceDelta: 0 }] },
      { name: "加料", options: [{ label: "不加料", priceDelta: 0 }, { label: "加海蛎", priceDelta: 18 }] },
    ],
  },
  {
    id: "fuzhou-fish-ball-soup",
    name: "福州鱼丸汤",
    category: "主食小吃",
    price: 22,
    image: "🍡",
    tag: "本地小吃",
    rank: 12,
    stock: 80,
    monthlySales: 462,
    description: "鱼浆包肉馅，咬开爆汁，清汤加葱珠",
    specs: [
      { name: "数量", options: [{ label: "6 粒", priceDelta: 0 }, { label: "10 粒", priceDelta: 12 }] },
      { name: "汤底", options: [{ label: "清汤", priceDelta: 0 }, { label: "鱼露胡椒", priceDelta: 0 }] },
    ],
  },
  {
    id: "taiping-yan",
    name: "太平燕",
    category: "主食小吃",
    price: 24,
    image: "🥣",
    tag: "福州味",
    rank: 13,
    stock: 66,
    monthlySales: 408,
    description: "肉燕皮薄馅香，配鸭蛋寓意太平，适合早餐或夜宵",
    specs: [
      { name: "规格", options: [{ label: "常规", priceDelta: 0 }, { label: "加燕", priceDelta: 8 }] },
      { name: "口味", options: [{ label: "清汤", priceDelta: 0 }, { label: "胡椒重", priceDelta: 0 }] },
    ],
  },
  {
    id: "guobianhu",
    name: "海鲜锅边糊",
    category: "主食小吃",
    price: 18,
    image: "🍜",
    tag: "早餐王",
    rank: 14,
    stock: 72,
    monthlySales: 386,
    description: "米浆锅边刮片，虾皮、蛤蜊、香菇熬汤，福州人气小吃",
    specs: [
      { name: "加料", options: [{ label: "标准", priceDelta: 0 }, { label: "加鱼丸", priceDelta: 8 }, { label: "加海蛎", priceDelta: 10 }] },
    ],
  },
  {
    id: "oyster-cake",
    name: "海蛎饼",
    category: "主食小吃",
    price: 8,
    image: "🫓",
    tag: "现炸",
    rank: 15,
    stock: 120,
    monthlySales: 520,
    description: "米浆包海蛎、紫菜、包菜现炸，外壳酥脆",
    specs: [
      { name: "数量", options: [{ label: "1 个", priceDelta: 0 }, { label: "3 个", priceDelta: 14 }] },
      { name: "蘸料", options: [{ label: "甜辣酱", priceDelta: 0 }, { label: "不加酱", priceDelta: 0 }] },
    ],
  },
  {
    id: "ban-fen-gan",
    name: "葱油拌粉干",
    category: "主食小吃",
    price: 18,
    image: "🍝",
    tag: "快手",
    rank: 16,
    stock: 88,
    monthlySales: 338,
    description: "福州粉干拌葱油、鱼露、花生碎，适合搭鱼丸汤",
    specs: [
      { name: "份量", options: [{ label: "标准", priceDelta: 0 }, { label: "加粉", priceDelta: 5 }] },
      { name: "辣度", options: [{ label: "不辣", priceDelta: 0 }, { label: "微辣", priceDelta: 0 }] },
    ],
  },
  {
    id: "eight-treasure-taro",
    name: "八宝芋泥",
    category: "甜品饮品",
    price: 26,
    image: "🍠",
    tag: "甜品",
    rank: 17,
    stock: 42,
    monthlySales: 268,
    description: "槟榔芋蒸透压泥，配莲子、红枣、瓜子仁，甜而不腻",
    specs: [
      { name: "温度", options: [{ label: "热", priceDelta: 0 }, { label: "微温", priceDelta: 0 }] },
      { name: "甜度", options: [{ label: "标准", priceDelta: 0 }, { label: "少糖", priceDelta: 0 }] },
    ],
  },
  {
    id: "jasmine-shihuadong",
    name: "茉莉石花冻",
    category: "甜品饮品",
    price: 18,
    image: "🍧",
    tag: "烟台山风",
    rank: 18,
    stock: 76,
    monthlySales: 356,
    description: "石花膏清爽滑嫩，加入茉莉蜜和青柠，适合饭后解腻",
    specs: [
      { name: "冰量", options: [{ label: "少冰", priceDelta: 0 }, { label: "正常冰", priceDelta: 0 }, { label: "去冰", priceDelta: 0 }] },
      { name: "甜度", options: [{ label: "三分糖", priceDelta: 0 }, { label: "五分糖", priceDelta: 0 }] },
    ],
  },
  {
    id: "olive-jasmine-sparkling",
    name: "橄榄茉莉气泡饮",
    category: "甜品饮品",
    price: 16,
    image: "🥤",
    tag: "清爽",
    rank: 19,
    stock: 90,
    monthlySales: 318,
    description: "福州橄榄的回甘配茉莉茶香，气泡感清爽",
    specs: [
      { name: "冰量", options: [{ label: "少冰", priceDelta: 0 }, { label: "正常冰", priceDelta: 0 }, { label: "去冰", priceDelta: 0 }] },
      { name: "甜度", options: [{ label: "无糖", priceDelta: 0 }, { label: "三分糖", priceDelta: 0 }, { label: "五分糖", priceDelta: 0 }] },
    ],
  },
];

const EXTRA_MENU_ITEMS = [
  [
    "home-tomato-egg",
    "番茄炒蛋",
    "家常热炒",
    26,
    "🍅",
    "家常",
    96,
    420,
    "鸡蛋滑嫩、番茄出汁，酸甜开胃，适合配米饭。",
    "portion"
  ],
  [
    "home-green-pepper-pork",
    "青椒肉丝",
    "家常热炒",
    32,
    "🫑",
    "下饭",
    82,
    366,
    "肉丝滑炒青椒，锅气足，咸鲜微辣。",
    "spicy"
  ],
  [
    "home-yuxiang-pork",
    "鱼香肉丝",
    "家常热炒",
    36,
    "🥢",
    "经典",
    76,
    398,
    "酸甜咸辣平衡，木耳笋丝和肉丝一起爆炒。",
    "spicy"
  ],
  [
    "home-kungpao-chicken",
    "宫保鸡丁",
    "家常热炒",
    38,
    "🥜",
    "人气",
    78,
    386,
    "鸡丁、花生和干辣椒快炒，甜辣带香。",
    "spicy"
  ],
  [
    "home-twice-cooked-pork",
    "回锅肉",
    "家常热炒",
    42,
    "🥓",
    "川味",
    62,
    352,
    "五花肉煸香，配蒜苗豆瓣酱，香辣下饭。",
    "spicy"
  ],
  [
    "home-mapo-tofu",
    "麻婆豆腐",
    "家常热炒",
    28,
    "🌶️",
    "麻辣",
    88,
    456,
    "嫩豆腐裹牛肉末和花椒香，热辣开胃。",
    "spicy"
  ],
  [
    "home-sour-potato",
    "酸辣土豆丝",
    "家常热炒",
    22,
    "🥔",
    "爽口",
    110,
    390,
    "土豆丝脆爽，醋香和辣椒香轻盈明快。",
    "spicy"
  ],
  [
    "home-dry-pot-cauliflower",
    "干锅花菜",
    "家常热炒",
    34,
    "🥦",
    "锅气",
    72,
    342,
    "花菜煸到微焦，配五花肉和干辣椒。",
    "spicy"
  ],
  [
    "home-garlic-water-spinach",
    "蒜蓉空心菜",
    "家常热炒",
    24,
    "🥬",
    "清爽",
    100,
    286,
    "蒜香足、青菜脆嫩，适合搭配重口菜。",
    "portion"
  ],
  [
    "home-oyster-lettuce",
    "蚝油生菜",
    "家常热炒",
    22,
    "🥬",
    "素菜",
    105,
    268,
    "生菜清脆，蚝油蒜香带一点回甜。",
    "portion"
  ],
  [
    "home-beef-stir-fry",
    "小炒黄牛肉",
    "家常热炒",
    58,
    "🥩",
    "招牌",
    46,
    488,
    "黄牛肉薄切快炒，香菜和小米辣提香。",
    "spicy"
  ],
  [
    "home-sweet-sour-pork",
    "糖醋里脊",
    "家常热炒",
    42,
    "🍖",
    "酸甜",
    64,
    372,
    "外酥里嫩的里脊挂糖醋汁，年轻客人很爱点。",
    "portion"
  ],
  [
    "home-cola-wings",
    "可乐鸡翅",
    "家常热炒",
    39,
    "🍗",
    "甜口",
    70,
    410,
    "鸡翅收汁到亮泽，甜咸适中。",
    "portion"
  ],
  [
    "home-mushroom-chicken",
    "香菇滑鸡",
    "家常热炒",
    42,
    "🍄",
    "嫩滑",
    58,
    304,
    "鸡腿肉滑嫩，香菇吸满汤汁。",
    "portion"
  ],
  [
    "home-farmer-bowl",
    "农家一碗香",
    "家常热炒",
    36,
    "🍳",
    "下饭",
    68,
    356,
    "鸡蛋、肉片、青椒同炒，烟火气很足。",
    "spicy"
  ],
  [
    "bowl-meicai-pork",
    "梅菜扣肉小碗",
    "下饭小碗菜",
    36,
    "🥩",
    "软糯",
    60,
    312,
    "梅菜咸香，扣肉软糯，一碗饭刚刚好。",
    "rice"
  ],
  [
    "bowl-braised-chicken",
    "黄焖鸡米饭",
    "下饭小碗菜",
    32,
    "🍗",
    "热卖",
    92,
    520,
    "鸡腿肉、土豆和青椒焖到入味，汤汁拌饭。",
    "rice"
  ],
  [
    "bowl-lurou-rice",
    "台式卤肉饭",
    "下饭小碗菜",
    29,
    "🍚",
    "一人食",
    96,
    476,
    "卤肉碎油润不腻，配卤蛋和青菜。",
    "rice"
  ],
  [
    "bowl-sauerkraut-fish",
    "酸菜鱼小锅",
    "下饭小碗菜",
    48,
    "🐟",
    "酸辣",
    46,
    438,
    "黑鱼片滑嫩，酸菜汤底开胃，适合单人份。",
    "spicy"
  ],
  [
    "bowl-curry-chicken",
    "咖喱鸡块饭",
    "下饭小碗菜",
    32,
    "🍛",
    "浓香",
    84,
    388,
    "日式咖喱浓稠，鸡块和土豆都很入味。",
    "rice"
  ],
  [
    "bowl-black-pepper-beef",
    "黑椒牛柳饭",
    "下饭小碗菜",
    42,
    "🥩",
    "黑椒",
    58,
    356,
    "牛柳嫩滑，黑椒汁浓郁，米饭杀手。",
    "rice"
  ],
  [
    "bowl-sauce-eggplant",
    "酱爆茄子饭",
    "下饭小碗菜",
    28,
    "🍆",
    "素下饭",
    80,
    288,
    "茄子软糯吸酱，蒜香浓，适合拌饭。",
    "rice"
  ],
  [
    "bowl-yuxiang-eggplant",
    "鱼香茄子煲",
    "下饭小碗菜",
    34,
    "🍆",
    "煲仔",
    66,
    318,
    "茄子煲热气腾腾，鱼香汁酸甜微辣。",
    "spicy"
  ],
  [
    "bowl-beef-brisket-potato",
    "土豆炖牛腩饭",
    "下饭小碗菜",
    48,
    "🥔",
    "暖胃",
    50,
    336,
    "牛腩炖到软烂，土豆吸满肉汁。",
    "rice"
  ],
  [
    "bowl-spicy-chicken-leg",
    "香辣鸡腿肉饭",
    "下饭小碗菜",
    34,
    "🍗",
    "香辣",
    74,
    402,
    "鸡腿肉去骨快炒，辣香明显，适合外卖。",
    "spicy"
  ],
  [
    "young-omu-rice",
    "日式蛋包饭",
    "年轻人爱吃",
    36,
    "🍳",
    "必点",
    88,
    620,
    "滑蛋包裹炒饭，淋番茄肉酱，拍照也好看。",
    "rice"
  ],
  [
    "young-cheese-buldak-noodle",
    "芝士焗火鸡面",
    "年轻人爱吃",
    32,
    "🧀",
    "爆款",
    96,
    680,
    "火鸡面覆芝士焗到拉丝，辣爽又有奶香。",
    "noodle"
  ],
  [
    "young-curry-pork-omu",
    "咖喱猪排蛋包饭",
    "年轻人爱吃",
    46,
    "🍛",
    "日式",
    62,
    488,
    "厚切猪排、滑蛋和咖喱同盘，饱腹感很强。",
    "rice"
  ],
  [
    "young-blackpepper-chicken-egg",
    "黑椒鸡排滑蛋饭",
    "年轻人爱吃",
    39,
    "🍗",
    "能量餐",
    74,
    452,
    "鸡排煎香，滑蛋盖饭，黑椒汁浓郁。",
    "rice"
  ],
  [
    "young-cheese-chicken-cutlet",
    "爆浆芝士鸡排",
    "年轻人爱吃",
    34,
    "🧀",
    "拉丝",
    82,
    520,
    "鸡排外壳酥脆，切开有芝士流心。",
    "snack"
  ],
  [
    "young-volcano-cheese-rice",
    "火山芝士饭",
    "年轻人爱吃",
    38,
    "🌋",
    "芝士",
    70,
    462,
    "辣肉酱炒饭堆成火山形，芝士覆盖后微焗。",
    "rice"
  ],
  [
    "young-cream-bacon-pasta",
    "奶油培根意面",
    "年轻人爱吃",
    42,
    "🍝",
    "奶香",
    58,
    390,
    "奶油酱包裹意面，培根咸香，适合不吃辣。",
    "pasta"
  ],
  [
    "young-bolognese-pasta",
    "番茄肉酱意面",
    "年轻人爱吃",
    39,
    "🍝",
    "经典",
    64,
    372,
    "番茄慢熬肉酱，酸甜浓郁，老少都稳。",
    "pasta"
  ],
  [
    "young-kimchi-fried-rice",
    "韩式泡菜炒饭",
    "年轻人爱吃",
    32,
    "🍚",
    "韩式",
    90,
    508,
    "泡菜酸辣，米饭粒粒分明，可加芝士。",
    "spicyRice"
  ],
  [
    "young-cheese-tteok-ramen",
    "芝士年糕拉面",
    "年轻人爱吃",
    36,
    "🍜",
    "韩风",
    78,
    536,
    "拉面、年糕和芝士同煮，软糯拉丝。",
    "noodle"
  ],
  [
    "young-teriyaki-chicken-rice",
    "照烧鸡腿饭",
    "年轻人爱吃",
    36,
    "🍗",
    "甜咸",
    86,
    486,
    "鸡腿排煎到焦香，照烧汁甜咸适口。",
    "rice"
  ],
  [
    "young-salt-crispy-chicken-rice",
    "盐酥鸡拌饭",
    "年轻人爱吃",
    34,
    "🍗",
    "酥脆",
    92,
    498,
    "盐酥鸡配海苔碎和温泉蛋，香脆拌饭。",
    "rice"
  ],
  [
    "young-thai-basil-pork",
    "泰式打抛猪饭",
    "年轻人爱吃",
    38,
    "🌿",
    "东南亚",
    66,
    352,
    "罗勒香气明显，猪肉末咸辣，配煎蛋。",
    "spicyRice"
  ],
  [
    "young-mexican-chicken-wrap",
    "墨西哥鸡肉卷",
    "年轻人爱吃",
    29,
    "🌯",
    "轻快",
    76,
    338,
    "鸡肉、生菜和莎莎酱卷饼，适合随手吃。",
    "snack"
  ],
  [
    "young-avocado-shrimp-bowl",
    "牛油果虾仁饭",
    "年轻人爱吃",
    46,
    "🥑",
    "清爽",
    44,
    286,
    "牛油果、虾仁、温泉蛋和米饭组成轻盈碗。",
    "salad"
  ],
  [
    "korean-fried-chicken",
    "韩式炸鸡",
    "韩式日式小食",
    48,
    "🍗",
    "韩式",
    70,
    560,
    "鸡块炸到酥脆，裹甜辣酱，适合分享。",
    "snack"
  ],
  [
    "korean-honey-mustard-chicken",
    "蜂蜜芥末炸鸡",
    "韩式日式小食",
    48,
    "🍯",
    "酸甜",
    62,
    430,
    "芥末香气和蜂蜜甜味平衡，外酥内嫩。",
    "snack"
  ],
  [
    "korean-spicy-tteokbokki",
    "辣炒年糕",
    "韩式日式小食",
    28,
    "🍢",
    "糯叽叽",
    90,
    520,
    "年糕软糯，韩式辣酱甜辣浓稠。",
    "spicy"
  ],
  [
    "korean-budae-jjigae-small",
    "部队锅小份",
    "韩式日式小食",
    52,
    "🍲",
    "暖锅",
    42,
    362,
    "午餐肉、泡菜、拉面和芝士同煮，小份也满足。",
    "noodle"
  ],
  [
    "japan-takoyaki",
    "日式章鱼小丸子",
    "韩式日式小食",
    24,
    "🐙",
    "小食",
    110,
    580,
    "外皮软糯，木鱼花和照烧酱香气足。",
    "snack"
  ],
  [
    "japan-croquette",
    "日式可乐饼",
    "韩式日式小食",
    22,
    "🥔",
    "酥香",
    86,
    320,
    "土豆泥和肉末炸成金黄，外脆内绵。",
    "snack"
  ],
  [
    "japan-oden-combo",
    "关东煮拼盘",
    "韩式日式小食",
    32,
    "🍢",
    "暖胃",
    76,
    388,
    "萝卜、鱼饼、魔芋和丸子慢煮入味。",
    "portion"
  ],
  [
    "japan-gyoza",
    "日式煎饺",
    "韩式日式小食",
    26,
    "🥟",
    "焦香",
    96,
    442,
    "底部煎到金黄，肉馅多汁。",
    "snack"
  ],
  [
    "japan-tuna-onigiri",
    "金枪鱼饭团",
    "韩式日式小食",
    16,
    "🍙",
    "便当",
    120,
    460,
    "海苔包米饭，金枪鱼蛋黄酱内馅。",
    "snack"
  ],
  [
    "japan-teriyaki-skewer",
    "照烧鸡肉串",
    "韩式日式小食",
    22,
    "🍢",
    "串物",
    92,
    374,
    "鸡肉串刷照烧汁烤香，甜咸适合下酒。",
    "grill"
  ],
  [
    "baked-cheese-mashed-potato",
    "芝士焗土豆泥",
    "焗烤炸物",
    26,
    "🧀",
    "拉丝",
    80,
    360,
    "土豆泥绵密，芝士焗到金黄。",
    "baked"
  ],
  [
    "baked-seafood-rice",
    "海鲜芝士焗饭",
    "焗烤炸物",
    48,
    "🦐",
    "焗饭",
    42,
    346,
    "虾仁、鱿鱼和米饭覆芝士焗烤。",
    "bakedRice"
  ],
  [
    "baked-durian-toast",
    "榴莲芝士焗吐司",
    "焗烤炸物",
    38,
    "🍞",
    "甜咸",
    46,
    330,
    "榴莲果肉和芝士铺满厚吐司，香气很足。",
    "dessert"
  ],
  [
    "baked-tomato-meat-rice",
    "芝士焗番茄肉酱饭",
    "焗烤炸物",
    39,
    "🍅",
    "浓郁",
    58,
    368,
    "番茄肉酱盖饭再焗芝士，酸甜拉丝。",
    "bakedRice"
  ],
  [
    "baked-garlic-potato-wedges",
    "蒜香黄油薯角",
    "焗烤炸物",
    22,
    "🍟",
    "小食",
    100,
    420,
    "薯角外脆内糯，黄油蒜香浓。",
    "snack"
  ],
  [
    "fried-fries",
    "美式炸薯条",
    "焗烤炸物",
    18,
    "🍟",
    "经典",
    130,
    560,
    "粗薯条炸到金黄，适合配饮品。",
    "snack"
  ],
  [
    "fried-spicy-popcorn-chicken",
    "香辣鸡米花",
    "焗烤炸物",
    26,
    "🍗",
    "香辣",
    115,
    610,
    "鸡米花酥脆多汁，香辣粉很上头。",
    "snack"
  ],
  [
    "fried-golden-shrimp",
    "黄金炸虾",
    "焗烤炸物",
    36,
    "🍤",
    "海味",
    62,
    388,
    "虾肉弹牙，面衣酥脆，可蘸塔塔酱。",
    "snack"
  ],
  [
    "fried-cheese-corn",
    "芝士玉米烙",
    "焗烤炸物",
    28,
    "🌽",
    "香甜",
    78,
    432,
    "玉米粒甜脆，芝士和沙拉酱增加奶香。",
    "baked"
  ],
  [
    "fried-sausage-platter",
    "烤肠拼盘",
    "焗烤炸物",
    32,
    "🌭",
    "分享",
    66,
    340,
    "黑椒肠、芝士肠和脆皮肠组合。",
    "grill"
  ],
  [
    "noodle-beef-rice-noodle",
    "牛肉炒河粉",
    "粉面饭主食",
    36,
    "🍜",
    "锅气",
    72,
    410,
    "河粉宽滑，牛肉嫩，酱油香气足。",
    "noodle"
  ],
  [
    "noodle-seafood-udon",
    "海鲜炒乌冬",
    "粉面饭主食",
    39,
    "🍜",
    "海味",
    58,
    336,
    "乌冬弹牙，虾仁鱿鱼和蔬菜同炒。",
    "noodle"
  ],
  [
    "noodle-sour-beef-rice-noodle",
    "酸汤肥牛米线",
    "粉面饭主食",
    42,
    "🍲",
    "酸辣",
    60,
    452,
    "酸汤开胃，肥牛铺满，适合想吃热汤的人。",
    "spicyNoodle"
  ],
  [
    "noodle-shacha-beef",
    "沙茶牛肉拌面",
    "粉面饭主食",
    34,
    "🥢",
    "闽南风",
    68,
    326,
    "沙茶酱浓香，牛肉和拌面很搭。",
    "noodle"
  ],
  [
    "noodle-scallion-chicken",
    "葱油鸡丝拌面",
    "粉面饭主食",
    29,
    "🍜",
    "清爽",
    76,
    310,
    "葱油香、鸡丝嫩，适合不想吃辣。",
    "noodle"
  ],
  [
    "rice-minced-pork-beans",
    "肉末豆角拌饭",
    "粉面饭主食",
    28,
    "🍚",
    "下饭",
    88,
    390,
    "豆角脆爽，肉末咸香，拌饭很稳。",
    "rice"
  ],
  [
    "noodle-mushroom-chicken-soup",
    "菌菇鸡汤面",
    "粉面饭主食",
    32,
    "🍄",
    "暖胃",
    66,
    284,
    "鸡汤清鲜，菌菇香气自然，汤面温和。",
    "noodle"
  ],
  [
    "rice-fuzhou-baiguo",
    "福州炒白粿",
    "粉面饭主食",
    30,
    "🥢",
    "本地",
    72,
    342,
    "白粿软糯，配青菜、肉丝和虾米快炒。",
    "portion"
  ],
  [
    "light-caesar-chicken",
    "凯撒鸡胸沙拉",
    "轻食沙拉",
    36,
    "🥗",
    "轻食",
    54,
    298,
    "鸡胸肉、罗马生菜和面包丁，酱香清爽。",
    "salad"
  ],
  [
    "light-avocado-egg",
    "牛油果鸡蛋沙拉",
    "轻食沙拉",
    39,
    "🥑",
    "高蛋白",
    42,
    248,
    "牛油果、鸡蛋和坚果，口感柔和。",
    "salad"
  ],
  [
    "light-smoked-salmon",
    "烟熏三文鱼沙拉",
    "轻食沙拉",
    58,
    "🥗",
    "精致",
    28,
    188,
    "烟熏三文鱼配酸奶酱，清爽有层次。",
    "salad"
  ],
  [
    "light-quinoa-shrimp",
    "藜麦虾仁碗",
    "轻食沙拉",
    48,
    "🍤",
    "饱腹",
    36,
    232,
    "藜麦、虾仁、玉米和鸡蛋组成高蛋白碗。",
    "salad"
  ],
  [
    "light-chicken-breast-rice",
    "低脂鸡胸饭",
    "轻食沙拉",
    34,
    "🍗",
    "健身",
    64,
    330,
    "鸡胸肉煎香，搭糙米和蔬菜，负担较轻。",
    "saladRice"
  ],
  [
    "light-purple-yogurt-bowl",
    "紫薯酸奶碗",
    "轻食沙拉",
    26,
    "🍠",
    "甜轻食",
    52,
    260,
    "紫薯泥、酸奶和燕麦，适合下午茶。",
    "dessert"
  ],
  [
    "night-lamb-skewer",
    "孜然羊肉串",
    "宵夜烧烤",
    32,
    "🍢",
    "宵夜",
    80,
    480,
    "羊肉串撒孜然辣椒，香气很直接。",
    "grill"
  ],
  [
    "night-pork-belly",
    "烤五花肉",
    "宵夜烧烤",
    36,
    "🥓",
    "焦香",
    72,
    420,
    "五花肉边缘烤到微焦，油香配生菜。",
    "grill"
  ],
  [
    "night-grilled-wings",
    "烤鸡翅",
    "宵夜烧烤",
    28,
    "🍗",
    "人气",
    90,
    560,
    "鸡翅烤到表皮紧致，孜然和蜂蜜两种风味。",
    "grill"
  ],
  [
    "night-squid-tentacles",
    "烤鱿鱼须",
    "宵夜烧烤",
    38,
    "🦑",
    "海味",
    58,
    340,
    "鱿鱼须弹脆，刷酱后香辣有嚼劲。",
    "grill"
  ],
  [
    "night-garlic-eggplant",
    "蒜蓉烤茄子",
    "宵夜烧烤",
    26,
    "🍆",
    "蒜香",
    76,
    410,
    "茄子烤到软糯，铺满蒜蓉和葱花。",
    "grill"
  ],
  [
    "night-foil-enoki",
    "锡纸金针菇",
    "宵夜烧烤",
    22,
    "🍄",
    "锡纸",
    92,
    390,
    "金针菇吸满蒜蓉汤汁，热乎下饭。",
    "spicy"
  ],
  [
    "night-grilled-cold-noodle",
    "烤冷面",
    "宵夜烧烤",
    18,
    "🥞",
    "街头",
    120,
    620,
    "冷面皮煎香，刷酱加蛋，酸甜微辣。",
    "snack"
  ]
];

const EXTRA_SPEC_PRESETS = {
  "portion": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "大份",
          "priceDelta": 10
        }
      ]
    }
  ],
  "spicy": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "大份",
          "priceDelta": 10
        }
      ]
    },
    {
      "name": "辣度",
      "options": [
        {
          "label": "不辣",
          "priceDelta": 0
        },
        {
          "label": "微辣",
          "priceDelta": 0
        },
        {
          "label": "中辣",
          "priceDelta": 0
        },
        {
          "label": "重辣",
          "priceDelta": 0
        }
      ]
    }
  ],
  "rice": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准饭",
          "priceDelta": 0
        },
        {
          "label": "加饭",
          "priceDelta": 3
        }
      ]
    },
    {
      "name": "加料",
      "options": [
        {
          "label": "不加料",
          "priceDelta": 0
        },
        {
          "label": "加溏心蛋",
          "priceDelta": 5
        },
        {
          "label": "加芝士",
          "priceDelta": 6
        }
      ]
    }
  ],
  "spicyRice": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准饭",
          "priceDelta": 0
        },
        {
          "label": "加饭",
          "priceDelta": 3
        }
      ]
    },
    {
      "name": "辣度",
      "options": [
        {
          "label": "微辣",
          "priceDelta": 0
        },
        {
          "label": "中辣",
          "priceDelta": 0
        },
        {
          "label": "重辣",
          "priceDelta": 0
        }
      ]
    },
    {
      "name": "加料",
      "options": [
        {
          "label": "不加料",
          "priceDelta": 0
        },
        {
          "label": "加芝士",
          "priceDelta": 6
        }
      ]
    }
  ],
  "noodle": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "加面",
          "priceDelta": 5
        }
      ]
    },
    {
      "name": "加料",
      "options": [
        {
          "label": "不加料",
          "priceDelta": 0
        },
        {
          "label": "加溏心蛋",
          "priceDelta": 5
        },
        {
          "label": "加午餐肉",
          "priceDelta": 8
        }
      ]
    }
  ],
  "spicyNoodle": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "加面",
          "priceDelta": 5
        }
      ]
    },
    {
      "name": "辣度",
      "options": [
        {
          "label": "微辣",
          "priceDelta": 0
        },
        {
          "label": "中辣",
          "priceDelta": 0
        },
        {
          "label": "重辣",
          "priceDelta": 0
        }
      ]
    }
  ],
  "pasta": [
    {
      "name": "份量",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "加面",
          "priceDelta": 6
        }
      ]
    },
    {
      "name": "加料",
      "options": [
        {
          "label": "不加料",
          "priceDelta": 0
        },
        {
          "label": "加芝士",
          "priceDelta": 6
        },
        {
          "label": "加培根",
          "priceDelta": 8
        }
      ]
    }
  ],
  "snack": [
    {
      "name": "份量",
      "options": [
        {
          "label": "单份",
          "priceDelta": 0
        },
        {
          "label": "双份",
          "priceDelta": 16
        }
      ]
    },
    {
      "name": "口味",
      "options": [
        {
          "label": "原味",
          "priceDelta": 0
        },
        {
          "label": "香辣",
          "priceDelta": 0
        },
        {
          "label": "海苔",
          "priceDelta": 0
        }
      ]
    }
  ],
  "baked": [
    {
      "name": "芝士",
      "options": [
        {
          "label": "标准芝士",
          "priceDelta": 0
        },
        {
          "label": "双倍芝士",
          "priceDelta": 8
        }
      ]
    },
    {
      "name": "份量",
      "options": [
        {
          "label": "单份",
          "priceDelta": 0
        },
        {
          "label": "加量",
          "priceDelta": 10
        }
      ]
    }
  ],
  "bakedRice": [
    {
      "name": "芝士",
      "options": [
        {
          "label": "标准芝士",
          "priceDelta": 0
        },
        {
          "label": "双倍芝士",
          "priceDelta": 8
        }
      ]
    },
    {
      "name": "份量",
      "options": [
        {
          "label": "标准饭",
          "priceDelta": 0
        },
        {
          "label": "加饭",
          "priceDelta": 3
        }
      ]
    }
  ],
  "grill": [
    {
      "name": "辣度",
      "options": [
        {
          "label": "不辣",
          "priceDelta": 0
        },
        {
          "label": "微辣",
          "priceDelta": 0
        },
        {
          "label": "中辣",
          "priceDelta": 0
        }
      ]
    },
    {
      "name": "撒料",
      "options": [
        {
          "label": "孜然",
          "priceDelta": 0
        },
        {
          "label": "椒盐",
          "priceDelta": 0
        },
        {
          "label": "蒜香",
          "priceDelta": 0
        }
      ]
    }
  ],
  "salad": [
    {
      "name": "酱汁",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "少酱",
          "priceDelta": 0
        },
        {
          "label": "油醋汁",
          "priceDelta": 0
        }
      ]
    },
    {
      "name": "蛋白",
      "options": [
        {
          "label": "标准",
          "priceDelta": 0
        },
        {
          "label": "加鸡蛋",
          "priceDelta": 5
        },
        {
          "label": "加鸡胸",
          "priceDelta": 8
        }
      ]
    }
  ],
  "saladRice": [
    {
      "name": "主食",
      "options": [
        {
          "label": "糙米",
          "priceDelta": 0
        },
        {
          "label": "白米饭",
          "priceDelta": 0
        },
        {
          "label": "不加饭",
          "priceDelta": 0
        }
      ]
    },
    {
      "name": "蛋白",
      "options": [
        {
          "label": "标准鸡胸",
          "priceDelta": 0
        },
        {
          "label": "加鸡胸",
          "priceDelta": 10
        }
      ]
    }
  ],
  "dessert": [
    {
      "name": "甜度",
      "options": [
        {
          "label": "少糖",
          "priceDelta": 0
        },
        {
          "label": "标准",
          "priceDelta": 0
        }
      ]
    },
    {
      "name": "温度",
      "options": [
        {
          "label": "冷",
          "priceDelta": 0
        },
        {
          "label": "热",
          "priceDelta": 0
        }
      ]
    }
  ]
};

function cloneExtraSpecs(type) {
  return JSON.parse(JSON.stringify(EXTRA_SPEC_PRESETS[type] || EXTRA_SPEC_PRESETS.portion));
}

function makeExtraMenuItem(item, index) {
  const [id, name, category, price, image, tag, stock, monthlySales, description, specType] = item;
  return {
    id,
    name,
    category,
    price,
    image,
    tag,
    rank: 20 + index,
    stock,
    monthlySales,
    description,
    specs: cloneExtraSpecs(specType),
  };
}

window.MENU_ITEMS.push(...EXTRA_MENU_ITEMS.map((item, index) => makeExtraMenuItem(item, index)));
