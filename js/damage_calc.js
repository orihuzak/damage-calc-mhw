/** ダメージ計算のjs */
/*** 用語
 * 表示攻撃力：ゲーム中に表示される攻撃力 atk
 * 武器係数：武器毎に設定されている係数 atk correction
 * 基礎攻撃力：表示攻撃力を武器係数で割った数値 true attack value
 * 加算:sum
 * 乗算:mul
 * 積: product
 * 計算:calc calculation
 * 倍率:magn magnification
 * 割合:rate 
 * 係数:coef coefficient
 * 会心値:affi affinity
 * 期待値:exp_val expected
 * 補正値: cor correction
 ***/

/*** 計算式
 * 基礎攻撃力（補正）= ((表示攻撃力 / 武器係数) + (攻撃UPスキル + 護符・爪 + 食事・鬼人薬 + 種・丸薬 + 太刀錬気)) * 笛演奏効果 * 火事場力
 * 物理ダメージ = 基礎攻撃力 * (モーション値 / 100) * 会心期待値 * 斬れ味 * (肉質 / 100)
 * 属性ダメージ = 属性倍率 * 斬れ味 * (耐属性 / 100) * 属性会心期待値 (* ヒット数) 
 * 会心期待値 = (1.0 + (会心倍率 - 1.0) * 会心率 / 100.0)
 * 
 * 砲撃ダメージの計算 
 * 切捨(切捨(切捨(砲撃基本ダメ * 砲撃術) * 猫の砲撃術) * 砲撃タイプ倍率) + 砲撃の火ダメ
 * （未確定）砲撃の火ダメージ: 切捨(砲撃火ダメ * (耐火属性 / 100)) * ヒット回数
 * 各乗算で端数切り捨て
 * 
 * 合計ダメージ = 端数切捨(物理ダメージ + 属性ダメージ)
 * 最終ダメージ = 端数切捨(合計ダメージ * 防御率)
***/

/**********************************************************************/
/*** Constants ********************************************************/
/**********************************************************************/

//武器係数 attack correction
const ATK_COR = {
    "大剣": 4.8,
    "太刀": 3.3,
    "片手剣": 1.4,
    "双剣": 1.4,
    "ハンマー": 5.2,
    "狩猟笛": 5.2,
    "ランス": 2.3,
    "ガンランス": 2.3,
    "スラッシュアックス": 5.4,
    "チャージアックス": 3.6,
    "操虫棍": 3.1,
}

//斬れ味の色と補正値のマップ
//物理補正値
const PHYS_SHARP = {
    赤 : 0.5,
    橙 : 0.75,
    黄 : 1.0,
    緑 : 1.05,
    青 : 1.2,
    白 : 1.32,
    紫 : 1.45
}

// 属性補正値
const ELE_SHARP = {
    赤 : 0.25,
    橙 : 0.5,
    黄 : 0.75,
    緑 : 1.0,
    青 : 1.0625,
    白 : 1.125,
    紫 : 1.2
}

// 会心倍率
const AFFI_MAGN = 1.25

const ELEMENTS = ["火", "水", "雷", "氷", "龍"]
const AILMENTS = ["毒", "麻", "眠", "爆"]

/** weaponのプロパティリスト */
const WEAPON_PROP = ["atk", "ele_type", "element", "affi", "nega_affi", "sharp"]

/** 武器種依存のプロパティリスト */
const WEAPON_TYPE_PROP = {
    ガンランス : ["shell_type", "shell_lv"],
    スラッシュアックス: ["phial"],
    チャージアックス: ["phial"]
}
/** 武器種に依存するhtmlのクラス名辞書 */
const ELEMENTS_DEPEND_WEAPON_TYPE = {
    大剣: [".center_of_blade"],
    太刀: [".center_of_blade", ".spirit_full", ".spirit_color"],
    双剣: [".demon_mode"],
    スラッシュアックス: [".sa_phial"],
    チャージアックス: [".cb_phial", ".boost_mode"],
    ガンランス: [".shell_type", ".shell_lv"],
    操虫棍: [".essences"]
}

// 攻撃力加算スキルのリスト
const ATK_PLUS_SKILLS = ["honing", "atk_up", "felyne_booster", "charms", "atk_food", "atk_group5", "challenger", "punish_draw", "demon_powder"]
const ATK_MUL_SKILLS = ["adrenaline", "survivor", "atk_music"]
const ATK_UP_SKILLS = ATK_PLUS_SKILLS.concat(ATK_MUL_SKILLS)
const SHARP_PLUS_SKILLS = ["atk_group5", "handicraft"]
// 会心率加算スキルのリスト
const AFFI_PLUS_SKILLS = ["expert", "atk_up", "challenger", "affi_music", "antivirus"]
// 属性攻撃力UPスキルのリスト
const ELE_PLUS_SKILLS = ["single_ele_up", "all_ele_up", "ele_music"]
const SHELL_SKILLS = ["artillery", "felyne_bomb"]


/**********************************************************************/
/*** オブジェクト操作関連 ************************************************/
/**********************************************************************/

/** x がArray arr の要素かどうかを調べる */
const HAS_ELEMENT = (x, arr) => (arr.indexOf(x) >= 0) ? true : false

/** objをmapに変換する */
function map_from_obj(obj){
    return Object.keys(obj).reduce(
        (map, key) => map.set(key, obj[key]), new Map())
}

/** objをmapに変換 ecma 2017 */
function obj_to_map(obj){
    return new Map(Object.entries(obj))
}

/** 指定したkeysを参照して、objからvaluesリストをつくって返す
 * 引数: obj
 *      keys */
function values_from_keys(obj, keys){
    let x = []
    keys.forEach(key => { if(key in obj){ x.push(obj[key]) }})
    return x
}

/** keysを参照してobjからvalueを取得し、key:valueの新しいobjを作る */
function new_obj_from_keys(obj, keys){
    let new_obj = {}
    keys.forEach(key => { if(key in obj){ new_obj[key] = obj[key] }})
    return new_obj
}

/** リストの要素が1つならひとつ目の要素をコピーして要素数を2つにする関数 */
function one_ele_to_2_eles(arr){
    let new_arr = arr.slice()
    if(new_arr.length == 1){ new_arr.push(new_arr[0]) }
    return new_arr
}

/** 渡されたobjを補完した新しいobjを返す関数 <-意味がわからない。こんな説明つけるな
 *  keys: motionから取り出すvalのkeyを格納した配列
 *  obj: new_objの元となるobj */
function comp_obj_for_calc(motion, keys, obj){
    let new_obj = obj
    for(let i = 0; i < keys.length; i++){
        if(keys[i] in motion){ new_obj[keys[i]] = motion[keys[i]] }
    }
    return new_obj
}

/** DBからモンスターを値渡しで取得する関数
 ** monster(obj): モンスターオブジェクト 
 ** rage(boolean): 通常/変化状態のフラグ 変化前: false, 変化後: true */
function get_monster_weak_obj(name, rage=false){
    let monster = {},
        b = rage ? 1 : 0
    for(const [p_name, part] of Object.entries(MONSTERS[name])){
        let copy_part = {}
        for(const [type, weaks] of Object.entries(part)){
            // フラグが変化後で肉質変化がある部位
            if(b == 1 && weaks.length == 2){ 
                copy_part[type] = weaks[b]
            }else{
                copy_part[type] = weaks[0]
            }
        }
        monster[p_name] = copy_part
    }
    return monster
}

/** 2つのdictが同じかどうかを調べる
 *  return bool */
function is_same_obj(a, b){
    let bool = false
    if(JSON.stringify(a) == JSON.stringify(b)){ bool = true }
    return bool
}
/** 変数の型がnumberかどうかを確認する */
function is_number(val){
    return (typeof val == "number")
}


/**********************************************************************/
/*** 汎用的な計算関連の関数 **********************************************/
/**********************************************************************/

/** 引数を全て加算して返す */
function sum(){
    let x = 0
    for(let i = 0; i < arguments.length; i++){ x += arguments[i] }
    return x
}

/** Arrayの全要素を加算して返す */
function sum_array(x){
    let y = 0
    for (let i = 0; i < x.length; i++){ y += x[i] }
    return y
}

/** 引数を全て乗算して積を返す */
function mul(){
    let x = 1
    for(let i = 0; i < arguments.length; i++){ x *= arguments[i] }
    return x
}

/** 引数のリストの要素を全て乗算して積を返す */
function mul_array(arr){
    let x = 1
    for(let i = 0; i < arr.length; i++){ x *= arr[i] }
    return x
}

/** 引数のobjのvalueを全て乗算して積を返す */
function mul_obj_values(obj){
    let x = 1
    for(let key in obj){ x *= obj[key] }
    return x
}

/** 全ての引数を乗算し、積の端数を切り捨てて返す */
function mul_n_floor(){
    let x = 1,
        args = Array.from(arguments)
    args.forEach(e => x *= e)
    return Math.floor(x)
}

/** １の位を切り下げ */
function truncate_ones_place(x){ return Math.floor(x/10) * 10 }

/** 少数第y位より下を切り捨て
 **  x: 切り捨てられる値
 **  y: 残す位 (default=1)
 **  x=1.234の場合:
 **  yを指定しなければ少数第一位まで(1.2)になる     
 **  1.23 にしたいときは y=2 */
