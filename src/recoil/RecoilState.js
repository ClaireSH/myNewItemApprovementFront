import { atom, selector } from "recoil";

export const userInfo = atom({
  key: "userInfo",
  default: {
    userName: "",
    groupName: "",
  },
});

export const newProductData = atom({
  key: "newProductData",
  default: {
    newProductData: [],
  },
});

export const itemIschanged = atom({
  key: "itemIschanged",
  default: false,
});

export const initialInstoreCode = atom({
  key: "initialInstoreCode",
  default: [],
});

export const bookIndexsIsChanged = atom({
  key: "bookIndexsIsChanged",
  default: true,
});

export const checkBoxInstoreCode = atom({
  key: "checkBoxInstoreCode",
  default: "",
});

export const itemValue = atom({
  key: "itemValue",
  default: "",
});

export const duplicateInfoloading = atom({
  key: "duplicateInfoloading",
  default: false,
});

export const timeoutFlag = atom({
  key: "timeoutFlag",
  default: false,
});

export const bookItemFlag = atom({
  key: "bookItemFlag",
  default: false,
});

export const softItemFlag = atom({
  key: "softItemFlag",
  default: false,
});

export const selectBoxData = atom({
  key: "selectBoxData",
  default: {
    selectBoxData: [],
  },
});

export const restrictedTypeData = atom({
  key: "restrictedTypeData",
  default: [],
});

export const authorRoleTypeData = atom({
  key: "authorRoleTypeData",
  default: [],
});

// 著作者の代表者情報
export const autorRep = atom({
  key: "autorRep",
  default: "rep-0",
});

export const updateTypeData = atom({
  key: "updateTypeData",
  default: [],
});

export const commentTypeData = atom({
  key: "commentTypeData",
  default: [],
});

export const exmallTeypeData = atom({
  key: "exmallTeypeData",
  default: [],
});

export const priceDisplayData = atom({
  key: "priceDisplayData",
  default: [],
});
//倉庫商品連携区分
export const soukoCooperationType = atom({
  key: "soukoCooperationType",
  default: [],
});
//倉庫商品連携区分
export const triCooperationType = atom({
  key: "triCooperationType",
  default: [],
});
export const importTypeData = atom({
  key: "importTypeData",
  default: [],
});

export const specialMediaTypeData = atom({
  key: "specialMediaTypeData",
  default: [],
});

export const copyguardTypeData = atom({
  key: "copyguardTypeData",
  default: [],
});

export const editionData = atom({
  key: "editionData",
  default: [],
});

export const salesChannelCodeData = atom({
  key: "salesChannelCodeData",
  default: [],
});

export const titleAvcgData = atom({
  key: "titleAvcgData",
  default: [],
});

export const progressTypeData = atom({
  key: "progressTypeData",
  default: [],
});

export const salesTypeData = atom({
  key: "salesTypeData",
  default: [],
});

export const seminewRereleaseData = atom({
  key: "seminewRereleaseData",
  default: [],
});

export const hitChartTypeData = atom({
  key: "hitChartTypeData",
  default: [],
});

export const maxiSingleTypeData = atom({
  key: "maxiSingleTypeData",
  default: [],
});

export const lmitedTypeCodeData = atom({
  key: "lmitedTypeCodeData",
  default: [],
});

export const mediaFormatCodeData = atom({
  key: "mediaFormatCodeData",
  default: [],
});

export const bumonGroupData = atom({
  key: "bumonGroupData",
  default: [],
});

export const providerInfo = atom({
  key: "providerInfo",
  default: [],
});

export const inputType = atom({
  key: "inputType",
  default: [],
});

export const itemCommonInfo = atom({
  key: "itemCommonInfo",
  default: "",
});

export const itemCommonGenreInfo = atom({
  key: "itemCommonGenreInfo",
  default: [],
});

export const exmallCooperationInfo = atom({
  key: "exmallCooperationInfo",
  default: [],
});

export const itemAttributeBookInfo = atom({
  key: "itemAttributeBookInfo",
  default: [],
});

export const itemAttributeSoftInfo = atom({
  key: "itemAttributeSoftInfo",
  default: [],
});

export const itemAuthorInfo = atom({
  key: "itemAuthorInfo",
  default: [],
});

//情報更新用の代表者情報反映の著作者リスト（代表者をリストの一番上に設定）
export const itemAuthorInfoForRegister = selector({
  key: "itemAuthorInfoForRegister",
  get: ({ get }) => {
    const authorList = get(itemAuthorInfo); // 著作者リスト
    let tmparr = [...authorList];
    const representative = get(autorRep); // rep-0, rep-1
    const repIndex = parseInt(representative.substring(4));
    if (repIndex === 0) {
      return tmparr;
    } else {
      const elementToRemove = tmparr.splice(repIndex, 1)[0]; // 配列でindexの要素を削除して保存
      tmparr.unshift(elementToRemove); // 保存した要素を配列の先頭に追加
      return tmparr;
    }
  },
});

export const itemCommentInfo = atom({
  key: "itemCommentInfo",
  default: [],
});

export const itemCommentInfoLocal = atom({
  key: "itemCommentInfoLocal",
  default: [],
});

export const itemTagInfo = atom({
  key: "itemTagInfo",
  default: [],
});

export const radioFlag = atom({
  key: "radioFlag",
  default: [],
});

export const bookItemDuplicateInfo = atom({
  key: "bookItemDuplicateInfo",
  default: [],
});

export const softItemDuplicateInfo = atom({
  key: "softItemDuplicateInfo",
  default: [],
});

