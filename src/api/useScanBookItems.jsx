import { useState } from "react";
import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as states from "../recoil/RecoilState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { importBookGroupType } from "../pages/NewProductList";
import { importBookNumber } from "../pages/NewProductList";
import {
  switchSelectedValueToParam,
  switchValue,
  formtDate,
  switchCategoryAndGenres,
} from "../service/converter/switch";

export const useScanBookItems = () => {
  const [scanBookItems, setScanBookItems] = useState("");
  const setBookItem = useSetRecoilState(states.bookItemFlag);
  const itemCommonGenreInfo = useRecoilValue(states.itemCommonGenreInfo);
  const providerInfo = useRecoilValue(states.providerInfo);
  const inputType = useRecoilValue(states.inputType);

  useEffect(() => {
    if (importBookGroupType !== undefined && importBookNumber !== undefined) {
      setBookItem(true);
      fetchDataBookItems(importBookGroupType);
    }
  }, [importBookGroupType, importBookNumber]);

  const fetchDataBookItems = async (importBookGroupType) => {
    /* 新規商品取込一覧画面(取込一覧)：取込番号クリック時、
     取込種別名を新規商品取込一覧画面(新規商品一覧)表示パラメータ用に変換*/
    const convertedImportType = switchSelectedValueToParam(
      importBookGroupType,
      inputType
    );
    const listData = await API.graphql(
      graphqlOperation(queries.scan_book_items, {
        input: {
          import_group_type: convertedImportType,
          import_no: importBookNumber,
        },
      })
    );
    //提供会社に変換
    listData.data.scan_book_items.provider = switchValue(
      listData.data.scan_book_items.provider,
      providerInfo
    );

    //取込種別に変換
    listData.data.scan_book_items.import_group_type = switchValue(
      listData.data.scan_book_items.import_group_type,
      inputType
    );

    listData.data.scan_book_items.b_items.forEach((str) => {
      if (!str.release_date || str.release_date === "0") {
        str.release_date = null;
      } else {
        //発売日フォーマット変換 ex) YYYYMMDD =>  YYYY/MM/DD
        str.release_date = formtDate(str.release_date);
      }
    });

    //商品分類・ジャンル1名称・ジャンル2名称・ジャンル3名称の名称を変換
    listData.data.scan_book_items.b_items.forEach((item) => {
      const { category, genre1, genre2, genre3 } = switchCategoryAndGenres(
        item,
        itemCommonGenreInfo
      );
      item.category = category;
      item.genre1 = genre1;
      item.genre2 = genre2;
      item.genre3 = genre3;
    });

    setScanBookItems(listData);
  };
  return { scanBookItems };
};
