import React from "react";
import Checkbox from "@mui/material/Checkbox";
//チェックボックスコンポーネント
export const CheckBox = ({ label, defaultChecked }) => {
  return <Checkbox label={label} defaultChecked={defaultChecked} />;
};
