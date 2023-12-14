import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useSetRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";
import { changeAuthor } from "../service/converter/switch";

export const useQuerySerachSoftItems = () => {
  const setDuplicateLoading = useSetRecoilState(states.duplicateInfoloading);
  const setSoftItemDuplicateProductInfoRecoil = useSetRecoilState(
    states.softItemDuplicateInfo
  );
  const setSoftItemDuplicateProductInfo = useSetRecoilState(
    states.softItemDuplicateProductInfo
  );
  const setRockedInstoreCode = useSetRecoilState(states.rockedInstoreCode);
  const rockedInstoreCodeArr = [];

  const fetchSoftItemDetailInfo = async (
    softItemDuplicateKeyInstoreCodeForDetail
  ) => {
    const newInstoreCodeArr = softItemDuplicateKeyInstoreCodeForDetail.map(
      (item) => {
        return item.instore_code;
      }
    );
    const rowsParam = String(newInstoreCodeArr.length);
    await API.graphql(
      graphqlOperation(queries.query_search_items, {
        input: {
          page: "1",
          rows: rowsParam, //インストアコードリストの個数分のレスポンスをリクエストする
          instore_code: newInstoreCodeArr,
        },
      })
    )
      .then((res) => {
        if (res.data.query_search_items.items[0].new_item_approval_block) {
          rockedInstoreCodeArr.push(
            res.data.query_search_items.items[0].instore_code
          );
        }
        if (res.data) {
          //著作者がある場合、変換して格納
          changeAuthor(res.data.query_search_items.items);
          setSoftItemDuplicateProductInfoRecoil(
            res.data.query_search_items.items
          );
          setSoftItemDuplicateProductInfo(res.data.query_search_items.items);
        } else {
          setDuplicateLoading(true);
        }
        return res;
      })
      .catch((err) => {
        setDuplicateLoading(false);
        return err;
      });
    setRockedInstoreCode(rockedInstoreCodeArr);
  };

  return { fetchSoftItemDetailInfo };
};
