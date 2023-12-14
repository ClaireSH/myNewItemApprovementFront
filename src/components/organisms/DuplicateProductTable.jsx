import React, { useEffect, useState, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { useRecoilValue } from "recoil";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import { items } from "../../config/Titles";
import { NgaColumns } from "../../columns/DuplicateProductColumns/NgaColumns";
import { NipColumns } from "../../columns/DuplicateProductColumns/NipColumns";
import { JmdColumns } from "../../columns/DuplicateProductColumns/JmdColumns";
import { SkdColumns } from "../../columns/DuplicateProductColumns/SkdColumns";
import { useCreateDetailnfo } from "../../api/useCreateDetailInfo";
import { useQuerySerachBookItems } from "../../api/useQuerySerachBookItems";
import { useQuerySerachSoftItems } from "../../api/useQuerySerachSoftItems";
import { useQueryBookDetailByDuplicateKey } from "../../api/useQueryBookDetailByDuplicateKey";
import { useQuerySoftDetailByDuplicateKey } from "../../api/useQuerySoftDetailByDuplicateKey";

export const DuplicateProductTable = () => {
  const value = useRecoilValue(states.itemValue);
  const bookItem = useRecoilValue(states.bookItemFlag);
  const softItem = useRecoilValue(states.softItemFlag);
  const { createDetailInfo, detailInfo, setDetailnfo } = useCreateDetailnfo();
  const { fetchBookItemDetailInfo } = useQuerySerachBookItems();
  const { fetchSoftItemDetailInfo } = useQuerySerachSoftItems();
  const { fetchBookItemDuplicateKeyInstoreCode } =
    useQueryBookDetailByDuplicateKey();
  const { fetchSoftItemDuplicateKeyInstoreCode } =
    useQuerySoftDetailByDuplicateKey();
  const [scanBookItemColumns, setScanBookItemColumns] = useState([]);
  const [scanSoftItemColumns, setScanSoftItemColumns] = useState([]);
  const [bookItemDuplicateKeyInstoreCode, setBookItemDuplicateKeyInstoreCode] =
    useState([]);
  const [softItemDuplicateKeyInstoreCode, setSoftItemDuplicateKeyInstoreCode] =
    useState([]);
  const [
    bookItemDuplicateKeyInstoreCodeForDetail,
    setBookItemDuplicateKeyInstoreCodeForDetail,
  ] = useState([]);
  const [
    softItemDuplicateKeyInstoreCodeForDetail,
    setSoftItemDuplicateKeyInstoreCodeForDetail,
  ] = useState([]);
  const initial = useRecoilValue(states.initialInstoreCode);
  const [duplicateLoading, setDuplicateLoading] = useRecoilState(
    states.duplicateInfoloading
  );
  const [timeoutFlag, setTimeoutFlag] = useRecoilState(states.timeoutFlag);
  const setUpdateInstoreCode = useSetRecoilState(states.updateInstoreCode);
  const [selectedRowFlag, setSelectedRowFlag] = useRecoilState(
    states.selectedRowFlag
  );
  const setDupItemCount = useSetRecoilState(states.dupItemCount);
  const onclickCursorFlag = useRecoilValue(states.onclickCursorFlag);

  const nonData = [];
  const nonColumns = [];

  const options = {
    selectableRows: "none",
    rowsPerPageOptions: [],
    print: false,
    download: false,
    pagination: false,
    filter: false,
    search: false,
    viewColumns: false,
    resizableColumns: true,
    textLabels: {
      body: {
        noMatch:
          duplicateLoading === true
            ? "...loading"
            : timeoutFlag === true
            ? "正常にデータを取得出来ませんでした。(タイムアウトエラー)"
            : detailInfo.length === 0
            ? "重複商品はありません"
            : "...loading",
      },
    },
    setRowProps: (row, dataIndex, rowIndex) => {
      if (selectedRowFlag === false && dataIndex === 0) {
        setUpdateInstoreCode(row[2]);
      }
    },
    onRowClick: (rowData, dataIndex, rowIndex) => {
      const selecteBody = rowIndex.target.parentElement.parentElement;
      const selecteBody2 =
        rowIndex.target.parentElement.parentElement.parentElement;
      let rowElems = null;
      let selecteTd = null;
      if (selecteBody.localName === "tbody") {
        rowElems = selecteBody.rows;
        selecteTd = rowIndex.target.parentElement;
      } else {
        rowElems = selecteBody2.rows;
        selecteTd = rowIndex.target.parentElement.parentElement;
      }
      const instoreCode = rowData[2] !== "" ? rowData[2] : "ErrorType";
      setUpdateInstoreCode(instoreCode);
      [...rowElems].forEach((ele) => {
        if (ele === selecteTd) {
          ele.style.backgroundColor = "#CBFFD3";
        } else {
          ele.style.backgroundColor = "#FFF";
        }
        setSelectedRowFlag(true);
      });
    },
    onTableChange: (action, tableState) => {
      const itemCount = tableState.data.length;
      setDupItemCount(itemCount);
    },
  };

  useEffect(() => {
    if (detailInfo.length === 0) {
      setSelectedRowFlag(false);
    }
  }, [detailInfo]);

  if (detailInfo.length !== 0) {
    if (
      value.data !== undefined &&
      (value.data.scan_book_items !== undefined ||
        value.data.scan_soft_items !== undefined) &&
      detailInfo.length !== 0 &&
      selectedRowFlag === false &&
      onclickCursorFlag === false
    ) {
      const tableRecorde = document.querySelectorAll("tr");
      const dataNewProductTableDataLength =
        value.data.scan_book_items !== undefined
          ? value.data.scan_book_items.b_items.length + 2
          : value.data.scan_soft_items !== undefined
          ? value.data.scan_soft_items.s_items.length + 2
          : null;
      let selectedElement = null;
      if (tableRecorde[dataNewProductTableDataLength] !== undefined) {
        selectedElement = document.getElementById(
          tableRecorde[dataNewProductTableDataLength].id
        );
        if (selectedElement !== null) {
          tableRecorde.forEach((str) => {
            if (str === selectedElement) {
              str.style.backgroundColor = "#CBFFD3";
            }
          });
        }
      }
    } else if (
      value.data !== undefined &&
      (value.data.scan_book_items !== undefined ||
        value.data.scan_soft_items !== undefined) &&
      detailInfo.length !== 0 &&
      selectedRowFlag === false &&
      onclickCursorFlag === true
    ) {
      const tableRecorde = document.querySelectorAll("tr");
      const dataNewProductTableDataLength =
        value.data.scan_book_items !== undefined
          ? value.data.scan_book_items.b_items.length + 2
          : value.data.scan_soft_items !== undefined
          ? value.data.scan_soft_items.s_items.length + 2
          : null;
      let selectedElement = document.getElementById(
        tableRecorde[dataNewProductTableDataLength].id
      );
      if (selectedElement !== null) {
        tableRecorde.forEach((str) => {
          if (str === selectedElement) {
            str.style.backgroundColor = "#CBFFD3";
          }
        });
      }
    }
  } else {
    const tableRecorde = document.querySelectorAll("tr");
    if (tableRecorde.NodeList !== undefined) {
      let pevSelectedElement = document.getElementById(tableRecorde[1].id);
      if (pevSelectedElement !== null) {
        tableRecorde.forEach((str) => {
          if (str === pevSelectedElement) {
            str.style.backgroundColor = "#CBFFD3";
          } else {
            str.style.backgroundColor = "#FFF";
          }
        });
      }
    }
  }

  useEffect(() => {
    if (bookItem === true) {
      fetchBookItemDuplicateKeyInstoreCode(
        initial,
        setDetailnfo,
        createDetailInfo,
        setBookItemDuplicateKeyInstoreCode,
        setBookItemDuplicateKeyInstoreCodeForDetail
      );
    }
  }, [initial]);

  useEffect(() => {
    if (softItem === true) {
      fetchSoftItemDuplicateKeyInstoreCode(
        initial,
        createDetailInfo,
        setDetailnfo,
        setSoftItemDuplicateKeyInstoreCode,
        setSoftItemDuplicateKeyInstoreCodeForDetail
      );
    }
  }, [initial]);

  const changeBookItemInstoreCodeForDuplicatekey = () => {
    if (bookItemDuplicateKeyInstoreCode !== undefined) {
      let list = bookItemDuplicateKeyInstoreCode.map((str) => {
        return str;
      });
      setBookItemDuplicateKeyInstoreCodeForDetail([]);
      setBookItemDuplicateKeyInstoreCodeForDetail(list);
    } else {
      setBookItemDuplicateKeyInstoreCodeForDetail([]);
      setDuplicateLoading(false);
    }
  };

  useEffect(() => {
    changeBookItemInstoreCodeForDuplicatekey();
  }, [bookItemDuplicateKeyInstoreCode]);

  const changeSoftItemInstoreCodeForDuplicatekey = () => {
    if (softItemDuplicateKeyInstoreCode !== undefined) {
      let list = softItemDuplicateKeyInstoreCode.map((str) => {
        return str;
      });
      setSoftItemDuplicateKeyInstoreCodeForDetail(list);
    } else {
      setSoftItemDuplicateKeyInstoreCodeForDetail([]);
      setDuplicateLoading(false);
    }
  };

  useEffect(() => {
    changeSoftItemInstoreCodeForDuplicatekey();
  }, [softItemDuplicateKeyInstoreCode]);

  useEffect(() => {
    if (bookItemDuplicateKeyInstoreCodeForDetail.length !== 0) {
      fetchBookItemDetailInfo(bookItemDuplicateKeyInstoreCodeForDetail);
    }
  }, [bookItemDuplicateKeyInstoreCodeForDetail]);

  useEffect(() => {
    if (softItemDuplicateKeyInstoreCodeForDetail.length !== 0) {
      fetchSoftItemDetailInfo(softItemDuplicateKeyInstoreCodeForDetail);
    }
  }, [softItemDuplicateKeyInstoreCodeForDetail]);

  const setScanBookcolumns = () => {
    const scanBookcolumns = () => {
      if (value !== undefined && value.data !== undefined) {
        if (
          value === undefined &&
          value.data === undefined &&
          value.data.scan_book_items === undefined
        ) {
          return;
        } else {
          if (
            value !== undefined &&
            value.data.scan_book_items &&
            detailInfo.length !== 0
          ) {
            if (value.data.scan_book_items.provider === "NGA") {
              return NgaColumns;
            } else if (value.data.scan_book_items.provider === "NIP") {
              return NipColumns;
            } else {
              return;
            }
          }
        }
      }
    };
    setScanBookItemColumns(scanBookcolumns);
  };

  useEffect(() => {
    setScanBookcolumns();
  }, [value, detailInfo]);

  const setScanSoftcolumns = () => {
    const scanSoftcolumns = () => {
      if (value !== undefined && value.data !== undefined) {
        if (
          value === undefined &&
          value.data === undefined &&
          value.data.scan_soft_items === undefined
        ) {
          return;
        } else {
          if (
            value !== undefined &&
            value.data.scan_soft_items &&
            detailInfo.length !== 0
          ) {
            if (value.data.scan_soft_items.provider === "JMD") {
              return JmdColumns;
            } else if (value.data.scan_soft_items.provider === "SKD") {
              return SkdColumns;
            } else {
              return;
            }
          }
        }
      }
    };
    setScanSoftItemColumns(scanSoftcolumns);
  };

  useEffect(() => {
    setScanSoftcolumns();
  }, [value, detailInfo]);

  return (
    <div>
      <MUIDataTable
        title={items.DUPLICATEPRODUCTINFO}
        data={
          bookItemDuplicateKeyInstoreCodeForDetail.length === 0 &&
          softItemDuplicateKeyInstoreCodeForDetail.length === 0
            ? nonData
            : detailInfo
        }
        columns={
          bookItemDuplicateKeyInstoreCodeForDetail.length !== 0
            ? scanBookItemColumns
            : softItemDuplicateKeyInstoreCodeForDetail.length !== 0
            ? scanSoftItemColumns
            : nonColumns
        }
        options={options}
      />
    </div>
  );
};

export default DuplicateProductTable;
