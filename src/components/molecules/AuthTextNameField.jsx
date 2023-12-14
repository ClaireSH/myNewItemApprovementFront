import React from "react";
import { useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import useStyles from "../../style/listStyles";
import { message } from "../../config/Message";
import { number } from "../../config/Titles";
import { TextBox } from "../atoms/TextBox";
import { FormContainer } from "../atoms/FormContainer";

//著作者コンポーネントの著作者名のテキストボックスコンポーネント
export const AuthTextNameField = ({
  authorInfo,
  value,
  tableMeta,
  onChangeAuthorItem,
}) => {
  const setAuthorError = useSetRecoilState(states.authorError);
  const classes = useStyles();

  //テキストボックス文字数チェック関数
  const checkTextCount = (tableMeta) => {
    const currentTextCountArary = tableMeta.currentTableData
      .map((item) =>
        item.data.filter((item, index) => {
          //著作者名のデータ(著作者のデータ配列のindexが2)を抽出
          return index === 2;
        })
      )
      .filter((item) => {
        return item[0] === "" || item[0].length > number.AUTHORNAME_MAXLENGTH;
      });
    currentTextCountArary.length === 0
      ? setAuthorError(false)
      : setAuthorError(true);
  };

  //エラー表示チェック関数
  const isError = (value, tableMeta) => {
    //テキストボックス文字数チェック
    checkTextCount(tableMeta);
    return value === "" || value.length > number.AUTHORNAME_MAXLENGTH;
  };

  //エラー表示チェック関数
  const errorText = (value) => {
    return value === ""
      ? message.REQUIRED
      : value.length > number.AUTHORNAME_MAXLENGTH
      ? message.MAX256
      : null;
  };

  return (
    <FormContainer
      className={classes.tagNameWidth}
      sx={authorInfo.options.customBodyRender.sx}
      size={authorInfo.options.customBodyRender.size}
    >
      <TextBox
        value={value}
        error={isError(value, tableMeta)}
        helperText={errorText(value)}
        onChange={(event) =>
          onChangeAuthorItem(event, tableMeta.rowIndex, tableMeta.columnIndex)
        }
      />
    </FormContainer>
  );
};
