import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import useStyles from "../style/listStyles";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { items } from "../config/Titles";
import ImportExternalFilesTable from "../components/organisms/ImportExternalFilesTable";
import { switchSelectedValueToParam } from "../service/converter/switch";
import { useScanFile } from "../api/useScanFile";
import { searchSelectedOptionsFilter } from "../utils/searchSelectedOptionsFilter";
import { useRestore } from "../api/useRestore";

//新規商品取込一覧ページ
export default function ImportExternalFilesList() {
  const classes = useStyles();
  const userInfo = useRecoilValue(states.userInfo);
  const { restoreItem } = useRestore();

  const [company, setCompany] = useRecoilState(states.company);
  const [restoreInsotreCode, setRestoreInsotreCode] = useState("");
  const [importType, setImportType] = useRecoilState(states.importType);
  const [valueFrom, setValueFrom] = useRecoilState(states.valueFrom);
  const [valueFrom2, setValueFrom2] = useRecoilState(states.valueFrom2);
  const [valueTo, setValueTo] = useRecoilState(states.valueTo);
  const [valueTo2, setValueTo2] = useRecoilState(states.valueTo2);
  const [companyData, setCompanyData] = useRecoilState(states.companyData);
  const [inputTypeData, setInputTypeData] = useRecoilState(
    states.inputTypeData
  );
  const [isloading, setIsLoading] = useState(true);
  const setInitial = useSetRecoilState(states.initialInstoreCode);
  const pullDownInputType = useRecoilValue(states.inputType);
  const pullDownProviderInfo = useRecoilValue(states.providerInfo);
  const setBookItem = useSetRecoilState(states.bookItemFlag);
  const setSoftItem = useSetRecoilState(states.softItemFlag);
  const inputType = useRecoilValue(states.inputType);
  const providerInfo = useRecoilValue(states.providerInfo);
  const { getNewProductData } = useScanFile();

  useEffect(() => {
    setInitial("");
    setBookItem(false);
    setSoftItem(false);
  }, []);

  const selectCompany = (event) => {
    setCompany(event.target.value);
    //新規商品取込一覧画面：提供会社(プルダウン)選択時、パラメータ用に変換
    const convertedProvider = switchSelectedValueToParam(
      event.target.value,
      providerInfo
    );
    setCompanyData([convertedProvider]);
  };

  const selectImportType = (event) => {
    setImportType(event.target.value);
    //新規商品取込一覧画面：取込種別(プルダウン)選択時、パラメータ用に変換
    const convertedImportType = switchSelectedValueToParam(
      event.target.value,
      inputType
    );
    setInputTypeData([convertedImportType]);
  };

  const datePickerFrom = async (newValue) => {
    let date = null;
    if (newValue === null) {
      setValueFrom(null);
      setValueFrom2(null);
      return;
    } else {
      date = formatDate(newValue);
      setValueFrom(date);
      if (date === undefined) {
        return;
      } else {
        setValueFrom2(date.split("/").join(""));
      }
    }
  };

  const datePickerTo = async (newValue) => {
    let date = null;
    if (newValue === null) {
      setValueTo(null);
      setValueTo2(null);
      return;
    } else {
      date = formatDate(newValue);
      setValueTo(date);
      if (date === undefined) {
        return;
      } else {
        setValueTo2(date.split("/").join(""));
      }
    }
  };

  const formatDate = (dt) => {
    if (dt === null) {
      return;
    }
    let y = dt.getFullYear();
    let m = ("00" + (dt.getMonth() + 1)).slice(-2);
    let d = ("00" + dt.getDate()).slice(-2);

    return y + "/" + m + "/" + d;
  };

  const dataSearch = async () => {
    getNewProductData(
      searchSelectedOptionsFilter(
        valueFrom2,
        valueTo2,
        companyData[0],
        inputTypeData[0]
      )
    );
    setIsLoading(false);
  };

  const restoreData = async () => {
    restoreItem(restoreInsotreCode);
    setRestoreInsotreCode("");
  };

  const onchengeText = (e) => {
    setRestoreInsotreCode(e.target.value);
  };

  return (
    <main className={classes.content}>
      <Toolbar id="back-to-top-anchor" variant="dense" />
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Typography
          variant="h5"
          gutterBottom
          color="primary"
          className={classes.title}
        >
          {items.LIST}
        </Typography>
        <div style={{ paddingTop: 20 }}>
          <input placeholder="Xインストアコード" onChange={onchengeText} />
          <button className={classes.searchButton} onClick={restoreData}>
            復元
          </button>
        </div>
      </Container>
      <Divider style={{ height: 2 }} />
      <Container maxWidth={false} disableGutters className={classes.container}>
        <Typography
          variant="h7"
          gutterBottom
          color="primary"
          className={classes.title}
        >
          {items.INPUTDATE}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="from"
              format="yyyy/MM/dd"
              value={valueFrom}
              onChange={datePickerFrom}
              renderInput={(params) => <TextField size="large" {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="to"
              value={valueTo}
              onChange={datePickerTo}
              renderInput={(params) => <TextField size="large" {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <Typography
          variant="h7"
          gutterBottom
          color="primary"
          className={classes.title}
        >
          {items.COMPANY}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <Select value={company} onChange={selectCompany}>
            <MenuItem value="all">指定なし</MenuItem>
            <br />
            {pullDownProviderInfo.map((item) => {
              return [
                <MenuItem key={item.index} value={item.type_name}>
                  {item.type_name}
                </MenuItem>,
                <br />,
              ];
            })}
          </Select>
        </FormControl>
        <Typography
          variant="h7"
          gutterBottom
          color="primary"
          className={classes.title}
          style={{ paddingLeft: 6 }}
        >
          {items.IMPORTTYPE}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <Select value={importType} onChange={selectImportType}>
            <MenuItem value="all">指定なし</MenuItem>
            <br />
            {pullDownInputType.map((item) => {
              return [
                <MenuItem key={item.index} value={item.type_name}>
                  {item.type_name}
                </MenuItem>,
                <br />,
              ];
            })}
          </Select>
        </FormControl>
        <div style={{ paddingTop: 20 }}>
          <button className={classes.searchButton} onClick={dataSearch}>
            {items.SEARCH}
          </button>
        </div>
      </Container>
      <Divider style={{ height: 2 }} />
      <Container maxWidth={false}>
        {userInfo.userName !== "" ? (
          <ImportExternalFilesTable isloading={isloading} />
        ) : null}
      </Container>
    </main>
  );
}
