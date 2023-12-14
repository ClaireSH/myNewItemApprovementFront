import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { message } from "../../config/Message";
import TextField from "@mui/material/TextField";
import { formtDate } from "../../service/converter/switch";
import {
  convertFormatDateDisplay,
  convertFormatDateParam,
} from "../../utils/convertItemCommonInfo";
import { isErrorOtherItem } from "../../utils/convertItemCommonInfo";

//共通情報　発売日コンポーネント
export const CommonInfoDate = ({
  item,
  itemCommonInfo,
  setItemCommonInfo,
  commonInfoGroup2,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const setCommonInfoGroup2Error = useSetRecoilState(
    states.commonInfoGroup2Error
  );

  useEffect(() => {
    if (itemCommonInfo !== "") {
      const releaseDate = () => {
        const releasedate = itemCommonInfo.release_date;
        if (releasedate) {
          const formatedReleasedate = formtDate(releasedate);
          return formatedReleasedate;
        } else {
          return null;
        }
      };
      setSelectedDate(releaseDate);
    }
  }, [itemCommonInfo]);

  //共通情報更新関数　発売日
  const selectDate = async (newValue) => {
    //共通情報 発売日を変換(画面表示用)し、設定　YYYY/MM/DD
    setSelectedDate(convertFormatDateDisplay(newValue));

    //共通情報 発売日を変換(リクエストパラメータ用)し、設定　YYYYMMDD
    setItemCommonInfo((prevState) => ({
      ...prevState,
      release_date: convertFormatDateParam(newValue),
    }));
  };

  //エラーチェック関数
  const isError = (selectedDate) => {
    const result =
      ((selectedDate === "" || selectedDate === null) &&
        item.pattern.required) ||
      selectedDate?.includes("N");
    return result;
  };

  //エラー表示チェック関数
  const errorText = (value) => {
    return (value === "" || value === null) && item.pattern.required
      ? message.DATE_REQUIRED
      : isError(selectedDate)
      ? message.WRONG
      : null;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isError(selectedDate) || //入力項目以外のエラー検知
    isErrorOtherItem(item.label, item.label1, commonInfoGroup2) //入力項目以外のエラー検知
      ? setCommonInfoGroup2Error(true)
      : setCommonInfoGroup2Error(false);
  }, [selectedDate, item.label, item.label1, item.pattern, commonInfoGroup2]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="yyyy/MM/dd"
        value={selectedDate}
        onChange={selectDate}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            error={isError(selectedDate)}
            helperText={errorText(selectedDate)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
