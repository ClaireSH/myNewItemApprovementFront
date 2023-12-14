import React from "react";
import { useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import useStyles from "../../style/listStyles";
import { message } from "../../config/Message";
import { number } from "../../config/Titles";
import { TextBox } from "../atoms/TextBox";
import { FormContainer } from "../atoms/FormContainer";

//著作者コンポーネントの著作者名英字のテキストボックスコンポーネント
export const AuthTextNameEngField = ({
  authorInfo,
  value,
  tableMeta,
  onChangeAuthorItem,
}) => {
  const setAuhorEngError = useSetRecoilState(states.authorEngError);
  const classes = useStyles();

  //テキストボックス文字数チェック関数
  const checkTextCount = (tableMeta) => {
    const currentTextCountArary = tableMeta.currentTableData
      .map((item) =>
        item.data.filter((item, index) => {
          //著作者名英字のデータ(著作者のデータ配列のindexが４)を抽出
          return index === 4;
        })
      )
      .filter((item) => {
        return item[0]?.length > number.AUTHORNAME_EN_MAXLENGTH;
      });
    currentTextCountArary.length === 0
      ? setAuhorEngError(false)
      : setAuhorEngError(true);
  };

  //エラー表示チェック関数
  const isError = (value) => {
    //テキストボックス文字数チェック
    checkTextCount(tableMeta);
    return value && value.length > number.AUTHORNAME_EN_MAXLENGTH;
  };

  //エラー表示チェック関数
  const errorText = (value) => {
    return value && value.length > number.AUTHORNAME_EN_MAXLENGTH
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
