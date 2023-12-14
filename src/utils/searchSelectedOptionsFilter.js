//新規商品取込一覧画面:取込一覧のプルダウン選択検索パラメータを作成する関数
export const searchSelectedOptionsFilter = (
  valueFrom2,
  valueTo2,
  companyData,
  inputTypeData
) => {
  //パラメータ用オブジェクトを作成
  const scanFileParam = {
    import_date_From: valueFrom2,
    import_date_To: valueTo2,
    provider: companyData,
    import_group_type: inputTypeData,
  };
  //プルダウン選択項目の抽出
  const scanFileParamValue = Object.values(scanFileParam).filter(
    //未選択以外を抽出
    (item) => item
  );
  //プルダウン選択済のパラメータを作成する関数
  const paramFilter = (paramObj, filterFunc) => {
    return Object.assign(
      ...Object.keys(paramObj)
        .filter((ObjectKey) => filterFunc(paramObj[ObjectKey]))
        .map((ObjectKey) => ({ [ObjectKey]: paramObj[ObjectKey] }))
    );
  };
  //プルダウンを1項目以上選択の場合、検索用をリクエストする。
  // 全て未選択の場合、全件取得する。
  return scanFileParamValue.length === 0
    ? null
    : paramFilter(scanFileParam, (item) => item);
};
