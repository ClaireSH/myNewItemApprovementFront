import React from "react";
import * as states from "../../recoil/RecoilState";
import ListItem from "@mui/material/ListItem";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { TextBox } from "../atoms/TextBox";
import {
  checkErrorAttributrBookGroup1Item,
  chengeToNumvalueGroup1,
} from "../../utils/convertBookAttribute";

/*書籍系属性情報の項目表示コンポーネント:(巻次・巻次数・最終巻次・副書名・副書名カナ・個別書名・個別書名カナ・シリーズ名・シリーズ名カナ
・シリーズ名巻次・副シリーズ名・副シリーズ名カナ・副シリーズ名巻次)*/
export const AttributrBookGroup1Item = ({
  item,
  setItemAttributeBookInfo,
  bookAttributeGroup1,
}) => {
  const setAttributeBookGroup1Error = useSetRecoilState(
    states.attributeBookGroup1Error
  );

  //書籍系属性情報更新関数
  const handleChange = (event, label) => {
    let value = event.target.value;
    setItemAttributeBookInfo((prevState) => ({
      ...prevState,
      [label]: value, //入力した項目のラベルをそのままキーに設定
    }));
  };
  //エラーチェック関数
  const isError = (value, label, pattern) => {
    //巻次・巻次数バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup1(label, value);
    switch (label) {
      case "volume_no":
      case "volume_last_no":
        return numValue > pattern.maxValue || isNaN(value);
      case "volume":
      case "subtitle":
      case "subtitle_kana":
      case "volume_title":
      case "volume_title_kana":
      case "series_name":
      case "series_name_kana":
      case "series_volume":
      case "subseries_name":
      case "subseries_name_kana":
      case "subseries_volume":
        return value.length > pattern.maxLength;
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    //巻次・巻次数バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup1(label, value);
    switch (label) {
      case "volume_no":
      case "volume_last_no":
        return numValue > pattern.maxValue
          ? message.MAXNUM999
          : isNaN(value)
          ? message.HALFSIZENUMBER
          : null;
      case "volume":
      case "subtitle":
      case "subtitle_kana":
      case "volume_title":
      case "volume_title_kana":
      case "series_name":
      case "series_name_kana":
      case "series_volume":
      case "subseries_name":
      case "subseries_name_kana":
      case "subseries_volume":
        return value.length > pattern.maxLength ? message.MAX256 : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, bookAttributeGroup1) => {
    const checkedErrorItem = bookAttributeGroup1
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorAttributrBookGroup1Item[list.label](
          bookAttributeGroup1
        );
      });
    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, bookAttributeGroup1) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setAttributeBookGroup1Error(true)
      : setAttributeBookGroup1Error(false);
  }, [item.value, item.label, item.pattern, bookAttributeGroup1]);

  return (
    <ListItem>
      <TextBox
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
    </ListItem>
  );
};
