/*** 各武器のモーションデータ 未確定要素ばかりなので発売後に見直す */ 
const MOTIONS = {
    /** 大剣 モーション名・モーション値・斬れ味補正・属性補正は仮
     *  {dmg_type: "切断or打撃or弾", vals: [モーション値], 
     *  sharp_up: 斬れ味補正, ele_up: 属性補正} */
    大剣: [
        { name: "[抜刀]縦斬り",
          dmg_type: "切断", vals: [48], sharp_up: 1, ele_up: 1},
        { name: "縦斬り",
          dmg_type: "切断", vals: [48], sharp_up: 1, ele_up: 1},
        { name: "斬り上げ",
          dmg_type: "切断", vals: [38], sharp_up: 1, ele_up: 1},
        { name: "タックル",
          dmg_type: "打撃", vals: [26], sharp_up: 1, ele_up: 1},
        { name: "溜めIIタックル",
          dmg_type: "打撃", vals: [35], sharp_up: 1, ele_up: 1},
        { name: "溜めIIIタックル",
          dmg_type: "打撃", vals: [48], sharp_up: 1, ele_up: 1},
        { name: "なぎ払い",
          dmg_type: "切断", vals: [26], sharp_up: 1, ele_up: 1},
        { name: "飛び込みなぎ払いI",
          dmg_type: "切断", vals: [71], sharp_up: 1, ele_up: 1},
        { name: "飛び込みなぎ払いII",
          dmg_type: "切断", vals: [85], sharp_up: 1, ele_up: 1},
        { name: "飛び込みなぎ払いIII",
          dmg_type: "切断", vals: [110], sharp_up: 1, ele_up: 1},
        { name: "横殴り",
          dmg_type: "打撃", vals: [15], sharp_up: 1, ele_up: 1},
        { name: "溜め斬りI",
          dmg_type: "切断", vals: [48], sharp_up: 1.1, ele_up: 1.2},
        { name: "溜め斬りII/溜めすぎ",
          dmg_type: "切断", vals: [70], sharp_up: 1.2, ele_up: 1.5},
        { name: "溜め斬りIII",
          dmg_type: "切断", vals: [90], sharp_up: 1.3, ele_up: 2},
        { name: "強溜め斬りI",
          dmg_type: "切断", vals: [65], sharp_up: 1, ele_up: 1.8},
        { name: "強溜め斬りII/溜めすぎ",
          dmg_type: "切断", vals: [82], sharp_up: 1.1, ele_up: 2.25},
        { name: "強溜め斬りIII",
          dmg_type: "切断", vals: [96], sharp_up: 1.3, ele_up: 3},
        { name: "強なぎ払いI",
          dmg_type: "切断", vals: [60], sharp_up: 1, ele_up: 1},
        { name: "強なぎ払いII/溜めすぎ",
          dmg_type: "切断", vals: [65], sharp_up: 1, ele_up: 1},
        { name: "強なぎ払いIII",
          dmg_type: "切断", vals: [79], sharp_up: 1, ele_up: 1},
        { name: "真・溜め斬りI",
          dmg_type: "切断", vals: [20, 182], sharp_up: 1, ele_up: 1},
        { name: "真・溜め斬りII/溜めすぎ",
          dmg_type: "切断", vals: [20, 182], sharp_up: 1, ele_up: 1},
        { name: "真・溜め斬りIII",
          dmg_type: "切断", vals: [21, 210], sharp_up: 1, ele_up: 1},
        { name: "ジャンプ斬り/溜めI",
          dmg_type: "切断", vals: [69], sharp_up: 1, ele_up: 1},
        { name: "ジャンプ溜め斬りII",
          dmg_type: "切断", vals: [85], sharp_up: 1, ele_up: 1},
        { name: "ジャンプ溜め斬りIII",
          dmg_type: "切断", vals: [104], sharp_up: 1, ele_up: 1},
        { name: "溜め斬り上げI",
          dmg_type: "切断", vals: [48], sharp_up: 1, ele_up: 1},
        { name: "溜め斬り上げII",
          dmg_type: "切断", vals: [73], sharp_up: 1, ele_up: 1},
        { name: "溜め斬り上げIII",
          dmg_type: "切断", vals: [100], sharp_up: 1, ele_up: 1},
        { name: "落下突きI",
          dmg_type: "切断", vals: [14, 14, 14], sharp_up: 1, ele_up: 1},
        { name: "落下突きII",
          dmg_type: "切断", vals: [21, 21, 21], sharp_up: 1, ele_up: 1},
        { name: "落下突きIII",
          dmg_type: "切断", vals: [26, 26, 26], sharp_up: 1, ele_up: 1}
	],
	太刀: [
		{ name: "[抜刀]踏み込み斬り", dmg_type: "切断", vals: [26]},
		{ name: "踏み込み斬り", dmg_type: "切断", vals: [26]},
		{ name: "縦斬り", dmg_type: "切断", vals: [23]},
		{ name: "突き", dmg_type: "切断", vals: [14]},
		{ name: "斬り上げ", dmg_type: "切断", vals: [18]},
		{ name: "斬り下がり/左右移動斬り", dmg_type: "切断", vals: [24]},
		{ name: "気刃斬り1（錬気不足）", dmg_type: "切断", vals: [16]},
		{ name: "[抜刀]気刃斬り1", dmg_type: "切断", vals: [28]},
		{ name: "気刃斬り2", dmg_type: "切断", vals: [30]},
		{ name: "気刃斬り3", dmg_type: "切断", vals: [12, 14, 34]},
		{ name: "気刃大回転斬り", dmg_type: "切断", vals: [42]},
		{ name: "気刃踏み込み斬り(錬気不足)", dmg_type: "切断", vals: [18]},
		{ name: "気刃踏み込み斬り", dmg_type: "切断", vals: [30]},
		{ name: "見切り斬り", dmg_type: "切断", vals: [27]},
		{ name: "気刃突き", dmg_type: "切断", vals: [27]},
		{ name: "気刃兜割(白)", dmg_type: "切断",
		  vals: [11, 11, 11, 11, 11, 10, 10]},
		{ name: "気刃兜割(黄)", dmg_type: "切断", 
		  vals: [18, 18, 18, 16, 16, 16, 16]},
		{ name: "気刃兜割(赤)", dmg_type: "切断",
		  vals: [30, 30, 30, 30, 28, 28, 28]},
		{ name: "ジャンプ斬り", dmg_type: "切断", vals: [26]},
		{ name: "ジャンプ気刃斬り", dmg_type: "切断", vals: [30]},
		{ name: "ジャンプ気刃2連斬り", dmg_type: "切断", vals: [12, 36]},
		{ name: "ジャンプ斬り上げ", dmg_type: "切断", vals: [25]},
		{ name: "空中気刃斬り", dmg_type: "切断", vals: [51]}
	],
	片手剣: [
		{ name: "【抜刀】突進斬り", dmg_type: "切断", vals: [18] },
		{ name: "斬り上げ", dmg_type: "切断", vals: [14] },
		{ name: "斬り下ろし", dmg_type: "切断", vals: [14] },
		{ name: "横斬り", dmg_type: "切断", vals: [13] },
		// 気絶値15 減気値15
		{ name: "剣盾コンボ盾", dmg_type: "打撃", vals: [10] },
		{ name: "剣盾コンボ剣", dmg_type: "切断", vals: [20] },
		{ name: "水平斬り", dmg_type: "切断", vals: [21] },
		{ name: "斬り返し", dmg_type: "切断", vals: [19] },
		{ name: "回転斬り", dmg_type: "切断", vals: [25] },
		{ name: "盾攻撃", dmg_type: "打撃", vals: [6] },
		{ name: "バックナックル", dmg_type: "打撃", vals: [16] },
		{ name: "ハードバッシュ", dmg_type: "打撃", vals: [31] },
		{ name: "ガード攻撃", dmg_type: "切断", vals: [14] },
		// 気絶値15 減気値25
		{ name: "溜め斬り盾", dmg_type: "打撃", vals: [20] }, 
		{ name: "溜め斬り剣", dmg_type: "切断", vals: [37] },
		{ name: "駈け上がり斬り", dmg_type: "切断", vals: [34] },
		{ name: "ジャンプ斬り", dmg_type: "切断", vals: [20] },
		{ name: "フォールバッシュ1", dmg_type: "打撃", vals: [44] }, // ?
		{ name: "フォールバッシュ2", dmg_type: "打撃", vals: [39] }, // ?
		{ name: "旋回斬り", dmg_type: "切断", vals: [17] },
		{ name: "ジャンプ突進斬り", dmg_type: "切断", vals: [20] },
		{ name: "落下突き", dmg_type: "切断", vals: [15] }, // ?
	],
	/** 双剣 
	 * { name: モーション名, dmg_type: ダメージタイプ, 
	 * vals:[{val: モーション値, hits: ヒット数, duals: 両手攻撃属性補正}],
	 * demon_flag: 鬼人化フラグ }
	 * 鬼人化フラグ: 0: 通常状態のみ, 1: 鬼人化でも使える, 2: 鬼人化専用
	 * 両手攻撃属性補正: 通常:1, 両手:0.7
	 * 両手攻撃の属性補正はモーション全体にかかるのではなく、
	 * 両手攻撃のヒット時のダメージ計算にかかる */
	双剣: [
		{ name: "[抜刀]斬り払い", dmg_type: "切断", 
		  vals: [{val: 7, hits: 4, duals: 0.7}],
		  demon_flag: 1 },
		{ name:"斬り上げ", dmg_type: "切断",
		  vals: [{val: 18, hits: 1, duals: 1}],
		  demon_flag: 1 }, // 20
		{ name:"二段斬り", dmg_type: "切断",
		  vals: [{val: 8, hits: 1, duals: 1},
				{val: 12, hits: 1, duals: 1}],
		  demon_flag: 0 }, // 20 
		{ name:"二段斬り返し", dmg_type: "切断",
		  vals: [{val: 10, hits: 1, duals: 1},
				{val: 10, hits: 1, duals: 1}],
		  demon_flag: 0 }, // 20 
		{ name:"斬り返し", dmg_type: "切断",
		  vals: [{val: 7, hits: 1, duals: 1},
				{val: 10, hits: 1, duals: 1}], 
		  demon_flag: 0 }, // 17
		{ name:"車輪斬り", dmg_type: "切断",
		  vals: [{val: 10, hits: 1, duals: 1},
				{val: 12, hits: 2, duals: 0.7}],
		  demon_flag: 1 }, // 34 37
		{ name:"六連斬り", dmg_type: "切断",
		  vals: [{val: 4, hits: 2, duals: 1},
				{val: 8, hits: 2, duals: 1},
				{val: 11, hits: 2, duals: 0.7}],
		  demon_flag: 2 }, // 46 50 鬼人化専用
		{ name:"右二連斬り", dmg_type: "切断", 
		  vals: [{val: 7, hits: 1, duals: 1},
				{val: 10, hits: 1, duals: 1}],
		  demon_flag: 0 }, // 17
		{ name:"左二連斬り", dmg_type: "切断",
		  vals: [{val: 9, hits: 1, duals: 1},
				{val: 12, hits: 1, duals: 1}],
		  demon_flag: 0 }, // 21
		{ name:"回転斬りα", dmg_type: "切断",
		  vals: [{val: 16, hits: 1, duals: 1},
					{val: 6, hits: 1, duals: 1},
					{val: 8, hits: 1, duals: 1}],
		  demon_flag: 1 }, // 30 33
		{ name:"回転斬りβ", dmg_type: "切断",
		  vals: [{val: 18, hits: 1, duals: 1},
				{val: 6, hits: 1, duals: 1},
				{val: 10, hits: 1, duals: 1}],
		  demon_flag: 1 }, // 34 37
		{ name: "鬼人突進連斬", dmg_type: "切断",
		  vals: [{val: 7, hits: 4, duals: 1},
				{val: 9, hits: 2, duals: 0.7}],
		  demon_flag: 1 }, // 46 52
		{ name:"鬼人連斬", dmg_type: "切断", 
		  vals: [{val: 8, hits: 2, duals: 0.7},
				{val: 8, hits: 2, duals: 1},
				{val: 6, hits: 2, duals: 1},
				{val: 20, hits: 2, duals: 0.7}],
		  demon_flag: 0 }, // 72 
		{ name:"乱舞", dmg_type: "切断",
		  vals: [{val: 29, hits: 1, duals: 1},
				{val: 4, hits: 8, duals: 1},
				{val: 18, hits: 2, duals: 0.7}],
		  demon_flag: 2}, 
		{ name:"ジャンプ二連斬り", dmg_type: "切断",
		  vals: [{val: 10, hits: 1, duals: 1},
				{val: 13, hits: 1, duals: 1}],
		  demon_flag: 1 }, // 23 25
		{ name:"空中回転乱舞", dmg_type: "切断",
		  vals: [{val: 12, hits: 2, duals: 1},
				{val: 15, hits: 2, duals: 1}],
		  demon_flag: 1 }, // 54 60
		{ name:"回転乱舞フィニッシュ", dmg_type: "切断",
		  vals: [{val: 23, hits: 2, duals: 1}],
		  demon_flag: 1 } // 46 52
	],
	/** ハンマー 
	 *  { name: モーション名, dmg_type: 攻撃タイプ, vals: [モーション値]}} */
	ハンマー: [
		{ name: "[抜刀]振り回し", dmg_type: "打撃", vals: [20] },
		{ name: "返し振り", dmg_type: "打撃", vals: [16] },
		{ name: "横振り", dmg_type: "打撃", vals: [15] },
		{ name: "縦振り1", dmg_type: "打撃", vals: [37] },
		{ name: "縦振り2", dmg_type: "打撃", vals: [22] },
		{ name: "アッパー", dmg_type: "打撃", vals: [90] },
		{ name: "叩きつけ1", dmg_type: "打撃", vals: [28] },
		{ name: "叩きつけ2", dmg_type: "打撃", vals: [32] },
		{ name: "叩きつけ3", dmg_type: "打撃", vals: [45] },
		{ name: "叩きつけ4", dmg_type: "打撃", vals: [65] },
		{ name: "叩きつけフィニッシュ", dmg_type: "打撃",
		  vals: [28, 28, 100] },
		{ name: "溜め1", dmg_type: "打撃", vals: [25] },
		{ name: "溜め1返し振り", dmg_type: "打撃", vals: [20] },
		{ name: "溜め2", dmg_type: "打撃", vals: [40] },
		{ name: "溜め3", dmg_type: "打撃", vals: [15, 76] },
		// 20+10*n nはヒット数、最大6
		{ name: "回転攻撃1撃目", dmg_type: "打撃", vals: [20] },
		{ name: "回転攻撃2撃目以降5ヒット", dmg_type: "打撃", 
		vals: [10, 10, 10, 10, 10] },
		{ name: "ぶんまわし", dmg_type: "打撃", vals: [60] },
		{ name: "強溜め返し振り", dmg_type: "打撃", vals: [58] },
		{ name: "強溜め2", dmg_type: "打撃", vals: [48] },
		{ name: "強溜め叩きつけ", dmg_type: "打撃", vals: [16, 16, 91] },
		{ name: "ジャンプ叩きつけ", dmg_type: "打撃", vals: [36] },
		{ name: "ジャンプ溜め攻撃1", dmg_type: "打撃", vals: [65] },
		{ name: "ジャンプ溜め攻撃2", dmg_type: "打撃", vals: [70] },
		{ name: "ジャンプ溜め攻撃3", dmg_type: "打撃", vals: [80] },
		// ヒット数不明
		{ name: "空中回転攻撃", dmg_type: "打撃", vals: [30, 100] }, 
	],
	/** 狩猟笛 
	 * { name: モーション名, dmg_type: 攻撃タイプ, vals: [モーション値]}} */
	狩猟笛: [
		{ name: "[抜刀]前方叩きつけ", dmg_type: "打撃", vals: [33] },
		{ name: "左ぶん回し", dmg_type: "打撃", vals: [22] },
		{ name: "右ぶん回し", dmg_type: "打撃", vals: [26] },
		{ name: "2連右ぶん回し", dmg_type: "打撃", vals: [15, 22] },
		{ name: "スタンプ", dmg_type: "打撃", vals: [15, 40] },
		{ name: "ツカ攻撃", dmg_type: "切断", vals: [10] }, // 切断
		{ name: "演奏攻撃1/5", dmg_type: "打撃", vals: [31, 28] },
		{ name: "演奏攻撃2/3/4", dmg_type: "打撃", vals: [30, 28] },
		{ name: "連続演奏攻撃(白音符)", dmg_type: "打撃", vals: [35, 28] },
		{ name: "連続演奏攻撃1", dmg_type: "打撃", 
		  vals: [35, 28, 35, 28] },
		{ name: "連続演奏攻撃2", dmg_type: "打撃", 
		  vals: [35, 28, 29, 31, 28] },
		{ name: "連続演奏攻撃3", dmg_type: "打撃", 
		  vals: [35, 28, 35, 28, 31, 28] },
		{ name: "空中演奏", dmg_type: "打撃", vals: [15] },
		{ name: "[抜刀]ジャンプ叩きつけ", dmg_type: "打撃", vals: [19] },
		{ name: "ジャンプ強叩きつけ", dmg_type: "打撃", vals: [56] },
	],
	/** ランス
 	 **  { name: モーション名, dmg_type: 攻撃属性, vals: モーション値配列}*/
	ランス: [
		{ name:"[抜刀]武器出し攻撃", dmg_type: "突き", vals: [23] },
		{ name:"中段突き1&2", dmg_type: "突き", vals: [20] },
		{ name:"中段突き3", dmg_type: "突き", vals: [27] },
		{ name:"上段突き1&2", dmg_type: "突き", vals: [22] },
		{ name:"上段突き3", dmg_type: "突き", vals: [27] },
		{ name:"なぎ払い", dmg_type: "突き", vals: [20] },
		{ name:"突進(*n回)", dmg_type: "突き", vals: [11] },
		{ name:"加速突進(*n回)", dmg_type: "突き", vals: [13] },
		{ name:"フィニッシュ突き", dmg_type: "突き", vals: [50] },
		{ name:"フィニッシュ二段突き", dmg_type: "突き", vals: [26, 53] },
		{ name:"振り向き攻撃", dmg_type: "突き", vals: [50] },
		{ name:"加速振り向き攻撃", dmg_type: "突き", vals: [54] },
		{ name:"突進ジャンプ突き(*n回)", dmg_type: "突き", vals: [25] },
		{ name:"フィニッシュ突き(空中)", dmg_type: "突き", vals: [30] },
		{ name:"加速突進ジャンプ突き(*n回)", dmg_type: "突き", vals: [26] },
		{ name:"加速フィニッシュ突き(空中)", dmg_type: "突き", vals: [26] },
		{ name:"キャンセル突き", dmg_type: "突き", vals: [22] },
		{ name:"カウンター突き", dmg_type: "突き", vals: [50] },
		{ name:"[抜刀]ジャンプ突き", dmg_type: "突き", vals: [30] },
		{ name:"ジャンプ突き", dmg_type: "突き", vals: [30] },
		{ name:"ガード突き", dmg_type: "突き", vals: [20] },
		// 気絶値 27, 減気値27
		{ name:"盾攻撃", dmg_type: "打撃", vals: [14] },
		{ name:"飛び込み突き", dmg_type: "打撃", vals: [9, 9, 9] }
	],
	/** ガンランス */
	ガンランス: [
		{ name: "[抜刀]踏み込み突き上げ", dmg_type: "切断", vals: [32] },
		{ name: "踏み込み突き上げ", dmg_type: "切断", vals: [32] },
		{ name: "砲撃派生突き上げ", dmg_type: "切断", vals: [30] },
		{ name: "上方突き", dmg_type: "切断", vals: [18] },
		{ name: "水平突き", dmg_type: "切断", vals: [24] },
		{ name: "斬り上げ", dmg_type: "切断", vals: [28] },
		{ name: "叩きつけ", dmg_type: "切断", vals: [40] },
		{ name: "なぎ払い", dmg_type: "切断", vals: [68] },
		{ name: "竜杭砲", dmg_type: "切断", vals: [24, 4, 8, 54] }, // ?
		{ name: "ジャンプ突き", dmg_type: "切断", vals: [25] },
		{ name: "ジャンプ叩きつけ", dmg_type: "切断", vals: [44] },
		{ name: "ジャンプ斬り上げ", dmg_type: "切断", vals: [44] },
		{ name: "砲撃", dmg_type: "砲撃", hits: 1 },
		{ name: "溜め砲撃", dmg_type: "砲撃", hits: 1 },
		{ name: "フルバースト*6", dmg_type: "砲撃", hits: 6 },
		// { name: "空中フルバースト*6", dmg_type: "砲撃", hits: 6 }, ?
		{ name: "竜撃砲", dmg_type: "砲撃", hits: 4 }
	],
	/** 操虫棍 Insect Glaive
	 ** { name: モーション名, dmg_type: ダメージタイプ, vals: [モーション値], red: 赤エキスフラグ }
	 ** 赤エキスフラグ: 通常だけ: 0, どちらも: 1, 赤だけ: 2*/
	操虫棍: [
		// 通常のみ
		{ name: "突き", dmg_type: "切断", vals: [15], red: 0 },
		{ name: "連続斬り上げ", dmg_type: "切断",
		  vals: [26, 20], red: 0 },
		{ name: "けさ斬り", dmg_type: "切断", vals: [24], red: 0 },
		{ name: "二段斬り", dmg_type: "切断", vals: [18, 24], red: 0 },
		{ name: "なぎ払い", dmg_type: "切断", vals: [36], red: 0 },
		// 赤エキス時は飛燕斬り
		{ name: "叩きつけ", dmg_type: "切断", vals: [30], red: 0 },
		{ name: "ジャンプ斬り", dmg_type: "切断", vals: [24], red: 0 },
		{ name: "ジャンプ突進斬り", dmg_type: "切断", vals: [29], red: 0 },

		// 変化なし
		{ name: "[抜刀]飛び込み斬り", dmg_type: "切断", 
		  vals: [28], red: 1 },
		{ name: "回転斬り", dmg_type: "切断", vals: [20], red: 1 },
		{ name: "印当て", dmg_type: "切断", vals: [12], red: 1 },
		{ name: "猟虫", dmg_type: "切断", vals: [45], red: 1 },
		// 属性補正1.5倍
		{ name: "虫回転攻撃", dmg_type: "切断", vals: [80], red: 1 },

		// 赤のみ
		{ name: "突き(赤)", dmg_type: "切断", vals: [18, 12], red: 2 },
		{ name: "連続斬り上げ(赤)", dmg_type: "切断", 
		  vals: [28, 16, 18], red: 2 },
		{ name: "けさ斬り(赤)", dmg_type: "切断", 
		  vals: [16, 26], red: 2 },
		{ name: "二段斬り(赤)", dmg_type: "切断", 
		  vals: [16, 14, 28], red: 2 },
		{ name: "なぎ払い(赤)", dmg_type: "切断", 
		  vals: [18, 30], red: 2 },
		{ name: "飛燕斬り(赤)", dmg_type: "切断", vals: [24, 38], red: 2 },
		{ name: "なぎ払い斬り上げ派生時(赤)", dmg_type: "切断", 
		  vals: [18, 30, 28], red: 2 }, // ない？
		{ name: "ジャンプ斬り(赤)(*n回)", dmg_type: "切断", 
		  vals: [9], red: 2 },
		{ name: "ジャンプ突進斬り(赤)(*n回)", dmg_type: "切断", 
		  vals: [3], red: 2 },
		{ name: "ジャンプ突進斬りフィニッシュ(赤)", dmg_type: "切断", 
		  vals: [31], red: 2 },
	],
	/** スラッシュアックス SA Switch Axe
	 *  { name: モーション名, dmg_type: 攻撃属性, vals: モーション値配列 } */
	スラッシュアックス: [
		{ name: "斧:[抜刀]横斬り", dmg_type: "切断", vals: [23] },
		{ name: "斧:斬り上げ", dmg_type: "切断", vals: [28] },
		{ name: "斧:縦斬り", dmg_type: "切断", vals: [40] },
		// 振り回しダメージはダメージ*n回
		{ name: "斧:振りまわし(*n回)", dmg_type: "切断", vals: [24] },
		{ name: "斧:なぎ払い変形斬り", dmg_type: "切断", 
		  vals: [23, 71, 36] },
		{ name: "斧:突進斬り", dmg_type: "切断", vals: [19] },
		{ name: "斧:斬り下がり", dmg_type: "切断", vals: [24] },
		{ name: "斧:変形斬り", dmg_type: "切断", vals: [30] },
		{ name: "斧:ジャンプ斬り", dmg_type: "切断", vals: [43] },
		{ name: "斧:ジャンプ変形斬り", dmg_type: "切断", vals: [43] },
		{ name: "斧:ジャンプなぎ払い", dmg_type: "切断", vals: [76] },
		{ name: "剣:[抜刀]縦斬り", dmg_type: "切断", vals: [30] },
		{ name: "剣:右斬り上げ", dmg_type: "切断", vals: [26] },
		{ name: "剣:左斬り上げ", dmg_type: "切断", vals: [26] },
		{ name: "剣:二連斬り", dmg_type: "切断", vals: [28, 36] },
		{ name: "剣:飛天連撃", dmg_type: "切断", vals: [29, 39] },
		{ name: "剣:変形斬り下がり", dmg_type: "切断", vals: [48] },
		{ name: "剣:属性解放突き", dmg_type: "切断", vals: [28] },
		{ name: "剣:属性解放継続(*1~6)", dmg_type: "切断", vals: [13] },
		{ name: "剣:属性解放任意フィニッシュ", dmg_type: "切断", 
		  vals: [50] },
		{ name: "剣:属性解放フィニッシュ", dmg_type: "切断", vals: [80] },
		{ name: "剣:張り付き属性解放突き", dmg_type: "切断", vals: [80] },
		{ name: "剣:ジャンプ斬り", dmg_type: "切断", vals: [43] },
		{ name: "剣:ジャンプ斬り上げ", dmg_type: "切断", vals: [41] },
		{ name: "剣:ジャンプ変形斬り", dmg_type: "切断", vals: [43] },
		{ name: "剣:ジャンプ属性解放突き", dmg_type: "切断", vals: [28] },
	],
	/** チャージアックス 全て切断属性
	 ** {name: モーション名, dmg_type: 攻撃タイプ, vals: [モーション値],
	 *  imp_phial: 榴弾爆発補正, 3: 強属性爆発補正, expls: 爆発回数 }
	 ** 属性強化で変化するモーションかどうかのフラグを入れてもいいかも。高圧斬り後は	*  剣攻撃にビン効果付与 */
	チャージアックス: [
		{ name: "剣:[抜刀]突進斬り", dmg_type: "切断", vals: [22], 
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "剣:牽制斬り", dmg_type: "切断", vals: [14], imp_phial: 0,
		  ele_phial: 0, expls: 0 },
		{ name: "剣:斬り返し", dmg_type: "切断", vals: [17], imp_phial: 0,	
		  ele_phial: 0, expls: 0 },
		{ name: "剣:溜め斬り上げ", dmg_type: "切断", vals: [16], 
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "剣:溜め２連斬り", dmg_type: "切断", vals: [30, 20],     
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "剣:回転斬り/変形斬り", dmg_type: "切断", vals: [30], 
		  imp_phial: 0,  ele_phial: 0, expls: 0 },
		{ name: "剣:移動斬り", dmg_type: "切断", vals: [25], imp_phial: 0,
		  ele_phial: 0, expls: 0 },
		{ name: "剣:チャージ斬り返し", dmg_type: "切断", vals: [17],   
		  imp_phial: 0.02, ele_phial: 2.5, expls: 1 },
		{ name: "剣:盾突き",dmg_type: "切断", vals: [8, 12], 
		  imp_phial: 0.05, ele_phial: 2.5, expls: 1 },
		{ name: "剣:高圧属性斬り",dmg_type: "切断", vals: [75], 
		  imp_phial: 0.05, ele_phial: 2.5, expls: 1 },
		{ name: "剣:ジャンプ斬り", dmg_type: "切断", vals: [22],   
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "剣:ジャンプ変形斬り", dmg_type: "切断", vals: [21],   
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "剣:ジャンプ斬り上げ", dmg_type: "切断", vals: [46],   
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "剣:GP爆発", dmg_type: "切断", vals: [], imp_phial: 0.05,
		  ele_phial: 2.5, expls: 1 },
		{ name: "斧:突進叩きつけ", dmg_type: "切断", vals: [47],  
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "斧:斬り上げ", dmg_type: "切断", vals: [40], imp_phial: 0,
		  ele_phial: 0, expls: 0 },
		{ name: "斧:縦斬り", dmg_type: "切断", vals: [40], imp_phial: 0, 
		  ele_phial: 0, expls: 0 },
		{ name: "斧:横斬り", dmg_type: "切断", vals: [20], imp_phial: 0, 
		  ele_phial: 0, expls: 0 },
		{ name: "斧:属性解放斬りI:ビン有", dmg_type: "切断", vals: [26],  
		  imp_phial: 0.05, ele_phial: 3.0, expls: 1},
		{ name: "斧:属性解放斬りII:ビン有", dmg_type: "切断", 
		  vals: [18, 80], imp_phial: 0.05, ele_phial: 3.0, expls: 2},
		{ name: "斧:高出力属性解放斬り:ビン有", dmg_type: "切断", vals: [90],
		  imp_phial: 0.1, ele_phial: 4.5, expls: 3},
		// あえて属性強化前のモーション値をかくと [21, 83, 84] 榴弾ビン倍率は0.33かもしれない
		{ name: "斧:超高出力属性解放斬り:ビン6", dmg_type: "切断", 
		  vals: [25, 99, 100], imp_phial: 0.335, ele_phial: 13.5,
		  expls: 6 },
		{ name: "斧:ジャンプ叩きつけ", dmg_type: "切断", vals: [47], 
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "斧:ジャンプ変形斬り", dmg_type: "切断", vals: [45], 
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "斧:属性解放斬りI:ビン無", dmg_type: "切断", vals: [14],   
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "斧:属性解放斬りII:ビン無", dmg_type: "切断", 
		  vals: [14, 47], imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "斧:高出力属性解放斬り:ビン無", dmg_type: "切断", vals: [40],
		  imp_phial: 0, ele_phial: 0, expls: 0 },
		{ name: "斧:超高出力属性解放斬り:ビン無", dmg_type: "切断", 
		  vals: [17, 90], imp_phial: 0, ele_phial: 0, expls: 0 }
	]
}