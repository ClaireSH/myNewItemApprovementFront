import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
//テーブルフッターコンテナー
export const TableFooterContainer = ({ children, style }) => {
  return (
    <TableFooter style={style}>
      <TableRow>{children}</TableRow>
    </TableFooter>
  );
};
