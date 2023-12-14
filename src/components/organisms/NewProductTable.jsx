import React, { useState, useEffect, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import useStyles from "../../style/listStyles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { items } from "../../config/Titles";
import { NgaColumns } from "../../columns/NewProductColumns/NgaColumns";
import { NipColumns } from "../../columns/NewProductColumns/NipColumns";
import { JmdColumns } from "../../columns/NewProductColumns/JmdColumns";
import { SkdColumns } from "../../columns/NewProductColumns/SkdColumns";
import { useScanBookItems } from "../../api/useScanBookItems";
import { useScanSoftItems } from "../../api/useScanSoftItems";

export let itemCount = "";
export let valueIndex = "";

//新規商品一覧画面の新規商品情報を表示
export const NewProductTable = () => {
  const [scanBookItemColumns, setScanBookItemColumns] = useState([]);
  const [scanSoftItemColumns, setScanSoftItemColumns] = useState([]);
  const [scanBookItemData, setScanBookItemData] = useState([]);
  const [scanSoftItemData, setScanSoftItemData] = useState([]);
  const [curRowSelectedIndex, setCurRowSelectedIndex] = useState(1);
  const [curRow, setCurRow] = useState([]);
  const [initial, setInitial] = useRecoilState(states.initialInstoreCode);
  const [selectedElementFlag, setSelectedElementFlag] = useState(false);
  const [onclickCursorFlag, setOnclickCursorFlag] = useRecoilState(
    states.onclickCursorFlag
  );
  const [oncheckCursorFlag, setOncheckCursorFlag] = useState(false);
  const [firstCursorFlag, setFirstCursorFlag] = useState(false);
  const [checkBox, setCheckBox] = useRecoilState(states.checkBoxInstoreCode);
  const value = useRecoilValue(states.itemValue);
  const [itemCount, setItemCount] = useRecoilState(states.itemCounts);
  const selectedRowFlag = useRecoilValue(states.selectedRowFlag);
  const setRecordErrorMessage = useSetRecoilState(states.recordErrorMessage);
  const [checkedIndex, setCheckedIndex] = useRecoilState(states.checkedIndex);
  const { scanBookItems } = useScanBookItems();
  const { scanSoftItems } = useScanSoftItems();

  const nonData = [];
  const nonColumns = [];

  const myTheme = createTheme({
    overrides: {
      MUIDataTable: {
        responsiveScroll: {
          maxHeight: "450px",
          overflowX: "scroll",
        },
      },
    },
  });

  const classes = useStyles();

  const options = {
    filterType: "checkbox",
    selectableRows: "multiple",
    rowsPerPageOptions: [],
    print: false,
    download: false,
    pagination: false,
    filter: true,
    search: true,
    viewColumns: true,
    responsive: "scroll",
    resizableColumns: true,
    rowsSelected: checkedIndex,
    textLabels: {
      body: {
        noMatch: value ? "" : "...loading",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "",
        deleteAria: "",
      },
    },
    customToolbarSelect: () => {},
    onTableChange: (action, tableState) => {
      //Xインストアコード初期設定
      tableState.data.forEach((item, index) => {
        if (curRowSelectedIndex - 1 === index) {
          setInitial(item.data[tableState.columns.length - 1]);
        }
      });
      const itemCount = tableState.data.length;
      setItemCount(itemCount);
      itemCount === 0 && setInitial("");
    },
    setRowProps: (row, dataIndex, rowIndex) => {
      if (
        rowIndex === 0 &&
        !onclickCursorFlag &&
        !selectedElementFlag &&
        !firstCursorFlag &&
        !oncheckCursorFlag
      ) {
        setFirstCursorFlag(true);
      }

      if (row.includes(initial[0])) {
        valueIndex = rowIndex;
      }

      const tableRecorde = document.querySelectorAll("tr");
      if (curRow.length !== 0) {
        curRow.splice(0, curRow.length);
      }

      curRow.push(tableRecorde);
    },

    selectableRows: "multiple",

    onRowClick: (event, rowData) => {
      //F2 新規登録エラーメッセージの初期化
      setRecordErrorMessage([]);
      if (value.data.scan_book_items !== undefined) {
        value.data.scan_book_items.b_items.forEach((str, index) => {
          if (index === rowData.rowIndex) {
            setInitial(str.instore_code);
          }
        });
      }
      if (value.data.scan_soft_items !== undefined) {
        value.data.scan_soft_items.s_items.forEach((str, index) => {
          if (index === rowData.rowIndex) {
            setInitial(str.instore_code);
          }
        });
      }
      const rowSelectedIndex = rowData.rowIndex + 1;
      if (curRowSelectedIndex !== 0) {
        setCurRowSelectedIndex(0);
      }
      setCurRowSelectedIndex(rowSelectedIndex);
      let selectedElement = document.getElementById(
        curRow[0][rowSelectedIndex].id
      );
      curRow[0].forEach((str) => {
        if (str === selectedElement) {
          str.style.backgroundColor = "#CBFFD3";
        } else {
          str.style.backgroundColor = "#FFF";
        }
      });
      setOnclickCursorFlag(true);
    },
    onRowSelectionChange: (allRows, currentSelect, allSelected) => {
      //F2 新規登録エラーメッセージの初期化
      setRecordErrorMessage([]);
      //チェックボックスチェック状態インデックス設定
      setCheckedIndex(allSelected);
      setCheckBox("");
      const rowSelectedIndex =
        allRows.length !== 0 ? allRows[0].dataIndex + 1 : null;
      //チェックボックスのチェックを外す場合、Xインストアコードの値を変更しない。(カーソルが当たっているものに設定)
      if (checkBox.length < currentSelect.length) {
        setCurRowSelectedIndex(rowSelectedIndex);
      }
      const checkboxElement = document.getElementsByClassName(
        "PrivateSwitchBase-input css-1m9pwf3"
      );
      const getCheckedElement = () => {
        let checked = [];
        for (let i = 0; i < checkboxElement.length; i++) {
          if (checkboxElement[i].checked) {
            checked.push(
              checkboxElement[i].parentNode.parentNode.parentNode.parentNode
                .lastChild.innerText
            );
            let checkedWithZero = checked.filter(function (value) {
              return value.match(/[0]/gi);
            });
            setCheckBox(checkedWithZero);
            let selectedElement = document.getElementById(
              curRow[0][rowSelectedIndex].id
            );
            if (
              selectedElement.children[0].children[0].children[0].children[0]
                .checked
            ) {
              curRow[0].forEach((str) => {
                if (str === selectedElement) {
                  str.style.backgroundColor = "#CBFFD3";
                } else {
                  str.style.backgroundColor = "#FFF";
                }
              });
            }
            setOncheckCursorFlag(true);
          }
        }
      };
      getCheckedElement();
      setOnclickCursorFlag(true);
    },
  };

  if (
    selectedElementFlag === false &&
    onclickCursorFlag === false &&
    oncheckCursorFlag === false &&
    selectedRowFlag === false
  ) {
    const tableRecorde = document.querySelectorAll("tr");
    if (tableRecorde.length !== 0) {
      let selectedElement = document.getElementById(tableRecorde[1].id);
      if (selectedElement !== null) {
        tableRecorde.forEach((str) => {
          if (str === selectedElement) {
            str.style.backgroundColor = "#CBFFD3";
          }
        });
      }
    }
  }

  const setScanBookcolumns = () => {
    const scanBookcolumns = () => {
      if (value === null) {
        return;
      } else {
        if (value !== undefined && value.data !== undefined) {
          if (value.data.scan_book_items !== undefined) {
            if (value.data.scan_book_items.provider === "NGA") {
              return NgaColumns;
            } else if (value.data.scan_book_items.provider === "NIP") {
              return NipColumns;
            } else {
              return;
            }
          }
        }
      }
    };

    setScanBookItemColumns(scanBookcolumns);
  };

  useEffect(() => {
    setScanBookcolumns();
  }, [value]);

  const setScanSoftcolumns = () => {
    const scanSoftcolumns = () => {
      if (value === null) {
        return;
      } else {
        if (value !== undefined && value.data !== undefined) {
          if (value.data.scan_soft_items !== undefined) {
            if (value.data.scan_soft_items.provider === "JMD") {
              return JmdColumns;
            } else if (value.data.scan_soft_items.provider === "SKD") {
              return SkdColumns;
            } else {
              return;
            }
          }
        }
      }
    };
    setScanSoftItemColumns(scanSoftcolumns);
  };

  useEffect(() => {
    setScanSoftcolumns();
  }, [value]);

  const setBookItemData = () => {
    const data = () => {
      if (scanBookItems === "") {
        return;
      } else {
        if (scanBookItems.data.scan_book_items.provider === "NGA") {
          return scanBookItems.data.scan_book_items.b_items;
        } else if (scanBookItems.data.scan_book_items.provider === "NIP") {
          return scanBookItems.data.scan_book_items.b_items;
        } else {
          return;
        }
      }
    };

    setScanBookItemData(data);
  };

  useEffect(() => {
    setBookItemData();
  }, [scanBookItems]);

  const setSoftItemData = () => {
    const data = () => {
      if (scanSoftItems === "") {
        return;
      } else {
        if (scanSoftItems.data.scan_soft_items.provider === "JMD") {
          return scanSoftItems.data.scan_soft_items.s_items;
        } else if (scanSoftItems.data.scan_soft_items.provider === "SKD") {
          return scanSoftItems.data.scan_soft_items.s_items;
        } else {
          return;
        }
      }
    };
    setScanSoftItemData(data);
  };

  useEffect(() => {
    setSoftItemData();
  }, [scanSoftItems]);

  const keydownFunc = useCallback((event) => {
    if (event.keyCode === 38) {
      setCurRowSelectedIndex((pre_count) => {
        if (pre_count === 1) {
          const rowSelectedIndex = 1;
          setCurRowSelectedIndex(rowSelectedIndex);
        }

        const pre_countNum = pre_count - 1;
        if (curRow[0][pre_countNum] !== undefined) {
          let selectedElement = document.getElementById(
            curRow[0][pre_countNum].id
          );

          if (selectedElement !== null) {
            setSelectedElementFlag(true);
          }
          if (selectedElement !== null) {
            let elementsByClass = document.getElementsByClassName(
              "PrivateSwitchBase-input css-1m9pwf3"
            );
            elementsByClass[pre_count].scrollIntoView({
              block: "center",
            });

            curRow[0].forEach((str) => {
              if (str === selectedElement) {
                str.style.backgroundColor = "#CBFFD3";
              } else {
                str.style.backgroundColor = "#FFF";
              }
            });
          }
        }

        return pre_count - 1;
      });
    } else if (event.keyCode === 40) {
      setCurRowSelectedIndex((pre_count) => {
        const pre_countNum = pre_count + 1;
        if (curRow[0][pre_countNum] !== undefined) {
          let selectedElement = document.getElementById(
            curRow[0][pre_countNum].id
          );
          if (selectedElement !== null) {
            setSelectedElementFlag(true);
            let elementsByClass = document.getElementsByClassName(
              "PrivateSwitchBase-input css-1m9pwf3"
            );
            if (elementsByClass[pre_count] !== undefined) {
              elementsByClass[pre_count].scrollIntoView({
                block: "center",
              });
              curRow[0].forEach((str) => {
                if (str === selectedElement) {
                  str.style.backgroundColor = "#CBFFD3";
                } else {
                  str.style.backgroundColor = "#FFF";
                }
              });
            }
          }
        }
        //新規商品情報のデータ数取得
        const data = Array.from(curRow[0])
          .filter((item) => {
            return item.id !== "";
          })
          .map((item) => {
            if (!item.firstChild.innerHTML.includes("重複項目")) {
              return item;
            }
          })
          .filter((item) => {
            return item !== undefined;
          });
        //十字キー操作用インデックスカウントアップ(新規商品情報のデータ数までに制御)
        return pre_count < data.length ? pre_count + 1 : data.length;
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keydownFunc, false);
  }, [keydownFunc]);

  return (
    <div className={classes.centeredHeader}>
      <MuiThemeProvider theme={myTheme}>
        <MUIDataTable
          title={items.NEWPRODUCTINFO}
          data={
            value !== undefined && value.data !== undefined
              ? value.data.scan_book_items !== undefined
                ? value.data.scan_book_items.b_items
                : value.data.scan_soft_items !== undefined
                ? value.data.scan_soft_items.s_items
                : nonData
              : nonData
          }
          columns={
            value !== undefined && value.data !== undefined
              ? value.data.scan_book_items !== undefined
                ? scanBookItemColumns
                : value.data.scan_soft_items !== undefined
                ? scanSoftItemColumns
                : nonColumns
              : nonColumns
          }
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default NewProductTable;