function truncate_decimal_place(x, y=1){ 
    return Math.floor(x*(10**y)) / (10**y)
}


/**********************************************************************/
/*** 武器補正に使う関数 **************************************************/
/**********************************************************************/

/** 大剣/太刀の中腹ヒット補正値 引数がtrueなら1.05を返し、falseなら1を返す */
const CENTER_OF_BLADE = bool => bool ? 1.05 : 1
/** 太刀の錬気ゲージフル時の斬れ味補正 1.13 : 1 */
const SPIRIT_FULL = bool => bool ? 1.13 : 1
/** 太刀の錬気ゲージ色でのモーション値補正 */
const SP_COLOR = { // 錬気ゲージ色オブジェ
    "白": 1.05,
    "黄": 1.1,
    "赤": 1.3
}
/** 錬気ゲージ色: モーションに乗算（端数切捨）
 ** 白: *1.05
 ** 黄: *1.1
 ** 赤: *1.3 */
const SPIRIT_COLOR = color => color ? SP_COLOR[color] : 1
/** 片手剣の切断モーションにかかる斬れ味補正 引数が"切断"なら1.06, でなければ1 */
const SnS_SHARP_COR = type => type == "切断" ? 1.06 : 1
/** 片手剣の溜め斬りでの属性値補正 引数が"溜め斬り"なら2, でなければ1 */
const SnS_ELE_COR = motion => motion.includes("溜め斬り") ? 2 : 1
/** 双剣の鬼人化状態でのモーション値補正 引数がtrueなら1.15, falseなら1 */
const DEMON_MODE = bool => bool ? 1.15 : 1
/** ランスの突き攻撃の肉質選択における、打撃肉質補正値 */ 
const IMPACT_WEAK_CORRECTION = 0.72
/** ガンランスの砲撃ダメージ
 *  {砲撃タイプ: [[Lv1ダメ, 火ダメ], [Lv2ダメ, 火ダメ], ...]} */
const SHELL_ATK_OBJ = {
    "通常": [[10, 4], [14, 5], [18, 6], [21, 7], [24, 8]],
    "放射": [[15, 9], [21, 11], [28, 14], [32, 16], [36, 18]],
    "拡散": [[20, 6], [30, 8], [40, 10], [44, 11], [48, 12]],
    //最大4ヒット
    "竜撃砲": [[30, 10], [35, 11], [40, 12], [45, 13], [50, 14]]
}
/** 砲撃タイプ毎の各砲撃補正値 obj */
const SHELL_COR = {
    "通常": { "溜め砲撃": 1.2, "フルバースト": 1.1, "竜撃砲": 1 },
    "放射": { "溜め砲撃": 1.2, "フルバースト": 1, "竜撃砲": 1.2 },
    "拡散": { "溜め砲撃": 1.44, "フルバースト": 0.9, "竜撃砲": 1 }
}
/** 引数が"強撃"なら強撃ビンによる補正値1.2を返す。でなければ1を返す */
const POWER_PHIAL_COR = type => type == "強撃" ? 1.2 : 1
/** 引数が"強属性"なら強属性ビンによる補正値1.25を返す。でなければ1を返す */
const ELEMENT_PHIAL_COR = type => type == "強属性" ? 1.25 : 1
/** チャージアックスの属性強化モーション値補正を返す関数 true: 1.1, false: 1 */
function boost_mode(){
    const bool = $(".boost_mode select option:selected").val()
    return bool ? 1.1 : 1
}
/** CB: 属性強化状態でのビンダメージ補正を返す true: 1.3, false: 1.35 */
function boost_phial_atk(type){ return type == "榴弾" ? 1.3 : 1.35 }
/** 操虫棍エキス色のモーション値補正 */
const ESSENCE_COLOR = {
    "なし": 1,
    "赤白": 1.2,
    "赤白橙": 1.25
}


/**********************************************************************/
/*** ダメージ計算に使う関数（共用） ****************************************/
/**********************************************************************/

/** 基礎攻撃力を計算する関数 
 ** atk(num):   表示攻撃力 
 ** type(str):  武器種 */
function calc_true_atk(atk, type){
    return Math.floor(atk / ATK_COR[type])
}

/** 表示攻撃力を計算する関数 結果は端数切捨
 ** true_atk(num): 基礎攻撃力
 ** type(str): 武器種 */
function calc_atk(true_atk, type){ 
    return Math.floor(true_atk * ATK_COR[type])
}

/** weaponから会心率を取得する関数 */
function get_affi(){
    return ("nega_affi" in weapon) ? weapon.affi + weapon.nega_affi
                                    : weapon.affi
}

/** 会心期待値の計算 (1.0 + (会心倍率 - 1.0) * 会心率 / 100.0)
 ** affi: 会心率
 ** magn: 会心倍率 (default=1.25)
 ** magnを指定すれば会心時の倍率を変えられる */
function calc_affi_exp(affi, magn=1.25){
    return (1.0 + (magn - 1.0) * affi / 100)
}

/** ダメージ計算の流れを扱う高階関数 
 ** weapon: weapon obj
 ** motions: 武器ごとのモーションリスト array
 ** monster: monster obj
 ** callbacks: callbackを格納した obj */
function calc_damage_flow(weapon, motions, skill_effect, 
                          monster, callbacks){
    let dmg_obj = {},
        total = 0 // 全ダメージの合計を計算
    motions.forEach( motion => {
        weapon = callbacks.set_vars_for_calc(weapon, motion)
        let w = Object.assign({}, weapon) // weaponをコピー
        // 抜刀会心を適用 <- ここでやるかね
        w.affi = critical_draw(weapon, motion.name, skill_effect)
        let part_dmg_obj = {}
        for(const[part, weaks] of Object.entries(monster.parts)){
            // 肉質と耐属性をコールバック関数で取得 obj
            let weak = callbacks.get_weak(weaks, 
                                          motion.dmg_type,
                                          w.ele_type )
            let dmg = callbacks.calc_dmg(w, motion, weak) // ダメージ計算
            let sum = 0 // 合計ダメージを計算
            for(const val of Object.values(dmg)){ sum += val }
            dmg["合計"] = Math.floor(Math.floor(sum) * monster.def_rate)
            total += dmg["合計"]
            part_dmg_obj[part] = dmg // 部位ごとのダメージを格納
        }
        dmg_obj[motion.name] = part_dmg_obj
    })
    return { dmg: dmg_obj, total: total }
}

/** weaponに何も追加しない場合の関数 */
function set_vars_for_calc(weapon, motion){ return weapon }

/** モンスターの肉質・耐属性を取得する関数
 ** part(obj): モンスターの部位obj
 ** dmg_type(str): モーションのダメージタイプ
 ** ele_type(str): 武器の属性 
 ** 双属性の場合(ele_typeがarray)
 */
function get_weak(part, dmg_type, ele_type){
    let weak = {}
    weak.phys = part[dmg_type] // 肉質
    weak.ele = get_ele_weak(part, ele_type)
    return weak
}

/** [抜刀]を含むモーション名ならweapon.affiに100を加算した結果を返す
 ** weapon(obj): 武器obj
 ** name(str): モーション名 
 ** skill_effect(obj): スキル効果obj
 ** return(num): 会心率 */
function critical_draw(weapon, name, skill_effect){
    let affi = weapon.affi
    if(name.includes("[抜刀]")){
        affi += skill_effect.critical_draw
    }
    return affi > 100 ? 100 : affi
}

/** 耐属性を返す */
function get_ele_weak(part, ele_type){
    if(ele_type instanceof Array){  // ele_typeが配列の場合。つまり、双属性
        let ele_weak = []
        ele_type.forEach( e_type => {
            ele_weak.push(part[e_type])
        })
        return ele_weak
    }else{
        let ele_weak = 0
        if(ELEMENTS.includes(ele_type)){ ele_weak = part[ele_type] }
        return ele_weak // ele_typeがELEMENTSになければ0を返す
    }
}

/** 物理ダメージ計算をして結果を返す関数
 ** motion_val(num): モーション値
 ** p_weak(num): 物理肉質 */
function calc_phys_dmg(weapon, motion_val, p_weak){
    return weapon.true_atk * motion_val / 100 * weapon.phys_sharp 
           * calc_affi_exp(weapon.affi) * p_weak / 100
}
/** 属性ダメージ計算をして結果を返す関数
 ** e_weak(num): 耐属性 */
function calc_ele_dmg(weapon, e_weak){
    return weapon.element / 10 * weapon.ele_sharp
           * calc_affi_exp(weapon.affi, weapon.crit_ele) * e_weak / 100
}

/** モーションごとの物理・属性ダメージを計算して返す関数 */
function calc_dmg(weapon, motion, weak, callback){
    let dmg_obj = {
        物理: 0,
        属性: 0
    }
    motion.vals.forEach( val => {
        let obj = callback(weapon, motion, val, weak)
        dmg_obj["物理"] += obj["物理"]
        dmg_obj["属性"] += obj["属性"]
    })
    return dmg_obj
}

/** 共通のダメージ計算関数 */
function common_calc_dmg(weapon, motion, weak){
    return calc_dmg(weapon, motion, weak,
    (weapon, motion, val, weak) => {
        let dmg = {}
        dmg["物理"] = calc_phys_dmg(weapon, val, weak.phys)
        dmg["属性"] = calc_ele_dmg(weapon, weak.ele)
        return dmg
    })
}

