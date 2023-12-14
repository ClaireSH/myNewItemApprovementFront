//著作者コンポーネントのカラムデータモデル定義
export const authorColumns = [
  {
    name: "representative",
    label: "代表者",
  },
  {
    name: "role",
    label: "役割情報",
    options: {
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
  {
    name: "author_name",
    label: "著作者名",
    options: {
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
  {
    name: "author_name_kana",
    label: "著作者名カナ",
    options: {
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
  {
    name: "author_name_eng",
    label: "著作者名英字",
    options: {
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
  {
    name: "update_type",
    label: "更新区分",
    options: {
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
  {
    name: "delete_author",
    label: "削除",
    options: {
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
];

//著作者コンポーネントのテーブルのデータモデル定義
export const authorOptions = {
  filterType: "checkbox",
  selectableRows: "none",
  rowsPerPageOptions: [],
  print: false,
  download: false,
  pagination: false,
  filter: false,
  search: false,
  viewColumns: false,
  responsive: "scroll",
  resizableColumns: true,
  textLabels: {
    body: {
      noMatch: "",
    },
    responsive: "scrollMaxHeight",
  },
  customFooter: {
    context: "著作者追加+",
    style: { outline: "1px solid #D3D3D3" },
  },
  footerError: {
    message: "著作者を設定してください。",
  },
  responsive: "stacked",
  tableBodyHeight: "auto",
  tableBodyMaxHeight: "auto",
};
