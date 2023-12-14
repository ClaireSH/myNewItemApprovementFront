import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import MUIDataTable from "mui-datatables";
import { CustomFooter } from "../molecules/CustomFooter";
import { tagColumns, tagOptions } from "../../models/tag";
import { TagTextField } from "../molecules/TagTextField";
import { TagUpdateSelectBox } from "../molecules/TagUpdateSelectBox";
import { TagDeleteButton } from "../molecules/TagDeleteButton";

export const Tag = () => {
  const [itemTagInfo, setItemTagInfo] = useRecoilState(states.itemTagInfo);
  const setTagError = useSetRecoilState(states.tagError);

  //タグがない場合エラーフラグを初期化する。
  useEffect(() => {
    itemTagInfo.length === 0 && setTagError(false);
  }, [itemTagInfo]);

  //行追加関数
  const onClickAddRow = () => {
    const newData = [...itemTagInfo];
    newData.push({
      tag: "",
      update_type: "1",
    });
    setItemTagInfo(newData);
  };

  //カラム定義
  const columns = tagColumns.map((tagInfo) => ({
    name: tagInfo.name,
    label: tagInfo.label,
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            {tagInfo.label === "名称" ? (
              <TagTextField
                tagInfo={tagInfo}
                value={value}
                tableMeta={tableMeta}
                setItemTagInfo={setItemTagInfo}
                setTagError={setTagError}
              />
            ) : tagInfo.label === "更新区分" ? (
              <TagUpdateSelectBox
                tagInfo={tagInfo}
                value={value}
                tableMeta={tableMeta}
                setItemTagInfo={setItemTagInfo}
              />
            ) : tagInfo.label === "削除" ? (
              <TagDeleteButton
                tagInfo={tagInfo}
                value={value}
                tableMeta={tableMeta}
                itemTagInfo={itemTagInfo}
                setItemTagInfo={setItemTagInfo}
              />
            ) : null}
          </>
        );
      },
    },
  }));

  //テーブルのオプション
  const options = {
    ...tagOptions,
    //フッター追加
    customFooter: () => {
      return (
        <CustomFooter
          onClick={onClickAddRow}
          context={tagOptions.customFooter.context}
          style={tagOptions.customFooter.style}
        />
      );
    },
  };

  return (
    <MUIDataTable
      data={itemTagInfo}
      columns={columns}
      options={options}
      width="100%"
    />
  );
};

export default Tag;
