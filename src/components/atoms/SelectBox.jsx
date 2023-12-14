import React from "react";
import { Select } from "@mui/material";
//セレクトボックスコンポーネント
export const SelectBox = ({
  defaultValue,
  value,
  label,
  onChange,
  children,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      label={label}
      onChange={onChange}
    >
      {children}
    </Select>
  );
};
