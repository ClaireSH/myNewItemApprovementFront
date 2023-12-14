import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "./../recoil/RecoilState";

export const useF3UpdateItem = () => {
  const setResisteredItemFlag = useSetRecoilState(states.resisteredItemFlag);
  const [checkBox, setCheckBox] = useRecoilState(states.checkBoxInstoreCode);
  const upDateF3Items = async (duplicateInfoInstoreCode, instoreCode) => {
    const listData = await API.graphql(
      graphqlOperation(mutations.update_new_item, {
        input: {
          instore_code_set: {
            instore_code: duplicateInfoInstoreCode,
            pre_instore_code: instoreCode,
          },
        },
      })
    )
      .then((res) => {
        if (res.data.update_new_item[0].error !== "") {
          alert(res.data.update_new_item[0].error);
          setResisteredItemFlag(false);
          setCheckBox(checkBox);
          setResisteredItemFlag(false);
        } else {
          setResisteredItemFlag(true);
        }
        return res;
      })
      .catch((err) => {
        setResisteredItemFlag(false);
        return err;
      });
    console.log(listData);
  };

  return { upDateF3Items };
};
