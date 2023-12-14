import React from "react";
import { useRecoilValue } from "recoil";
import * as states from "../../recoil/RecoilState";
import { FormContainer } from "../atoms/FormContainer";
import { SelectBox } from "../atoms/SelectBox";
import { MenuItem } from "@mui/material";

//著作者コンポーネントの更新区分プルダウンコンポーネント
export const AuthUpdateSelectBox = ({
  authorInfo,
  value,
  tableMeta,
  onChangeAuthorItem,
}) => {
  const updateType = useRecoilValue(states.updateTypeData);

  return (
    <FormContainer
      sx={authorInfo.options.customBodyRender.sx}
      size={authorInfo.options.customBodyRender.size}
    >
      <SelectBox
        value={value}
        onChange={(event) =>
          onChangeAuthorItem(event, tableMeta.rowIndex, tableMeta.columnIndex)
        }
      >
        {updateType.map((item) => (
          <MenuItem key={item.index} value={item.type_code}>
            {item.type_name}
          </MenuItem>
        ))}
      </SelectBox>
    </FormContainer>
  );
};