/** その武器の平均ダメージを計算する 
 ** total: その武器の全ダメージの合計
 ** num_of_motions(num): その武器のモーション数
 ** num_of_parts(num): モンスターの部位数 */
function average_dmg(total, num_of_motions, num_of_parts){
    // 平均の計算 全ダメージ / (モーション数 * 部位数)
    return total / (num_of_motions * num_of_parts)
}

/** 計算ボタンが押されたら動く。計算する */
function calc_damage(weapon, skill_effect, monster){
    let callbacks = {}, // dmg_flowに渡すコールバックを格納するobj
        motions = []
    
    // 武器種毎の変数・コールバックを設定
    switch(weapon.type){
        case "大剣": { // weaponに独自の色々を追加する
            // 中腹ヒット倍率を取得し、weapon objに追加
            let cob_flag = 
                Number($(".center_of_blade select option:selected")
                .val())
            weapon.center_of_blade = CENTER_OF_BLADE(cob_flag)
            motions = MOTIONS[weapon.type]
            // 他の武器種が対応したらswitchの外に出す
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = gs_calc_dmg
            break
        }
        case "太刀": {
            let cob_flag = 
                Number($(".center_of_blade select option:selected")
                .val())
            let sp_full_flag = 
                Number($(".spirit_full select option:selected").val())
            let sp_color_flag = 
                $(".spirit_color select option:selected").val()
            weapon.center_of_blade = CENTER_OF_BLADE(cob_flag)
            weapon.spirit_full = SPIRIT_FULL(sp_full_flag)
            weapon.spirit_color = SPIRIT_COLOR(sp_color_flag)
            motions = MOTIONS[weapon.type]
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = ls_calc_dmg
            break
        }
        case "片手剣": {
            motions = MOTIONS[weapon.type]
            /** 斬撃タイプの攻撃は、斬れ味補正 *1.06
             *  溜め斬りは、属性補正 *2 */
            // callbacks
            callbacks.set_vars_for_calc = sns_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = sns_calc_dmg
            break
        }
        case "双剣": {
            motions = MOTIONS[weapon.type]
            // 鬼人化時(非鬼人強化): モーション値*1.15（端数切捨て）
            // 両手攻撃: 属性値*0.7
            // 鬼人化状態:1.15, 通常:1
            let demon_bool = 
                Number($(".demon_mode select option:selected").val())
            weapon.demon = DEMON_MODE(demon_bool)
            // コールバック関数を設定
            callbacks.get_weak = get_weak
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.calc_dmg = db_calc_dmg
            break
        }
        case "ハンマー": {
            motions = MOTIONS[weapon.type]
            // コールバック
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = common_calc_dmg
            break
        }
        case "狩猟笛": {
            motions = MOTIONS[weapon.type]
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = common_calc_dmg
            break
        }
        case "ランス": {
            motions = MOTIONS[weapon.type]
            // コールバック
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = lance_get_weak
            callbacks.calc_dmg = common_calc_dmg
            break
        }    
        case "ガンランス": {
            // 砲撃タイプを取得
            weapon.shell_type = 
                $(".shell_type select option:selected").val()
            // 砲撃レベルを取得
            weapon.shell_lv = 
                Number($(".shell_lv select option:selected").val())
            weapon.shell_atk = 
                SHELL_ATK_OBJ[weapon.shell_type][weapon.shell_lv][0]
            weapon.fire_atk = 
                SHELL_ATK_OBJ[weapon.shell_type][weapon.shell_lv][1]
            motions = add_full_burst(MOTIONS[weapon.type])
            // callbacks
            callbacks.set_vars_for_calc = gl_vars_for_calc
            callbacks.get_weak = gl_get_weak
            callbacks.calc_dmg = gl_calc_dmg
            break
        }
        case "スラッシュアックス": {
            /* 剣モードだけに補正がつく
                * 強撃と強属性ビン以外は未対応 */
            // ビンタイプを取得
            const PHIAL_TYPE = 
                $(".sa_phial select option:selected").text()
            // 強撃(power)ビン: 端数切捨(モーション値*1.2)
            weapon.power_cor = POWER_PHIAL_COR(PHIAL_TYPE)
            // 強属性(element)ビン: 一の位切捨(表示属性値*1.25)
            weapon.ele_cor = ELEMENT_PHIAL_COR(PHIAL_TYPE)
            motions = MOTIONS[weapon.type]
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = sa_calc_dmg
            break
        }
        case "チャージアックス": {
            // ビンタイプ（榴弾or強属性）を取得して、weaponに追加
            /*weapon.phial_type =
                $(".cb_phial select option:selected").val()*/
            // 属性強化倍率を取得して、weaponに追加
            weapon.boost = boost_mode()
            // モーションリストを取得
            motions = get_cb_motions(weapon.boost)
            // コールバックを設定
            callbacks.set_vars_for_calc = cb_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = cb_calc_dmg
            break
        }
        case "操虫棍":
            // 赤エキスフラグによってモーションリストの内容を帰る
            // 赤白エキス モーション値*1.2 
            // 赤白橙エキス モーション値*1.25
            const ESSENCE = $(".essences select option:selected").val()
            // 虫回転攻撃の際の属性補正
            weapon.insect_cor = 1.5
            weapon.essence = ESSENCE_COLOR[ESSENCE]
            motions = ig_get_motion_list(MOTIONS[weapon.type], ESSENCE)
            callbacks.set_vars_for_calc = set_vars_for_calc
            callbacks.get_weak = get_weak
            callbacks.calc_dmg = ig_calc_dmg
            break
    }
    
    // obj_calc_flowを元にダメージ計算
    let dmg_obj = calc_damage_flow(weapon, motions, skill_effect,
                                   monster, callbacks)
    /*console.log(weapon,
                dmg_obj.total,
                motions.length,
                Object.keys(monster.parts).length)*/
    // 平均ダメージの計算
    dmg_obj.average = average_dmg(dmg_obj.total,
                                  motions.length,
                                  Object.keys(monster.parts).length)
    return dmg_obj
}


/** 同種全武器のランキングをする関数
 ** type(str): 武器種
 ** skill_effect(obj): スキル効果辞書
 ** monster(obj): モンスターobj */
function get_average_dmg_list(type, skill_effect, monster){
    let average_list = [] // [[ 武器名: 平均ダメ期待値], ...]
    // 武器種から武器を取得
    for(const name in WEAPONS[type]){
        // weaponを作成し、スキルを反映
        let weapon = set_weapon(type, name, skill_effect)
        let dmg_obj = calc_damage(weapon, skill_effect, monster)
        let average = [ weapon.name, 
                        truncate_decimal_place(dmg_obj.average, 2) ]
        average_list.push(average)
    }
    return average_list
}

/** average_listを降順ソートする関数 */
function sort_in_descending_order(average_list){
    const list_length = average_list.length
    for(let i = 0; i < list_length; i++){ // 配列をループ
        for(let j = i + 1; j < list_length; j++){ // iより後の要素をループ
            if(average_list[i][1] < average_list[j][1]){
                // iより後ろの要素がiより大きければ、入れ替える
                let box = average_list[i]
                average_list[i] = average_list[j]
                average_list[j] = box
            }
        }
    }
    return average_list
}



/**********************************************************************/
/*** 大剣 *************************************************************/
/**********************************************************************/
/** 大剣のダメージ計算 calc_dmgの結果にsharp_upとele_upかけたobjを返す */
function gs_calc_dmg(weapon, motion, weak){
    return calc_dmg(weapon, motion, weak, 
        (weapon, motion, val, weak) => {
            let obj = {}
            obj["物理"] = calc_phys_dmg(weapon, val, weak.phys) 
                         * motion.sharp_up * weapon.center_of_blade
            obj["属性"] = calc_ele_dmg(weapon, weak.ele) * motion.ele_up
            return obj
        }
    )
}


/**********************************************************************/
/*** 太刀 *************************************************************/
/**********************************************************************/

function ls_calc_dmg(weapon, motion, weak){
    return calc_dmg(weapon, motion, weak,
        (weapon, motion, val, weak) => {
            let obj = {}
            obj["物理"] = calc_phys_dmg(weapon,
                Math.floor(val * weapon.spirit_color), weak.phys)
                * weapon.spirit_full * weapon.center_of_blade
            obj["属性"] = calc_ele_dmg(weapon, weak.ele)
            return obj
        }
    )
}


/**********************************************************************/
/*** 片手剣 ************************************************************/
/**********************************************************************/

/** 片手剣の切断攻撃補正と溜め斬りでの属性補正を設定する関数 */
function sns_vars_for_calc(weapon, motion){
    weapon.sharp_cor = SnS_SHARP_COR(motion.dmg_type)
    weapon.ele_cor = SnS_ELE_COR(motion.name)
    return weapon
}

/** 片手剣のダメージ計算をする関数 */
function sns_calc_dmg(weapon, motion, weak){
    return calc_dmg(weapon, motion, weak,
    (weapon, motion, val, weak) => {
        let obj = {}
        obj["物理"] = calc_phys_dmg(weapon, val, weak.phys) 
                      * weapon.sharp_cor
        obj["属性"] = calc_ele_dmg(weapon, weak.ele) * weapon.ele_cor
        return obj
    })
}

