import React from "react";
import * as states from "../../recoil/RecoilState";
import { Grid } from "@mui/material";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { TextBox } from "../atoms/TextBox";
import { isErrorOtherItem } from "../../utils/convertItemCommonInfo";

//共通情報の項目表示コンポーネント:  商品名・限定表示
export const CommonInfoGroup2_M_TEXT_Item = ({
  item,
  setItemCommonInfo,
  commonInfoGroup2,
}) => {
  const setCommonInfoGroup2Error = useSetRecoilState(
    states.commonInfoGroup2Error
  );

  //共通情報更新関数：限定表示　(商品名は編集不要)
  const handleChange = (event, label) => {
    let value = event.target.value;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  //エラーチェック関数　(商品名はチェック不要)
  const isError = (value, label, pattern) => {
    switch (label) {
      case "limited_remark":
        return value.length > pattern.maxLength;
    }
  };

  //エラーメッセージ表示関数　(商品名はチェック不要)
  const showErrorMessage = (value, label, pattern) => {
    switch (label) {
      case "limited_remark":
        return value.length > pattern.maxLength ? message.MAX50 : null;
    }
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, item.label1, commonInfoGroup2) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setCommonInfoGroup2Error(true)
      : setCommonInfoGroup2Error(false);
  }, [item.value, item.label, item.label1, item.pattern, commonInfoGroup2]);

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
        onChange={(event) => handleChange(event, item.label)}
      />
    </Grid>
  );
};
