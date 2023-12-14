//ソフト系属性情報データモデル定義
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
export const softAttribute1 = [
  {
    name: "規格品番",
    label: "speccode",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      required: true,
      maxLength: 20,
    },
  },
  {
    name: "タイトル規格品番",
    label: "title_speccode",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 20,
    },
  },
  {
    name: "販売会社",
    label: "vendor",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "発売会社",
    label: "distributor",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 256,
    },
  },
  {
    name: "組数",
    label: "disc_count",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      maxValue: 999,
    },
  },
  {
    name: "トラック数",
    label: "total_track",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      maxValue: 999,
    },
  },
  {
    name: "時間",
    label: "time",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 6,
    },
  },
  {
    name: "輸入盤区分",
    label: "import_type",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      numLength: 1,
    },
  },
  {
    name: "特殊形態区分",
    label: "special_media_type",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      numLength: 1,
    },
  },
  {
    name: "コピー制限区分",
    label: "copyguard_type",
    input_style: "S_SELECT",
    value: "",
    pattern: {
      numLength: 1,
    },
  },
  {
    name: "リージョンコード",
    label: "region_code",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[a-zA-Z0-9\s ]*$)/,
      numLength: 1,
    },
  },
  {
    name: "エディション",
    label: "edition",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "販売経路別コード",
    label: "sales_channel_code",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "タイトルAVCG",
    label: "title_avcg",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "経過区分",
    label: "progress_type",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "廃盤日",
    label: "discontinued_date",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 8,
    },
  },
  {
    name: "情報公開日・時間",
    label: "openDateAndTime",
    input_style: "DATE_TIME",
    value: "",
    pattern: {
      required: true,
    },
  },
  {
    name: "販売単売可否",
    label: "contents_sales_type",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "準新譜／再発売",
    label: "seminew_rerelease",
    input_style: "S_SELECT",
    value: "",
  },
];

export const softAttribute2 = [
  {
    name: "旧品番",
    label: "old_speccode",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "再発売商品番号",
    label: "rerelease_item_number",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "同類商品",
    label: "similar_item",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "ヒットチャート区分",
    label: "hit_chart_type",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "マキシシングル区分",
    label: "maxi_single_type",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "施策区分",
    label: "limited_type_code",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "メディア情報",
    label: "media_info",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "商品形状",
    label: "item_shape",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "特典情報",
    label: "benefits",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "マスタリング情報",
    label: "mastering_info",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "録音年等",
    label: "recording_info",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "プロモーション備考",
    label: "promotion_remark",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      maxLength: 512,
    },
  },
  {
    name: "セット数",
    label: "set_count",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      maxValue: 99999999,
    },
  },
  {
    name: "総作品数",
    label: "total_works",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      maxValue: 99999999,
    },
  },
  {
    name: "総収録時間",
    label: "total_run_time",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 6,
    },
  },
  {
    name: "作品数",
    label: "works",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      maxValue: 9999,
    },
  },
  {
    name: "収録時間",
    label: "run_time",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 6,
    },
  },
  {
    name: "メディア形態コード",
    label: "media_format_code",
    input_style: "S_SELECT",
    value: "",
  },
  {
    name: "メディア形態補足1",
    label: "media_format_remark1",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 3,
    },
  },
  {
    name: "メディア形態補足2",
    label: "media_format_remark2",
    input_style: "M_TEXT",
    value: "",
    pattern: {
      value: /(?=^[0-9\s ]*$)/,
      numLength: 3,
    },
  },
];
