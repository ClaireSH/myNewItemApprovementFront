import React from "react";
import * as states from "../../recoil/RecoilState";
import TextField from "@mui/material/TextField";
import { message } from "../../config/Message";
import { chengeToNumvalueSoftInfo } from "../../utils/convertSoftAttribute";
import { useEffect } from "react";
import { checkErrorSoftAttributeGroup1Item } from "../../utils/convertSoftAttribute";
import { useRecoilValue, useSetRecoilState } from "recoil";

//ソフト系属性情報の項目表示コンポーネント:  規格品番・タイトル規格品番・販売会社・発売会社・組数・トラック数・時間・リージョンコード・廃盤日
export const AttributrSoftGroup1_M_TEXT_Item = ({
  item,
  setItemAttributeSoftInfo,
  softAttributeGroup1,
}) => {
  const selectedTimeAndDay = useRecoilValue(states.selectedTimeAndDay);
  const setAttributeSoftGroup1Error = useSetRecoilState(
    states.attributeSoftGroup1Error
  );

  //ソフト系属性情報更新関数
  const handleChange = (event, label) => {
    let value = //組数・トラック数が空文字入力の場合nullでリクエストする
      (label === "disc_count" || label === "total_track") && !event.target.value
        ? null
        : event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  //エラーチェック関数
  const isError = (value, label, pattern) => {
    //組数・トラック数バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(label, value);
    switch (label) {
      case "speccode":
        return (
          value.length > pattern.maxLength ||
          (value.length === 0 && pattern.required)
        );
      case "title_speccode":
      case "vendor":
      case "distributor":
        return value.length > pattern.maxLength;
      case "disc_count":
      case "total_track":
        return numValue > pattern.maxValue || !pattern.value?.test(value);
      case "time":
        return (
          !pattern.value?.test(value) ||
          (value.length !== 0 &&
            value.length !== pattern.numLength &&
            value.length !== 0)
        );
      case "region_code":
        return (
          (value.length !== 0 && value.length !== pattern.numLength) ||
          !pattern.value?.test(value)
        );

      case "discontinued_date":
        return (
          !pattern.value?.test(value) ||
          (value.length !== pattern.numLength && value.length !== 0)
        );
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    //組数・トラック数バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(label, value);
    switch (label) {
      case "speccode":
        return value.length > pattern.maxLength
          ? message.MAX20
          : value.length === 0 && pattern.required
          ? message.REQUIRED
          : null;
      case "title_speccode":
        return value.length > pattern.maxLength ? message.MAX20 : null;
      case "vendor":
      case "distributor":
        return value.length > pattern.maxLength ? message.MAX256 : null;
      case "disc_count":
      case "total_track":
        return numValue > pattern.maxValue
          ? message.MAXNUM999
          : !pattern.value?.test(value)
          ? message.NUMBER
          : null;
      case "time":
        return !pattern.value?.test(value)
          ? message.NUMBER
          : value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM6
          : null;
      case "region_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM1
          : !pattern.value?.test(value)
          ? message.HALFWidth_ALPHANUMERAL
          : null;
      case "discontinued_date":
        return !pattern.value?.test(value)
          ? message.NUMBER
          : value.length !== pattern.numLength && value.length !== 0
          ? message.NUM8
          : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (
    labels,
    softAttributeGroup1,
    selectedTimeAndDay
  ) => {
    const newSoftAttributeGroup1 = [...softAttributeGroup1].filter((list) => {
      return (
        list.label === "speccode" ||
        list.label === "title_speccode" ||
        list.label === "vendor" ||
        list.label === "distributor" ||
        list.label === "disc_count" ||
        list.label === "total_track" ||
        list.label === "time" ||
        list.label === "region_code" ||
        list.label === "discontinued_date"
      );
    });
    const checkedErrorItem = newSoftAttributeGroup1
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorSoftAttributeGroup1Item[list.label](
          newSoftAttributeGroup1
        );
      });
    return checkedErrorItem.includes(true) ||
      selectedTimeAndDay === "NaNa-Na-NTaN:aN"
      ? true
      : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isError(item.value, item.label, item.pattern) || //入力項目のエラー検知
    isErrorOtherItem(item.label, softAttributeGroup1, selectedTimeAndDay) //入力項目以外のエラー検知
      ? setAttributeSoftGroup1Error(true)
      : setAttributeSoftGroup1Error(false);
  }, [item.value, item.label, item.pattern, softAttributeGroup1]);

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