/**********************************************************************/
/*** 双剣 *************************************************************/
/**********************************************************************/


/** 双剣のダメージ計算をする関数 */
function db_calc_dmg(weapon, motion, weak){
    // return: { 物理: ダメージ, 属性: ダメージ }
    return calc_dmg(weapon, motion, weak,
    (weapon, motion, obj, weak) => {
        let dmg = {
            物理: 0,
            属性: 0,
        },
            mv = motion.demon_flag == 0 
                 ? obj.val : Math.floor(obj.val * weapon.demon)
        // 物理ダメージ
        dmg["物理"] = calc_phys_dmg(weapon, mv, weak.phys) * obj.hits
        // 属性ダメージ 単属性と双属性で処理を分ける
        if(weapon.ele_type instanceof Array){ 
            for(let i = 0; i < 2; i++){
                dmg["属性"] += 
                    weapon.element[i] / 2 / 10
                    * weapon.ele_sharp
                    * calc_affi_exp(weapon.affi, weapon.crit_ele)
                    * weak.ele[i] / 100 * obj.duals * obj.hits
            }
        }else{
            dmg["属性"] = calc_ele_dmg(weapon, weak.ele)
                         * obj.duals * obj.hits
        }
        return dmg
    })
}


/**********************************************************************/
/*** ランス ************************************************************/
/**********************************************************************/

/** ランス向け肉質を取得する関数。
 *  突き攻撃のときは、打撃*0.72と切断のうち高い方の肉質を採用する
 * */
function lance_get_weak(part, dmg_type, ele_type){
    let weak = {}
    if(dmg_type == "突き"){
        let cut_weak = part["切断"],
            imp_weak = part["打撃"] * IMPACT_WEAK_CORRECTION
            // 切断肉質の方が大きければ切断肉質を格納
        weak.phys = (cut_weak > imp_weak) ? cut_weak : imp_weak
    }else{
        weak.phys = part[dmg_type]
    }
    weak.ele = get_ele_weak(part, ele_type)
    return weak
}

/**********************************************************************/
/*** ガンランス ********************************************************/
/**********************************************************************/

/** GL_LISTのフルバーストをコピーして1-6ヒットになるように追加したリストを返す */
function add_full_burst(arr){
    const MAX_SHELLS = 6
    const NAME = "フルバースト"
    let copy_arr = arr.slice()
    let fb = {}
    let pos = 0
    arr.forEach(m => {
        if(m.name.includes("フルバースト")){ 
            pos = arr.indexOf(m)
            fb = Object.assign({}, m) 
        }
    })
    for(let i = MAX_SHELLS - 1; i > 0; i--){
        fb.hits = i
        fb.name = NAME + "*" + i
        copy_arr.splice(pos, 0, Object.assign({}, fb))
    }
    return copy_arr
}

/** ガンランスのダメ計算に使う、肉質・耐属性・耐火属性を取得 */
function gl_get_weak(part, dmg_type, ele_type){
    let weak = {}
    if(dmg_type == "砲撃"){ weak.fire = part["火"] }
    else{ weak = get_weak(part, dmg_type, ele_type) }
    return weak
}

/** ガンランスのダメ計算に使う変数を取得する関数 */
function gl_vars_for_calc(weapon, motion){
    weapon.shell_cor = 1
    // モーションのダメージタイプが砲撃なら
    if(motion.name == "溜め砲撃"){
        weapon.shell_cor = SHELL_COR[weapon.shell_type][motion.name]
    }else if(motion.name.includes("フルバースト")){
        weapon.shell_cor = SHELL_COR[weapon.shell_type]["フルバースト"]
    }else if(motion.name == "竜撃砲"){
        weapon.shell_atk = SHELL_ATK_OBJ["竜撃砲"][weapon.shell_lv][0]
        weapon.fire_atk = SHELL_ATK_OBJ["竜撃砲"][weapon.shell_lv][1]
        weapon.shell_cor = SHELL_COR[weapon.shell_type][motion.name]
    }
    return weapon
}

/** ガンランスのダメージ計算 
 ** weapon:obj  武器
 ** motion:obj  各モーション 
 ** weak:obj    モンスターの各部位の肉質と耐属性
 ** i: number   各weakのindex */
function gl_calc_dmg(weapon, motion, weak){
    let dmg_obj = {}
    if(motion.dmg_type == "砲撃"){
        dmg_obj["砲撃"] = 
            Math.floor(Math.floor(Math.floor(weapon.shell_atk 
                * weapon.artillery) * weapon.shell_cor)
            + (weapon.fire_atk * weak.fire / 100)) * motion.hits
    }else{
        dmg_obj = common_calc_dmg(weapon, motion, weak)
    }
    return dmg_obj
}


/**********************************************************************/
/*** スラッシュアックス **************************************************/
/**********************************************************************/

// スラッシュアックスのダメージ計算をする関数
function sa_calc_dmg(weapon, motion, weak){
    return calc_dmg(weapon, motion, weak,
    (weapon, motion, val, weak) => {
        let dmg = {},
            ele = weapon.element * (motion.name.includes("剣:") 
                                    ? weapon.ele_cor : 1),
            mv = Math.floor(val * (motion.name.includes("剣:") 
                                   ?　weapon.power_cor : 1))
        dmg["物理"] = calc_phys_dmg(weapon, mv, weak.phys)
        dmg["属性"] = ele / 10 * weapon.ele_sharp 
                     * calc_affi_exp(weapon.affi, weapon.crit_ele)
                     * weak.ele / 100
        return dmg
    })
}

/**********************************************************************/
/*** チャージアックス ***************************************************/
/**********************************************************************/

/** 超高出力をコピーして1-6ビンになるように追加したリストを返す */
function add_ultra_burst(arr){
    const MAX_PHIALS = 6,
          NAME = "斧:超高出力属性解放斬り"
    let copy_arr = arr.slice(),
        ultra = {},
        pos = 0
    arr.forEach(m => {
        if(m.name.includes("斧:超高出力属性解放斬り:ビン6")){
            pos = arr.indexOf(m)
            ultra = Object.assign({}, m)
        }
    })
    for(let i = MAX_PHIALS - 1; i > 0; i--){
        ultra.expls = i
        ultra.name = NAME + ":ビン" + i
        copy_arr.splice(pos, 0, Object.assign({}, ultra))
    }
    return copy_arr
}

/** CBが非属性強化ならCB_LISTから超高出力とGP爆発を削除した配列を返す関数 */
function del_boost_motion(arr){
    let new_arr = arr.slice()
    for(let i = 0; i < new_arr.length; i++){
        if(new_arr[i].name.match(/超高出力/) 
        || new_arr[i].name.match(/GP爆発/)){
            new_arr.splice(i--, 1)
        }
    }
    return new_arr
}

/** チャージアックスのモーションリストを返す。
 * 属性強化のon/offをみてモーションリストの内容を変える。
 ** boost(num): 属性強化倍率 */
function get_cb_motions(boost){
    let arr = MOTIONS["チャージアックス"]
    return boost > 1 ? add_ultra_burst(arr) : del_boost_motion(arr)
}


/** チャージアックスのダメージ計算に使う変数を格納したobjをつくって返す */
function cb_vars_for_calc(weapon, motion){
    let phial_atk = 0,  // ビンの基礎ダメージ
        phial_type_cor = 0 // ビンタイプ補正値

    // 榴弾と強属性それぞれの場合の変数を設定
    weapon.phial == "榴弾" ? (
        phial_atk = weapon.true_atk,
        phial_type_cor = motion.imp_phial
    ) : (
        phial_atk = weapon.element / 10,
        phial_type_cor = motion.ele_phial
    )

    // 属性強化状態で超高出力を除く解放斬りなら、属性強化ビン爆発補正をかける
    if (weapon.boost > 1){
        if (motion.name.match(/解放斬り/) 
            && !motion.name.match(/超高出力/)){
            phial_atk *= boost_phial_atk(weapon.phial)
        }
    }else{ // 通常状態
        // 盾突き・チャージ斬り返し・GP爆発のビン爆発係数を0にする
        if (motion.name.match(/盾突き/)
            || motion.name.match(/チャージ斬り返し/)){
            phial_type_cor = 0
        }
    }
    // objをセ--ットォ!!!!
    weapon.phial_atk = phial_atk
    weapon.phial_type_cor = phial_type_cor
    return weapon
}

/** チャージアックスのダメージ計算をする関数 */
function cb_calc_dmg(weapon, motion, weak){
    let dmg_obj = calc_dmg(weapon, motion, weak,
        (weapon, motion, val, weak) => {
            // 超高出力以外の斧と盾突きモーション値に属性強化倍率を掛ける
            let mv = ( motion.name.match(/斧:/) 
                       && !motion.name.match(/超高出力/) 
                       || motion.name.match(/盾突き/))
                       ? Math.floor(val * weapon.boost) : val
            let dmg = {}
            dmg["物理"] = calc_phys_dmg(weapon, mv, weak.phys)
            dmg["属性"] = calc_ele_dmg(weapon, weak.ele)
            return dmg
        }
    )
    /** ビン爆発ダメージ計算
     *  榴弾: 基礎攻撃力 * 榴弾係数 (* 属性強化倍率) * 爆発回数 
     *  強属性: 属性倍率 * 強属性係数 (* 属性強化倍率) * 爆発回数 */
    dmg_obj["ビン"] = (weapon.phial == "榴弾") 
        ? Math.floor(weapon.phial_atk * weapon.phial_type_cor 
          * weapon.artillery) * motion.expls
        : Math.floor(weapon.phial_atk * weapon.phial_type_cor 
          * weak.ele / 100) * motion.expls
    return dmg_obj
}


