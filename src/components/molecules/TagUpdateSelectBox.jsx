import React from "react";
import { useRecoilValue } from "recoil";
import * as states from "../../recoil/RecoilState";
import { FormContainer } from "../atoms/FormContainer";
import { SelectBox } from "../atoms/SelectBox";
import { MenuItem } from "@mui/material";

//タグコンポーネントの更新プルダウンコンポーネント
export const TagUpdateSelectBox = ({
  tagInfo,
  value,
  tableMeta,
  setItemTagInfo,
}) => {
  const updateType = useRecoilValue(states.updateTypeData);

  //更新関数
  const onChangeUpdateCode = (event, tableMeta) => {
    const cellNum = tableMeta.rowIndex;
    setItemTagInfo((prevState) =>
      prevState.map((item, index) =>
        index === cellNum
          ? {
              tag: item.tag,
              update_type: event.target.value,
            }
          : item
      )
    );
  };

  return (
    <FormContainer
      sx={tagInfo.options.customBodyRender.sx}
      size={tagInfo.options.customBodyRender.size}
    >
      <SelectBox
        value={value}
        onChange={(event) => onChangeUpdateCode(event, tableMeta)}
      >
        {updateType.map((item, index) => {
          return (
            <MenuItem key={index} value={item.type_code}>
              {item.type_name}
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormContainer>
  );
};
