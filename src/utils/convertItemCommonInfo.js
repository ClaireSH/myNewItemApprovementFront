//共通情報を変換処理する関数
export const convertItemCommonInfo = (itemCommonInfo, commonInfo) => {
  // //共通情報　nullの項目 → ""へ変換
  const itemCommonInfoArr = [{ ...itemCommonInfo }].map((item) => {
    for (let i in item) {
      if (item[i] === null) {
        item[i] = "";
      }
    }
    return item;
  });
  //共通情報データモデルにAPIから取得した共通情報の値を設定し、画面表示用データを作成
  const newItemCommonInfoArr = Object.entries(itemCommonInfoArr[0]);
  /*共通情報グループ1(インストアコード・JANコード・商品名・商品名カナ・商品名英字)*/
  /*共通情報グループ3コンテンツ名・サブコンテンツ名・倉庫連携区分・店舗連携区分・外部連携区分)*/
  commonInfo.forEach((item) => {
    for (let info of newItemCommonInfoArr) {
      item.label === info[0] && (item.value = info[1]);
    }
  });
  /*共通情報グループ2(ジャンル1・ジャンル2・ジャンル3・部門分類・定価・発売日・年齢制限区分・限定表示)*/
  commonInfo[0].id === "2" &&
    commonInfo.forEach((item) => {
      for (let info of newItemCommonInfoArr) {
        if (item.label1 || item.label2) {
          item.label1 === info[0] && (item.value.price = info[1]);
          item.label2 === info[0] &&
            (item.value.price_display_method = info[1]);
        } else {
          item.label === info[0] && (item.value = info[1]);
        }
      }
    });
  return { commonInfo };
};

//共通情報 発売日変換(画面表示用)　YYYY/MM/DD
export const convertFormatDateDisplay = (dt) => {
  //入力数値のバリデーション
  const isInvalidDate = (date) => Number.isNaN(date.getTime());
  const validDate = isInvalidDate(new Date(dt));
  //未入力の場合フォーマット整形をしない
  if (validDate === "Invalid Date" || dt === null) {
    return;
  }
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);

  return m + "/" + d + "/" + y;
};

//共通情報 発売日変換(リクエストパラメータ用)　YYYYMMDD
export const convertFormatDateParam = (dt) => {
  //入力数値のバリデーション
  const isInvalidDate = (date) => Number.isNaN(date.getTime());
  const validDate = isInvalidDate(new Date(dt));
  //未入力の場合フォーマット整形をしない
  if (validDate === "Invalid Date" || dt === null) {
    return;
  }
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);

  return y + m + d;
};

//共通情報Group2(定価)バリデーション判定用数値化処理関数
export const chengeToNumvalueGroup2 = (label, value, inputType) => {
  let numValue = null;
  label === "price" &&
    (numValue =
      value === "" ||
      isNaN(value) ||
      ((inputType === "insertFromPaste" || inputType === "insertText") &&
        Math.sign(Number(value)) === -1) //コピー&ペーストもしくは手入力で入力かつマイナス数値入力の場合
        ? null
        : Number(value));
  return numValue;
};

//エラー検知項目フィルター
export const filterList = (commonInfoGroup, label) => {
  return commonInfoGroup.filter((list) =>
    list.label ? list.label === label : list.label1 === label
  );
};

