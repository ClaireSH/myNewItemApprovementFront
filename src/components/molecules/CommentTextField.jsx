import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { message } from "../../config/Message";
import { number } from "../../config/Titles";
import { TextBox } from "../atoms/TextBox";

//コメントコンポーネントのテキストボックスコンポーネント
export const CommentTextField = ({ item, onChangeComment }) => {
  const setCommnentError = useSetRecoilState(states.commnentError);
  const itemCommentInfoLocal = useRecoilState(states.itemCommentInfoLocal);

  //テキストボックス文字数チェック関数
  const checkTextCount = (itemCommentInfoLocal) => {
    const currntTextCount = itemCommentInfoLocal[0].filter((item) => {
      if (item.comment_type === "03") {
        //付属表示
        return item.comment?.length > number.COMMENT_ATTACHEDDISPLAY_MAXLENGTH;
      } else {
        //内部メモ・商品説明・査定時備考
        return item.comment?.length > number.COMMENT_MAXLENGTH;
      }
    });
    currntTextCount.length === 0
      ? setCommnentError(false)
      : setCommnentError(true);
  };

  //エラー表示チェック関数
  const isError = (value, commentType, itemCommentInfoLocal) => {
    //テキストボックス文字数チェック
    checkTextCount(itemCommentInfoLocal);
    if (commentType === "03") {
      //付属表示
      return value.length > number.COMMENT_ATTACHEDDISPLAY_MAXLENGTH;
    } else {
      //内部メモ・商品説明・査定時備考
      return value.length > number.COMMENT_MAXLENGTH;
    }
  };

  //エラー表示チェック関数
  const errorText = (value, commentType) => {
    if (commentType === "03") {
      //付属表示
      return value.length > number.COMMENT_ATTACHEDDISPLAY_MAXLENGTH
        ? message.MAX256
        : null;
    } else {
      //内部メモ・商品説明・査定時備考
      return value.length > number.COMMENT_MAXLENGTH ? message.MAX2000 : null;
    }
  };

  return (
    <TextBox
      id="outlined-multiline-static"
      label={item.comment_name}
      key={item.comment_type}
      value={item.comment}
      multiline
      rows={4}
      fullWidth
      margin="none"
      error={isError(item.comment, item.comment_type, itemCommentInfoLocal)}
      helperText={errorText(item.comment, item.comment_type)}
      onChange={(event) => onChangeComment(event, item.comment_type)}
    />
  );
};
