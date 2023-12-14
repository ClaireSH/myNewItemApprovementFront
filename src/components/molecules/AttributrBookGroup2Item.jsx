import React from "react";
import * as states from "../../recoil/RecoilState";
import ListItem from "@mui/material/ListItem";
import { message } from "../../config/Message";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { TextBox } from "../atoms/TextBox";
import { checkErrorAttributrBookGroup2Item } from "../../utils/convertBookAttribute";

/*書籍系属性情報の項目表示コンポーネント:(出版社名
・発売会社名・販売形態・発行形態・内容コード)*/
export const AttributrBookGroup2Item = ({
  item,
  setItemAttributeBookInfo,
  bookAttributeGroup2,
}) => {
  const setAttributeBookGroup2Error = useSetRecoilState(
    states.attributeBookGroup2Error
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
      case "publisher":
      case "distributor":
        return value.length > pattern.maxLength;
      case "sales_target_code":
        return value.length !== pattern.numLength && value.length !== 0;
      case "publication_form_code":
        return (
          (value.length !== pattern.numLength && value.length !== 0) ||
          isNaN(value)
        );
      case "classification_code":
        return (
          (value.length !== pattern.numLength && value.length !== 0) ||
          !pattern.value?.test(value)
        );
    }
  };

  //エラーメッセージ表示関数
  const showErrorMessage = (value, label, pattern) => {
    switch (label) {
      case "publisher":
      case "distributor":
        return value.length > pattern.maxLength ? message.MAX256 : null;
      case "sales_target_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM1
          : null;
      case "publication_form_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM1
          : isNaN(value)
          ? message.NUMBER
          : null;
      case "classification_code":
        return value.length !== 0 && value.length !== pattern.numLength
          ? message.NUM2
          : !pattern.value?.test(value)
          ? message.NUMBER
          : null;
    }
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, bookAttributeGroup2) => {
    const checkedErrorItem = bookAttributeGroup2
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorAttributrBookGroup2Item[list.label](
          bookAttributeGroup2
        );
      });
    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isErrorOtherItem(item.label, bookAttributeGroup2) || //入力項目以外のエラー検知
    isError(item.value, item.label, item.pattern) //入力項目のエラー検知
      ? setAttributeBookGroup2Error(true)
      : setAttributeBookGroup2Error(false);
  }, [item.value, item.label, item.pattern, bookAttributeGroup2]);

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
