/**
 * 武器データオブジェクト
 * @const
 */
const WEAPONS = {
    "大剣": {
        "バスターソードI": {
            "atk": 384, "ele_type": "無", "element": 0, "awake_ele_type": "無", "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "緑", "slots": 0 
        },
        "バスターソードII": {
            "atk": 432, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0 
        },
        "バスターソードIII": {
            "atk": 480, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0 
        },
        "バスターブレイドI": {
            "atk": 576, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0 
        },
        "サンダーブレイドI": {
            "atk": 528, "ele_type": "雷", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0 
        },
        "ジャグラスブレイドI": {
            "atk": 528, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0 
        },
        "ジャグラスブレイドII": {
            "atk": 528, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0 
        },
        "ブルームブレイドI": {
            "atk": 528, "ele_type": "毒", "element": 240, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "ブルームブレイドII": {
            "atk": 528, "ele_type": "毒", "element": 300, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "ボーンブレイドI": {
            "atk": 480, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "緑", "slots": 0
        },
        "ボーンブレイドII": {
            "atk": 528, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "ボーンブレイドIII": {
            "atk": 576, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "ボーンスラッシャーI": {
            "atk": 672, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "フラムエルへレヴ": {
            "atk": 720, "ele_type": "火", "element": 240, "awake_ele_type": 0, "awake_element": 0, "affi": -30, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "アクアスラッシャーI": {
            "atk": 576, "ele_type": "水", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "アクアスラッシャーII": {
            "atk": 624, "ele_type": "水", "element": 150, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "ドラグロバスターI": {
            "atk": 624, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": -20, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "ドラグロバスターII": {
            "atk": 672, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": -20, "sharp": "緑", "sharp_plus": "緑", "slots": 0
        },
        "アギト": {
            "atk": 480, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        シャインorダーク: {
            atk: 1488, ele_type: "龍", element: 120, awake_ele_type: 0, awake_element: 0, affi: 20, nega_affi: -45, sharp: "白", sharp_plus: "紫", slots: 2
        }
    },
    "太刀": {
        "鉄刀I": {
            "atk": 264, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "鉄刀II": {
            "atk": 297, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "鉄刀III": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "アルリーシャ": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "飛竜刀": {
            "atk": 330, "ele_type": "火", "element": 10, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ボーンショテルI": {
            "atk": 297, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ボーンショテルII": {
            "atk": 330, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "蒼星ノ太刀": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "蒼星ノ太刀【舞龍】": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        }
    },
    "片手剣": {
        "ハンターナイフI": {
            "atk": 112, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "ハンターナイフII": {
            "atk": 128, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ハンターナイフIII": {
            "atk": 140, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "アクアメッサーI": {
            "atk": 140, "ele_type": "水", "element": 80, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "アクアメッサーII": {
            "atk": 168, "ele_type": "水", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ブルームナイフI": {
            "atk": 164, "ele_type": "毒", "element": 210, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ボーンククリI": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ボーンククリII": {
            "atk": 164, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ボーンククリIII": {
            "atk": 168, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ジャグラスエッジ": {
            "atk": 168, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "アイアンバング": {
            "atk": 126, "ele_type": "毒", "element": 200, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        }
    },
    "双剣": {
        "ツインダガーI": {
            "atk": 112, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "シュラムハチェット": {
            "atk": 140, "ele_type": "水", "element": 10, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        ジョーズクリーパー: {
            atk: 168, ele_type: ["水", "氷"], element: [40, 80],
            awake_ele_type: 0, awake_element: 0, affi: 0, sharp: "緑", sharp_plus: "緑", slots: 0
        },
    },
    "ハンマー": {
        "アイアンハンマーI": {
            "atk": 416, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "アイアンハンマーII": {
            "atk": 468, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "アイアンハンマーIII": {
            "atk": 520, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "鬼鉄I": {
            "atk": 572, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "鬼鉄II": {
            "atk": 676, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "鬼鉄III": {
            "atk": 728, "ele_type": "爆", "element": 210, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "大鬼鉄I": {
            "atk": 832, "ele_type": "爆", "element": 240, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "青", "sharp_plus": "?", "slots": 1
        },
        "大鬼鉄II": {
            "atk": 936, "ele_type": "爆", "element": 270, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "青", "sharp_plus": "?", "slots": 1
        },
        "ロックボーンI": {
            "atk": 520, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "バインドロック": {
            "atk": 468, "ele_type": "麻", "element": 250, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        }
    },
    "狩猟笛": {
        "メタルバグパイプI": {
            "atk": 336, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "スパイクホルン": {
            "atk": 378, "ele_type": "眠", "element": 250, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        }
    },
    "ランス": {
        "アイアンランスI": {
            "atk": 184, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "アイアンランスII": {
            "atk": 207, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ボーンランスI": {
            "atk": 207, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "ボーンランスII": {
            "atk": 230, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0 
        },
        "サンダーランス": {
            "atk": 230, "ele_type": "雷", "element": 10, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0 
        }
    },
    "ガンランス": {
        "アイアンガンランスI": {
            "atk": 184, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 1
        },
        "アイアンガンランスII": {
            "atk": 207, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 1
        },
        "アイアンガンランスIII": {
            "atk": 230, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 1
        },
        "スティールガンランスI": {
            "atk": 253, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 2
        },
        "スティールガンランスII": {
            "atk": 299, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 2
        },
        "スティールガンランスIII": {
            "atk": 322, "ele_type": "無", "element": 0, "awake_ele_type": "爆", "awake_element": 210, "affi": 0, "sharp": "青", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 2
        },
        "クロムガンランスI": {
            "atk": 368, "ele_type": "無", "element": 0, "awake_ele_type": "爆", "awake_element": 240, "affi": 0, "sharp": "青", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 3
        },
        "クロムガンランスII": {
            "atk": 414, "ele_type": "無", "element": 0, "awake_ele_type": "爆", "awake_element": 270, "affi": 0, "sharp": "青", "sharp_plus": "?", "slots": 0,
            "shell_type": "通常", "shell_lv": 3
        },
        "マッドガンランスI": {
            "atk": 253, "ele_type": "水", "element": 210, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0,
            "shell_type": "拡散", "shell_lv": 1
        },
        "骨銃槍I": {
            "atk": 207, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0, "shell_type": "通常", "shell_lv": 1
        },
        "骨銃槍II": {
            "atk": 230, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0, "shell_type": "通常", "shell_lv": 1
        },
        "骨銃槍III": {
            "atk": 253, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0, 
            "shell_type": "通常", "shell_lv": 1
        },
        "大骨銃槍I": {
            "atk": 276, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0, 
            "shell_type": "放射", "shell_lv": 1
        },
        "大骨銃槍II": {
            "atk": 322, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0, 
            "shell_type": "放射", "shell_lv": 1
        },
        "大骨銃槍III": {
            "atk": 368, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0, 
            "shell_type": "放射", "shell_lv": 1
        },
    },
    "スラッシュアックス": {
        "鉄製試作剣斧": {
            "atk": 280, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0, "phial": "強撃"
        },
        "スティールアックス": {
            "atk": 350, "ele_type": "氷", "element": 10, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0, "phial": "強撃"
        }
    },
    "チャージアックス": {
        "調査団試作盾斧I": {
            "atk": 288, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "黄", "sharp_plus": "?",
            "slots": 0 
        },
        "調査団試作盾斧II": {
            "atk": 324, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "調査団試作盾斧III": {
            "atk": 360, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "精鋭調査団盾斧I": {
            "atk": 396, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "精鋭調査団盾斧II": {
            "atk": 468, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "火竜の盾斧I": {
            "atk": 432, "ele_type": "火", "element": 150, "awake_ele_type": 0, "awake_element": 0, "affi": 10, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "火竜の盾斧II": {
            "atk": 576, "ele_type": "火", "element": 180, "awake_ele_type": 0, "awake_element": 0, "affi": 10, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "泥流の盾斧I": {
            "atk": 396, "ele_type": "水", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "泥流の盾斧II": {
            "atk": 432, "ele_type": "水", "element": 150, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "泥流の盾斧III": {
            "atk": 504, "ele_type": "水", "element": 180, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "氷結の盾斧I": {
            "atk": 504, "ele_type": "氷", "element": 150, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "氷結の盾斧II": {
            "atk": 540, "ele_type": "氷", "element": 180, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", 
            "slots": 2 
        },
        "ディア＝ルテミス": {
            "atk": 468, "ele_type": "毒", "element": 240, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ディア＝ルテミア": {
            "atk": 540, "ele_type": "毒", "element": 270, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "青", "sharp_plus": "?", 
            "slots": 0 
        },
        "ボーンアームズI": {
            "atk": 324, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "黄", "sharp_plus": "?", 
            "slots": 0 
        },
        "ボーンアームズII": {
            "atk": 360, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "黄", "sharp_plus": "?", 
            "slots": 0 
        },
        "ボーンアームズIII": {
            "atk": 396, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ハードボーンアームズI": {
            "atk": 432, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ハードボーンアームズII": {
            "atk": 504, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ハードボーンアームズIII": {
            "atk": 576, "ele_type": "無", "element": 0, "awake_ele_type": "爆", "awake_element": 180, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ストロングアームズI": {
            "atk": 612, "ele_type": "無", "element": 0, "awake_ele_type": "爆", "awake_element": 210, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ブロスウォールI": {
            "atk": 612, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": -30, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ブロスウォールII": {
            "atk": 684, "ele_type": "無", "element": 0, "awake_ele_type": 氷, "awake_element": 90, "affi": -30, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "タイラントブロスI": {
            "atk": 756, "ele_type": "無", "element": 0, "awake_ele_type": 氷, "awake_element": 120, "affi": -30, "phial": "榴弾", "sharp": "青", "sharp_plus": "?", 
            "slots": 0 
        },
        "タイラントブロスI": {
            "atk": 756, "ele_type": "無", "element": 0, "awake_ele_type": 氷, "awake_element": 120, "affi": -30, "phial": "榴弾", "sharp": "青", "sharp_plus": "?", 
            "slots": 0 
        },
        "タイラントブロスII": {
            "atk": 828, "ele_type": "無", "element": 0, "awake_ele_type": 氷, "awake_element": 180, "affi": -30, "phial": "榴弾", "sharp": "青", "sharp_plus": "?", 
            "slots": 0 
        },
        "ジャグラスアームズI": {
            "atk": 396, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ジャグラスアームズII": {
            "atk": 396, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ジャグラスアームズIII": {
            "atk": 468, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "ギルオスアームズI": {
            "atk": 432, "ele_type": "麻", "element": 180, "awake_ele_type": 0, "awake_element": 0, "affi": 15, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        
        "パルサーアームズI": {
            "atk": 396, "ele_type": "雷", "element": 90, "awake_ele_type": 0, "awake_element": 0, "affi": 10, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "パルサーアームズII": {
            "atk": 432, "ele_type": "雷", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 10, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "パルサーアームズIII": {
            "atk": 468, "ele_type": "雷", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 10, "phial": "強属性", "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ガロンアームズI": {
            "atk": 468, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 20, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", "slots": 0 
        },
        "ガロンアームズII": {
            "atk": 504, "ele_type": "無", "element": 0, "awake_ele_type": "火", "awake_element": 120, "affi": 20, "phial": "榴弾", "sharp": "青", "sharp_plus": "?", "slots": 0 
        },
        "竜骨盾斧I": {
            "atk": 360, "ele_type": "龍", "element": 270, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "マグダ・マヌス": {
            "atk": 576, "ele_type": "爆", "element": 180,"awake_ele_type": 0, "awake_element": 0, "affi": -10, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        "黒鋼の盾斧I": {
            "atk": 360, "ele_type": "龍", "element": 120, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "黄", "sharp_plus": "?", 
            "slots": 0 
        },
        "黒鋼の盾斧II": {
            "atk": 396, "ele_type": "龍", "element": 150, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "phial": "榴弾", "sharp": "緑", "sharp_plus": "?", 
            "slots": 0 
        },
        ブーストorフォール: {
            "atk": 1116, "ele_type": "龍", "element": 110, "awake_ele_type": 0, "awake_element": 0, "affi": 10, nega_affi: -35, "phial": "榴弾", "sharp": "白", "sharp_plus": "紫", "slots": 0 
        }
    },
    "操虫棍": {
        "アイアンブレードI": {
            "atk": 248, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "黄", "sharp_plus": "?", "slots": 0
        },
        "アイアンブレードII": {
            "atk": 279, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "ブルームブレードI": {
            "atk": 310, "ele_type": "毒", "element": 240, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "ボーンロッドI": {
            "atk": 279, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "ボーンロッドII": {
            "atk": 310, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "ボーンロッドIII": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "アクアロッドI": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "バルサーロッドI": {
            "atk": 0, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        },
        "フェザーブレード": {
            "atk": 310, "ele_type": "無", "element": 0, "awake_ele_type": 0, "awake_element": 0, "affi": 0, "sharp": "緑", "sharp_plus": "?", "slots": 0
        }
    }
}