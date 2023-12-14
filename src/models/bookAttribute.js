//書籍系属性情報データモデル定義
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
//     numLength: 固定文字数,
//   },
// }
export const bookAttribute1 = [
  {
    name: "巻次",
    label: "volume",
    disabled: true,
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "巻次数",
    label: "volume_no",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxValue: 999,
    },
  },
  {
    name: "最終巻次",
    label: "volume_last_no",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxValue: 999,
    },
  },
  {
    name: "副書名",
    label: "subtitle",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "副書名カナ",
    label: "subtitle_kana",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "個別書名",
    label: "volume_title",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "個別書名カナ",
    label: "volume_title_kana",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "シリーズ名",
    label: "series_name",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "シリーズ名カナ",
    label: "series_name_kana",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "シリーズ名巻次",
    label: "series_volume",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "副シリーズ名",
    label: "subseries_name",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "副シリーズ名カナ",
    label: "subseries_name_kana",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "副シリーズ名巻次",
    label: "subseries_volume",
    input_style: "XL_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
];

export const bookAttribute2 = [
  {
    name: "出版社名",
    label: "publisher",
    input_style: "M_TEXT",
    disabled: true,
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "発売会社名",
    label: "distributor",
    input_style: "L_SELECT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "販売形態",
    label: "sales_target_code",
    input_style: "L_SELECT",
    value: "",
    pattern: {
      numLength: 1,
    },
  },
  {
    name: "発行形態",
    label: "publication_form_code",
    input_style: "L_SELECT",
    value: "",
    pattern: {
      numLength: 1,
    },
  },
  {
    name: "内容コード",
    label: "classification_code",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 2,
    },
  },
];

export const bookAttribute3 = [
  {
    name: "サイズ情報",
    label: "size",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 32,
    },
  },
  {
    name: "判型",
    label: "format",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 100,
    },
  },
  {
    name: "NDC分類",
    label: "ndc_code",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      value: /(?=^[a-zA-Z0-9\s ]*$)/,
      numLength: 2,
    },
  },
  {
    name: "BOOKPAGE分類",
    label: "bookpage_code",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      value: /[A-Z][0-9]{3}|(?=^$[\s ]*$)/,
      numLength: 4,
    },
  },
  {
    name: "雑誌コード",
    label: "magazine_code",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 7,
    },
  },
];
