//共通情報データモデル定義
// {
//   name: 名前,
//   label: ラベル名,
//   input_style: 入力項目の種類,
//   value: 値,
//   disabled: disabled設定(boolean),
//   バリデーション
//   pattern: {
//     required: 入力必須項目(boolean),
//     value: 正規表現,
//     maxLength: 最大文字数,
//   },
// }
export const commonInfo1 = [
  { id: "1" },
  {
    name: "インストアコード",
    label: "instore_code",
    disabled: true,
    input_style: "L_TEXT",
    value: "",
  },
  {
    name: "JANコード",
    label: "jan_code",
    input_style: "L_TEXT",
    value: "",
    pattern: {
      value: /^[a-zA-Z0-9 ]+$|(?=^$[\s ]*$)/,
      maxLength: 13,
    },
  },
  {
    name: "商品名",
    label: "item_name",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      required: true,
      maxLength: 256,
    },
  },
  {
    name: "商品名カナ",
    label: "item_name_kana",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      required: true,
      maxLength: 256,
    },
  },
  {
    name: "商品名英字",
    label: "item_name_eng",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
];

export const commonInfo2 = [
  { id: "2" },
  {
    name: "商品分類",
    label: "category",
    input_style: "M_TEXT",
    disabled: true,
    value: "",
  },
  {
    name: "ジャンル1",
    label: "genre1",
    input_style: "L_SELECT",
    value: "",
  },
  {
    name: "ジャンル2",
    label: "genre2",
    input_style: "L_SELECT",
    value: "",
  },
  {
    name: "ジャンル3",
    label: "genre3",
    input_style: "L_SELECT",
    value: "",
  },
  {
    name: "部門分類",
    label: "bumon_category",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name1: "定価",
    name2: "定価フラグ",
    label1: "price",
    label2: "price_display_method",
    input_style: "S_TEXT SS_SELECT",
    value: {
      price: "",
      price_display_method: "",
    },
    pattern: {
      required: true,
      maxValue: 99999999,
    },
  },
  {
    name: "発売日",
    label: "release_date",
    input_style: "DATE",
    value: "",
    pattern: {
      required: true,
      maxLength: 8,
    },
  },
  {
    name: "年齢制限区分",
    label: "restricted_type",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "限定表示",
    label: "limited_remark",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 50,
    },
  },
];

export const commonInfo3 = [
  { id: "3" },
  {
    name: "コンテンツ名",
    label: "contents_name",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "サブコンテンツ名",
    label: "subcontents_name",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "倉庫連携区分",
    label: "souko_cooperation_type",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "店舗連携区分",
    label: "tri_cooperation_type",
    input_style: "S_SELECT",
    value: "",
  },
];
