import React from "react";
import { items } from "../../config/Titles";
import { FormContainer } from "../atoms/FormContainer";
import { PrimaryButton } from "../atoms/PrimaryButton";

//著作者削除ボタンコンポーネント
export const AuthDeleteButton = ({
  authorInfo,
  tableMeta,
  itemAuthor,
  setItemAuthor,
}) => {
  //削除関数
  const onClickDeleteRow = () => {
    const deleteIndex = tableMeta.rowIndex;
    const newtIemAuthor = [...itemAuthor];
    newtIemAuthor.splice(deleteIndex, 1);
    setItemAuthor(newtIemAuthor);
  };
  return (
    <FormContainer
      sx={authorInfo.options.customBodyRender.sx}
      size={authorInfo.options.customBodyRender.size}
    >
      <PrimaryButton variant="contained" onClick={onClickDeleteRow}>
        {items.DELETE}
      </PrimaryButton>
    </FormContainer>
  );
};
