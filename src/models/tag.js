//タグコンポーネントのカラムデータモデル定義
export const tagColumns = [
  {
    name: "tag",
    label: "名称",
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
    name: "delete_tag",
    label: "削除",
    options: {
      filter: false,
      sort: false,
      empty: false,
      customBodyRender: {
        sx: { m: 1, minWidth: 120, p: 0, m: 0, mt: 2 },
        size: "small",
      },
    },
  },
];

//タグコンポーネントのテーブルのデータモデル定義
export const tagOptions = {
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
  maxWidth: true,
  textLabels: {
    body: {
      noMatch: "",
    },
  },
  customFooter: {
    context: "タグ追加+",
    style: { outline: "1px solid #D3D3D3" },
  },
  responsive: "stacked",
  tableBodyHeight: "auto",
  tableBodyMaxHeight: "auto",
};
