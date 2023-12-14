import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";

export const useQueryUpdateItem = () => {
  const location = useLocation();
  const [bookItems, setBookItems] = useState(
    location.state !== undefined ? location.state.state.scanBookItem : null
  );
  const [softItems, setSoftItems] = useState(
    location.state !== undefined ? location.state.state.scanSoftItem : null
  );
  const initial = useRecoilValue(states.initialInstoreCode);
  const setExmallCooperation = useSetRecoilState(states.exmallCooperationInfo);
  const setItemCommonInfo = useSetRecoilState(states.itemCommonInfo);
  const setItemAttributeBookInfo = useSetRecoilState(
    states.itemAttributeBookInfo
  );
  const setItemAttributeSoftInfo = useSetRecoilState(
    states.itemAttributeSoftInfo
  );
  const setItemAuthor = useSetRecoilState(states.itemAuthorInfo);
  const setItemCommentInfo = useSetRecoilState(states.itemCommentInfo);
  const setRadioFlag = useSetRecoilState(states.radioFlag);
  const setItemTagInfo = useSetRecoilState(states.itemTagInfo);
  const [show, setShow] = useState("");
  const [instoreCode, setInstoreCode] = useState(initial);

  //書籍系パラメータ：インストアコード
  const bookInstoreCode = bookItems
    ? bookItems.data.scan_book_items.b_items.filter((str) => {
        return str.instore_code === instoreCode;
      })[0]?.instore_code
    : null;
  //ソフト系パラメータ：インストアコード
  const softInstoreCode = softItems
    ? softItems.data.scan_soft_items.s_items.filter((str) => {
        return str.instore_code === instoreCode;
      })[0]?.instore_code
    : null;

  const fetchDataItem = async () => {
    if (bookInstoreCode) {
      const listData = await API.graphql(
        graphqlOperation(queries.query_book_item, {
          input: {
            instore_code: bookInstoreCode,
          },
        })
      );
      setExmallCooperation(listData.data.query_book_item[0].exmall_cooperation);
      listData.data.query_book_item[0].exmall_cooperation.forEach((str) => {
        setExmallCooperation((prevState) =>
          prevState.map((item) =>
            item.exmall_type === str.exmall_type
              ? str.enable_cooperation === "1"
                ? {
                    enable_cooperation: true,
                    exmall_type: item.exmall_type,
                  }
                : str.enable_cooperation === "0"
                ? {
                    enable_cooperation: false,
                    exmall_type: item.exmall_type,
                  }
                : item
              : item
          )
        );
      });
      setRadioFlag(listData.data.query_book_item[0].exmall_cooperation);
      setItemCommonInfo(listData.data.query_book_item[0].item);
      setItemAttributeBookInfo(
        listData.data.query_book_item[0].item_attributes_books
      );
      setItemCommentInfo(listData.data.query_book_item[0].item_comment);
      setItemAuthor(listData.data.query_book_item[0].item_author);
      setItemTagInfo(listData.data.query_book_item[0].item_tag);
      setShow("BookItem");
    } else if (softInstoreCode) {
      const listData = await API.graphql(
        graphqlOperation(queries.query_soft_item, {
          input: {
            instore_code: softInstoreCode,
          },
        })
      );
      setExmallCooperation(listData.data.query_soft_item[0].exmall_cooperation);
      listData.data.query_soft_item[0].exmall_cooperation.forEach((str) => {
        setExmallCooperation((prevState) =>
          prevState.map((item) =>
            item.exmall_type === str.exmall_type
              ? str.enable_cooperation === "1"
                ? {
                    enable_cooperation: true,
                    exmall_type: item.exmall_type,
                  }
                : str.enable_cooperation === "0"
                ? {
                    enable_cooperation: false,
                    exmall_type: item.exmall_type,
                  }
                : item
              : item
          )
        );
      });
      setRadioFlag(listData.data.query_soft_item[0].exmall_cooperation);
      setItemCommonInfo(listData.data.query_soft_item[0].item);
      setItemAttributeSoftInfo(
        listData.data.query_soft_item[0].item_attributes_soft
      );
      setItemAuthor(listData.data.query_soft_item[0].item_author);
      setItemCommentInfo(listData.data.query_soft_item[0].item_comment);
      setItemTagInfo(listData.data.query_soft_item[0].item_tag);
      setShow("SoftItem");
    } else {
      console.log("404");
    }
  };

  useEffect(() => {
    fetchDataItem();
  }, []);

  return {
    show,
    bookInstoreCode,
    softInstoreCode,
  };
};
