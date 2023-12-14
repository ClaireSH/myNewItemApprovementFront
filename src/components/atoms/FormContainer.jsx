import React from "react";
import { FormControl } from "@mui/material";
//入力フォームのサイズを指定
export const FormContainer = ({ className, sx, size, children }) => {
  return (
    <FormControl className={className} sx={sx} size={size}>
      {children}
    </FormControl>
  );
};
