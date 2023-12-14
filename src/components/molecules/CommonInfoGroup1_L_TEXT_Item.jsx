import React from "react";
import * as states from "../../recoil/RecoilState";
import { Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { TextBox } from "../atoms/TextBox";
import { checkErrorCommonInfoGroup1Item } from "../../utils/convertItemCommonInfo";

//共通情報の項目表示コンポーネント:  インストアコード・JANコード・商品名・商品名カナ・商品名英字
export const CommonInfoGroup1_L_TEXT_Item = ({
  item,
  setItemCommonInfo,
  commonInfoGroup1,
}) => {
  const setCommonInfoGroup1Error = useSetRecoilState(
    states.commonInfoGroup1Error
  );

  //共通情報更新関数　インストアコード・JANコード・商品名・商品名カナ・商品名英字
  const handleChange = (event, label) => {
    const value = event.target.value;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  //エラーチェック関数
  const isError = (value, label, pattern) => {
    switch (label) {
      case "jan_code":
        return value.length > pattern.maxLength || !pattern.value?.test(value);
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    switch (label) {
      case "jan_code":
        return value.length > pattern.maxLength
          ? message.MAX13
          : !pattern.value?.test(value)
          ? message.ALPHANUMERAL
          : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, commonInfoGroup1) => {
    const newCommonInfoGroup1 = [...commonInfoGroup1].filter((list) => {
      return list.label !== "instore_code";
    });
    const checkedErrorItem = newCommonInfoGroup1
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorCommonInfoGroup1Item[list.label](newCommonInfoGroup1);
      });
    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, commonInfoGroup1) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setCommonInfoGroup1Error(true)
      : setCommonInfoGroup1Error(false);
  }, [item.value, item.label, item.pattern, commonInfoGroup1]);

  return (
    <ListItem>
      <Grid item xs={4}>
        <TextBox
          id="outlined-required"
          disabled={item.disabled}
          value={item.value}
          sx={{
            width: 422,
          }}
          InputProps={{ sx: { height: 40 } }}
          error={isError(item.value, item.label, item.pattern)}
          helperText={showErrorMessage(item?.value, item.label, item.pattern)}
          onChange={(e) => handleChange(e, item.label)}
        />
      </Grid>
    </ListItem>
  );
};
