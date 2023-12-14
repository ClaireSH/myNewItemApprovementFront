import React from "react";
import * as states from "../../recoil/RecoilState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import { FormContainer } from "../atoms/FormContainer";
import { SelectBox } from "../atoms/SelectBox";
import { message } from "../../config/Message";

import {
  filterInitialGenre1,
  filterInitialGenre2,
  filterInitialGenre3,
} from "../../utils/convertItemCommonInfo";

//共通情報の項目表示コンポーネント:  ジャンル1・ジャンル2・ジャンル3
export const CommonInfoGroup2_L_SELECT_Item = ({
  item,
  itemCommonGenreInfo,
  itemCommonInfo,
  setItemCommonInfo,
  unspecified1,
  unspecified2,
  unspecified3,
}) => {
  const [genre1, setGenre1] = useRecoilState(states.genre1);
  const [genre2, setGenre2] = useRecoilState(states.genre2);
  const [genre3, setGenre3] = useRecoilState(states.genre3);
  const [genre1Info, setGenre1Info] = useState(null);
  const [genre2Info, setGenre2Info] = useState(null);
  const [genre3Info, setGenre3Info] = useState(null);

  //共通タブ・ジャンルのプルダウン初期表示及び選択後表示用データ格納
  useEffect(() => {
    //ジャンル1
    const initialGenre1 = filterInitialGenre1(
      itemCommonInfo,
      itemCommonGenreInfo
    );
    setGenre1(
      initialGenre1.length !== 0
        ? `${initialGenre1[0].G_name}(${initialGenre1[0].SK})`
        : message.USPECIFIED
    );
    //ジャンル2
    const initialGenre2 = filterInitialGenre2(
      itemCommonInfo,
      itemCommonGenreInfo
    );
    setGenre2(
      initialGenre2.length !== 0
        ? `${initialGenre2[0].G_name}(${initialGenre2[0].SK})`
        : message.USPECIFIED
    );
    //ジャンル3
    const initialGenre3 = filterInitialGenre3(
      itemCommonInfo,
      itemCommonGenreInfo
    );
    setGenre3(
      initialGenre3.length !== 0
        ? `${initialGenre3[0].G_name}(${initialGenre3[0].SK})`
        : message.USPECIFIED
    );
  }, [itemCommonInfo]);

  //共通情報　ジャンル1プルダウンオプション設定
  useEffect(() => {
    const genreInfo = itemCommonGenreInfo.filter((item) => {
      return item.SK.length === 4 && itemCommonInfo.length !== 0
        ? item.G_parent_code === itemCommonInfo.category
        : null;
    });
    genreInfo.push(unspecified1);
    setGenre1Info(genreInfo);
  }, [itemCommonInfo]);

  //共通情報　ジャンル2プルダウンオプション設定
  useEffect(() => {
    const genreInfo = itemCommonGenreInfo.filter((item) => {
      return item.SK.length === 6 && itemCommonInfo.length !== 0
        ? item.G_parent_code === itemCommonInfo.genre1
        : null;
    });
    genreInfo.push(unspecified2);
    setGenre2Info(genreInfo);
  }, [itemCommonInfo]);

  //共通情報　ジャンル3プルダウンオプション設定
  useEffect(() => {
    const genreInfo = itemCommonGenreInfo.filter((item) => {
      return item.SK.length === 8 && itemCommonInfo.length !== 0
        ? item.G_parent_code === itemCommonInfo.genre2
        : null;
    });
    genreInfo.push(unspecified3);
    setGenre3Info(genreInfo);
  }, [itemCommonInfo]);

  //共通情報更新関数　ジャンル1
  const selectGenre1 = (event) => {
    let value = event.target.value;
    setGenre1(value);
    value === message.USPECIFIED && setGenre2(value) && setGenre3(value);
    let selectedNum1 =
      value !== message.USPECIFIED ? value.slice(value.length - 5, -1) : null;

    setItemCommonInfo((prevState) => ({
      ...prevState,
      genre1: selectedNum1,
      genre2: null,
      genre3: null,
    }));
  };

  //共通情報更新関数　ジャンル2
  const selectGenre2 = (event) => {
    let value = event.target.value;
    setGenre2(value);
    value === message.USPECIFIED && setGenre3(value);
    let selectedNum2 =
      value !== message.USPECIFIED ? value.slice(value.length - 7, -1) : null;

    setItemCommonInfo((prevState) => ({
      ...prevState,
      genre2: selectedNum2,
      genre3: null,
    }));
  };

  //共通情報更新関数　ジャンル3
  const selectGenre3 = (event) => {
    let value = event.target.value;
    setGenre3(value);
    let selectedNum3 =
      value !== message.USPECIFIED ? value.slice(value.length - 9, -1) : null;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      genre3: selectedNum3,
    }));
  };

  return (
    <FormContainer
      sx={{
        m: 1,
        minWidth: 275,
        maxWidth: 275,
        boxShadow: 1,
        p: 0,
        m: 0,
      }}
      size="small"
    >
      {item.label === "genre1" ? (
        <SelectBox value={genre1} onChange={selectGenre1}>
          {genre1Info &&
            genre1Info?.map((item, index) => {
              return [
                <MenuItem
                  key={index}
                  value={
                    item.SK ? `${item.G_name}(${item.SK})` : `${item.G_name}`
                  }
                >
                  {item.SK ? `${item.G_name}(${item.SK})` : `${item.G_name}`}
                </MenuItem>,
                <br />,
              ];
            })}
        </SelectBox>
      ) : item.label === "genre2" ? (
        <SelectBox value={genre2} onChange={selectGenre2}>
          {genre2Info &&
            genre2Info?.map((item, index) => {
              return [
                <MenuItem
                  key={index}
                  value={
                    item.SK ? `${item.G_name}(${item.SK})` : `${item.G_name}`
                  }
                >
                  {item.SK ? `${item.G_name}(${item.SK})` : `${item.G_name}`}
                </MenuItem>,
                <br />,
              ];
            })}
        </SelectBox>
      ) : item.label === "genre3" ? (
        <SelectBox value={genre3} onChange={selectGenre3}>
          {genre3Info &&
            genre3Info?.map((item, index) => {
              return [
                <MenuItem
                  key={index}
                  value={
                    item.SK ? `${item.G_name}(${item.SK})` : `${item.G_name}`
                  }
                >
                  {item.SK !== ""
                    ? `${item.G_name}(${item.SK})`
                    : `${item.G_name}`}
                </MenuItem>,
                <br />,
              ];
            })}
        </SelectBox>
      ) : null}
    </FormContainer>
  );
};
