/* 重複商品情報のデータを作成する。*/

// query_detail_by_duplicate_keyとquery_search_itemsのデータを結合
export const filterDetailInfo = (filteredkeyTypeInfo) => {
  //重複キーが存在するデータを抽出
  const filteredInfo = filteredkeyTypeInfo.filter((list) => {
    const ngaKey = list.key_type === "NGAキー";
    const nipKanriCode = list.key_type === "NIPS管理コード";
    const skdKey = list.key_type === "SKDキー";
    const jmdKey = list.key_type === "JMDキー";
    const jmdDupliKey = list.key_type === "JMD重複チェックキー";
    const jan = list.key_type === "JAN";
    const ndc = list.key_type === "JAN+NDC分類";
    const janBookPage = list.key_type === "JAN+BOOKPAGE分類";
    const specCode = list.key_type === "規格品番";
    const nipKey = list.key_type === "NIPキー";
    return {
      ngaKey,
      nipKanriCode,
      skdKey,
      jmdKey,
      jmdDupliKey,
      jan,
      ndc,
      janBookPage,
      specCode,
      nipKey,
    };
  });
  //instore_code_listのリスト分の行を作成
  let newFilteredInfo = [];
  filteredInfo.forEach((list) => {
    for (let i = 0; i < list.instore_code_list.length; i++) {
      let copyArr = Object.assign({}, list);
      newFilteredInfo.push(copyArr);
    }
  });
  //instore_code_listのリストを一律に配列化
  const instoreCodeList = filteredInfo
    .map((list) => list.instore_code_list)
    .map((list) => list.map((list) => list.instore_code))
    .reduce((list, elem) => {
      return list.concat(elem);
    });
  //重複商品情報にinstore_code_listのインストアコードを設定
  newFilteredInfo.forEach((list, index) => {
    for (let i in instoreCodeList) {
      Number(i) === index && (list.instore_code = instoreCodeList[i]);
    }
  });
  return newFilteredInfo;
};
//商品分類を変換
export const convertSoukoMasterGroup = (item, itemCommonGenreInfo) => {
  const soukoMasterGroup = itemCommonGenreInfo.filter((category) => {
    return category.SK === item.souko_master_group;
  });
  return (
    soukoMasterGroup.length !== 0 &&
    `${soukoMasterGroup[0].G_name}(${soukoMasterGroup[0].SK})`
  );
};
//部門分類名称を変換
export const convertSoukoBumonGroup = (item, bumomGroup) => {
  const soukoBumonGroup = bumomGroup.filter((category) => {
    return category.group_code === item.souko_bumon_group;
  });
  return (
    soukoBumonGroup.length !== 0 &&
    `${soukoBumonGroup[0].group_name}(${soukoBumonGroup[0].group_code})`
  );
};
//倉庫ジャンル1名称を変換
export const convertGenre1Souko = (data, itemCommonGenreInfo) => {
  const getGenre1Souko = itemCommonGenreInfo.filter((item) => {
    return data && item.SK === data.genre1_souko;
  });
  return (
    getGenre1Souko[0] && `${getGenre1Souko[0].G_name}(${getGenre1Souko[0].SK})`
  );
};
//倉庫ジャンル2名称を変換
export const convertGenre2Souko = (data, itemCommonGenreInfo) => {
  const getGenre2Souko = itemCommonGenreInfo.filter((item) => {
    return data && item.SK === data.genre2_souko;
  });
  return (
    getGenre2Souko[0] && `${getGenre2Souko[0].G_name}(${getGenre2Souko[0].SK})`
  );
};
//倉庫ジャンル3名称を変換
export const convertGenre3Souko = (data, itemCommonGenreInfo) => {
  const getGenre3Souko = itemCommonGenreInfo.filter((item) => {
    return data && item.SK === data.genre3_souko;
  });
  return (
    getGenre3Souko[0] && `${getGenre3Souko[0].G_name}(${getGenre3Souko[0].SK})`
  );
};
/*結合した書籍系重複商品情報の各インストアコードに対応する商品詳細情報：query_search_itemのプロパティを
         設定 */
export const setDuplicateSoftInfoProp = (item, data) => {
  item.key_type = item.key_type; //重複項目
  item.new_item_approval_block = data.new_item_approval_block ? "＊" : ""; //ロック
  item.instore_code = item.instore_code; //ｲﾝｽﾄｱｺｰﾄﾞ
  item.souko_master_group = data.souko_master_group; //商品分類
  item.genre1_souko = data.genre1_souko; //倉庫ｼﾞｬﾝﾙ1名称
  item.genre2_souko = data.genre2_souko; //倉庫ｼﾞｬﾝﾙ2名称
  item.genre3_souko = data.genre3_souko; //倉庫ｼﾞｬﾝﾙ3名称
  item.jan_code = data.jan_code; //JANコード
  item.size_format = data.size_format; //型番
  item.name = data.name; //商品名
  item.author = data.author; //ｱｰﾃｨｽﾄ（代表）
  item.price = data.price; //定価
  item.release_date = data.release_date; //発売日
  item.open_day = data.open_day; //情報公開日
  item.souko_bumon_group = data.souko_bumon_group; //部門分類名称
};
/*結合したソフト系重複商品情報の各インストアコードに対応する商品詳細情報：query_search_itemのプロパティを
         設定 */
export const setDuplicateBookInfoProp = (item, data) => {
  item.key_type = item.key_type; //重複項目
  item.new_item_approval_block = data.new_item_approval_block ? "＊" : ""; //ロック
  item.instore_code = item.instore_code; //ｲﾝｽﾄｱｺｰﾄﾞ
  item.souko_master_group = data.souko_master_group; //商品分類
  item.genre1_souko = data.genre1_souko; //倉庫ｼﾞｬﾝﾙ1名称
  item.genre2_souko = data.genre2_souko; //倉庫ｼﾞｬﾝﾙ2名称
  item.genre3_souko = data.genre3_souko; //倉庫ｼﾞｬﾝﾙ3名称
  item.jan_code = data.jan_code; //JANコード
  item.name = data.name; //商品名
  item.volume = data.volume; //巻次
  item.author = data.author; //著作者（代表）
  item.price = data.price; //定価
  item.release_date = data.release_date; //発売日
  item.subtitle = data.subtitle; //副書名
  item.volume_title = data.volume_title; //個別書名
  item.series_name = data.series_name; //シリーズ名
  item.souko_bumon_group = data.souko_bumon_group; //部
};
//インストアコード情報に重複商品表示用のプロパティを設置
export const setDuplicateInfoProp = (item) => {
  item.key_type = item.key_type;
  item.new_item_approval_block = null;
  item.instore_code = null;
  item.souko_master_group = null;
  item.genre1_souko = null;
  item.genre2_souko = null;
  item.genre3_souko = null;
  item.jan_code = null;
  item.name = null;
  item.volume = null;
  item.author = null;
  item.price = null;
  item.open_day = null;
  item.release_date = null;
  item.subtitle = null;
  item.volume_title = null;
  item.series_name = null;
  item.souko_bumon_group = null;
};
