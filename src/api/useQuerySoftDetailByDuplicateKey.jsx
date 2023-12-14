import { useSetRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

export const useQuerySoftDetailByDuplicateKey = () => {
  const setTimeoutFlag = useSetRecoilState(states.timeoutFlag);
  const setDuplicateLoading = useSetRecoilState(states.duplicateInfoloading);
  const setSoftItemDuplicateProductInfoRecoil = useSetRecoilState(
    states.softItemDuplicateInfo
  );
  const setSoftItemDuplicateProductInfo = useSetRecoilState(
    states.softItemDuplicateProductInfo
  );

  const fetchSoftItemDuplicateKeyInstoreCode = async (
    instoreCode,
    createDetailInfo,
    setDetailnfo,
    setSoftItemDuplicateKeyInstoreCode,
    setSoftItemDuplicateKeyInstoreCodeForDetail
  ) => {
    let listData = "";
    setTimeoutFlag(false);
    setDuplicateLoading(true);
    setSoftItemDuplicateKeyInstoreCode([]);
    setSoftItemDuplicateKeyInstoreCodeForDetail([]);
    setSoftItemDuplicateProductInfoRecoil([]);
    setSoftItemDuplicateProductInfo([]);
    //重複商品情報初期化
    setDetailnfo([]);

    listData = await API.graphql(
      graphqlOperation(queries.query_detail_by_duplicate_key, {
        input: {
          instore_code: instoreCode,
        },
      })
    )
      .then((res) => {
        setTimeoutFlag(false);
        return res;
      })
      .catch((err) => {
        setTimeoutFlag(true);
        setDuplicateLoading(false);
        return err;
      });
    if (listData.data.query_detail_by_duplicate_key !== null) {
      listData.data.query_detail_by_duplicate_key.d_item.forEach((str) => {
        if (str.instore_code_list.length === 0) {
          createDetailInfo(null);
          setDuplicateLoading(false);
          return;
        } else {
          createDetailInfo(listData);
          //重複商品情報インストアコードリスト取得
          setSoftItemDuplicateKeyInstoreCode(str.instore_code_list);
        }
      });
    }
  };

  return { fetchSoftItemDuplicateKeyInstoreCode };
};
