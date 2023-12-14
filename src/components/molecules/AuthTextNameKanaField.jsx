import React from "react";
import { useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import useStyles from "../../style/listStyles";
import { message } from "../../config/Message";
import { number } from "../../config/Titles";
import { TextBox } from "../atoms/TextBox";
import { FormContainer } from "../atoms/FormContainer";

//著作者コンポーネントの著作者名カナのテキストボックスコンポーネント
export const AuthTextNameKanaField = ({
  authorInfo,
  value,
  tableMeta,
  onChangeAuthorItem,
}) => {
  const setAuthorKanaError = useSetRecoilState(states.authorKanaError);
  const classes = useStyles();

  //テキストボックス文字数チェック関数
  const checkTextCount = (tableMeta) => {
    const currentTextCountArary = tableMeta.currentTableData
      .map((item) =>
        item.data.filter((item, index) => {
          //著作者名カナのデータ(著作者のデータ配列のindexが3)を抽出
          return index === 3;
        })
      )
      .filter((item) => {
        return item[0]?.length > number.AUTHORNAME_KANA_MAXLENGTH;
      });
    currentTextCountArary.length === 0
      ? setAuthorKanaError(false)
      : setAuthorKanaError(true);
  };

  //エラー表示チェック関数
  const isError = (value, tableMeta) => {
    //テキストボックス文字数チェック
    checkTextCount(tableMeta);
    return value && value.length > number.AUTHORNAME_KANA_MAXLENGTH;
  };

  //エラー表示チェック関数
  const errorText = (value) => {
    return value && value.length > number.AUTHORNAME_KANA_MAXLENGTH
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
