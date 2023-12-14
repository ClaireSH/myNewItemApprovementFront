import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import * as states from "../../recoil/RecoilState";
import MUIDataTable from "mui-datatables";
import { CustomFooter } from "../molecules/CustomFooter";
import { authorColumns, authorOptions } from "../../models/author";
import { AuthRoleInfoSelectBox } from "../molecules/AuthRoleInfoSelectBox";
import { AuthTextNameField } from "../molecules/AuthTextNameField";
import { AuthTextNameKanaField } from "../molecules/AuthTextNameKanaField";
import { AuthTextNameEngField } from "../molecules/AuthTextNameEngField";
import { AuthUpdateSelectBox } from "../molecules/AuthUpdateSelectBox";
import { AuthDeleteButton } from "../molecules/AuthDeleteButton";
import { number } from "../../config/Titles";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";

export const AuthorInfo = () => {
  const [itemAuthor, setItemAuthor] = useRecoilState(states.itemAuthorInfo);
  const [authorError, setAuhorError] = useRecoilState(states.authorError);
  const setAuthorKanaError = useSetRecoilState(states.authorKanaError);
  const setAuhorEngError = useSetRecoilState(states.authorEngError);
  const [selectedReprisentative, setSelectedRepresentative] = useRecoilState(
    states.autorRep
  );

  const handleChangeReprisentative = (event) => {
    setSelectedRepresentative(event.target.value);
  };

  //著作者にデータがない場合、著作者(著作者名、著作者名カナ、著作者名英字)エラーフラグを初期化する。
  useEffect(() => {
    itemAuthor.length === 0 &&
      setAuhorError(true) &&
      setAuthorKanaError(false) &&
      setAuhorEngError(false);
  }, [itemAuthor]);

  //行追加関数
  const onClickAddRow = () => {
    const newtIemAuthor = [...itemAuthor];
    newtIemAuthor.push({
      author_name: "",
      author_name_eng: "",
      author_name_kana: "",
      role: "00",
      update_type: "0",
    });
    setItemAuthor(newtIemAuthor);
  };

  //著作者データ更新関数
  const changeAuthorItem = (event, rowIndex, columnIndex) => {
    setItemAuthor((prevState) =>
      prevState.map((item, index) =>
        index === rowIndex
          ? {
              role:
                columnIndex === number.NUM1 ? event.target.value : item.role,
              author_name:
                columnIndex === number.NUM2
                  ? event.target.value
                  : item.author_name,
              author_name_kana:
                columnIndex === number.NUM3
                  ? event.target.value
                  : item.author_name_kana,
              author_name_eng:
                columnIndex === number.NUM4
                  ? event.target.value
                  : item.author_name_eng,
              update_type:
                columnIndex === number.NUM5
                  ? event.target.value
                  : item.update_type,
            }
          : item
      )
    );
  };

  //カラム定義
  const columns = authorColumns.map((authorInfo) => ({
    name: authorInfo.name,
    label: authorInfo.label,
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <>
            {authorInfo.label === "代表者" ? (
              <Radio
                checked={selectedReprisentative === `rep-${tableMeta.rowIndex}`}
                onChange={handleChangeReprisentative}
                value={`rep-${tableMeta.rowIndex}`}
                name="reprisentative-buttons"
                inputProps={{ "aria-label": `rep-${tableMeta.rowIndex}` }}
              />
            ) : authorInfo.label === "役割情報" ? (
              <AuthRoleInfoSelectBox
                authorInfo={authorInfo}
                value={value}
                tableMeta={tableMeta}
                onChangeAuthorItem={(event, rowIndex, columnIndex) =>
                  changeAuthorItem(event, rowIndex, columnIndex)
                }
              />
            ) : authorInfo.label === "著作者名" ? (
              <AuthTextNameField
                authorInfo={authorInfo}
                value={value}
                tableMeta={tableMeta}
                onChangeAuthorItem={(event, rowIndex, columnIndex) =>
                  changeAuthorItem(event, rowIndex, columnIndex)
                }
              />
            ) : authorInfo.label === "著作者名カナ" ? (
              <AuthTextNameKanaField
                authorInfo={authorInfo}
                value={value}
                tableMeta={tableMeta}
                onChangeAuthorItem={(event, rowIndex, columnIndex) =>
                  changeAuthorItem(event, rowIndex, columnIndex)
                }
              />
            ) : authorInfo.label === "著作者名英字" ? (
              <AuthTextNameEngField
                authorInfo={authorInfo}
                value={value}
                tableMeta={tableMeta}
                onChangeAuthorItem={(event, rowIndex, columnIndex) =>
                  changeAuthorItem(event, rowIndex, columnIndex)
                }
              />
            ) : authorInfo.label === "更新区分" ? (
              <AuthUpdateSelectBox
                authorInfo={authorInfo}
                value={value}
                tableMeta={tableMeta}
                onChangeAuthorItem={(event, rowIndex, columnIndex) =>
                  changeAuthorItem(event, rowIndex, columnIndex)
                }
              />
            ) : authorInfo.label === "削除" ? (
              <AuthDeleteButton
                authorInfo={authorInfo}
                tableMeta={tableMeta}
                itemAuthor={itemAuthor}
                setItemAuthor={setItemAuthor}
              />
            ) : null}
          </>
        );
      },
    },
  }));

  //テーブルのオプション
  const options = {
    ...authorOptions,
    //フッター追加
    customFooter: () => {
      return (
        <>
          <CustomFooter
            onClick={onClickAddRow}
            context={authorOptions.customFooter.context}
            style={authorOptions.customFooter.style}
          />
          {itemAuthor.length === 0 && (
            <FormControl sx={{ m: 1 }} error={authorError} variant="standard">
              <FormHelperText variant="h6">
                {authorOptions.footerError.message}
              </FormHelperText>
            </FormControl>
          )}
        </>
      );
    },
  };

  return <MUIDataTable data={itemAuthor} columns={columns} options={options} />;
};

export default AuthorInfo;
