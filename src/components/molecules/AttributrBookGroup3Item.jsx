import React from "react";
import * as states from "../../recoil/RecoilState";
import ListItem from "@mui/material/ListItem";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { TextBox } from "../atoms/TextBox";
import { checkErrorAttributrBookGroup3Item } from "../../utils/convertBookAttribute";

/*書籍系属性情報の項目表示コンポーネント:(サイズ情報
・判型・NDC分類・BOOKPAGE分類・雑誌コード)*/
export const AttributrBookGroup3Item = ({
  item,
  setItemAttributeBookInfo,
  bookAttributeGroup3,
}) => {
  const setAttributeBookGroup3Error = useSetRecoilState(
    states.attributeBookGroup3Error
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
    switch (label) {
      case "size":
      case "format":
        return value.length > pattern.maxLength;
      case "ndc_code":
        return (
          (value.length !== 0 && value.length !== pattern.numLength) ||
          !pattern.value?.test(value)
        );
      case "bookpage_code":
        return value.length !== 0 && value.length !== pattern.numLength;
      case "magazine_code":
        return (
          (value.length !== 0 && value.length !== pattern.numLength) ||
          !pattern.value?.test(value)
        );
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    switch (label) {
      case "size":
        return value.length > pattern.maxLength ? message.MAX32 : null;
      case "format":
        return value.length > pattern.maxLength ? message.MAX100 : null;
      case "ndc_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM2
          : !pattern.value?.test(value)
          ? message.ALPHANUMERAL
          : null;
      case "bookpage_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM4
          : !pattern.value?.test(value)
          ? message.FIRSTUPPERCASE_AND_THREEDIGITNUMBER
          : null;
      case "magazine_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM7
          : !pattern.value?.test(value)
          ? message.NUMBER
          : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, bookAttributeGroup3) => {
    const checkedErrorItem = bookAttributeGroup3
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorAttributrBookGroup3Item[list.label](
          bookAttributeGroup3
        );
      });
    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, bookAttributeGroup3) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setAttributeBookGroup3Error(true)
      : setAttributeBookGroup3Error(false);
  }, [item.value, item.label, item.pattern, bookAttributeGroup3]);

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