//ジャンル1のデータ
export const genre1 = atom({
  key: "genre1",
  default: "",
});
//ジャンル2のデータ
export const genre2 = atom({
  key: "genre2",
  default: "指定なし",
});
//ジャンル3のデータ
export const genre3 = atom({
  key: "genre3",
  default: "指定なし",
});

export const instoreCode = atom({
  key: "instoreCode",
  default: "",
});

export const updateInstoreCode = atom({
  key: "updateInstoreCode",
  default: "",
});

export const bookItemDuplicateProductInfo = atom({
  key: "bookItemDuplicateProductInfo",
  default: "",
});

export const softItemDuplicateProductInfo = atom({
  key: "softItemDuplicateProductInfo",
  default: "",
});

export const resisteredItemFlag = atom({
  key: "resisteredItemFlag",
  default: false,
});

export const itemCounts = atom({
  key: "itemCounts",
  default: "",
});

export const selectedRowFlag = atom({
  key: "selectedRowFlag",
  default: false,
});

export const dupItemCount = atom({
  key: "dupItemCount",
  default: "",
});

export const onclickCursorFlag = atom({
  key: "onclickCursorFlag",
  default: false,
});

export const rockedInstoreCode = atom({
  key: "rockedInstoreCode",
  default: [],
});

export const company = atom({
  key: "company",
  default: "all",
});

export const importType = atom({
  key: "importType",
  default: "all",
});

export const valueFrom = atom({
  key: "valueFrom",
  default: null,
});

export const valueFrom2 = atom({
  key: "valueFrom2",
  default: null,
});

export const valueTo = atom({
  key: "valueTo",
  default: null,
});

export const valueTo2 = atom({
  key: "valueTo2",
  default: null,
});

export const companyData = atom({
  key: "companyData",
  default: [],
});

export const inputTypeData = atom({
  key: "inputTypeData",
  default: [],
});

export const checkedIndex = atom({
  key: "checkedIndex",
  default: [],
});
//共通情報グループ1(インストアコード・JANコード・商品名・商品名カナ・商品名英字)エラーフラグ
export const commonInfoGroup1Error = atom({
  key: "commonInfoGroup1Error",
  default: false,
});
//共通情報グループ2(商品分類・ジャンル1・ジャンル2・ジャンル3・定価・発売日・限定表示)エラーフラグ
export const commonInfoGroup2Error = atom({
  key: "commonInfoGroup2Error",
  default: false,
});
//共通情報グループ3(コンテンツ名・サブコンテンツ名)エラーフラグ
export const commonInfoGroup3Error = atom({
  key: "commonInfoGroup3Error",
  default: false,
});

/*書籍系属性情報グループ1(巻次・巻次数・最終巻次・副書名・副書名カナ・個別書名・個別書名カナ・シリーズ名・シリーズ名カナ
・シリーズ名巻次・副シリーズ名・副シリーズ名カナ・副シリーズ名巻次)エラーフラグ*/
export const attributeBookGroup1Error = atom({
  key: "attributeBookGroup1Error",
  default: false,
});
/*書籍系属性情報グループ2(出版社名
・発売会社名・販売形態・発行形態・内容コード)エラーフラグ*/
export const attributeBookGroup2Error = atom({
  key: "attributeBookGroup2Error",
  default: false,
});
/*書籍系属性情報グループ3(サイズ情報
・判型・NDC分類・BOOKPAGE分類・雑誌コード)エラーフラグ*/
export const attributeBookGroup3Error = atom({
  key: "attributeBookGroup3Error",
  default: false,
});
/*ソフト系属性情報グループ1(規格品番・タイトル規格品番・販売会社・発売会社・組数・トラック数・時間・リージョンコード・廃盤日)エラーフラグ*/
export const attributeSoftGroup1Error = atom({
  key: "attributeSoftGroup1Error",
  default: false,
});
/*ソフト系属性情報グループ2(旧品番・再発売商品番号・同類商品・商品形状・特典情報・マスタリング情報・録音年等・プロモーション備考・
  セット数・総作品数・総収録時間・作品数・収録時間・メディア形態補足1・メディア形態補足2)エラーフラグ*/
export const attributeSoftGroup2Error = atom({
  key: "attributeSoftGroup2Error",
  default: false,
});
//情報公開日・時間
export const selectedTimeAndDay = atom({
  key: "selectedTimeAndDay",
  default: null,
});
//著作者エラーフラグ
export const authorError = atom({
  key: "authorError",
  default: false,
});
//著作者カナエラーフラグ
export const authorKanaError = atom({
  key: "authorKanaError",
  default: false,
});
//著作者英字エラーフラグ
export const authorEngError = atom({
  key: "authorEngError",
  default: false,
});
//コメントエラーフラグ
export const commnentError = atom({
  key: "commnentError",
  default: false,
});
//コメント更新フラグ
export const commnentFlag = atom({
  key: "commnentFlag",
  default: false,
});
//タグエラーフラグ
export const tagError = atom({
  key: "tagError",
  default: false,
});
//環境別URL取得項目
export const url = atom({
  key: "url",
  default: "",
});
//F2 新規登録エラーメッセージ
export const recordErrorMessage = atom({
  key: "recordErrorMessage",
  default: [],
});
//重複商品の重複項目名
export const duplicateItemsName = atom({
  key: "duplicateItemsName",
  default: [],
});
//F2 新規登録時のフラグ
export const f2RecordFlag = atom({
  key: "f2RecordFlag",
  default: false,
});