/**********************************************************************/
/*** 操虫棍 ************************************************************/
/**********************************************************************/

/** 操虫棍のモーションリストを返す関数
 ** essence(str): エキス色
 ** essenceに"赤"が含まれれば、赤エキス状態のモーションリストを返す。でなければ通常状態のモーションリストを返す。*/
function ig_get_motion_list(motions, essence){
    new_list = []
    // essenceに赤が含まれれば[1, 2]を返し、そうでなければ[0, 1]
    let essence_flag = essence.includes("赤") ? [1, 2] : [0, 1]
    // essence_flagに含まれるmotion.redをもつモーションだけを新しいリストに追加
    motions.forEach( motion => {
        if(essence_flag.includes(motion.red)){ new_list.push(motion) }
    })
    return new_list
}

/** 操虫棍のダメージ計算 */
function ig_calc_dmg(weapon, motion, weak){
    return calc_dmg(weapon, motion, weak,
    (weapon, motion, val, weak) => {
        let dmg = {},
            ele = weapon.element * ( motion.name == "虫回転攻撃" 
                                     ? weapon.insect_cor : 1 ),
            mv = Math.floor(val * weapon.essence)
        dmg["物理"] = calc_phys_dmg(weapon, mv, weak.phys)
        dmg["属性"] = ele / 10 * weapon.ele_sharp 
                     * calc_affi_exp(weapon.affi, weapon.crit_ele)
                     * weak.ele / 100
        return dmg
    })
}


/**********************************************************************/
/*** スキル・アイテム・食事 **********************************************/
/**********************************************************************/

/** 攻撃力UPスキル */
const ATK_UP = {
    0: {atk: 0, affi: 0},
    1: {atk: 3, affi: 0},
    2: {atk: 6, affi: 0},
    3: {atk: 9, affi: 0},
    4: {atk: 12, affi: 5},
    5: {atk: 15, affi: 5},
    6: {atk: 18, affi: 5},
    7: {atk: 21, affi: 5}
}
/** 護符と爪 */
const CHARMS = {
    0: 0,
    1: 6,
    2: 9,
}
CHARMS[3] = CHARMS[1] + CHARMS[2] // どちらもありを定義

// 表示属性値に乗算 倍率の上限は1.2

/** 単一属性攻撃強化スキル */
const SINGLE_ELE_UP = {
    0: {mul: 1, sum: 0},
    1: {mul: 1, sum: 30},
    2: {mul: 1, sum: 60},
    3: {mul: 1, sum: 100},
    4: {mul: 1.05, sum: 100},
    5: {mul: 1.1, sum: 100},
}
/** 全属性強化 */
const ALL_ELE_UP = {
    0: 1,
    1: 1.1
}

/** 演奏(属性) 積の上限は属性強化スキルと合わせて1.2 */
const ELE_MUSIC = {
    0 : 1,
    1 : 1.08,
    2 : 1.1
}

/** 属性会心 */
function critical_element(bool){
    if(bool){
        switch(weapon.type){
            case "大剣": return 1.2
            case "片手剣":
            case "双剣":
            case "弓": return 1.35 
            case "ライトボウガン":
            case "ヘヴィボウガン": return 1.3
            default: return 1.25
        }
    }else{ return 1 }
}

/** 見切りスキル */
const EXPERT = {
    0: 0,
    1: 3,
    2: 6,
    3: 10,
    4: 15,
    5: 20,
    6: 25,
    7: 30
}

/** 狂竜症克服 */
const ANTIVIRUS = {
    0: 0,   // なし
    1: 15,  // 克服
    2: 30   // 無我の境地
}

/** 演奏(会心) */
const AFFI_MUSIC = {
    0: 0,
    1: 15,
    2: 20
}
/** 砲撃術 */
const ARTILLERY = {
    ガンランス: { 0: 1, 砲術師: 1.1, 砲術王: 1.2, 砲術マスター:1.3 },
    チャージアックス: { 0: 1, 砲術師: 1.3, 砲術王: 1.35, 砲術マスター: 1.4 },
    ライトボウガン: { 0: 1, 砲術師: 1.15, 砲術王: 1.3, 砲術マスター: 1.4 },
    ヘヴィボウガン: { 0: 1, 砲術師: 1.15, 砲術王: 1.3, 砲術マスター: 1.4 }
}

/** 猫の砲撃術 */
const FELYNE_BOMB = {
    ガンランス: 1.1,
    チャージアックス: 1.15,
    ライトボウガン: 1.15,
    ヘヴィボウガン: 1.15
}
/** 攻撃力UP系の食事or鬼人薬, 鬼人薬&食事攻撃中, 鬼人薬グレート&食事攻撃大
 ** ネコの火事場力が発動していれば、そちらが優先 */
const ATK_FOOD = {
    0: 0, 
    1: 3, // 食事攻撃小
    2: 5, // 鬼人薬&食事攻撃中
    3: 7  // 鬼人薬グレート&食事攻撃大
}
/** 広域化怪力の種, 鬼人笛・怪力の種・ドキドキノコのランダム効果, 鬼人弾, 
 * 食事ネコの休憩術, ネコの真鬼人笛, 怪力の丸薬 */
const ATK_GROUP5 = {
    0: 0,
    1: 3,   // 広域化1怪力の種
    2: 10,  // 鬼人笛・怪力の種
    3: { atk: 10, sharp: 1.1 }, // 鬼人弾
    4: 15, // 食事スキル ネコの休憩術
    5: 20, // ネコの真鬼人笛
    6: 25 // 怪力の丸薬
}
/** 挑戦者・フルチャージ(無傷)・力の解放 */
const CHALLENGER = {
    0: 0,
    latent_pow1: 30, // 力の解放+1 affi
    latent_pow2: 50, // 力の解放+2 affi
    unscathed: 20, // フルチャージ atk
    challenger1: {atk: 10, affi: 10}, // 挑戦者+1
    challenger2: {atk: 25, affi: 20}, // 挑戦者+2
}
/** 火事場スキル */
const ADRENALINE = {
    0: 1, // なし
    2: 1.3, // 火事場+2
    3: 1.35, // ネコ火事場
}
/** 逆境（不屈）survivor / fortify */
const SURVIVOR = {
    0: 1,
    1: 1.1,
    2: 1.2,
}
/** 演奏攻撃強化 */
const ATK_MUSIC = {
    0: 1,   // なし
    1: 1.1, // 小
    2: 1.15,// 大/小*2
    3: 1.2, // 大*2
}

/** 各スキルの効果を取得する関数をvalに持つ obj */
const SKILL = {
    // 攻撃力UP系
    honing: bool => bool ? 20 : 0, // 極限強化スキル
    atk_up: lv => ATK_UP[lv], // 攻撃力UP
    felyne_booster: bool => bool ? 3 : 0, // 猫の短期催眠術
    charms: lv => CHARMS[lv], // 力の護符と力の爪
    atk_food: lv => ATK_FOOD[lv], // 食事攻撃UP/鬼人薬 ネコの火事場力が優先
    atk_group5: lv => ATK_GROUP5[lv], // 種・丸薬・鬼人笛/弾・休憩術
    demon_powder: bool => bool ? 10 : 0, // 鬼人の粉塵
    // 挑戦者・フルチャージ(無傷)・力の解放
    challenger: name => CHALLENGER[name],
    punish_draw: bool => bool ? 5 : 0, // 抜刀減気
    // 攻撃力に乗算するスキルorアイテム
    adrenaline: lv => ADRENALINE[lv], // 火事場力
    survivor: lv => SURVIVOR[lv], // 逆境(不屈)
    atk_music: lv => ATK_MUSIC[lv], // 演奏攻撃強化
    // 会心率UP系
    expert: lv => EXPERT[lv], // 達人
    antivirus: lv => ANTIVIRUS[lv], // 狂竜症克服
    affi_music: lv => AFFI_MUSIC[lv], // 演奏会心
    critical_draw: bool => bool ? 100 : 0, // 抜刀会心
    // 属性値UP系 
    single_ele_up: lv => SINGLE_ELE_UP[lv], // 単属性強化
    all_ele_up: bool => bool ? 1.1 : 1, // 全属性強化
    ele_music: lv => ELE_MUSIC[lv], // 演奏(属性)
    critical_element: bool => bool ? true : false, // 属性会心
    handicraft: bool => bool ? true : false, // 匠スキル
    awaken : bool => bool ? true : false, // 属性解放
    // 砲術系
    artillery: lv => lv, // 砲術師
    felyne_bomb: bool => bool ? true : false, // ネコの砲撃術
    tenderizer: bool => bool ? 5 : 0, // 痛撃:45%以上の物理肉質を5%上昇させる
}

