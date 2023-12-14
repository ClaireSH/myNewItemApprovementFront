import React, { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
import { items } from "../../config/Titles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { ImportExternalFilesColumns } from "../../columns/ImportExternalFilesColumns/ImportExternalFilesColumns";

export let bookIndexs = [];
export let softIndexs = [];

const nonData = [];

//新規商品取込一覧画面の取込一覧を表示
export const ImportExternalFilesTable = (props) => {
  const { isloading } = props;
  const history = useHistory();
  const newProductData = useRecoilValue(states.newProductData);
  const setItemIschanged = useSetRecoilState(states.itemIschanged);

  const options = {
    selectableRows: false,
    rowsPerPageOptions: [],
    print: false,
    download: false,
    pagination: false,
    filter: true,
    textLabels: {
      body: {
        noMatch: isloading ? "...loading" : "",
      },
    },
    onCellClick: (cellIndex, dataIndex) => {
      const RegExp = /^[0-9]*$/;
      RegExp.test(cellIndex) && history.push("/newProductList");

      let num = dataIndex.dataIndex;
      const filterNewProductData = () => {
        newProductData.data.scan_file.filter(function (value, index) {
          if (index === num) {
            if (value.provider === "NGA" || value.provider === "NIP") {
              bookIndexs.length = 0;
              softIndexs.length = 0;
              bookIndexs.push(value);
            } else if (value.provider === "SKD" || value.provider === "JMD") {
              bookIndexs.length = 0;
              softIndexs.length = 0;
              softIndexs.push(value);
            }
          }
        });
      };

      filterNewProductData();
      setItemIschanged(true);
    },
  };
  return (
    <>
      <MUIDataTable
        title={items.IMPORTLIST}
        data={
          newProductData.length !== 0 && newProductData.data
            ? newProductData.data.scan_file
            : nonData
        }
        columns={ImportExternalFilesColumns}
        options={options}
      />
    </>
  );
};

export default ImportExternalFilesTable;
