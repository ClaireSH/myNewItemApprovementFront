import React from "react";
import useStyles from "../../style/listStyles";
import { message } from "../../config/Message";
import { TextBox } from "../atoms/TextBox";
import { FormContainer } from "../atoms/FormContainer";

//タグコンポーネントのテキストボックスコンポーネント
export const TagTextField = ({
  tagInfo,
  value,
  tableMeta,
  setItemTagInfo,
  setTagError,
}) => {
  const classes = useStyles();

  //タグ名称入力関数
  const onChangeTagName = (event, tableMeta) => {
    const cellNum = tableMeta.rowIndex;
    setItemTagInfo((prevState) =>
      prevState.map((item, index) =>
        index === cellNum
          ? {
              tag: event.target.value,
              update_type: item.update_type,
            }
          : item
      )
    );
  };

  //テキストボックス文字数チェック関数
  const checkTextCount = (tableMeta) => {
    const currentCountArr = tableMeta.currentTableData
      .map((item) =>
        item.data.filter((item, index) => {
          return index === 0;
        })
      )
      .filter((item) => {
        return item[0] === "" || item[0].length > 256;
      });
    currentCountArr.length === 0 ? setTagError(false) : setTagError(true);
  };

  //エラー表示チェック関数
  const isError = (value, tableMeta) => {
    //テキストボックス文字数チェック
    checkTextCount(tableMeta);
    return value === "" || value.length > 256;
  };

  //エラー表示チェック関数
  const errorText = (value) => {
    return value === ""
      ? message.REQUIRED
      : value.length > 256
      ? message.MAX256
      : null;
  };

  return (
    <FormContainer
      className={classes.tagNameWidth}
      sx={tagInfo.options.customBodyRender.sx}
      size={tagInfo.options.customBodyRender.size}
    >
      <TextBox
        value={value}
        error={isError(value, tableMeta)}
        helperText={errorText(value)}
        onChange={(event) => onChangeTagName(event, tableMeta)}
      />
    </FormContainer>
  );
};
