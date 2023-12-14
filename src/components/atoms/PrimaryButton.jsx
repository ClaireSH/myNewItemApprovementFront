import React from "react";
import Button from "@mui/material/Button";
//ボタンコンポーネント
export const PrimaryButton = ({ children, variant, onClick }) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};