/** 属性会心の武器ごとの会心倍率を返す関数
 ** type(str): 武器種
 ** bool(boolean): 属性会心スキルフラグ true or false 
 ** return (num): 属性会心倍率 */
function crit_ele(weapon, skill_effect){
    const type = weapon.type,
          bool = skill_effect.critical_element
    let magn = 1
    if(bool){
        if(type == "大剣"){ magn = 1.2 }
        else if(["片手剣", "双剣", "弓"].includes(type)){ magn = 1.35 }
        else if(["ライトボウガン", "ヘヴィボウガン"].includes(type)){
            magn = 1.3
        }else{ magn = 1.25 }
    }
    weapon.crit_ele = magn
    return weapon
}

/** skill_effectを初期化する関数 */
function init_skill_effect(){
    let skill_effect = {}
    for(const [name, f] of Object.entries(SKILL)){
        skill_effect[name] = f(0)
    }
    return skill_effect
}

// 攻撃力加算・乗算, 会心率加算系スキルの流れを定義する関数
function apply_skill_effect_flow(target, skill_names, f){
    let result = target
    for(const name of skill_names){ result = f(result, name) }
    return result
}

/** 攻撃力up系のスキル効果を反映する関数 */
function atk_up_skill(weapon, skill_effect){
    // 加算スキルの結果に乗算スキルを反映して取得
    let result = apply_skill_effect_flow(
        calc_true_atk(WEAPONS[weapon.type][weapon.name].atk,
                      weapon.type),
        ATK_MUL_SKILLS,
        (product, name) => product * skill_effect[name] // コールバック
    )
    // 加算スキルの結果を保持
    weapon.true_atk = apply_skill_effect_flow(
        result,
        ATK_PLUS_SKILLS,
        // 関数リテラルを渡す
        (sum, name) => {
            let atk_up = (name == "atk_up") ? skill_effect[name].atk 
                                            : skill_effect[name]
            if(name == "atk_group5" & !is_number(atk_up)){
                atk_up = skill_effect.atk_group5.atk
            // 食事攻撃スキルの場合、ネコ火事場が発動中なら0
            }else if(name == "atk_food" 
                     & skill_effect.adrenaline == 1.35){
                atk_up = 0
            }else if(name == "challenger"){
                // 力の解放の場合は、攻撃力には加算しないので0
                if(atk_up == 30 || atk_up == 50){ atk_up = 0 }
                // 挑戦者の場合は、objectなのでatkプロパティの値を再代入
                else if(!is_number(atk_up)){
                    atk_up = skill_effect.challenger.atk
                }
            }
            return sum + atk_up
        }
    )

    // 端数切り捨て(不明なので確認できたら変更)
    weapon.atk = calc_atk(weapon.true_atk, weapon.type)
    return weapon
}

/** 斬れ味UP系スキル */
function sharp_up_skill(weapon, skill_effect){
    const w = WEAPONS[weapon.type][weapon.name]
    // hadicraftがonならWEAPONSからsharp_plusを取得
    weapon.sharp = skill_effect.handicraft ? w.sharp_plus : w.sharp
    set_sharp_cor_to_weapon(weapon)
    weapon.phys_sharp = apply_skill_effect_flow(
        PHYS_SHARP[weapon.sharp],
        SHARP_PLUS_SKILLS,
        (product, name) => {
            let sharp_up = 1
            if( name == "atk_group5"
                & !is_number(skill_effect.atk_group5)){
                sharp_up = skill_effect.atk_group5.sharp
            }
            return product * sharp_up
        })
    return weapon
}

// 会心率UP系スキル
function affi_up_skill(weapon, skill_effect){
    weapon.affi = apply_skill_effect_flow(
        WEAPONS[weapon.type][weapon.name].affi,
        AFFI_PLUS_SKILLS,
        (sum, name) => {
            let affi_up = (name == "atk_up") ? 
                skill_effect[name].affi : skill_effect[name]
            if(name == "challenger"){
                // フルチャージなら会心率を上げないので0
                if(affi_up == 20){ affi_up = 0 }
                // 挑戦者ならobjectなのでaffiプロパティを再代入
                else if(!is_number(affi_up)){
                    affi_up = skill_effect.challenger.affi
                }
            }
            // 狂竜症克服時の処理
            if(name == "antivirus"){
                // 狂竜症克服時でかつ、W会心武器なら会心率にマイナス会心の絶対値をを足す
                if(skill_effect.antivirus && ("nega_affi" in weapon)){  
                    affi_up += Math.abs(WEAPONS[weapon.type][weapon.name].nega_affi)
                }
            }
            sum += affi_up
            return (sum > 100) ? 100 : sum // sumが100を超えないように
        })
    return weapon
}

/** 属性強化スキルを反映した属性値を返す関数(倍率は最大1.2)。
 * DBから元武器の属性値を取得して
 ** weapon(obj): 武器obj
 ** skill_effect(obj): スキル効果辞書 */
function ele_up_skill(weapon, skill_effect){
    const MAX_MAGN = 1.2,
          origin = WEAPONS[weapon.type][weapon.name],
          element = (skill_effect.awaken
                    && !origin.awake_ele_type == 0)
                    ? origin.awake_element
                    : origin.element,
          magn = skill_effect.single_ele_up.mul 
               * skill_effect.all_ele_up * skill_effect.ele_music
    // magn > 1.2 なら 1.2 を使う
    weapon.element = ELEMENTS.includes(weapon.ele_type)
                     ? element * (magn > MAX_MAGN ? MAX_MAGN : magn) 
                        + skill_effect.single_ele_up.sum
                     : 0
    return weapon
}

/** 痛撃スキルの反映関数 切断・打撃・弾肉質が45%以上ならスキル効果を反映 */
function tenderizer(monster, skill_effect){
    const types = ["切断", "打撃", "弾"]
    for(const [p_name, part] of Object.entries(monster.parts)){
        types.forEach( type => {
            const weaks = MONSTERS[monster.name][p_name][type]
            // weaksの変化前と変化後どちらが採用されているか判定する
            let i = (monster.weak_flag && weaks.length > 1) ? 1 : 0
            if(weaks[i] >= 45){ // 肉質45%以上ならスキル効果を足す
                part[type] = weaks[i] + skill_effect.tenderizer
            }
        })
    }
    
    return monster
}

/** 砲術とネコ砲術の積を返す関数　チャージアックスは最大1.4 */
function artillery(weapon, skill_effect){
    if(weapon.type in ARTILLERY){ // 砲撃スキルが効果のある武器種なら実行
        const art_lv = skill_effect.artillery
        felyne_bomb = skill_effect.felyne_bomb ? FELYNE_BOMB[type] : 1,
        result = ARTILLERY[weapon.type][art_lv] * felyne_bomb
        if(weapon.type == "チャージアックス"){
            result = (result > 1.4) ? 1.4 : result
        }
        weapon.artillery = result
    }
    return weapon
}

/** 属性解放スキルの反映関数
 ** weapon(obj): 武器obj
 ** skill_effect(obj): スキル効果辞書
 ** return(obj):
 *      obj.ele_type(str): 適用後の属性種
 *      obj.element(num): 適用後の属性値  */
function awaken(weapon, skill_effect){
    // 元の武器を取得
    const origin = WEAPONS[weapon.type][weapon.name]
    // awakenがonかつ元の武器がawake_ele_typeを持つとき
    if(skill_effect.awaken && !origin.awake_ele_type == 0){ 
        weapon.ele_type = origin.awake_ele_type
        weapon = ele_up_skill(weapon, skill_effect)
    }else if(!skill_effect.awaken){ // awakenがoffの時 属性を元に戻す
        weapon.ele_type = origin.ele_type
        weapon = ele_up_skill(weapon, skill_effect)
    }
    return weapon
}



/** スキル名とスキルレベルから実行する反映関数を決める関数
 * スキル効果反映の流れを定義した関数 */
function apply_skills(name, lv, weapon, skill_effect, monster){
    console.log("変更されたスキル:", name, lv)
    skill_effect[name] = SKILL[name](lv) // 効果をskill_effectに記録
    // スキル名に応じて反映関数を実行 ここの処理もうちょっとなんとかしたい
    if(ATK_UP_SKILLS.includes(name)){
        weapon = atk_up_skill(weapon, skill_effect)
    }
    if(SHARP_PLUS_SKILLS.includes(name)){ 
        weapon = sharp_up_skill(weapon, skill_effect)
    }
    if(AFFI_PLUS_SKILLS.includes(name)){ 
        weapon = affi_up_skill(weapon, skill_effect)
    }
    if(ELE_PLUS_SKILLS.includes(name)){
        weapon = ele_up_skill(weapon, skill_effect)
    }
    if(name == "critical_element"){ // 属性会心ならcrit_eleを更新
        weapon = crit_ele(weapon, skill_effect)
    }
    if(SHELL_SKILLS.includes(name)){ // 砲撃スキル
        weapon = artillery(weapon, skill_effect)
    }
    if(name == "awaken"){ 
        weapon = awaken(weapon, skill_effect)
    }
    if(name == "tenderizer"){
        monster = tenderizer(monster, skill_effect)
        show_monster(monster.parts) // モンスターテーブルを更新
    }
    show_weapon_table(weapon, skill_effect) // weaponを表示
    // 返す
    return { w: weapon, s: skill_effect, m: monster }
}

