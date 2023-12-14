import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import { items } from "../../config/Titles";

export const ImportHistoryList = (props) => {
  const { data, data2, show } = props;

  const [updateData, setUpdateData] = useState([]);
  const [updateKey, setUpdateKey] = useState([]);

  useEffect(() => {
    setUpdateData(data);
  }, [updateKey]);

  const columns = [
    {
      name: "import_no",
      label: "取込番号",
    },
    {
      name: "provider",
      label: "提供会社",
    },
    {
      name: "import_group_type",
      label: "取込種別",
    },
    {
      name: "import_date",
      label: "取込日付",
    },
    {
      name: "import_time",
      label: "取込時刻",
    },
    {
      name: "file_name",
      label: "取込ファイル名",
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    rowsPerPageOptions: [],
    rowHover: true,
    filter: true,
    print: false,
    download: false,
    pagination: false,
  };

  return (
    <>
      <MUIDataTable
        title={[
          items.IMPORTHISTORYLIST,
          <Button size="small" onClick={() => setUpdateKey((old) => old + 1)}>
            <CachedIcon />
          </Button>,
        ]}
        data={show ? updateData : data2}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default ImportHistoryList;
