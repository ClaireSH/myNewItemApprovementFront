import React from "react";
import * as states from "../../recoil/RecoilState";
import TextField from "@mui/material/TextField";
import { message } from "../../config/Message";
import { chengeToNumvalueSoftInfo } from "../../utils/convertSoftAttribute";
import { useEffect } from "react";
import { checkErrorSoftAttributeGroup2Item } from "../../utils/convertSoftAttribute";
import { useSetRecoilState } from "recoil";

/*ソフト系属性情報の項目表示コンポーネント:旧品番・再発売商品番号・同類商品・商品形状・特典情報・マスタリング情報・録音年等・プロモーション備考・
セット数・総作品数・総収録時間・作品数・収録時間・メディア形態補足1・メディア形態補足2*/
export const AttributrSoftGroup2_M_TEXT_Item = ({
  item,
  setItemAttributeSoftInfo,
  softAttributeGroup2,
}) => {
  const setAttributeSoftGroup2Error = useSetRecoilState(
    states.attributeSoftGroup2Error
  );
  //ソフト系属性情報更新関数
  const handleChange = (event, label) => {
    let value = //セット数・総作品数・作品数が空文字入力の場合nullでリクエストする
      (label === "set_count" || label === "total_works" || label === "works") &&
      !event.target.value
        ? null
        : event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  //エラーチェック関数
  const isError = (value, label, pattern) => {
    //セット数・総作品数・作品数バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(label, value);
    switch (label) {
      case "old_speccode":
      case "rerelease_item_number":
      case "similar_item":
      case "media_info":
      case "item_shape":
      case "benefits":
      case "mastering_info":
      case "recording_info":
      case "promotion_remark":
        return value.length > pattern.maxLength;
      case "set_count":
      case "total_works":
      case "works":
        return numValue > pattern.maxValue || !pattern.value?.test(value);
      case "total_run_time":
        return value.length !== pattern.numLength && value.length !== 0;
      case "run_time":
      case "media_format_remark1":
        return value.length !== pattern.numLength && value.length !== 0;
      case "media_format_remark2":
        return (
          !pattern.value?.test(value) ||
          (value.length !== pattern.numLength && value.length !== 0)
        );
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    //セット数・総作品数・作品数バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(label, value);
    switch (label) {
      case "old_speccode":
      case "rerelease_item_number":
      case "similar_item":
      case "media_info":
      case "item_shape":
      case "benefits":
      case "mastering_info":
      case "recording_info":
      case "promotion_remark":
        return value.length > pattern.maxLength ? message.MAX512 : null;
      case "set_count":
      case "total_works":
        return numValue > pattern.maxValue
          ? message.MAXNUM99999999
          : !pattern.value?.test(value)
          ? message.NUMBER
          : null;
      case "total_run_time":
        return value.length !== pattern.numLength && value.length !== 0
          ? message.NUM6
          : null;
      case "run_time":
        return !pattern.value?.test(value)
          ? message.NUMBER
          : value.length !== pattern.numLength && value.length !== 0
          ? message.NUM6
          : null;
      case "works":
        return numValue > pattern.maxValue
          ? message.MAXNUM9999
          : !pattern.value?.test(value)
          ? message.NUMBER
          : null;
      case "media_format_remark1":
        return !pattern.value?.test(value)
          ? message.NUMBER
          : value.length !== pattern.numLength && value.length !== 0
          ? message.NUM3
          : null;
      case "media_format_remark2":
        return !pattern.value?.test(value)
          ? message.NUMBER
          : value.length !== pattern.numLength && value.length !== 0
          ? message.NUM3
          : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, softAttributeGroup2) => {
    const newSoftAttributeGroup2 = [...softAttributeGroup2].filter((list) => {
      return (
        list.label === "old_speccode" ||
        list.label === "rerelease_item_number" ||
        list.label === "similar_item" ||
        list.label === "media_info" ||
        list.label === "benefits" ||
        list.label === "mastering_info" ||
        list.label === "recording_info" ||
        list.label === "region_code" ||
        list.label === "promotion_remark" ||
        list.label === "set_count" ||
        list.label === "total_works" ||
        list.label === "total_run_time" ||
        list.label === "run_time" ||
        list.label === "works" ||
        list.label === "media_format_remark1" ||
        list.label === "media_format_remark2"
      );
    });
    const checkedErrorItem = newSoftAttributeGroup2
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorSoftAttributeGroup2Item[list.label](
          newSoftAttributeGroup2
        );
      });
    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, softAttributeGroup2) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setAttributeSoftGroup2Error(true)
      : setAttributeSoftGroup2Error(false);
  }, [item.value, item.label, item.pattern, softAttributeGroup2]);

  return (
    <TextField
      id="outlined-required"
      value={item.value}
      sx={{
        width: 2000,
      }}
      InputProps={{ sx: { height: 40 } }}
      error={isError(item.value, item.label, item.pattern)}
      helperText={showErrorMessage(item?.value, item.label, item.pattern)}
      onChange={(event) => handleChange(event, item.label)}
    />
  );
};
