import React from "react";
import * as states from "../../recoil/RecoilState";
import { Grid } from "@mui/material";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { TextBox } from "../atoms/TextBox";
import { checkErrorCommonInfoGroup3Item } from "../../utils/convertItemCommonInfo";

//共通情報の項目表示コンポーネント:  コンテンツ名・サブコンテンツ名
export const CommonInfoGroup3_M_TEXT_Item = ({
  item,
  setItemCommonInfo,
  commonInfoGroup3,
}) => {
  const setCommonInfoGroup3Error = useSetRecoilState(
    states.commonInfoGroup3Error
  );

  //共通情報更新関数：コンテンツ名・サブコンテンツ名
  const handleChange = (event, label) => {
    let value = event.target.value;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  //エラーチェック関数
  const isError = (value, label, pattern) => {
    switch (label) {
      case "contents_name":
      case "subcontents_name":
        return value.length > pattern.maxLength;
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    switch (label) {
      case "contents_name":
      case "subcontents_name":
        return value.length > pattern.maxLength ? message.MAX256 : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, commonInfoGroup3) => {
    const newCommonInfoGroup3 = [...commonInfoGroup3].filter((list) => {
      return (
        list.label === "contents_name" || list.label === "subcontents_name"
      );
    });
    const checkedErrorItem = newCommonInfoGroup3
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorCommonInfoGroup3Item[list.label](newCommonInfoGroup3);
      });
    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, commonInfoGroup3) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setCommonInfoGroup3Error(true)
      : setCommonInfoGroup3Error(false);
  }, [item.value, item.label, item.pattern, commonInfoGroup3]);

  return (
    <Grid item xs={8}>
      <TextBox
        id="outlined-required"
        disabled={item.disabled}
        value={item.value}
        sx={{
          width: 270,
        }}
        InputProps={{ sx: { height: 40 } }}
        error={isError(item.value, item.label, item.pattern)}
        helperText={showErrorMessage(item?.value, item.label, item.pattern)}
        onChange={(e) => handleChange(e, item.label)}
      />
    </Grid>
  );
};
