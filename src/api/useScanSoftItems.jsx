import { useState } from "react";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as states from "../recoil/RecoilState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { imporSoftGroupType } from "../pages/NewProductList";
import { importSoftNumber } from "../pages/NewProductList";
import {
  switchSelectedValueToParam,
  switchValue,
  formtDate,
  switchCategoryAndGenres,
} from "../service/converter/switch";

export const useScanSoftItems = () => {
  const [scanSoftItems, setScanSoftItems] = useState("");
  const setSoftItem = useSetRecoilState(states.softItemFlag);
  const itemCommonGenreInfo = useRecoilValue(states.itemCommonGenreInfo);
  const providerInfo = useRecoilValue(states.providerInfo);
  const inputType = useRecoilValue(states.inputType);

  useEffect(() => {
    if (imporSoftGroupType !== undefined && importSoftNumber !== undefined) {
      setSoftItem(true);
      fetchDataSoftItems(imporSoftGroupType);
    }
  }, [imporSoftGroupType, importSoftNumber]);

  const fetchDataSoftItems = async (importSoftGroupType) => {
    /* 新規商品取込一覧画面(取込一覧)：取込番号クリック時、
     取込種別名を新規商品取込一覧画面(新規商品一覧)表示パラメータ用に変換*/
    const convertedImportType = switchSelectedValueToParam(
      importSoftGroupType,
      inputType
    );
    const listData = await API.graphql(
      graphqlOperation(queries.scan_soft_items, {
        input: {
          import_group_type: convertedImportType,
          import_no: importSoftNumber,
        },
      })
    );
    //提供会社に変換
    listData.data.scan_soft_items.provider = switchValue(
      listData.data.scan_soft_items.provider,
      providerInfo
    );

    //取込種別に変換
    listData.data.scan_soft_items.import_group_type = switchValue(
      listData.data.scan_soft_items.import_group_type,
      inputType
    );

    listData.data.scan_soft_items.s_items.forEach((str) => {
      if (!str.release_date || str.release_date === "0") {
        str.release_date = null;
      } else {
        //発売日フォーマット変換 ex) YYYYMMDD =>  YYYY/MM/DD
        str.release_date = formtDate(str.release_date);
      }
      if (!str.open_date || str.open_date === "0") {
        str.open_date = null;
      } else {
        //情報公開日フォーマット変換 ex) YYYYMMDD =>  YYYY/MM/DD
        str.open_date = formtDate(str.open_date);
      }
    });

    //商品分類・ジャンル1名称・ジャンル2名称・ジャンル3名称の名称を変換
    listData.data.scan_soft_items.s_items.forEach((item) => {
      const { category, genre1, genre2, genre3 } = switchCategoryAndGenres(
        item,
        itemCommonGenreInfo
      );
      item.category = category;
      item.genre1 = genre1;
      item.genre2 = genre2;
      item.genre3 = genre3;
    });

    setScanSoftItems(listData);
  };
  return { scanSoftItems };
};