//共通情報Group1入力項目以外のエラー検知オブジェクト
export const checkErrorCommonInfoGroup1Item = {
  jan_code: (newCommonInfoGroup1) => {
    const filteredItem = filterList(newCommonInfoGroup1, "jan_code");
    return (
      filteredItem[0].value.length > filteredItem[0].pattern.maxLength ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  item_name: (newCommonInfoGroup1) => {
    const filteredItem = filterList(newCommonInfoGroup1, "item_name");
    return (
      filteredItem[0].value.length > filteredItem[0].pattern.maxLength ||
      (filteredItem[0].value.length === 0 && filteredItem[0].pattern.required)
    );
  },
  item_name_kana: (newCommonInfoGroup1) => {
    const filteredItem = filterList(newCommonInfoGroup1, "item_name_kana");
    return (
      filteredItem[0].value.length > filteredItem[0].pattern.maxLength ||
      (filteredItem[0].value.length === 0 && filteredItem[0].pattern.required)
    );
  },
  item_name_eng: (newCommonInfoGroup1) => {
    const filteredItem = filterList(newCommonInfoGroup1, "item_name_eng");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
};

//共通情報Group2入力項目以外のエラー検知オブジェクト
export const checkErrorCommonInfoGroup2Item = {
  limited_remark: (newCommonInfoGroup2) => {
    const filteredItem = filterList(newCommonInfoGroup2, "limited_remark");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  release_date: (newCommonInfoGroup2) => {
    const filteredItem = filterList(newCommonInfoGroup2, "release_date");
    return Number(filteredItem[0].value)
      ? filteredItem[0].value.length > filteredItem[0].pattern.maxLength
      : true;
  },
  price: (newCommonInfoGroup2) => {
    const filteredItem = filterList(newCommonInfoGroup2, "price");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup2(
      filteredItem[0].label1,
      filteredItem[0].value.price
    );
    return numValue > filteredItem[0].pattern.maxValue;
  },
};

//共通情報Group3入力項目以外のエラー検知オブジェクト
export const checkErrorCommonInfoGroup3Item = {
  contents_name: (newCommonInfoGroup3) => {
    const filteredItem = filterList(newCommonInfoGroup3, "contents_name");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  subcontents_name: (newCommonInfoGroup3) => {
    const filteredItem = filterList(newCommonInfoGroup3, "subcontents_name");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
};

//共通タブ・ジャンルのプルダウン初期表示及び選択後表示用データ格納
//ジャンル1
export const filterInitialGenre1 = (itemCommonInfo, itemCommonGenreInfo) => {
  let genre1 = [];
  const selecteCommonGenre1Info = itemCommonGenreInfo.filter((item) => {
    return item.G_parent_code === itemCommonInfo.category;
  });
  if (selecteCommonGenre1Info.length !== 0) {
    genre1 = selecteCommonGenre1Info.filter((item) => {
      return item.SK === itemCommonInfo.genre1;
    });
  }
  return genre1;
};

//ジャンル2
export const filterInitialGenre2 = (itemCommonInfo, itemCommonGenreInfo) => {
  let genre2 = [];
  const selecteCommonGenre2Info = itemCommonGenreInfo.filter((item) => {
    return item.G_parent_code === itemCommonInfo.genre1;
  });
  if (selecteCommonGenre2Info.length !== 0) {
    genre2 = selecteCommonGenre2Info.filter((item) => {
      return item.SK === itemCommonInfo.genre2;
    });
    return genre2;
  } else {
    return genre2;
  }
};

//ジャンル3
export const filterInitialGenre3 = (itemCommonInfo, itemCommonGenreInfo) => {
  let genre3 = [];
  const selecteCommonGenre3Info = itemCommonGenreInfo.filter((item) => {
    return item.G_parent_code === itemCommonInfo.genre2;
  });
  if (selecteCommonGenre3Info.length !== 0) {
    const genre3 = selecteCommonGenre3Info.filter((item) => {
      return item.SK === itemCommonInfo.genre3;
    });
    return genre3;
  } else {
    return genre3;
  }
};

//入力項目以外のエラー検知関数(限定表示・発売日・価格)
export const isErrorOtherItem = (labels, pricelabel, commonInfoGroup2) => {
  const newCommonInfoGroup2 = [...commonInfoGroup2].filter((list) => {
    return (
      list.label === "limited_remark" ||
      list.label === "release_date" ||
      list.label1 === "price"
    );
  });
  const checkedErrorItem = newCommonInfoGroup2
    .filter((list) => {
      return list.label !== labels || list.label1 !== pricelabel;
    })
    .map((list) => {
      return list.label
        ? checkErrorCommonInfoGroup2Item[list.label](newCommonInfoGroup2)
        : checkErrorCommonInfoGroup2Item[list.label1](newCommonInfoGroup2);
    });
  return checkedErrorItem.includes(true) ? true : false;
};
