//提供会社名・取込種別・重複項目に変換する関数
export const switchValue = (value, scanClassInfo) => {
  const filteredValue = scanClassInfo.filter((info) => {
    return info.type_code === value;
  });
  return (value = filteredValue[0]?.type_name);
};

//提供会社名(プルダウン)・取込種別名(プルダウン)をパラメータ用に変換する関数
export const switchSelectedValueToParam = (selectedValue, scanClassInfo) => {
  const filteredkeyType = scanClassInfo.filter((info) => {
    return info.type_name === selectedValue;
  });
  return (selectedValue = filteredkeyType[0]?.type_code);
};

//日付フォーマット変換
export const formtDate = (formatValue) => {
  const firstFormtedDate = changeFormat(formatValue, 4, "/");
  const secondFormtedDate = changeFormat(firstFormtedDate, 7, "/");
  return secondFormtedDate;
};

//時刻フォーマット変換
export const formatTime = (formatValue) => {
  const firstTFormtedTime = changeFormat(formatValue, 2, ":");
  const secondFormtedTime = changeFormat(firstTFormtedTime, 5, ":");
  return secondFormtedTime;
};
//フォーマット変換関数
const changeFormat = (str, idx, val) => {
  const res = str.slice(0, idx) + val + str.slice(idx);
  return res;
};
//コメント(内部メモ・商品説明・付属表示・査定時備考・更新区分)の更新内容をパラメータ用に変換する関数
export const switchCommentContextToParam = (itemCommentInfoLocal) => {
  const itemCommentInfo = [...itemCommentInfoLocal]
    .map((item) => {
      const { comment_name, ...other } = item;
      return other;
    })
    .filter((item) => {
      return item.update_type;
    });

  return itemCommentInfo;
};
//商品分類・ジャンル1名称・ジャンル2名称・ジャンル3名称の名称を変換
export const switchCategoryAndGenres = (item, itemCommonGenreInfo) => {
  //商品分類を抽出
  const filterdCategory = itemCommonGenreInfo.filter((category) => {
    return category.G_parent_code === "" && category.SK === item.category;
  });
  //ジャンル1名称を抽出
  const filterdGenre1 = itemCommonGenreInfo.filter((genre1) => {
    return genre1.G_parent_code === item.category && genre1.SK === item.genre1;
  });
  //ジャンル2名称を抽出
  const filterdGenre2 = itemCommonGenreInfo.filter((genre2) => {
    return genre2.G_parent_code === item.genre1 && genre2.SK === item.genre2;
  });
  //ジャンル3名称を抽出
  const filterdGenre3 = itemCommonGenreInfo.filter((genre3) => {
    return genre3.G_parent_code === item.genre2 && genre3.SK === item.genre3;
  });
  //商品分類を変換　ex)
  const category =
    filterdCategory.length !== 0
      ? `${filterdCategory[0].G_name}(${filterdCategory[0].SK})`
      : null;
  //ジャンル1名称を変換　ex)
  const genre1 =
    filterdGenre1.length !== 0
      ? `${filterdGenre1[0].G_name}(${filterdGenre1[0].SK})`
      : null;
  //ジャンル2名称を変換　ex)
  const genre2 =
    filterdGenre2.length !== 0
      ? `${filterdGenre2[0].G_name}(${filterdGenre2[0].SK})`
      : null;
  //ジャンル3名称を変換　ex)
  const genre3 =
    filterdGenre3.length !== 0
      ? `${filterdGenre3[0].G_name}(${filterdGenre3[0].SK})`
      : null;

  return { category, genre1, genre2, genre3 };
};

//著作者変換関数
export const changeAuthor = (item) => {
  item.forEach((item) => {
    const newAuthorArr = JSON.parse(item.author);
    const representativeIncludingName = newAuthorArr?.filter((item) => {
      return item.representative === true;
    });
    const newName = representativeIncludingName?.map((name) => {
      return name.name;
    });
    item.author = newName[0];
  });
};
