import React, { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { message } from "../../config/Message";
import {
  checkErrorSoftAttributeGroup1Item,
  initialFormatDate,
  formatDate,
  initialFormatTime,
  formatTime,
} from "../../utils/convertSoftAttribute";

export const AttributeSoftDateAndTime = ({
  item,
  itemAttributeSoftInfo,
  setItemAttributeSoftInfo,
  softAttributeGroup1,
}) => {
  const [selectedTimeAndDay, setSelectedTimeAndDay] = useRecoilState(
    states.selectedTimeAndDay
  );
  const setAttributeSoftGroup1Error = useSetRecoilState(
    states.attributeSoftGroup1Error
  );

  useEffect(() => {
    let initialOpenDate2 = null;
    let initialOpenTime2 = null;
    let initialOpenDateAndTime = null;

    //日付フォーマット整形
    itemAttributeSoftInfo.open_date &&
      (initialOpenDate2 = initialFormatDate(
        initialFormatDate(itemAttributeSoftInfo.open_date, 4, "-"),
        7,
        "-"
      ));

    //時間フォーマット整形
    itemAttributeSoftInfo.open_time &&
      (initialOpenTime2 = initialFormatTime(
        itemAttributeSoftInfo.open_time.slice(0, -2),
        2,
        ":"
      ));

    initialOpenDate2 &&
      initialOpenTime2 &&
      (initialOpenDateAndTime = initialOpenDate2 + "T" + initialOpenTime2);
    initialOpenDate2 &&
      !initialOpenTime2 &&
      (initialOpenDateAndTime = initialOpenDate2 + "T" + "00:00");

    setSelectedTimeAndDay(initialOpenDateAndTime);
  }, [itemAttributeSoftInfo]);

  const selectTimeAndDay = async (newValue) => {
    setSelectedTimeAndDay(newValue);
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      open_date: formatDate(newValue),
    }));
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      open_time: formatTime(newValue),
    }));
  };

  //入力項目以外のエラー検知関数
  const isErrorOtherItem = (labels, softAttributeGroup1) => {
    const newSoftAttributeGroup1 = [...softAttributeGroup1].filter((list) => {
      return (
        list.label === "speccode" ||
        list.label === "title_speccode" ||
        list.label === "vendor" ||
        list.label === "distributor" ||
        list.label === "disc_count" ||
        list.label === "total_track" ||
        list.label === "time" ||
        list.label === "region_code" ||
        list.label === "discontinued_date"
      );
    });
    const checkedErrorItem = newSoftAttributeGroup1
      .filter((list) => {
        return list.label !== labels;
      })
      .map((list) => {
        return checkErrorSoftAttributeGroup1Item[list.label](
          newSoftAttributeGroup1
        );
      });

    return checkedErrorItem.includes(true) ? true : false;
  };

  //エラーチェック関数
  const isError = (selectedTimeAndDay) => {
    const result = selectedTimeAndDay === "NaNa-Na-NTaN:aN" ? true : false;
    return result;
  };

  //エラーフラグ切り替え処理
  useEffect(() => {
    isError(selectedTimeAndDay) || //入力項目のエラー検知
    isErrorOtherItem(item.label, softAttributeGroup1, selectedTimeAndDay) //入力項目以外のエラー検知
      ? setAttributeSoftGroup1Error(true)
      : setAttributeSoftGroup1Error(false);
  }, [item.label, item.pattern, softAttributeGroup1, selectedTimeAndDay]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        inputFormat="yyyy/MM/dd hh:mm a"
        value={selectedTimeAndDay}
        onChange={selectTimeAndDay}
        renderInput={(params) => (
          <TextField
            {...params}
            error={isError(selectedTimeAndDay)}
            helperText={isError(selectedTimeAndDay) ? message.WRONG : null}
          />
        )}
      />
    </LocalizationProvider>
  );
};
