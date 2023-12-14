import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";
import {
  switchValue,
  formtDate,
  formatTime,
} from "../service/converter/switch";

export const useScanFile = () => {
  const setNewProductData = useSetRecoilState(states.newProductData);
  const providerInfo = useRecoilValue(states.providerInfo);
  const inputType = useRecoilValue(states.inputType);
  const getNewProductData = async (searchSelectedOptions) => {
    const param = searchSelectedOptions && {
      input: searchSelectedOptions,
    };
    const newProductData = await API.graphql(
      graphqlOperation(queries.scan_file, param)
    );
    newProductData.data.scan_file.map(function (str) {
      //提供会社に変換
      str.provider = switchValue(str.provider, providerInfo);
      //取込種別に変換
      str.import_group_type = switchValue(str.import_group_type, inputType);
      //取込日付フォーマット変換 ex) YYYYMMDD =>  YYYY/MM/DD
      str.import_date = formtDate(str.import_date);
      //取込時刻フォーマット変換 ex) HHMMSS =>  HH/MM/SS
      str.import_time = formatTime(str.import_time);
    });
    setNewProductData(newProductData);
  };

  return { getNewProductData };
};
