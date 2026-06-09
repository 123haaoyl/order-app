const shopConfig = {
  "menuVersion": "fuzhou-yantaishan-20260609-v5-100",
  "name": "烟台山闽味小馆",
  "subtitle": "福州菜、烟台山新派闽味，堂食外卖都可以",
  "announcement": "主打福州菜与烟台山人气风味，现点现做，请留意取餐提醒",
  "businessHours": "10:30-22:30",
  "address": "福州仓山区仓前路 150 号附近",
  "phone": "138-0000-8888",
  "minOrderAmount": 20,
  "packingFeePerDish": 1,
  "deliveryFee": 6,
  "deliveryRange": "3 公里",
  "autoCancelMinutes": 15,
  "serviceModes": [
    "dinein",
    "takeaway"
  ]
};

const tables = [
  {
    "id": "A01",
    "area": "大厅",
    "seats": 2,
    "status": "idle"
  },
  {
    "id": "A08",
    "area": "大厅",
    "seats": 4,
    "status": "idle"
  },
  {
    "id": "B02",
    "area": "包厢",
    "seats": 8,
    "status": "idle"
  }
];

const menuItems = [
  {
    "id": "fotiaoqiang-cup",
    "name": "佛跳墙小盅",
    "category": "经典福州菜",
    "price": 138,
    "image": "🍲",
    "tag": "招牌",
    "rank": 1,
    "stock": 18,
    "monthlySales": 328,
    "description": "鲍鱼、海参、蹄筋、瑶柱慢煨，单人小盅更适合日常点餐",
    "specs": [
      {
        "name": "规格",
        "options": [
          {
            "label": "单人盅",
            "priceDelta": 0
          },
          {
            "label": "双人盅",
            "priceDelta": 118
          }
        ]
      },
      {
        "name": "汤底",
        "options": [
          {
            "label": "经典浓汤",
            "priceDelta": 0
          },
          {
            "label": "花胶加浓",
            "priceDelta": 38
          }
        ]
      }
    ]
  },
  {
    "id": "fuzhou-lychee-pork",
    "name": "福州荔枝肉",
    "category": "经典福州菜",
    "price": 58,
    "image": "🍖",
    "tag": "必点",
    "rank": 2,
    "stock": 46,
    "monthlySales": 512,
    "description": "酸甜红亮，外酥里嫩，保留老福州荔枝形刀工",
    "specs": [
      {
        "name": "份量",
        "options": [
          {
            "label": "例份",
            "priceDelta": 0
          },
          {
            "label": "大份",
            "priceDelta": 20
          }
        ]
      },
      {
        "name": "口味",
        "options": [
          {
            "label": "经典酸甜",
            "priceDelta": 0
          },
          {
            "label": "少甜",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "nan-jian-gan",
    "name": "南煎肝",
    "category": "经典福州菜",
    "price": 48,
    "image": "🥢",
    "tag": "老福州",
    "rank": 5,
    "stock": 34,
    "monthlySales": 276,
    "description": "猪肝薄切快煎，酸甜酱汁挂口，讲究火候",
    "specs": [
      {
        "name": "熟度",
        "options": [
          {
            "label": "嫩口",
            "priceDelta": 0
          },
          {
            "label": "全熟",
            "priceDelta": 0
          }
        ]
      },
      {
        "name": "口味",
        "options": [
          {
            "label": "经典酸甜",
            "priceDelta": 0
          },
          {
            "label": "少汁",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "drunken-ribs",
    "name": "十香醉排骨",
    "category": "经典福州菜",
    "price": 52,
    "image": "🍖",
    "tag": "人气",
    "rank": 4,
    "stock": 38,
    "monthlySales": 368,
    "description": "炸排骨裹十香酸甜汁，冷吃热吃都开胃",
    "specs": [
      {
        "name": "份量",
        "options": [
          {
            "label": "例份",
            "priceDelta": 0
          },
          {
            "label": "大份",
            "priceDelta": 18
          }
        ]
      },
      {
        "name": "酱汁",
        "options": [
          {
            "label": "标准",
            "priceDelta": 0
          },
          {
            "label": "多汁",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "stir-fried-double-crisp",
    "name": "爆炒双脆",
    "category": "经典福州菜",
    "price": 68,
    "image": "🔥",
    "tag": "锅气",
    "rank": 8,
    "stock": 28,
    "monthlySales": 198,
    "description": "腰花与海蜇头猛火快炒，脆嫩酸甜，适合下酒",
    "specs": [
      {
        "name": "口味",
        "options": [
          {
            "label": "酸甜",
            "priceDelta": 0
          },
          {
            "label": "微辣",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "clam-chicken-soup",
    "name": "鸡汤汆海蚌",
    "category": "经典福州菜",
    "price": 98,
    "image": "🦪",
    "tag": "鲜汤",
    "rank": 10,
    "stock": 16,
    "monthlySales": 156,
    "description": "清鸡汤汆本港海蚌，汤清味鲜，保留闽菜重汤底的特点",
    "specs": [
      {
        "name": "规格",
        "options": [
          {
            "label": "例份",
            "priceDelta": 0
          },
          {
            "label": "加海蚌",
            "priceDelta": 36
          }
        ]
      }
    ]
  },
  {
    "id": "red-crab-rice",
    "name": "红蟳米糕",
    "category": "烟台山新派",
    "price": 128,
    "image": "🦀",
    "tag": "江景同款",
    "rank": 3,
    "stock": 20,
    "monthlySales": 386,
    "description": "红蟳膏香渗入糯米，虾米、香菇、干贝同焖，鲜香糯润",
    "specs": [
      {
        "name": "规格",
        "options": [
          {
            "label": "半只红蟳",
            "priceDelta": 0
          },
          {
            "label": "整只红蟳",
            "priceDelta": 88
          }
        ]
      }
    ]
  },
  {
    "id": "sesame-oil-prawns",
    "name": "香油明虾",
    "category": "烟台山新派",
    "price": 88,
    "image": "🦐",
    "tag": "海味",
    "rank": 7,
    "stock": 30,
    "monthlySales": 248,
    "description": "明虾煎香后淋热香油，虾壳酥、虾肉弹，适合分享",
    "specs": [
      {
        "name": "份量",
        "options": [
          {
            "label": "6 只",
            "priceDelta": 0
          },
          {
            "label": "10 只",
            "priceDelta": 48
          }
        ]
      },
      {
        "name": "口味",
        "options": [
          {
            "label": "香油原味",
            "priceDelta": 0
          },
          {
            "label": "蒜香",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "minjiang-white-fish",
    "name": "闽江白刀鱼",
    "category": "烟台山新派",
    "price": 98,
    "image": "🐟",
    "tag": "时令",
    "rank": 9,
    "stock": 14,
    "monthlySales": 142,
    "description": "清蒸白刀鱼，葱姜豉油提鲜，灵感来自闽江边烟台山餐厅风味",
    "specs": [
      {
        "name": "做法",
        "options": [
          {
            "label": "清蒸",
            "priceDelta": 0
          },
          {
            "label": "葱油",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "jasmine-smoked-chicken",
    "name": "茉莉花茶熏鸡",
    "category": "烟台山新派",
    "price": 68,
    "image": "🍗",
    "tag": "创新",
    "rank": 6,
    "stock": 32,
    "monthlySales": 286,
    "description": "以福州茉莉花茶香入菜，鸡皮微脆，茶香清爽解腻",
    "specs": [
      {
        "name": "份量",
        "options": [
          {
            "label": "半只",
            "priceDelta": 0
          },
          {
            "label": "整只",
            "priceDelta": 58
          }
        ]
      },
      {
        "name": "口味",
        "options": [
          {
            "label": "茶香原味",
            "priceDelta": 0
          },
          {
            "label": "椒盐",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "red-wine-oyster-tofu",
    "name": "红糟海蛎豆腐煲",
    "category": "烟台山新派",
    "price": 58,
    "image": "🥘",
    "tag": "下饭",
    "rank": 11,
    "stock": 36,
    "monthlySales": 226,
    "description": "福州红糟、海蛎、嫩豆腐同煲，鲜甜带糟香",
    "specs": [
      {
        "name": "口味",
        "options": [
          {
            "label": "红糟原味",
            "priceDelta": 0
          },
          {
            "label": "微辣",
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
            "label": "加海蛎",
            "priceDelta": 18
          }
        ]
      }
    ]
  },
  {
    "id": "fuzhou-fish-ball-soup",
    "name": "福州鱼丸汤",
    "category": "主食小吃",
    "price": 22,
    "image": "🍡",
    "tag": "本地小吃",
    "rank": 12,
    "stock": 80,
    "monthlySales": 462,
    "description": "鱼浆包肉馅，咬开爆汁，清汤加葱珠",
    "specs": [
      {
        "name": "数量",
        "options": [
          {
            "label": "6 粒",
            "priceDelta": 0
          },
          {
            "label": "10 粒",
            "priceDelta": 12
          }
        ]
      },
      {
        "name": "汤底",
        "options": [
          {
            "label": "清汤",
            "priceDelta": 0
          },
          {
            "label": "鱼露胡椒",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "taiping-yan",
    "name": "太平燕",
    "category": "主食小吃",
    "price": 24,
    "image": "🥣",
    "tag": "福州味",
    "rank": 13,
    "stock": 66,
    "monthlySales": 408,
    "description": "肉燕皮薄馅香，配鸭蛋寓意太平，适合早餐或夜宵",
    "specs": [
      {
        "name": "规格",
        "options": [
          {
            "label": "常规",
            "priceDelta": 0
          },
          {
            "label": "加燕",
            "priceDelta": 8
          }
        ]
      },
      {
        "name": "口味",
        "options": [
          {
            "label": "清汤",
            "priceDelta": 0
          },
          {
            "label": "胡椒重",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "guobianhu",
    "name": "海鲜锅边糊",
    "category": "主食小吃",
    "price": 18,
    "image": "🍜",
    "tag": "早餐王",
    "rank": 14,
    "stock": 72,
    "monthlySales": 386,
    "description": "米浆锅边刮片，虾皮、蛤蜊、香菇熬汤，福州人气小吃",
    "specs": [
      {
        "name": "加料",
        "options": [
          {
            "label": "标准",
            "priceDelta": 0
          },
          {
            "label": "加鱼丸",
            "priceDelta": 8
          },
          {
            "label": "加海蛎",
            "priceDelta": 10
          }
        ]
      }
    ]
  },
  {
    "id": "oyster-cake",
    "name": "海蛎饼",
    "category": "主食小吃",
    "price": 8,
    "image": "🫓",
    "tag": "现炸",
    "rank": 15,
    "stock": 120,
    "monthlySales": 520,
    "description": "米浆包海蛎、紫菜、包菜现炸，外壳酥脆",
    "specs": [
      {
        "name": "数量",
        "options": [
          {
            "label": "1 个",
            "priceDelta": 0
          },
          {
            "label": "3 个",
            "priceDelta": 14
          }
        ]
      },
      {
        "name": "蘸料",
        "options": [
          {
            "label": "甜辣酱",
            "priceDelta": 0
          },
          {
            "label": "不加酱",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "ban-fen-gan",
    "name": "葱油拌粉干",
    "category": "主食小吃",
    "price": 18,
    "image": "🍝",
    "tag": "快手",
    "rank": 16,
    "stock": 88,
    "monthlySales": 338,
    "description": "福州粉干拌葱油、鱼露、花生碎，适合搭鱼丸汤",
    "specs": [
      {
        "name": "份量",
        "options": [
          {
            "label": "标准",
            "priceDelta": 0
          },
          {
            "label": "加粉",
            "priceDelta": 5
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
          }
        ]
      }
    ]
  },
  {
    "id": "eight-treasure-taro",
    "name": "八宝芋泥",
    "category": "甜品饮品",
    "price": 26,
    "image": "🍠",
    "tag": "甜品",
    "rank": 17,
    "stock": 42,
    "monthlySales": 268,
    "description": "槟榔芋蒸透压泥，配莲子、红枣、瓜子仁，甜而不腻",
    "specs": [
      {
        "name": "温度",
        "options": [
          {
            "label": "热",
            "priceDelta": 0
          },
          {
            "label": "微温",
            "priceDelta": 0
          }
        ]
      },
      {
        "name": "甜度",
        "options": [
          {
            "label": "标准",
            "priceDelta": 0
          },
          {
            "label": "少糖",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "jasmine-shihuadong",
    "name": "茉莉石花冻",
    "category": "甜品饮品",
    "price": 18,
    "image": "🍧",
    "tag": "烟台山风",
    "rank": 18,
    "stock": 76,
    "monthlySales": 356,
    "description": "石花膏清爽滑嫩，加入茉莉蜜和青柠，适合饭后解腻",
    "specs": [
      {
        "name": "冰量",
        "options": [
          {
            "label": "少冰",
            "priceDelta": 0
          },
          {
            "label": "正常冰",
            "priceDelta": 0
          },
          {
            "label": "去冰",
            "priceDelta": 0
          }
        ]
      },
      {
        "name": "甜度",
        "options": [
          {
            "label": "三分糖",
            "priceDelta": 0
          },
          {
            "label": "五分糖",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "olive-jasmine-sparkling",
    "name": "橄榄茉莉气泡饮",
    "category": "甜品饮品",
    "price": 16,
    "image": "🥤",
    "tag": "清爽",
    "rank": 19,
    "stock": 90,
    "monthlySales": 318,
    "description": "福州橄榄的回甘配茉莉茶香，气泡感清爽",
    "specs": [
      {
        "name": "冰量",
        "options": [
          {
            "label": "少冰",
            "priceDelta": 0
          },
          {
            "label": "正常冰",
            "priceDelta": 0
          },
          {
            "label": "去冰",
            "priceDelta": 0
          }
        ]
      },
      {
        "name": "甜度",
        "options": [
          {
            "label": "无糖",
            "priceDelta": 0
          },
          {
            "label": "三分糖",
            "priceDelta": 0
          },
          {
            "label": "五分糖",
            "priceDelta": 0
          }
        ]
      }
    ]
  },
  {
    "id": "home-tomato-egg",
    "name": "番茄炒蛋",
    "category": "家常热炒",
    "price": 26,
    "image": "🍅",
    "tag": "家常",
    "rank": 20,
    "stock": 96,
    "monthlySales": 420,
    "description": "鸡蛋滑嫩、番茄出汁，酸甜开胃，适合配米饭。",
    "specs": [
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
    ]
  },
  {
    "id": "home-green-pepper-pork",
    "name": "青椒肉丝",
    "category": "家常热炒",
    "price": 32,
    "image": "🫑",
    "tag": "下饭",
    "rank": 21,
    "stock": 82,
    "monthlySales": 366,
    "description": "肉丝滑炒青椒，锅气足，咸鲜微辣。",
    "specs": [
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
    ]
  },
  {
    "id": "home-yuxiang-pork",
    "name": "鱼香肉丝",
    "category": "家常热炒",
    "price": 36,
    "image": "🥢",
    "tag": "经典",
    "rank": 22,
    "stock": 76,
    "monthlySales": 398,
    "description": "酸甜咸辣平衡，木耳笋丝和肉丝一起爆炒。",
    "specs": [
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
    ]
  },
  {
    "id": "home-kungpao-chicken",
    "name": "宫保鸡丁",
    "category": "家常热炒",
    "price": 38,
    "image": "🥜",
    "tag": "人气",
    "rank": 23,
    "stock": 78,
    "monthlySales": 386,
    "description": "鸡丁、花生和干辣椒快炒，甜辣带香。",
    "specs": [
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
    ]
  },
  {
    "id": "home-twice-cooked-pork",
    "name": "回锅肉",
    "category": "家常热炒",
    "price": 42,
    "image": "🥓",
    "tag": "川味",
    "rank": 24,
    "stock": 62,
    "monthlySales": 352,
    "description": "五花肉煸香，配蒜苗豆瓣酱，香辣下饭。",
    "specs": [
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
    ]
  },
  {
    "id": "home-mapo-tofu",
    "name": "麻婆豆腐",
    "category": "家常热炒",
    "price": 28,
    "image": "🌶️",
    "tag": "麻辣",
    "rank": 25,
    "stock": 88,
    "monthlySales": 456,
    "description": "嫩豆腐裹牛肉末和花椒香，热辣开胃。",
    "specs": [
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
    ]
  },
  {
    "id": "home-sour-potato",
    "name": "酸辣土豆丝",
    "category": "家常热炒",
    "price": 22,
    "image": "🥔",
    "tag": "爽口",
    "rank": 26,
    "stock": 110,
    "monthlySales": 390,
    "description": "土豆丝脆爽，醋香和辣椒香轻盈明快。",
    "specs": [
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
    ]
  },
  {
    "id": "home-dry-pot-cauliflower",
    "name": "干锅花菜",
    "category": "家常热炒",
    "price": 34,
    "image": "🥦",
    "tag": "锅气",
    "rank": 27,
    "stock": 72,
    "monthlySales": 342,
    "description": "花菜煸到微焦，配五花肉和干辣椒。",
    "specs": [
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
    ]
  },
  {
    "id": "home-garlic-water-spinach",
    "name": "蒜蓉空心菜",
    "category": "家常热炒",
    "price": 24,
    "image": "🥬",
    "tag": "清爽",
    "rank": 28,
    "stock": 100,
    "monthlySales": 286,
    "description": "蒜香足、青菜脆嫩，适合搭配重口菜。",
    "specs": [
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
    ]
  },
  {
    "id": "home-oyster-lettuce",
    "name": "蚝油生菜",
    "category": "家常热炒",
    "price": 22,
    "image": "🥬",
    "tag": "素菜",
    "rank": 29,
    "stock": 105,
    "monthlySales": 268,
    "description": "生菜清脆，蚝油蒜香带一点回甜。",
    "specs": [
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
    ]
  },
  {
    "id": "home-beef-stir-fry",
    "name": "小炒黄牛肉",
    "category": "家常热炒",
    "price": 58,
    "image": "🥩",
    "tag": "招牌",
    "rank": 30,
    "stock": 46,
    "monthlySales": 488,
    "description": "黄牛肉薄切快炒，香菜和小米辣提香。",
    "specs": [
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
    ]
  },
  {
    "id": "home-sweet-sour-pork",
    "name": "糖醋里脊",
    "category": "家常热炒",
    "price": 42,
    "image": "🍖",
    "tag": "酸甜",
    "rank": 31,
    "stock": 64,
    "monthlySales": 372,
    "description": "外酥里嫩的里脊挂糖醋汁，年轻客人很爱点。",
    "specs": [
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
    ]
  },
  {
    "id": "home-cola-wings",
    "name": "可乐鸡翅",
    "category": "家常热炒",
    "price": 39,
    "image": "🍗",
    "tag": "甜口",
    "rank": 32,
    "stock": 70,
    "monthlySales": 410,
    "description": "鸡翅收汁到亮泽，甜咸适中。",
    "specs": [
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
    ]
  },
  {
    "id": "home-mushroom-chicken",
    "name": "香菇滑鸡",
    "category": "家常热炒",
    "price": 42,
    "image": "🍄",
    "tag": "嫩滑",
    "rank": 33,
    "stock": 58,
    "monthlySales": 304,
    "description": "鸡腿肉滑嫩，香菇吸满汤汁。",
    "specs": [
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
    ]
  },
  {
    "id": "home-farmer-bowl",
    "name": "农家一碗香",
    "category": "家常热炒",
    "price": 36,
    "image": "🍳",
    "tag": "下饭",
    "rank": 34,
    "stock": 68,
    "monthlySales": 356,
    "description": "鸡蛋、肉片、青椒同炒，烟火气很足。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-meicai-pork",
    "name": "梅菜扣肉小碗",
    "category": "下饭小碗菜",
    "price": 36,
    "image": "🥩",
    "tag": "软糯",
    "rank": 35,
    "stock": 60,
    "monthlySales": 312,
    "description": "梅菜咸香，扣肉软糯，一碗饭刚刚好。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-braised-chicken",
    "name": "黄焖鸡米饭",
    "category": "下饭小碗菜",
    "price": 32,
    "image": "🍗",
    "tag": "热卖",
    "rank": 36,
    "stock": 92,
    "monthlySales": 520,
    "description": "鸡腿肉、土豆和青椒焖到入味，汤汁拌饭。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-lurou-rice",
    "name": "台式卤肉饭",
    "category": "下饭小碗菜",
    "price": 29,
    "image": "🍚",
    "tag": "一人食",
    "rank": 37,
    "stock": 96,
    "monthlySales": 476,
    "description": "卤肉碎油润不腻，配卤蛋和青菜。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-sauerkraut-fish",
    "name": "酸菜鱼小锅",
    "category": "下饭小碗菜",
    "price": 48,
    "image": "🐟",
    "tag": "酸辣",
    "rank": 38,
    "stock": 46,
    "monthlySales": 438,
    "description": "黑鱼片滑嫩，酸菜汤底开胃，适合单人份。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-curry-chicken",
    "name": "咖喱鸡块饭",
    "category": "下饭小碗菜",
    "price": 32,
    "image": "🍛",
    "tag": "浓香",
    "rank": 39,
    "stock": 84,
    "monthlySales": 388,
    "description": "日式咖喱浓稠，鸡块和土豆都很入味。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-black-pepper-beef",
    "name": "黑椒牛柳饭",
    "category": "下饭小碗菜",
    "price": 42,
    "image": "🥩",
    "tag": "黑椒",
    "rank": 40,
    "stock": 58,
    "monthlySales": 356,
    "description": "牛柳嫩滑，黑椒汁浓郁，米饭杀手。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-sauce-eggplant",
    "name": "酱爆茄子饭",
    "category": "下饭小碗菜",
    "price": 28,
    "image": "🍆",
    "tag": "素下饭",
    "rank": 41,
    "stock": 80,
    "monthlySales": 288,
    "description": "茄子软糯吸酱，蒜香浓，适合拌饭。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-yuxiang-eggplant",
    "name": "鱼香茄子煲",
    "category": "下饭小碗菜",
    "price": 34,
    "image": "🍆",
    "tag": "煲仔",
    "rank": 42,
    "stock": 66,
    "monthlySales": 318,
    "description": "茄子煲热气腾腾，鱼香汁酸甜微辣。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-beef-brisket-potato",
    "name": "土豆炖牛腩饭",
    "category": "下饭小碗菜",
    "price": 48,
    "image": "🥔",
    "tag": "暖胃",
    "rank": 43,
    "stock": 50,
    "monthlySales": 336,
    "description": "牛腩炖到软烂，土豆吸满肉汁。",
    "specs": [
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
    ]
  },
  {
    "id": "bowl-spicy-chicken-leg",
    "name": "香辣鸡腿肉饭",
    "category": "下饭小碗菜",
    "price": 34,
    "image": "🍗",
    "tag": "香辣",
    "rank": 44,
    "stock": 74,
    "monthlySales": 402,
    "description": "鸡腿肉去骨快炒，辣香明显，适合外卖。",
    "specs": [
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
    ]
  },
  {
    "id": "young-omu-rice",
    "name": "日式蛋包饭",
    "category": "年轻人爱吃",
    "price": 36,
    "image": "🍳",
    "tag": "必点",
    "rank": 45,
    "stock": 88,
    "monthlySales": 620,
    "description": "滑蛋包裹炒饭，淋番茄肉酱，拍照也好看。",
    "specs": [
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
    ]
  },
  {
    "id": "young-cheese-buldak-noodle",
    "name": "芝士焗火鸡面",
    "category": "年轻人爱吃",
    "price": 32,
    "image": "🧀",
    "tag": "爆款",
    "rank": 46,
    "stock": 96,
    "monthlySales": 680,
    "description": "火鸡面覆芝士焗到拉丝，辣爽又有奶香。",
    "specs": [
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
    ]
  },
  {
    "id": "young-curry-pork-omu",
    "name": "咖喱猪排蛋包饭",
    "category": "年轻人爱吃",
    "price": 46,
    "image": "🍛",
    "tag": "日式",
    "rank": 47,
    "stock": 62,
    "monthlySales": 488,
    "description": "厚切猪排、滑蛋和咖喱同盘，饱腹感很强。",
    "specs": [
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
    ]
  },
  {
    "id": "young-blackpepper-chicken-egg",
    "name": "黑椒鸡排滑蛋饭",
    "category": "年轻人爱吃",
    "price": 39,
    "image": "🍗",
    "tag": "能量餐",
    "rank": 48,
    "stock": 74,
    "monthlySales": 452,
    "description": "鸡排煎香，滑蛋盖饭，黑椒汁浓郁。",
    "specs": [
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
    ]
  },
  {
    "id": "young-cheese-chicken-cutlet",
    "name": "爆浆芝士鸡排",
    "category": "年轻人爱吃",
    "price": 34,
    "image": "🧀",
    "tag": "拉丝",
    "rank": 49,
    "stock": 82,
    "monthlySales": 520,
    "description": "鸡排外壳酥脆，切开有芝士流心。",
    "specs": [
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
    ]
  },
  {
    "id": "young-volcano-cheese-rice",
    "name": "火山芝士饭",
    "category": "年轻人爱吃",
    "price": 38,
    "image": "🌋",
    "tag": "芝士",
    "rank": 50,
    "stock": 70,
    "monthlySales": 462,
    "description": "辣肉酱炒饭堆成火山形，芝士覆盖后微焗。",
    "specs": [
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
    ]
  },
  {
    "id": "young-cream-bacon-pasta",
    "name": "奶油培根意面",
    "category": "年轻人爱吃",
    "price": 42,
    "image": "🍝",
    "tag": "奶香",
    "rank": 51,
    "stock": 58,
    "monthlySales": 390,
    "description": "奶油酱包裹意面，培根咸香，适合不吃辣。",
    "specs": [
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
    ]
  },
  {
    "id": "young-bolognese-pasta",
    "name": "番茄肉酱意面",
    "category": "年轻人爱吃",
    "price": 39,
    "image": "🍝",
    "tag": "经典",
    "rank": 52,
    "stock": 64,
    "monthlySales": 372,
    "description": "番茄慢熬肉酱，酸甜浓郁，老少都稳。",
    "specs": [
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
    ]
  },
  {
    "id": "young-kimchi-fried-rice",
    "name": "韩式泡菜炒饭",
    "category": "年轻人爱吃",
    "price": 32,
    "image": "🍚",
    "tag": "韩式",
    "rank": 53,
    "stock": 90,
    "monthlySales": 508,
    "description": "泡菜酸辣，米饭粒粒分明，可加芝士。",
    "specs": [
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
    ]
  },
  {
    "id": "young-cheese-tteok-ramen",
    "name": "芝士年糕拉面",
    "category": "年轻人爱吃",
    "price": 36,
    "image": "🍜",
    "tag": "韩风",
    "rank": 54,
    "stock": 78,
    "monthlySales": 536,
    "description": "拉面、年糕和芝士同煮，软糯拉丝。",
    "specs": [
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
    ]
  },
  {
    "id": "young-teriyaki-chicken-rice",
    "name": "照烧鸡腿饭",
    "category": "年轻人爱吃",
    "price": 36,
    "image": "🍗",
    "tag": "甜咸",
    "rank": 55,
    "stock": 86,
    "monthlySales": 486,
    "description": "鸡腿排煎到焦香，照烧汁甜咸适口。",
    "specs": [
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
    ]
  },
  {
    "id": "young-salt-crispy-chicken-rice",
    "name": "盐酥鸡拌饭",
    "category": "年轻人爱吃",
    "price": 34,
    "image": "🍗",
    "tag": "酥脆",
    "rank": 56,
    "stock": 92,
    "monthlySales": 498,
    "description": "盐酥鸡配海苔碎和温泉蛋，香脆拌饭。",
    "specs": [
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
    ]
  },
  {
    "id": "young-thai-basil-pork",
    "name": "泰式打抛猪饭",
    "category": "年轻人爱吃",
    "price": 38,
    "image": "🌿",
    "tag": "东南亚",
    "rank": 57,
    "stock": 66,
    "monthlySales": 352,
    "description": "罗勒香气明显，猪肉末咸辣，配煎蛋。",
    "specs": [
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
    ]
  },
  {
    "id": "young-mexican-chicken-wrap",
    "name": "墨西哥鸡肉卷",
    "category": "年轻人爱吃",
    "price": 29,
    "image": "🌯",
    "tag": "轻快",
    "rank": 58,
    "stock": 76,
    "monthlySales": 338,
    "description": "鸡肉、生菜和莎莎酱卷饼，适合随手吃。",
    "specs": [
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
    ]
  },
  {
    "id": "young-avocado-shrimp-bowl",
    "name": "牛油果虾仁饭",
    "category": "年轻人爱吃",
    "price": 46,
    "image": "🥑",
    "tag": "清爽",
    "rank": 59,
    "stock": 44,
    "monthlySales": 286,
    "description": "牛油果、虾仁、温泉蛋和米饭组成轻盈碗。",
    "specs": [
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
    ]
  },
  {
    "id": "korean-fried-chicken",
    "name": "韩式炸鸡",
    "category": "韩式日式小食",
    "price": 48,
    "image": "🍗",
    "tag": "韩式",
    "rank": 60,
    "stock": 70,
    "monthlySales": 560,
    "description": "鸡块炸到酥脆，裹甜辣酱，适合分享。",
    "specs": [
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
    ]
  },
  {
    "id": "korean-honey-mustard-chicken",
    "name": "蜂蜜芥末炸鸡",
    "category": "韩式日式小食",
    "price": 48,
    "image": "🍯",
    "tag": "酸甜",
    "rank": 61,
    "stock": 62,
    "monthlySales": 430,
    "description": "芥末香气和蜂蜜甜味平衡，外酥内嫩。",
    "specs": [
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
    ]
  },
  {
    "id": "korean-spicy-tteokbokki",
    "name": "辣炒年糕",
    "category": "韩式日式小食",
    "price": 28,
    "image": "🍢",
    "tag": "糯叽叽",
    "rank": 62,
    "stock": 90,
    "monthlySales": 520,
    "description": "年糕软糯，韩式辣酱甜辣浓稠。",
    "specs": [
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
    ]
  },
  {
    "id": "korean-budae-jjigae-small",
    "name": "部队锅小份",
    "category": "韩式日式小食",
    "price": 52,
    "image": "🍲",
    "tag": "暖锅",
    "rank": 63,
    "stock": 42,
    "monthlySales": 362,
    "description": "午餐肉、泡菜、拉面和芝士同煮，小份也满足。",
    "specs": [
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
    ]
  },
  {
    "id": "japan-takoyaki",
    "name": "日式章鱼小丸子",
    "category": "韩式日式小食",
    "price": 24,
    "image": "🐙",
    "tag": "小食",
    "rank": 64,
    "stock": 110,
    "monthlySales": 580,
    "description": "外皮软糯，木鱼花和照烧酱香气足。",
    "specs": [
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
    ]
  },
  {
    "id": "japan-croquette",
    "name": "日式可乐饼",
    "category": "韩式日式小食",
    "price": 22,
    "image": "🥔",
    "tag": "酥香",
    "rank": 65,
    "stock": 86,
    "monthlySales": 320,
    "description": "土豆泥和肉末炸成金黄，外脆内绵。",
    "specs": [
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
    ]
  },
  {
    "id": "japan-oden-combo",
    "name": "关东煮拼盘",
    "category": "韩式日式小食",
    "price": 32,
    "image": "🍢",
    "tag": "暖胃",
    "rank": 66,
    "stock": 76,
    "monthlySales": 388,
    "description": "萝卜、鱼饼、魔芋和丸子慢煮入味。",
    "specs": [
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
    ]
  },
  {
    "id": "japan-gyoza",
    "name": "日式煎饺",
    "category": "韩式日式小食",
    "price": 26,
    "image": "🥟",
    "tag": "焦香",
    "rank": 67,
    "stock": 96,
    "monthlySales": 442,
    "description": "底部煎到金黄，肉馅多汁。",
    "specs": [
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
    ]
  },
  {
    "id": "japan-tuna-onigiri",
    "name": "金枪鱼饭团",
    "category": "韩式日式小食",
    "price": 16,
    "image": "🍙",
    "tag": "便当",
    "rank": 68,
    "stock": 120,
    "monthlySales": 460,
    "description": "海苔包米饭，金枪鱼蛋黄酱内馅。",
    "specs": [
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
    ]
  },
  {
    "id": "japan-teriyaki-skewer",
    "name": "照烧鸡肉串",
    "category": "韩式日式小食",
    "price": 22,
    "image": "🍢",
    "tag": "串物",
    "rank": 69,
    "stock": 92,
    "monthlySales": 374,
    "description": "鸡肉串刷照烧汁烤香，甜咸适合下酒。",
    "specs": [
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
    ]
  },
  {
    "id": "baked-cheese-mashed-potato",
    "name": "芝士焗土豆泥",
    "category": "焗烤炸物",
    "price": 26,
    "image": "🧀",
    "tag": "拉丝",
    "rank": 70,
    "stock": 80,
    "monthlySales": 360,
    "description": "土豆泥绵密，芝士焗到金黄。",
    "specs": [
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
    ]
  },
  {
    "id": "baked-seafood-rice",
    "name": "海鲜芝士焗饭",
    "category": "焗烤炸物",
    "price": 48,
    "image": "🦐",
    "tag": "焗饭",
    "rank": 71,
    "stock": 42,
    "monthlySales": 346,
    "description": "虾仁、鱿鱼和米饭覆芝士焗烤。",
    "specs": [
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
    ]
  },
  {
    "id": "baked-durian-toast",
    "name": "榴莲芝士焗吐司",
    "category": "焗烤炸物",
    "price": 38,
    "image": "🍞",
    "tag": "甜咸",
    "rank": 72,
    "stock": 46,
    "monthlySales": 330,
    "description": "榴莲果肉和芝士铺满厚吐司，香气很足。",
    "specs": [
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
  },
  {
    "id": "baked-tomato-meat-rice",
    "name": "芝士焗番茄肉酱饭",
    "category": "焗烤炸物",
    "price": 39,
    "image": "🍅",
    "tag": "浓郁",
    "rank": 73,
    "stock": 58,
    "monthlySales": 368,
    "description": "番茄肉酱盖饭再焗芝士，酸甜拉丝。",
    "specs": [
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
    ]
  },
  {
    "id": "baked-garlic-potato-wedges",
    "name": "蒜香黄油薯角",
    "category": "焗烤炸物",
    "price": 22,
    "image": "🍟",
    "tag": "小食",
    "rank": 74,
    "stock": 100,
    "monthlySales": 420,
    "description": "薯角外脆内糯，黄油蒜香浓。",
    "specs": [
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
    ]
  },
  {
    "id": "fried-fries",
    "name": "美式炸薯条",
    "category": "焗烤炸物",
    "price": 18,
    "image": "🍟",
    "tag": "经典",
    "rank": 75,
    "stock": 130,
    "monthlySales": 560,
    "description": "粗薯条炸到金黄，适合配饮品。",
    "specs": [
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
    ]
  },
  {
    "id": "fried-spicy-popcorn-chicken",
    "name": "香辣鸡米花",
    "category": "焗烤炸物",
    "price": 26,
    "image": "🍗",
    "tag": "香辣",
    "rank": 76,
    "stock": 115,
    "monthlySales": 610,
    "description": "鸡米花酥脆多汁，香辣粉很上头。",
    "specs": [
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
    ]
  },
  {
    "id": "fried-golden-shrimp",
    "name": "黄金炸虾",
    "category": "焗烤炸物",
    "price": 36,
    "image": "🍤",
    "tag": "海味",
    "rank": 77,
    "stock": 62,
    "monthlySales": 388,
    "description": "虾肉弹牙，面衣酥脆，可蘸塔塔酱。",
    "specs": [
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
    ]
  },
  {
    "id": "fried-cheese-corn",
    "name": "芝士玉米烙",
    "category": "焗烤炸物",
    "price": 28,
    "image": "🌽",
    "tag": "香甜",
    "rank": 78,
    "stock": 78,
    "monthlySales": 432,
    "description": "玉米粒甜脆，芝士和沙拉酱增加奶香。",
    "specs": [
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
    ]
  },
  {
    "id": "fried-sausage-platter",
    "name": "烤肠拼盘",
    "category": "焗烤炸物",
    "price": 32,
    "image": "🌭",
    "tag": "分享",
    "rank": 79,
    "stock": 66,
    "monthlySales": 340,
    "description": "黑椒肠、芝士肠和脆皮肠组合。",
    "specs": [
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
    ]
  },
  {
    "id": "noodle-beef-rice-noodle",
    "name": "牛肉炒河粉",
    "category": "粉面饭主食",
    "price": 36,
    "image": "🍜",
    "tag": "锅气",
    "rank": 80,
    "stock": 72,
    "monthlySales": 410,
    "description": "河粉宽滑，牛肉嫩，酱油香气足。",
    "specs": [
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
    ]
  },
  {
    "id": "noodle-seafood-udon",
    "name": "海鲜炒乌冬",
    "category": "粉面饭主食",
    "price": 39,
    "image": "🍜",
    "tag": "海味",
    "rank": 81,
    "stock": 58,
    "monthlySales": 336,
    "description": "乌冬弹牙，虾仁鱿鱼和蔬菜同炒。",
    "specs": [
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
    ]
  },
  {
    "id": "noodle-sour-beef-rice-noodle",
    "name": "酸汤肥牛米线",
    "category": "粉面饭主食",
    "price": 42,
    "image": "🍲",
    "tag": "酸辣",
    "rank": 82,
    "stock": 60,
    "monthlySales": 452,
    "description": "酸汤开胃，肥牛铺满，适合想吃热汤的人。",
    "specs": [
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
    ]
  },
  {
    "id": "noodle-shacha-beef",
    "name": "沙茶牛肉拌面",
    "category": "粉面饭主食",
    "price": 34,
    "image": "🥢",
    "tag": "闽南风",
    "rank": 83,
    "stock": 68,
    "monthlySales": 326,
    "description": "沙茶酱浓香，牛肉和拌面很搭。",
    "specs": [
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
    ]
  },
  {
    "id": "noodle-scallion-chicken",
    "name": "葱油鸡丝拌面",
    "category": "粉面饭主食",
    "price": 29,
    "image": "🍜",
    "tag": "清爽",
    "rank": 84,
    "stock": 76,
    "monthlySales": 310,
    "description": "葱油香、鸡丝嫩，适合不想吃辣。",
    "specs": [
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
    ]
  },
  {
    "id": "rice-minced-pork-beans",
    "name": "肉末豆角拌饭",
    "category": "粉面饭主食",
    "price": 28,
    "image": "🍚",
    "tag": "下饭",
    "rank": 85,
    "stock": 88,
    "monthlySales": 390,
    "description": "豆角脆爽，肉末咸香，拌饭很稳。",
    "specs": [
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
    ]
  },
  {
    "id": "noodle-mushroom-chicken-soup",
    "name": "菌菇鸡汤面",
    "category": "粉面饭主食",
    "price": 32,
    "image": "🍄",
    "tag": "暖胃",
    "rank": 86,
    "stock": 66,
    "monthlySales": 284,
    "description": "鸡汤清鲜，菌菇香气自然，汤面温和。",
    "specs": [
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
    ]
  },
  {
    "id": "rice-fuzhou-baiguo",
    "name": "福州炒白粿",
    "category": "粉面饭主食",
    "price": 30,
    "image": "🥢",
    "tag": "本地",
    "rank": 87,
    "stock": 72,
    "monthlySales": 342,
    "description": "白粿软糯，配青菜、肉丝和虾米快炒。",
    "specs": [
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
    ]
  },
  {
    "id": "light-caesar-chicken",
    "name": "凯撒鸡胸沙拉",
    "category": "轻食沙拉",
    "price": 36,
    "image": "🥗",
    "tag": "轻食",
    "rank": 88,
    "stock": 54,
    "monthlySales": 298,
    "description": "鸡胸肉、罗马生菜和面包丁，酱香清爽。",
    "specs": [
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
    ]
  },
  {
    "id": "light-avocado-egg",
    "name": "牛油果鸡蛋沙拉",
    "category": "轻食沙拉",
    "price": 39,
    "image": "🥑",
    "tag": "高蛋白",
    "rank": 89,
    "stock": 42,
    "monthlySales": 248,
    "description": "牛油果、鸡蛋和坚果，口感柔和。",
    "specs": [
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
    ]
  },
  {
    "id": "light-smoked-salmon",
    "name": "烟熏三文鱼沙拉",
    "category": "轻食沙拉",
    "price": 58,
    "image": "🥗",
    "tag": "精致",
    "rank": 90,
    "stock": 28,
    "monthlySales": 188,
    "description": "烟熏三文鱼配酸奶酱，清爽有层次。",
    "specs": [
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
    ]
  },
  {
    "id": "light-quinoa-shrimp",
    "name": "藜麦虾仁碗",
    "category": "轻食沙拉",
    "price": 48,
    "image": "🍤",
    "tag": "饱腹",
    "rank": 91,
    "stock": 36,
    "monthlySales": 232,
    "description": "藜麦、虾仁、玉米和鸡蛋组成高蛋白碗。",
    "specs": [
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
    ]
  },
  {
    "id": "light-chicken-breast-rice",
    "name": "低脂鸡胸饭",
    "category": "轻食沙拉",
    "price": 34,
    "image": "🍗",
    "tag": "健身",
    "rank": 92,
    "stock": 64,
    "monthlySales": 330,
    "description": "鸡胸肉煎香，搭糙米和蔬菜，负担较轻。",
    "specs": [
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
    ]
  },
  {
    "id": "light-purple-yogurt-bowl",
    "name": "紫薯酸奶碗",
    "category": "轻食沙拉",
    "price": 26,
    "image": "🍠",
    "tag": "甜轻食",
    "rank": 93,
    "stock": 52,
    "monthlySales": 260,
    "description": "紫薯泥、酸奶和燕麦，适合下午茶。",
    "specs": [
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
  },
  {
    "id": "night-lamb-skewer",
    "name": "孜然羊肉串",
    "category": "宵夜烧烤",
    "price": 32,
    "image": "🍢",
    "tag": "宵夜",
    "rank": 94,
    "stock": 80,
    "monthlySales": 480,
    "description": "羊肉串撒孜然辣椒，香气很直接。",
    "specs": [
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
    ]
  },
  {
    "id": "night-pork-belly",
    "name": "烤五花肉",
    "category": "宵夜烧烤",
    "price": 36,
    "image": "🥓",
    "tag": "焦香",
    "rank": 95,
    "stock": 72,
    "monthlySales": 420,
    "description": "五花肉边缘烤到微焦，油香配生菜。",
    "specs": [
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
    ]
  },
  {
    "id": "night-grilled-wings",
    "name": "烤鸡翅",
    "category": "宵夜烧烤",
    "price": 28,
    "image": "🍗",
    "tag": "人气",
    "rank": 96,
    "stock": 90,
    "monthlySales": 560,
    "description": "鸡翅烤到表皮紧致，孜然和蜂蜜两种风味。",
    "specs": [
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
    ]
  },
  {
    "id": "night-squid-tentacles",
    "name": "烤鱿鱼须",
    "category": "宵夜烧烤",
    "price": 38,
    "image": "🦑",
    "tag": "海味",
    "rank": 97,
    "stock": 58,
    "monthlySales": 340,
    "description": "鱿鱼须弹脆，刷酱后香辣有嚼劲。",
    "specs": [
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
    ]
  },
  {
    "id": "night-garlic-eggplant",
    "name": "蒜蓉烤茄子",
    "category": "宵夜烧烤",
    "price": 26,
    "image": "🍆",
    "tag": "蒜香",
    "rank": 98,
    "stock": 76,
    "monthlySales": 410,
    "description": "茄子烤到软糯，铺满蒜蓉和葱花。",
    "specs": [
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
    ]
  },
  {
    "id": "night-foil-enoki",
    "name": "锡纸金针菇",
    "category": "宵夜烧烤",
    "price": 22,
    "image": "🍄",
    "tag": "锡纸",
    "rank": 99,
    "stock": 92,
    "monthlySales": 390,
    "description": "金针菇吸满蒜蓉汤汁，热乎下饭。",
    "specs": [
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
    ]
  },
  {
    "id": "night-grilled-cold-noodle",
    "name": "烤冷面",
    "category": "宵夜烧烤",
    "price": 18,
    "image": "🥞",
    "tag": "街头",
    "rank": 100,
    "stock": 120,
    "monthlySales": 620,
    "description": "冷面皮煎香，刷酱加蛋，酸甜微辣。",
    "specs": [
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
    ]
  }
];

module.exports = { shopConfig, tables, menuItems };
