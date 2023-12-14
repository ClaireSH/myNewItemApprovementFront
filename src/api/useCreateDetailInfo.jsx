import { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import * as states from "../recoil/RecoilState";
import { formtDate, switchValue } from "../service/converter/switch";
import {
  filterDetailInfo,
  convertSoukoMasterGroup,
  convertSoukoBumonGroup,
  convertGenre1Souko,
  convertGenre2Souko,
  convertGenre3Souko,
  setDuplicateInfoProp,
  setDuplicateBookInfoProp,
  setDuplicateSoftInfoProp,
} from "../utils/detailInfo";

export const useCreateDetailnfo = () => {
  const [duplicateInfoData, setDuplicateInfoData] = useState(null);
  const [detailInfo, setDetailnfo] = useState([]);
  const bookItemDuplicateProductInfoRecoil = useRecoilValue(
    states.bookItemDuplicateInfo
  );
  const softItemDuplicateProductInfoRecoil = useRecoilValue(
    states.softItemDuplicateInfo
  );
  const duplicateLoading = useRecoilValue(states.duplicateInfoloading);
  const itemCommonGenreInfo = useRecoilValue(states.itemCommonGenreInfo);
  const bumomGroup = useRecoilValue(states.bumonGroupData);
  const duplicateItemsName = useRecoilValue(states.duplicateItemsName);
  let filteredkeyTypeInfo = null;

  const createDetailInfo = (keyTypeInfo) => {
    //重複商品情報初期化
    setDetailnfo([]);
    const newkeyTypeInfo = keyTypeInfo;
    if (newkeyTypeInfo) {
      //重複キーから取得したインストアコード情報が存在するものを配列化：query_detail_by_duplicate_key
      filteredkeyTypeInfo =
        newkeyTypeInfo.data.query_detail_by_duplicate_key.d_item.filter(
          (item) => {
            return item.instore_code_list.length !== 0;
          }
        );
      //配列化したインストアコード情報のキータイプを変換
      filteredkeyTypeInfo.forEach((str) => {
        switchValue(str.key_type, duplicateItemsName) &&
          (str.key_type = switchValue(str.key_type, duplicateItemsName));
      });
    }
    if (filteredkeyTypeInfo) {
      //インストアコード情報に重複商品表示用のプロパティを設置
      filteredkeyTypeInfo.forEach((item) => {
        setDuplicateInfoProp(item);
      });
      /* 重複商品情報のデータを作成する。
       query_detail_by_duplicate_keyとquery_search_itemsのデータを結合する*/
      const filteredDetailInfo = filterDetailInfo(filteredkeyTypeInfo);
      setDuplicateInfoData(filteredDetailInfo);
    }
  };

  //重複商品情報作成：書籍系
  useEffect(() => {
    let newDuplicateProductInfoData =
      bookItemDuplicateProductInfoRecoil.length !== 0
        ? bookItemDuplicateProductInfoRecoil
        : null;
    if (newDuplicateProductInfoData && duplicateInfoData) {
      /*結合した重複商品情報の各インストアコードに対応する商品詳細情報：query_search_itemの値を
         設定 */
      duplicateInfoData.forEach((item) => {
        for (let data of newDuplicateProductInfoData) {
          item.instore_code === data.instore_code &&
            setDuplicateBookInfoProp(item, data);
        }
      });
      duplicateInfoData.forEach((item) => {
        //重複商品情報の発売日をYYYY/MM/DDに変換
        if (!item.release_date) {
          return;
        } else {
          if (!item.release_date.includes("/")) {
            item.release_date = formtDate(item.release_date);
          }
        }
      });
      duplicateInfoData.forEach((item) => {
        //重複商品情報の商品分類を変換
        item.souko_master_group = convertSoukoMasterGroup(
          item,
          itemCommonGenreInfo
        );
        //重複商品情報の部門分類名称を変換
        item.souko_bumon_group = convertSoukoBumonGroup(item, bumomGroup);
      });
      //重複商品情報の倉庫ジャンル1名称・倉庫ジャンル2名称・倉庫ジャンル3名称を変換
      duplicateInfoData.forEach((data) => {
        data.genre1_souko = convertGenre1Souko(data, itemCommonGenreInfo); //倉庫ジャンル1名称
        data.genre2_souko = convertGenre2Souko(data, itemCommonGenreInfo); //倉庫ジャンル2名称
        data.genre3_souko = convertGenre3Souko(data, itemCommonGenreInfo); //倉庫ジャンル3名称
      });
      setDetailnfo(duplicateInfoData);
    }
  }, [bookItemDuplicateProductInfoRecoil, duplicateInfoData, duplicateLoading]);

  //重複商品情報作成：ソフト系
  useEffect(() => {
    let newDuplicateProductInfoData =
      softItemDuplicateProductInfoRecoil.length !== 0
        ? softItemDuplicateProductInfoRecoil
        : null;
    if (newDuplicateProductInfoData && duplicateInfoData) {
      /*結合した重複商品情報の各インストアコードに対応する商品詳細情報：query_search_itemのプロパティを
         設定 */
      duplicateInfoData.forEach((item) => {
        for (let data of newDuplicateProductInfoData) {
          item.instore_code === data.instore_code &&
            setDuplicateSoftInfoProp(item, data);
        }
      });
      duplicateInfoData.forEach((item) => {
        //重複商品情報の発売日をYYYY/MM/DDに変換
        if (!item.release_date) {
          return;
        } else {
          if (!item.release_date.includes("/")) {
            item.release_date = formtDate(item.release_date);
          }
        }
        //重複商品情報の情報公開日をYYYY/MM/DDに変換
        if (!item.open_day) {
          return;
        } else {
          if (!item.open_day.includes("/")) {
            item.open_day = formtDate(item.open_day);
          }
        }
      });
      duplicateInfoData.forEach((item) => {
        //重複商品情報の商品分類を変換
        item.souko_master_group = convertSoukoMasterGroup(
          item,
          itemCommonGenreInfo
        );
        //重複商品情報の部門分類名称を変換
        item.souko_bumon_group = convertSoukoBumonGroup(item, bumomGroup);
      });
      //重複商品情報の倉庫ジャンル1名称・倉庫ジャンル2名称・倉庫ジャンル3名称を変換
      duplicateInfoData.forEach((data) => {
        data.genre1_souko = convertGenre1Souko(data, itemCommonGenreInfo); //倉庫ジャンル1名称
        data.genre2_souko = convertGenre2Souko(data, itemCommonGenreInfo); //倉庫ジャンル2名称
        data.genre3_souko = convertGenre3Souko(data, itemCommonGenreInfo); //倉庫ジャンル3名称
      });
      setDetailnfo(duplicateInfoData);
    }
  }, [softItemDuplicateProductInfoRecoil, duplicateInfoData, duplicateLoading]);
  return { createDetailInfo, detailInfo, setDetailnfo };
};
