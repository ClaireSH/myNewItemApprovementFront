import { useCallback } from "react";
import * as states from "../recoil/RecoilState";
import { useUpdateItem } from "../api/useUpdateItem";
import { useQueryUpdateItem } from "../api/useQueryUpdateItem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { switchCommentContextToParam } from "../service/converter/switch";

//新規商品詳細更新コンポーネント
export const useF11UpdateItem = () => {
  const { bookInstoreCode, softInstoreCode } = useQueryUpdateItem();
  const instoreCode =
    bookInstoreCode !== ""
      ? bookInstoreCode
      : softInstoreCode !== ""
      ? softInstoreCode
      : null;
  const { updateItems } = useUpdateItem();
  const itemCommonInfo = useRecoilValue(states.itemCommonInfo);
  const exmallCooperation = useRecoilValue(states.exmallCooperationInfo);
  const itemAttributeBookInfo = useRecoilValue(states.itemAttributeBookInfo);
  const itemAttributeSoftInfo = useRecoilValue(states.itemAttributeSoftInfo);
  const setItemAuthor = useSetRecoilState(states.itemAuthorInfo);
  const itemAuthor = useRecoilValue(states.itemAuthorInfoForRegister);
  const setSelectedRepresentative = useSetRecoilState(states.autorRep);
  const itemCommentInfoLocal = useRecoilValue(states.itemCommentInfoLocal);
  const itemTagInfo = useRecoilValue(states.itemTagInfo);
  const attributeBookGroup1Error = useRecoilValue(
    states.attributeBookGroup1Error
  );
  const attributeBookGroup2Error = useRecoilValue(
    states.attributeBookGroup2Error
  );
  const attributeBookGroup3Error = useRecoilValue(
    states.attributeBookGroup3Error
  );
  const commonInfoGroup1Error = useRecoilValue(states.commonInfoGroup1Error);
  const commonInfoGroup2Error = useRecoilValue(states.commonInfoGroup2Error);
  const commonInfoGroup3Error = useRecoilValue(states.commonInfoGroup3Error);
  const attributeSoftGroup1Error = useRecoilValue(
    states.attributeSoftGroup1Error
  );
  const attributeSoftGroup2Error = useRecoilValue(
    states.attributeSoftGroup2Error
  );
  const authorError = useRecoilValue(states.authorError);
  const authorKanaError = useRecoilValue(states.authorKanaError);
  const authorEngError = useRecoilValue(states.authorEngError);
  const commnentError = useRecoilValue(states.commnentError);
  const tagError = useRecoilValue(states.tagError);

  //新規商品詳細更新関数
  const upDateItems = useCallback(() => {
    // コメント更新用パラメータの作成
    const itemCommentInfo = switchCommentContextToParam(itemCommentInfoLocal);
    // 共通情報更新用パラメータの作成
    const { instore_code, ...itemCommonInfo_WithoutInstorecode } =
      itemCommonInfo;
    //更新情報
    const upDateInfoParams = {
      itemCommonInfo_WithoutInstorecode, //共通情報
      exmallCooperation, //外部モール連携
      itemAttributeBookInfo, //属性情報 書籍系
      itemAttributeSoftInfo, //属性情報 ソフト系
      itemAuthor, //著作者
      itemCommentInfo, //コメント
      itemTagInfo, //タグ
    };
    //著作者代表者順番初期化
    setSelectedRepresentative("rep-0");
    //著作者表示順更新
    setItemAuthor(itemAuthor);
    updateItems(upDateInfoParams, bookInstoreCode, softInstoreCode);
  }, [
    instoreCode,
    bookInstoreCode,
    softInstoreCode,
    exmallCooperation,
    itemCommonInfo,
    itemAttributeBookInfo,
    itemAttributeSoftInfo,
    itemAuthor,
    itemCommentInfoLocal,
    itemTagInfo,
    attributeBookGroup1Error,
    attributeBookGroup2Error,
    attributeBookGroup3Error,
    commonInfoGroup1Error,
    commonInfoGroup2Error,
    commonInfoGroup3Error,
    attributeSoftGroup1Error,
    attributeSoftGroup2Error,
    authorError,
    authorKanaError,
    authorEngError,
    tagError,
    commnentError,
  ]);

  //新規商品詳細更新判定関数
  const upDateF11Items = useCallback(() => {
    if (
      attributeBookGroup1Error ||
      attributeBookGroup2Error ||
      attributeBookGroup3Error ||
      commonInfoGroup1Error ||
      commonInfoGroup2Error ||
      commonInfoGroup3Error ||
      attributeSoftGroup1Error ||
      attributeSoftGroup2Error ||
      authorError ||
      authorKanaError ||
      authorEngError ||
      tagError ||
      commnentError
    ) {
      alert("入力欄を正しく入力してください。");
    } else {
      upDateItems();
    }
  }, [
    instoreCode,
    bookInstoreCode,
    softInstoreCode,
    exmallCooperation,
    itemCommonInfo,
    itemAttributeBookInfo,
    itemAttributeSoftInfo,
    itemAuthor,
    itemCommentInfoLocal,
    itemTagInfo,
    attributeBookGroup1Error,
    attributeBookGroup2Error,
    attributeBookGroup3Error,
    commonInfoGroup1Error,
    commonInfoGroup2Error,
    commonInfoGroup3Error,
    attributeSoftGroup1Error,
    attributeSoftGroup2Error,
    authorError,
    authorKanaError,
    authorEngError,
    tagError,
    commnentError,
  ]);

  return { upDateF11Items };
};
