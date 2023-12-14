import React from "react";
import * as states from "../../recoil/RecoilState";
import TextField from "@mui/material/TextField";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { chengeToNumvalueGroup2 } from "../../utils/convertItemCommonInfo";
import {
  checkErrorCommonInfoGroup2Item,
  isErrorOtherItem,
} from "../../utils/convertItemCommonInfo";

export const CommonInfoPriceText = ({
  item,
  setItemCommonInfo,
  commonInfoGroup2,
}) => {
  const setCommonInfoGroup2Error = useSetRecoilState(
    states.commonInfoGroup2Error
  );

  //共通情報更新関数：価格
  const itempriceHandleChange = (event, label) => {
    let value = event.target.value;
    //未入力、空文字入力、文字列入力の場合、nullにする。(ライブラリの表示仕様上)
    const numValue = chengeToNumvalueGroup2(
      label,
      value,
      event.nativeEvent.inputType
    );
    setItemCommonInfo((prevState) => ({
      ...prevState,
      price: numValue,
    }));
  };

  //エラーチェック関数
  const isError = (value, label, pattern) => {
    //価格バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup2(label, value);
    switch (label) {
      case "price":
        return numValue > pattern.maxValue || numValue === null;
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    //価格バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup2(label, value);
    switch (label) {
      case "price":
        return numValue > pattern.maxValue
          ? message.MAXNUM99999999
          : numValue === null
          ? message.REQUIRED
          : null;
    }
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, item.label1, commonInfoGroup2) || //入力項目以外のエラー検知
    isError(item.value.price, item.label1, item.pattern)
      ? setCommonInfoGroup2Error(true)
      : setCommonInfoGroup2Error(false);
  }, [
    item.value.price,
    item.label,
    item.label1,
    item.pattern,
    commonInfoGroup2,
  ]);

  return (
    <TextField
      id="outlined-required"
      value={item.value.price}
      sx={{
        width: 270,
      }}
      InputProps={{ sx: { height: 40 } }}
      error={isError(item.value.price, item.label1, item.pattern)}
      helperText={showErrorMessage(item.value.price, item.label1, item.pattern)}
      onChange={(e) => itempriceHandleChange(e, item.label1)}
    />
  );
};
