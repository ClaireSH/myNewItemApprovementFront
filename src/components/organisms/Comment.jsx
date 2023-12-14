import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as states from "../../recoil/RecoilState";
import { useEffect } from "react";
import { CommentTextField } from "../molecules/CommentTextField";
import { CommentUpdateSelectBox } from "../molecules/CommentUpdateSelectBox";

export const Comment = () => {
  const itemCommentInfo = useRecoilValue(states.itemCommentInfo);
  const [itemCommentInfoLocal, setItemCommentInfoLocal] = useRecoilState(
    states.itemCommentInfoLocal
  );
  const [commnentFlag, setCommnentFlag] = useRecoilState(states.commnentFlag);
  //コメントのデータを画面表示用に変換
  const initialDisplayConvert = () => {
    const newItemCommentInfo = [...itemCommentInfo];
    newItemCommentInfo.forEach((str, index) => {
      setItemCommentInfoLocal((prevState) =>
        prevState.map((item) =>
          item.comment_type === str.comment_type
            ? {
                comment: str.comment,
                comment_type: item.comment_type,
                update_type: str.update_type,
                comment_name: item.comment_name,
              }
            : item
        )
      );
    });
  };

  useEffect(() => {
    !commnentFlag && initialDisplayConvert();
  }, [commnentFlag]);

  //コメント内容更新関数
  const changeCommentContext = (event, commentType) => {
    setCommnentFlag(true);
    setItemCommentInfoLocal((prevState) =>
      prevState.map((item) =>
        item.comment_type === commentType
          ? {
              //テキストボックス(内部メモ・商品説明・付属表示・査定時備考)更新の場合
              comment:
                event.type === "change" ? event.target.value : item.comment,
              comment_type: item.comment_type,
              //セレクトボックス(更新区分)更新の場合
              update_type:
                event.type === "click" ? event.target.value : item.update_type,
              comment_name: item.comment_name,
            }
          : item
      )
    );
  };

  return (
    <>
      {itemCommentInfoLocal.map((item) => {
        return (
          <>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <CommentUpdateSelectBox
                item={item}
                onChangeComment={(event, commentType) =>
                  changeCommentContext(event, commentType)
                }
              />
            </div>
            <div>
              <CommentTextField
                item={item}
                onChangeComment={(event, commentType) =>
                  changeCommentContext(event, commentType)
                }
              />
            </div>
          </>
        );
      })}
    </>
  );
};

export default Comment;
