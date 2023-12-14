import React, { useCallback, useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import * as states from "./../recoil/RecoilState";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import NewProductTable from "../components/organisms/NewProductTable";
import DuplicateProductTable from "../components/organisms/DuplicateProductTable";
import { bookIndexs } from "../components/organisms/ImportExternalFilesTable";
import { softIndexs } from "../components/organisms/ImportExternalFilesTable";
import useStyles from "../style/listStyles";
import { items } from "../config/Titles";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useScanBookItems } from "../api/useScanBookItems";
import { useScanSoftItems } from "../api/useScanSoftItems";
import { useDeleteItem } from "../api/useDeleteItem";
import { useHistory } from "react-router-dom";
import { useF3UpdateItem } from "../api/useF3UpdateItem";
import { useF2RecordItem } from "../api/useF2RecordItem";

export let importBookGroupType = [];
export let importBookNumber = [];

export let imporSoftGroupType = [];
export let importSoftNumber = [];

export let localScanBookItems = [];

export default function NewProductInfoList() {
  const { scanBookItems } = useScanBookItems();
  const { scanSoftItems } = useScanSoftItems();
  const { upDateF3Items } = useF3UpdateItem();
  const { putNewItem } = useF2RecordItem();
  const [checkBox, setCheckBox] = useRecoilState(states.checkBoxInstoreCode);
  const initial = useRecoilValue(states.initialInstoreCode);
  const [resisteredItemFlag, setResisteredItemFlag] = useRecoilState(
    states.resisteredItemFlag
  );
  const [f2RecordFlag, setF2RecordFlag] = useRecoilState(states.f2RecordFlag);
  const [value, setValue] = useRecoilState(states.itemValue);
  const { deleteItem, deletedItemFlag, setDeletedItemFlag, setf4Flag } =
    useDeleteItem();
  const history = useHistory();
  const userInfo = useRecoilValue(states.userInfo);
  const [updateInstoreCode, setUpdateInstoreCode] = useRecoilState(
    states.updateInstoreCode
  );
  const itemCount = useRecoilValue(states.itemCounts);
  const dupItemCount = useRecoilValue(states.dupItemCount);
  const setSelectedRowFlag = useSetRecoilState(states.selectedRowFlag);
  const setOnclickCursorFlag = useSetRecoilState(states.onclickCursorFlag);
  const [recordErrorMessage, setRecordErrorMessage] = useRecoilState(
    states.recordErrorMessage
  );
  const setCheckedIndex = useSetRecoilState(states.checkedIndex);

  useEffect(() => {
    setValue("");
    if (scanBookItems !== "") {
      setValue(scanBookItems);
    } else if (scanSoftItems !== "") {
      setValue(scanSoftItems);
    }
  }, [scanBookItems, scanSoftItems]);

  useEffect(() => {
    setSelectedRowFlag(false);
    setOnclickCursorFlag(false);
    setCheckBox("");
  }, []);

  const bookIndex = bookIndexs.map((str) => str.import_group_type);
  importBookGroupType = bookIndex[0];

  const bookIndex2 = bookIndexs.map((str) => str.import_no);
  importBookNumber = bookIndex2[0];

  const softIndex = softIndexs.map((str) => str.import_group_type);
  imporSoftGroupType = softIndex[0];

  const softIndex2 = softIndexs.map((str) => str.import_no);
  importSoftNumber = softIndex2[0];

  const classes = useStyles();

  useEffect(() => {
    setUpdateInstoreCode("");
  }, []);

  const f2Function = useCallback(
    (event) => {
      let checkBoxFlag = false;
      checkBoxFlag = checkBox !== "" ? true : false;
      //F2キー押下で商品数が0でないもしくはF2新規登録中でない場合リクエストする。
      if (
        event.keyCode === 113 &&
        (itemCount !== 0 || f2RecordFlag === false)
      ) {
        if (checkBox !== "") {
          checkBox.forEach((str) => {
            putNewItem(str, checkBoxFlag);
          });
        } else if (checkBox === "") {
          putNewItem(initial, checkBoxFlag);
        }
        //F2新規登録フラグ更新
        setF2RecordFlag(true);
      }
      //チェック状態リセット
      setCheckedIndex([]);
    },
    [initial, checkBox, itemCount, f2RecordFlag]
  );

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", f2Function, false);
      return () => {
        document.removeEventListener("keydown", f2Function, false);
      };
    }
  }, [f2Function]);

  useEffect(() => {
    if (resisteredItemFlag === true) {
      if (value.data.scan_book_items !== undefined) {
        let newValue = "";
        if (checkBox.length !== 0) {
          newValue = value.data.scan_book_items.b_items.filter((str) => {
            if (!checkBox.includes(str.instore_code)) {
              return str;
            }
          });
          let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
          newObj.data.scan_book_items.b_items = newValue;
          setValue(newObj);
        } else if (initial !== "") {
          newValue = value.data.scan_book_items.b_items.filter((str) => {
            if (str.instore_code !== initial) {
              return str;
            }
          });
        }
        let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
        newObj.data.scan_book_items.b_items = newValue;
        setValue(newObj);
      } else if (value.data.scan_soft_items !== undefined) {
        let newValue = "";
        if (checkBox.length !== 0) {
          newValue = value.data.scan_soft_items.s_items.filter((str) => {
            if (!checkBox.includes(str.instore_code)) {
              return str;
            }
          });
          let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
          newObj.data.scan_soft_items.s_items = newValue;
          setValue(newObj);
        } else if (initial !== "") {
          newValue = value.data.scan_soft_items.s_items.filter((str) => {
            if (str.instore_code !== initial) {
              return str;
            }
          });
        }
        let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
        newObj.data.scan_soft_items.s_items = newValue;
        setValue(newObj);
      }
    } else {
      return;
    }
    //F2新規登録フラグ初期化
    setF2RecordFlag(false);
    setResisteredItemFlag(false);
  }, [resisteredItemFlag]);

  const f3Function = useCallback(
    (event) => {
      if (event.keyCode === 114 && dupItemCount !== 0) {
        if (checkBox !== "") {
          checkBox.forEach((str) => {
            upDateF3Items("", str);
          });
        } else if (checkBox === "") {
          upDateF3Items(updateInstoreCode, initial);
        }
        event.preventDefault();
        return false;
      }
      //チェック状態リセット
      setCheckedIndex([]);
    },
    [initial, updateInstoreCode, dupItemCount, checkBox]
  );

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", f3Function, false);
      return () => {
        document.removeEventListener("keydown", f3Function, false);
      };
    }
  }, [f3Function]);

  const f4Function = useCallback(
    (event) => {
      setf4Flag(true);
      if (event.keyCode === 115 && itemCount !== 0) {
        deleteItem(initial);
        event.preventDefault();
        return false;
      }
    },
    [initial, itemCount]
  );

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", f4Function, false);
      return () => {
        document.removeEventListener("keydown", f4Function, false);
      };
    }
  }, [f4Function]);

  useEffect(() => {
    if (deletedItemFlag === true) {
      if (value.data.scan_book_items !== undefined) {
        let newValue = "";
        if (checkBox.length !== 0) {
          newValue = value.data.scan_book_items.b_items.filter((str) => {
            if (!checkBox.includes(str.instore_code)) {
              return str;
            }
          });
          let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
          newObj.data.scan_book_items.b_items = newValue;
          setValue(newObj);
        } else if (initial !== "") {
          newValue = value.data.scan_book_items.b_items.filter((str) => {
            if (str.instore_code !== initial) {
              return str;
            }
          });
        }
        let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
        newObj.data.scan_book_items.b_items = newValue;
        setValue(newObj);
      } else if (value.data.scan_soft_items !== undefined) {
        let newValue = "";
        if (checkBox.length !== 0) {
          newValue = value.data.scan_soft_items.s_items.filter((str) => {
            if (!checkBox.includes(str.instore_code)) {
              return str;
            }
          });
          let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
          newObj.data.scan_soft_items.s_items = newValue;
          setValue(newObj);
        } else if (initial !== "") {
          newValue = value.data.scan_soft_items.s_items.filter((str) => {
            if (str.instore_code !== initial) {
              return str;
            }
          });
        }
        let newObj = Object.assign({}, JSON.parse(JSON.stringify(value)));
        newObj.data.scan_soft_items.s_items = newValue;
        setValue(newObj);
      }
    } else {
      return;
    }
    setf4Flag(false);
    setDeletedItemFlag(false);
  }, [deletedItemFlag]);

  const F1Function = useCallback(
    (event) => {
      if (event.key === "F1" && itemCount !== 0) {
        history.push("/newProductDetail", {
          state: {
            scanBookItem: scanBookItems,
            scanSoftItem: scanSoftItems,
          },
        });
        event.preventDefault();
        return false;
      }
    },
    [scanBookItems, scanSoftItems, itemCount]
  );

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", F1Function, false);
      return () => {
        document.removeEventListener("keydown", F1Function, false);
      };
    }
  }, [F1Function]);

  const onClickTransition = () => {
    history.push("/newProductDetail", {
      state: {
        scanBookItem: scanBookItems,
        scanSoftItem: scanSoftItems,
      },
    });
  };

  const onClickRecord = () => {
    let checkBoxFlag = false;
    checkBoxFlag = checkBox !== "" ? true : false;
    if (checkBox !== "") {
      checkBox.forEach((str) => {
        putNewItem(str, checkBoxFlag);
      });
    } else if (checkBox === "") {
      putNewItem(initial, checkBoxFlag);
    }
    //F2新規登録フラグ更新
    setF2RecordFlag(true);
    //チェック状態リセット
    setCheckedIndex([]);
  };

  const onClickDelete = () => {
    setf4Flag(true);
    deleteItem(initial);
  };

  const onClickUpdate = () => {
    if (checkBox !== "") {
      checkBox.forEach((str) => {
        upDateF3Items("", str);
      });
    } else if (checkBox === "") {
      upDateF3Items(updateInstoreCode, initial);
    }
    //チェック状態リセット
    setCheckedIndex([]);
  };

  const onClickBack = () => {
    history.push("/");
    //F2 新規登録エラーメッセージの初期化
    setRecordErrorMessage([]);
  };

  const f12Function = useCallback((event) => {
    if (event.key === "F12") {
      history.goBack();
      //F2 新規登録エラーメッセージの初期化
      setRecordErrorMessage([]);
      event.preventDefault();
      return false;
    }
  }, []);

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", f12Function, false);
      return () => {
        document.removeEventListener("keydown", f12Function, false);
      };
    }
  }, [f12Function]);

  return (
    <main className={classes.content}>
      <Toolbar id="back-to-top-anchor" variant="dense" />
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Typography
          variant="h5"
          gutterBottom
          color="primary"
          className={classes.title}
        >
          {items.LIST2}
        </Typography>
      </Container>
      <Divider style={{ height: 2 }} />
      <Container maxWidth={true} disableGutters className={classes.container2}>
        <Grid container paddingLeft="1.5em" xs={8}>
          <Grid xs>{items.INPUTNUMBER}</Grid>
          <Grid item xs>
            {scanBookItems !== "" || scanSoftItems !== ""
              ? scanBookItems !== ""
                ? scanBookItems.data.scan_book_items.import_no
                : scanSoftItems !== ""
                ? scanSoftItems.data.scan_soft_items.import_no
                : null
              : null}
          </Grid>
          <Grid item xs>
            {items.COMPANY}
          </Grid>
          <Grid item xs>
            {scanBookItems !== "" || scanSoftItems !== ""
              ? scanBookItems !== ""
                ? scanBookItems.data.scan_book_items.provider
                : scanSoftItems !== ""
                ? scanSoftItems.data.scan_soft_items.provider
                : null
              : null}
          </Grid>
          <Grid item xs>
            {items.IMPORTTYPE}
          </Grid>
          <Grid item xs>
            {scanBookItems !== "" || scanSoftItems !== ""
              ? scanBookItems !== ""
                ? scanBookItems.data.scan_book_items.import_group_type
                : scanSoftItems !== ""
                ? scanSoftItems.data.scan_soft_items.import_group_type
                : null
              : null}
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={true} disableGutters className={classes.container2}>
        <Grid container>
          <Grid xs={10}></Grid>
          <Grid item xs>
            {items.COUNT}
          </Grid>
          <Grid item xs>
            {value !== undefined && value.data !== undefined
              ? value.data.scan_book_items !== undefined
                ? `${value.data.scan_book_items.b_items.length} 件`
                : value.data.scan_soft_items !== undefined
                ? `${value.data.scan_soft_items.s_items.length} 件`
                : `件`
              : `件`}
          </Grid>
        </Grid>
      </Container>
      <Divider style={{ height: 2 }} />
      <div style={{ paddingLeft: 25, paddingRight: 25 }}>
        {userInfo.userName !== "" ? <NewProductTable /> : null}
      </div>
      <Divider style={{ height: 2 }} />
      <Container
        maxWidth={false}
        disableGutters
        className={classes.container2}
      ></Container>
      <div style={{ paddingLeft: 25, paddingRight: 25 }}>
        {userInfo.userName !== "" ? <DuplicateProductTable /> : null}
      </div>
      <Divider style={{ height: 2 }} />
      <Container maxWidth={true} disableGutters className={classes.container2}>
        <Grid container paddingLeft="1.5em">
          <div>
            <button
              className={classes.button}
              disabled={itemCount === 0 ? true : false}
              onClick={onClickTransition}
            >
              {items.F1DETAIL}
            </button>
          </div>
          <div style={{ paddingLeft: 10 }}>
            <button
              className={classes.button}
              //商品数0もしくはF2新規登録中の場合disabledにする
              disabled={itemCount === 0 || f2RecordFlag ? true : false}
              onClick={onClickRecord}
            >
              {items.F2CREATE}
            </button>
          </div>
          <div style={{ paddingLeft: 10 }}>
            <button
              className={classes.button}
              disabled={dupItemCount === 0 || itemCount === 0 ? true : false}
              onClick={onClickUpdate}
            >
              {items.F3UPDATE}
            </button>
          </div>
          <div style={{ paddingLeft: 10 }}>
            <button
              className={classes.button}
              disabled={itemCount === 0 ? true : false}
              onClick={onClickDelete}
            >
              {items.F4DELETE}
            </button>
          </div>
          {/* 新規登録エラーメッセージ */}
          <div className={classes.recordErrorMessage}>
            {recordErrorMessage.map((message) => (
              <ul className={classes.recordErrorMessage_ul}>
                <li>{message}</li>
              </ul>
            ))}
          </div>
          <div
            style={{ marginRight: 20, marginLeft: "auto", display: "block" }}
          >
            <button onClick={onClickBack} className={classes.button}>
              {items.F12BACK}
            </button>
          </div>
        </Grid>
      </Container>
    </main>
  );
}
