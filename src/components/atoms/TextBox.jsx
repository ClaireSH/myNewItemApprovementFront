import React from "react";
import TextField from "@mui/material/TextField";
//テキストボックスコンポーネント
export const TextBox = ({
  id,
  label,
  key,
  value,
  multiline,
  rows,
  fullWidth,
  margin,
  error,
  helperText,
  onChange,
  sx,
  InputProps,
  disabled,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      disabled={disabled}
      key={key}
      value={value}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      margin={margin}
      error={error}
      helperText={helperText}
      onChange={onChange}
      sx={sx}
      InputProps={InputProps}
    />
  );
};