/** 全スキルを武器に反映する関数 */
function apply_all_skills(weapon, skill_effect){
    weapon = atk_up_skill(weapon, skill_effect)
    weapon = sharp_up_skill(weapon, skill_effect)
    weapon = affi_up_skill(weapon, skill_effect)
    weapon = awaken(weapon, skill_effect)
    weapon = ele_up_skill(weapon, skill_effect)
    weapon = crit_ele(weapon, skill_effect)
    weapon = artillery(weapon, skill_effect)
    return weapon
}

/** スキルセレクトとラジオボタンを全てデフォルトに設定する関数 */
function reset_skills(){
    // 各スキルインプットとセレクトをデフォルトに戻す
    for(const name in SKILL){
        const skill_div = $("." + name)
        let is_radio = judge_radio_or_select(skill_div)
        if(is_radio){ // スキルラジオボタン
            skill_div.children("input[name=" + name  + "]:eq(0)").prop("checked", true);
        }else{ // スキルセレクト
            skill_div.children("select").val(0)
        }
        skill_div.children("label").css("color", "white")
    }
}

/**********************************************************************/
/*** 入力を取得する関数 **************************************************/
/**********************************************************************/

const CARD = {
    w_type: ".weapon_types",
    w_name: ".weapon_name",
    atk: ".atk",
    ele_type: ".ele_type",
    element: ".element",
    sharp: ".sharp",
    affi: ".affi"
}

/** 武器名を取得して返す関数
 ** 武器名セレクトで選択されている武器名を取得して返します。
 ** return(str): 武器名 */
function get_weapon_name(){
    return $(CARD.w_name + " select option:selected").text()
}

/** 武器種を取得して返す関数
 ** 武器種セレクトで選択されている武器種を取得して返します。
 ** return(str): 武器種 */
function get_weapon_type(){
    return $(CARD.w_type + " select option:selected").text()
}

/** 選択されているモンスター名を返す
 ** return(str): モンスター名 */
function get_monster_name(){
    return $(".monster select option:selected").text()
}
/** 選択されている肉質変化を返す
 ** return(bool): 肉質変化フラグ(変化前: false, 変化後: true) */
function get_monster_weak_flag(){
    return $(".weak_flag select option:selected").val()
           ? true : false
}

/** 入力された防御率を100で割って返す
 ** return(num): 防御率 */
function get_defence_rate(){
    return Number($(".defense_rate").val()) / 100
}

/** スキル名を取得して返す関数
 ** 変更されたスキルセレクトからスキル名を取得し、返す
 ** section(jquery): 選択されたスキルセレクト 
 ** return(str): スキル名 */
function get_skill_name(section){
    return section.attr("class")
}

/** スキルレベルを取得して返す関数
 ** 変更されたスキルセレクトからスキルレベルを取得し、返す
 ** section(jquery): 選択されたスキルセレクト 
 ** return(str): スキルレベル or null */
function get_skill_level(skill_name){
    const sect = $("." + skill_name)
    const is_radio = judge_radio_or_select(sect) // selectかradioか判定
    if(sect.children("input").length){ // ラジオボタンの場合
        return sect.find("input[name=" + skill_name + "]:checked").val()
    }else if(sect.children("select").length){ // セレクトの場合
        return sect.find("select option:selected").val()
    }
}


/** セレクト要素の選択されている値を返す関数
 ** card(jquery): .attack input要素のカード
 ** element(str): セレクト要素のclass名やid */
function get_selected_val(card, element){
    return card.find(element + " select option:selected").val()
}
/** セレクト要素の選択されているテキストを返す関数
 ** card(jquery): .attack input要素のカード
 ** element(str): セレクト要素のclass名やid */
function get_selected_text(card, element){
    return card.find(element + " select option:selected").text()
}

/** セレクト要素の値を設定する関数
 ** card(jquery): .attack input要素のカード
 ** element(str): セレクト要素のclass名やid
 ** val(str): 選択する値 */
function select_val(card, element, val){
    card.find(element + " select").val(val)
}

/** input要素のvalを設定する関数
 ** card(jquery): ターゲットinput要素があるカード
 ** element(str): セレクト要素のclass名やid
 ** val(num): input要素に設定するval */
function input_val(card, element, val){
    card.find(element + " input").val(val)
}
/** input要素のvalを設定する関数
 ** card(jquery): ターゲットinput要素があるカード
 ** element(str): セレクト要素のclass名やid */
function get_input_val(card, element){
    return card.find(element + " input").val()
}


/**********************************************************************/
/*** 画面表示 **********************************************************/
/**********************************************************************/

/** 武器種依存のhtml要素を表示/非表示する関数 
 ** card(jquery): 操作したいhtml要素があるカード
 ** type(str): 武器種 */
function show_elements_dependents_on_w_type(type){
    // 武器種に依存するhtmlを隠す
    for(const arr of Object.values(ELEMENTS_DEPEND_WEAPON_TYPE)){
        arr.forEach( name => { $(name).hide() })
    }
    // 武器種ごとのセレクトを出力
    if(type in ELEMENTS_DEPEND_WEAPON_TYPE){
        ELEMENTS_DEPEND_WEAPON_TYPE[type].forEach( name => {
            $(name).show()
        })
    }
}

/** 計算結果をresult tableに出力 */
function show_result(dmg_obj){
    const table = $(".result")
    let thead = $("<thead>"),
        tbody = $("<tbody>"),
        h_row = $("<tr>"),
        i = 0

    table.empty()
    h_row.append($("<th>").text("モーション"))
    for(const [motion, part_dmg] of Object.entries(dmg_obj)){
        let b_row = $("<tr>")
        b_row.append($("<td>").text(motion))
        for(const[part, dmg] of Object.entries(part_dmg)){
            if(i == 0){
                h_row.append($("<th>").text(part))
            }
            b_row.append($("<td>").text(String(dmg["合計"])))
        }
        tbody.append(b_row)
        i++
    }
    thead.append(h_row)
    table.append(thead, tbody)
    return 0
}

/** モンスターが選択されたらモンスターデータのテーブルを表示 */
function show_monster(monster){
    const table = $(".monster_table")
    let thead = $("<thead>"),
        tbody = $("<tbody>")
    // tbodyの中身をリセット
    table.empty()

    let i = 0
    // テーブルヘッド
    let h_row = $("<tr>")
    h_row.append($("<th>").text(""))
    for(const [part, weaks] of Object.entries(monster)){
        let row = $("<tr>")
        row.append($("<td>").text(part))
        for(const [dmg_type, weak] of Object.entries(weaks)){
            // ダメージタイプをheader rowに入力
            if(i == 0){ h_row.append($("<th>").text(dmg_type)) }
            let td = $("<td>")
            td.text(weak)
            row.append(td)
        }
        tbody.append(row)
        i++
    }
    thead.append(h_row)
    table.append(thead, tbody)
}

/** weaponを表示する関数(テーブルを使わない場合)
 ** weapon(obj): 武器オブジェクト
 ** skill_effect(obj): スキル効果辞書 */
function show_weapon(weapon, skill_effect){
    let affi = String(weapon.affi)
    // nega_affiかつantivirusがoff -> affi/nega_affi
    if("nega_affi" in weapon && !skill_effect.antivirus){
        affi += "/" + String(weapon.nega_affi)
    }
    $(".atk p").text(String(weapon.atk))
    $(".ele_type p").text(weapon.ele_type)
    $(".element p").text(weapon.element)
    $(".affi p").text(affi)
    $(".sharp p").text(weapon.sharp)
}

/** weaponデータをテーブルに表示する関数
 ** weapon(obj): 武器オブジェクト
 ** skill_effect(obj): スキル効果辞書 */
function show_weapon_table(weapon, skill_effect){
    let thead = $(".weapon_table tbody"),
        tbody = $(".weapon_table tbody"),
        hrow = $("<tr>"),
        brow = $("<tr>"),
        affi = String(weapon.affi)
    // nega_affiかつantivirusがoff -> affi/nega_affi
    if("nega_affi" in weapon && !skill_effect.antivirus){
        affi += "/" + String(weapon.nega_affi)
    }
    tbody.empty() // tbodyを空にする
    brow.append($("<td>").text(String(weapon.atk)))
    brow.append($("<td>").text(weapon.ele_type))
    brow.append($("<td>").text(weapon.element))
    brow.append($("<td>").text(affi))
    brow.append($("<td>").text(weapon.sharp))
    if(weapon.type in WEAPON_TYPE_PROP){ // 武器種依存のプロパティがあれば
        for(const prop in WEAPON_TYPE_PROP[weapon.type]){
            hrow.append($("<th>").text(prop))
            brow.append($("<td>").text(weapon[prop]))
        }
    }
    thead.append(hrow)
    tbody.append(brow)
}

/** 武器種依存のプロパティを表示する関数 */
function show_weapon_type_prop(weapon){
    if(weapon.type in WEAPON_TYPE_PROP){
        WEAPON_TYPE_PROP[weapon.type].forEach( prop => {
            $("." + prop).children("select").val(weapon[prop])
        })
    }
}

/** 武器ランキングを表示する関数
 ** average_map(map): 武器名と平均期待ダメージのmap */
