import React from "react";
import { items } from "../../config/Titles";
import { FormContainer } from "../atoms/FormContainer";
import { PrimaryButton } from "../atoms/PrimaryButton";

//タグ削除ボタンコンポーネント
export const TagDeleteButton = ({
  tagInfo,
  tableMeta,
  itemTagInfo,
  setItemTagInfo,
}) => {
  //削除関数
  const onClickDelete = () => {
    const deleteIndex = tableMeta.rowIndex;
    const newData = [...itemTagInfo];
    newData.splice(deleteIndex, 1);
    setItemTagInfo(newData);
  };
  return (
    <FormContainer
      sx={tagInfo.options.customBodyRender.sx}
      size={tagInfo.options.customBodyRender.size}
    >
      <PrimaryButton variant="contained" onClick={onClickDelete}>
        {items.DELETE}
      </PrimaryButton>
    </FormContainer>
  );
};
