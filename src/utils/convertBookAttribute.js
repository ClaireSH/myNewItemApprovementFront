//書籍系属性情報を変換処理する関数
export const convertBookAttribute = (itemAttributeBookInfo, bookAttribute) => {
  // //共通情報　nullの項目 → ""へ変換
  const itemAttributeBookInfoArr = [{ ...itemAttributeBookInfo }].map(
    (item) => {
      for (let i in item) {
        if (item[i] === null) {
          item[i] = "";
        }
      }
      return item;
    }
  );
  //書籍系属性情報データモデルにAPIから取得した書籍系属性情報の値を設定し、画面表示用データを作成
  const newItemAttributeBookInfoArr = Object.entries(
    itemAttributeBookInfoArr[0]
  );
  bookAttribute.forEach((item) => {
    for (let info of newItemAttributeBookInfoArr) {
      item.label === info[0] && (item.value = info[1]);
    }
  });
  return { bookAttribute };
};

//エラー検知項目フィルター
export const filterList = (attributeGroup, label) => {
  return attributeGroup.filter((list) => list.label === label);
};

//書籍系属性情報Group1(巻次・巻次数)バリデーション判定用数値化処理関数
export const chengeToNumvalueGroup1 = (label, value) => {
  let numValue = null;
  (label === "volume_no" || label === "volume_last_no") &&
    (numValue =
      value === "" || !value?.match(/\S/g) || isNaN(value)
        ? null
        : Number(value));
  return numValue;
};

//書籍系属性情報Group1入力項目以外のエラー検知オブジェクト
export const checkErrorAttributrBookGroup1Item = {
  volume: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "volume");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  volume_no: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "volume_no");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup1(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      isNaN(filteredItem[0].value)
    );
  },
  volume_last_no: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "volume_last_no");
    //バリデーション判定用数値化処理
    let numValue = chengeToNumvalueGroup1(
      filteredItem[0].label,
      filteredItem[0].value
    );
    return (
      numValue > filteredItem[0].pattern.maxValue ||
      isNaN(filteredItem[0].value)
    );
  },
  subtitle: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "subtitle");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  subtitle_kana: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "subtitle_kana");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  volume_title: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "volume_title");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  volume_title_kana: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "volume_title_kana");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  series_name: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "series_name");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  series_name_kana: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "series_name_kana");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  series_volume: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "series_volume");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  subseries_name: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "subseries_name");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  subseries_name_kana: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "subseries_name_kana");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  subseries_volume: (bookAttributeGroup1) => {
    const filteredItem = filterList(bookAttributeGroup1, "subseries_volume");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
};

//書籍系属性情報Group2入力項目以外のエラー検知オブジェクト
export const checkErrorAttributrBookGroup2Item = {
  publisher: (bookAttributeGroup2) => {
    const filteredItem = filterList(bookAttributeGroup2, "publisher");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  distributor: (bookAttributeGroup2) => {
    const filteredItem = filterList(bookAttributeGroup2, "distributor");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  sales_target_code: (bookAttributeGroup2) => {
    const filteredItem = filterList(bookAttributeGroup2, "sales_target_code");
    return (
      (filteredItem[0].value.length !== 0 &&
        filteredItem[0].value.length !== filteredItem[0].pattern.numLength) ||
      isNaN(filteredItem[0].value)
    );
  },
  publication_form_code: (bookAttributeGroup2) => {
    const filteredItem = filterList(
      bookAttributeGroup2,
      "publication_form_code"
    );
    return (
      filteredItem[0].value.length > filteredItem[0].pattern.maxLength ||
      isNaN(filteredItem[0].value)
    );
  },
  classification_code: (bookAttributeGroup2) => {
    const filteredItem = filterList(bookAttributeGroup2, "classification_code");
    return (
      (filteredItem[0].value.length !== 0 &&
        filteredItem[0].value.length !== filteredItem[0].pattern.numLength) ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
};

//書籍系属性情報Group3入力項目以外のエラー検知オブジェクト
export const checkErrorAttributrBookGroup3Item = {
  size: (bookAttributeGroup3) => {
    const filteredItem = filterList(bookAttributeGroup3, "size");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  format: (bookAttributeGroup3) => {
    const filteredItem = filterList(bookAttributeGroup3, "format");
    return filteredItem[0].value.length > filteredItem[0].pattern.maxLength;
  },
  ndc_code: (bookAttributeGroup3) => {
    const filteredItem = filterList(bookAttributeGroup3, "ndc_code");
    return (
      (filteredItem[0].value.length !== 0 &&
        filteredItem[0].value.length !== filteredItem[0].pattern.numLength) ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  bookpage_code: (bookAttributeGroup3) => {
    const filteredItem = filterList(bookAttributeGroup3, "bookpage_code");
    return (
      (filteredItem[0].value.length !== 0 &&
        filteredItem[0].value.length > filteredItem[0].pattern.numLength) ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
  magazine_code: (bookAttributeGroup3) => {
    const filteredItem = filterList(bookAttributeGroup3, "magazine_code");
    return (
      (filteredItem[0].value.length !== 0 &&
        filteredItem[0].value.length !== filteredItem[0].pattern.numLength) ||
      !filteredItem[0].pattern.value?.test(filteredItem[0].value)
    );
  },
};