function show_ranking(average_map){
    let tbody = $(".ranking tbody")
    tbody.empty() // tbodyを空にする
    let i = 1
    average_map.forEach( (average, name) => { // tbodyを入力
        let brow = $("<tr>")
        brow.append($("<td>").text(String(i)))
        brow.append($("<td>").text(name))
        brow.append($("<td>").text(String(average)))
        tbody.append(brow)
        i++
    })
    return 0
}

/** 選択されたskills divの子要素がセレクトかラジオボタンかを判定する
 ** skill_div(jquery): 変更があったスキルdiv
 ** return(bool): divの子要素がinput radioならtrue、selectならfalse */
function judge_radio_or_select(skill_div){
    if(skill_div.children("input").length){ return true }
    else if(skill_div.children("select").length){ return false }
}

/** スキルが選ばれたらlabelの文字色を変える */
function change_label_color(){
    const section = $(this),
          name = $(this).attr("class")
    let bool = false,
        is_radio = judge_radio_or_select(section) // selectかradioか判定
    if(is_radio){ // ラジオボタンの場合
        if(section.children("input[name=" + name + "]:checked").val() 
            == ""){ bool = false }
        else{ bool = true }
    }else{ // セレクトの場合
        if(section.find("select option:selected").text() == "なし"){
            bool = false 
        }else{ bool = true }
    }
    // ラベルの色を変える
    if(bool){ section.children("label").css("color", "orange") }
    else{ section.children("label").css("color", "white") }
}



/**********************************************************************/
/*** セレクトを設定する関数 **********************************************/
/**********************************************************************/

/** セレクトにオプションとそのテキストを設定する関数
 ** select(jquery): optionを追加したいselect要素
 ** text(str): optionに設定するtext */
function set_option_text(select, text){
    let option = $("<option>")
    option.text(text)
    select.append(option)
}

/** 武器種や属性が選択されたら、その武器種かつ属性の武器名selectに入れる関数 */
function set_weapon_names(skill_effect){
    console.log("武器名セレクトを更新")
    let type = $(CARD.w_type + " option:selected").text(),
        ele_type = $(CARD.ele_type + " option:selected").val(),
        select = $(CARD.w_name + " select")
    select.empty() // 既存の.weapon_name optionを削除
    if (ele_type){ // ele_typeが指定された場合
        if (skill_effect.awaken){
            // 属性解放スキルがonの時
            for(const [name, weapon] of Object.entries(WEAPONS[type])){
                // "ele_type"か"awake_ele_type"のどちらかがele_typeなら武器名を武器selectへ
                if(ele_type == weapon.ele_type
                   || ele_type == weapon.awake_ele_type){
                    set_option_text(select, name)
                }
            }
        }else{
            for(const [name, weapon] of Object.entries(WEAPONS[type])){
                // 属性解放スキルがoffの時 指定されたele_typeの武器名をselectへ
                if (ele_type == weapon.ele_type){ 
                    set_option_text(select, name)
                }
            }
        }
    }else{ // 指定されなかった場合 該当武器種の全武器を出力
        for(let name in WEAPONS[type]){ set_option_text(select, name) }
    }
    // 武器種選択からこの関数が呼ばれた場合は武器種依存のhtmlを操作する関数を実行
    show_elements_dependents_on_w_type(type)
}


/** モンスター名セレクトにモンスター名を入力する関数 */
function set_monster_name_select(){
    let select = $(".monster select")
    for(const name in MONSTERS){ // モンスターDBから名前を取得
        set_option_text(select, name)
    }
}


/**********************************************************************/
/*** 各主要オブジェクトを設定する関数 **************************************/
/**********************************************************************/

/** weaponに斬れ味補正値を持たせる関数 
 ** weapon.phys_sharp: 物理斬れ味補正
 ** weapon.ele_sharp: 属性斬れ味補正 */
function set_sharp_cor_to_weapon(weapon){
    weapon.phys_sharp = PHYS_SHARP[weapon.sharp]
    weapon.ele_sharp = ELE_SHARP[weapon.sharp]
    return weapon
}

/** weapon objつくりプロパティと値を設定して、返す関数 */
function set_weapon(type, name, skill_effect){
    let weapon = {}
    weapon.type = type
    weapon.name = name
    // 攻撃力・属性種・属性値・会心率・斬れ味を設定
    WEAPON_PROP.forEach( prop => {
        if(prop in WEAPONS[type][name]){ 
            weapon[prop] = WEAPONS[type][name][prop]
        }
    })
    weapon.true_atk = calc_true_atk(weapon.atk, type) // 基礎攻撃力
    weapon = set_sharp_cor_to_weapon(weapon) // 斬れ味補正を保持
    if(type in WEAPON_TYPE_PROP){ // 独自プロパティがある武器種ならそれらを取得
        WEAPON_TYPE_PROP[type].forEach( prop => {
            weapon[prop] = WEAPONS[type][name][prop]
        })
    }
    // スキルを反映
    weapon = apply_all_skills(weapon, skill_effect)
    return weapon
}

/** 現在の武器の設定と表示をする関数。
 * 武器が選択されたら発動 */
function set_n_show_weapon(skill_effect){
    const type = get_weapon_type(), // 武器種と武器名を取得
          name = get_weapon_name()
    let weapon = set_weapon(type, name, skill_effect) // weaponを設定
    show_weapon_table(weapon, skill_effect) // weaponを表示
    show_weapon_type_prop(weapon) // 武器種依存のプロパティを出力
    return weapon
}

/** 武器名セレクトに武器名を出力。デフォルトの武器を設定して表示する関数 */
function set_up_weapon_select(skill_effect){
    set_weapon_names(skill_effect)
    let weapon = set_n_show_weapon(skill_effect) // 武器を設定して表示
    return weapon
}




/** 現在のモンスターを設定する
 ** DBのデータをmonster objにコピーして返す
 ** skill_effenct(obj): スキル効果辞書
 ** return(obj): モンスター情報を記録したobj
 **     return.name(str): モンスター名
 **     return.weak_flag(bool): 肉質変化フラグ true or false
 **     return.parts(obj): モンスターの肉質 obj */
function set_monster(skill_effect){
    let monster = {}
    monster.name = get_monster_name()
    monster.weak_flag = get_monster_weak_flag()
    monster.def_rate = get_defence_rate()
    // DBからモンスターの肉質データを値渡しでコピー
    monster.parts = get_monster_weak_obj(monster.name, 
                                         monster.weak_flag)
    monster = tenderizer(monster, skill_effect)
    return monster
}

/** モンスターを設定して表示する関数
 ** return: monster(obj) */
function set_n_show_monster(skill_effect){
    let monster = set_monster(skill_effect)
    show_monster(monster.parts)
    return monster
}


// Main
$(() => {
    // ページロード時に実行する
    set_monster_name_select() // モンスターをselectに入力
    let skill_effect = init_skill_effect(), // スキル効果オブジェクトを初期化
        weapon = set_up_weapon_select(skill_effect),
        monster = set_n_show_monster(skill_effect)
    // デフォルトモンスターのテーブルを表示
    // 武器種が変更されたら発動
    $(CARD.w_type + " select").on("change", () => {
        weapon = set_up_weapon_select(skill_effect)
    })
    // 属性が選択されたら発動
    $(CARD.ele_type + " select").on("change", () => {
        weapon = set_up_weapon_select(skill_effect)
    })
    // 武器が選択されたら発動
    $(CARD.w_name + " select").on("change", () => {
        weapon = set_n_show_weapon(skill_effect)
        console.log("selected weapon", weapon)
    })
    // スキル効果を反映するイベント
    $(".skills div").on("change", function(){
        const skill_name = get_skill_name($(this)),
              skill_lv = get_skill_level(skill_name)
        console.log($(this))
        let obj = apply_skills(skill_name, skill_lv, weapon, 
                               skill_effect, monster)
        weapon = obj.w
        skill_effect = obj.s
        monster = obj.m
        console.log("skill dict", skill_effect,
                    "skilled weapon", weapon,
                    "skilled monster", monster)
    })
    // モンスターが選択されたら発動
    $(".monster select").on("change", () => {
        monster = set_n_show_monster(skill_effect)
    })
    // 肉質変化が変更されたら発動
    $(".weak_flag select").on("change", () => {
        monster = set_n_show_monster(skill_effect)
    })
    // 計算ボタンが押されたら発動!
    $(".calc").on("click", () => {
        let dmg_obj = calc_damage(weapon, skill_effect, monster)
        show_result(dmg_obj.dmg) // 計算結果の出力
        console.log(dmg_obj.dmg)
    })
    $(".calc_rank").on("click", () => {
        let average_list = get_average_dmg_list(weapon.type, 
                                                skill_effect,
                                                monster)
        // 各武器のアベレージを降順でソート
        let average_map = 
            new Map(sort_in_descending_order(average_list))
        show_ranking(average_map) // ランキングを出力
    })

    $(".reset_skill").on("click", () => {
        let obj = reset_skills(weapon, skill_effect, monster)
        skill_effect = init_skill_effect(),
        weapon = set_n_show_weapon(skill_effect),
        monster = set_n_show_monster(skill_effect)
    })
    
    // デザイン関連のイベント
    // スキルラベルの色を変えるイベント
    $(".skills div").on("change", change_label_color)
    $(".weapon_props div").on("change", change_label_color)
})

