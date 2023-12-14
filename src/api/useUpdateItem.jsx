import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

export const useUpdateItem = () => {
  const updateItems = async (
    upDateInfoParams,
    bookInstoreCode,
    softInstoreCode
  ) => {
    const {
      itemCommonInfo_WithoutInstorecode,
      exmallCooperation,
      itemAttributeBookInfo,
      itemAttributeSoftInfo,
      itemAuthor,
      itemCommentInfo,
      itemTagInfo,
    } = upDateInfoParams;
    const listData = await API.graphql(
      graphqlOperation(mutations.update_item, {
        input: {
          //インストアコード
          instore_code: bookInstoreCode
            ? bookInstoreCode
            : softInstoreCode
            ? softInstoreCode
            : null,
          //共通情報
          m_item: itemCommonInfo_WithoutInstorecode,
          //属性情報　書籍系
          m_item_attributes_books: bookInstoreCode
            ? itemAttributeBookInfo
            : null,
          //属性情報　ソフト系
          m_item_attributes_soft: softInstoreCode
            ? itemAttributeSoftInfo
            : null,
          //著作者
          m_item_author: itemAuthor,
          //コメント
          m_item_comment: itemCommentInfo,
          //タグ
          m_item_tag: itemTagInfo,
          //外部モール連携
          m_exmall_cooperation: exmallCooperation,
        },
      })
    ).then((res) => {
      //F11 確定(更新)の場合、正常更新のみメッセージを返す。(エラーメッセージは返さない。)
      const errorResponse = res.data.update_item.error;
      errorResponse === "" && alert("更新しました。");
      return res;
    });
    console.log({ listData });
  };

  return { updateItems };
};
