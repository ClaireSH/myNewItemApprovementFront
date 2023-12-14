//ソフト系属性情報を変換処理する関数
export const convertSoftAttribute = (itemAttributeSoftInfo, softAttribute) => {
  // //共通情報　nullの項目 → ""へ変換
  const itemAttributeSoftInfoArr = [{ ...itemAttributeSoftInfo }].map(
    (item) => {
      for (let i in item) {
        if (item[i] === null) {
          item[i] = "";
        }
      }
      return item;
    }
  );
  //ソフト系属性情報データモデルにAPIから取得したソフト系属性情報の値を設定し、画面表示用データを作成
  const newItemAttributeSoftInfoArr = Object.entries(
    itemAttributeSoftInfoArr[0]
  );
  softAttribute.forEach((item) => {
    for (let info of newItemAttributeSoftInfoArr) {
      item.label === info[0] && (item.value = info[1]);
    }
  });
  return { softAttribute };
};

//ソフト系属性情報(組数・トラック数・セット数・総作品数・作品数)バリデーション判定用数値化処理関数
export const chengeToNumvalueSoftInfo = (label, value) => {
  let numValue = null;
  (label === "disc_count" ||
    label === "total_track" ||
    label === "set_count" ||
    label === "total_works" ||
    label === "works") &&
    (numValue =
      value === "" || !value?.match(/\S/g) || isNaN(value)
        ? null
        : Number(value));
  return numValue;
};

//エラー検知項目フィルター
export const filterList = (commonInfoGroup, label) => {
  return commonInfoGroup.filter((list) => list.label === label);
};

//ソフト系属性情報Group1入力項目以外のエラー検知オブジェクト
export const checkErrorSoftAttributeGroup1Item = {
  speccode: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "speccode");
    return (
      filteredItem[0].value.length > filteredItem[0].pattern.maxLength ||
      (filteredItem[0].value.length === 0 && filteredItem[0].pattern.required)
    );
  },
  title_speccode: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "title_speccode");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  vendor: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "vendor");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  distributor: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "distributor");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  disc_count: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "disc_count");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  total_track: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "total_track");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  time: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "time");
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  region_code: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(newSoftAttributeGroup1, "region_code");
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      isNaN(filteredItem[0].value)
    );
  },
  discontinued_date: (newSoftAttributeGroup1) => {
    const filteredItem = filterList(
      newSoftAttributeGroup1,
      "discontinued_date"
    );
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      isNaN(filteredItem[0].value)
    );
  },
};

//ソフト系属性情報Group2入力項目以外のエラー検知オブジェクト
export const checkErrorSoftAttributeGroup2Item = {
  old_speccode: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "old_speccode");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  rerelease_item_number: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(
      newSoftAttributeGroup2,
      "rerelease_item_number"
    );
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  similar_item: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "similar_item");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  media_info: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "media_info");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  item_shape: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "item_shape");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  benefits: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "benefits");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  mastering_info: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "mastering_info");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  recording_info: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "recording_info");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  promotion_remark: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "promotion_remark");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  set_count: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "set_count");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  total_works: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "total_works");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  works: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "works");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueSoftInfo(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  total_run_time: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "total_run_time");
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      isNaN(filteredItem[0].value)
    );
  },
  run_time: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(newSoftAttributeGroup2, "run_time");
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      isNaN(filteredItem[0].value)
    );
  },
  media_format_remark1: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(
      newSoftAttributeGroup2,
      "media_format_remark1"
    );
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      isNaN(filteredItem[0].value)
    );
  },
  media_format_remark2: (newSoftAttributeGroup2) => {
    const filteredItem = filterList(
      newSoftAttributeGroup2,
      "media_format_remark2"
    );
    return (
      (filteredItem[0].value.length !== filteredItem[0].pattern.numLength &&
        filteredItem[0].value.length !== 0) ||
      isNaN(filteredItem[0].value)
    );
  },
};

//情報公開日初期表示日付フォーマット整形関数
export const initialFormatDate = (str, idx, val) => {
  return str?.slice(0, idx) + val + str?.slice(idx);
};

//情報公開日入力時日付フォーマット整形関数
export const formatDate = (dt) => {
  //入力数値のバリデーション
  const isInvalidDate = (date) => Number.isNaN(date.getTime());
  const validDate = isInvalidDate(new Date(dt));
  if (validDate === "Invalid Date" || dt === null) {
    return;
  }
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);

  return y + m + d;
};

//情報公開時間初期表示時間フォーマット整形関数
export const initialFormatTime = (str, idx, val) => {
  return str.slice(0, idx) + val + str.slice(idx);
};

//情報公開日・時間入力時時間フォーマット整形関数
export const formatTime = (dt) => {
  //入力数値のバリデーション
  const isInvalidDate = (date) => Number.isNaN(date.getTime());
  const validDate = isInvalidDate(new Date(dt));
  if (validDate === "Invalid Date" || dt === null) {
    return;
  }
  let hh = padding(dt.getHours(), 2);
  let mm = padding(dt.getMinutes(), 2);
  let ss = padding(dt.getSeconds(), 2);

  return hh + mm + ss;
};

//情報公開日HH/MM/SS 0詰め処理
export const padding = (n, d, p) => {
  p = p || "0";
  return (p.repeat(d) + n).slice(-d);
};
