import React from "react";
import { useRecoilValue } from "recoil";
import * as states from "../../recoil/RecoilState";
import { FormContainer } from "../atoms/FormContainer";
import { MenuItem, InputLabel } from "@mui/material";
import { SelectBox } from "../atoms/SelectBox";
import { items } from "../../config/Titles";

//コメントコンポーネントの更新区分プルダウンコンポーネント
export const CommentUpdateSelectBox = ({ item, onChangeComment }) => {
  const updateType = useRecoilValue(states.updateTypeData);

  return (
    <FormContainer sx={{ m: 1, minWidth: 120, p: 0, m: 0, mt: 2 }} size="small">
      <InputLabel id="demo-simple-select-label">
        {items.UPDATECATEGORY}
      </InputLabel>
      <SelectBox
        onChange={(event) => onChangeComment(event, item.comment_type)}
        label={items.UPDATECATEGORY}
        value={item.update_type}
      >
        {updateType.map((item) => {
          return (
            <MenuItem key={item.type_code} value={item.type_code}>
              {item.type_name}
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormContainer>
  );
};
