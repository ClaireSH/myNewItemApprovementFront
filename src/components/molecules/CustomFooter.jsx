import React from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { TableFooterContainer } from "../atoms/TableFooterContainer";

//テーブルに追加するフッターコンポーネント
export const CustomFooter = ({ onClick, context, style }) => {
  return (
    <TableFooterContainer style={style}>
      <PrimaryButton onClick={onClick}>{context}</PrimaryButton>
    </TableFooterContainer>
  );
};
