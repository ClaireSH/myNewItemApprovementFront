import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

export const useDeleteItem = () => {
  const [deletedItemFlag, setDeletedItemFlag] = useState(false);
  const [f4Flag, setf4Flag] = useState(false);
  const deleteItem = async (instoreCode) => {
    const listData = await API.graphql(
      graphqlOperation(mutations.delete_temp_item, {
        input: {
          instore_code: instoreCode,
        },
      })
    )
      .then((res) => {
        setDeletedItemFlag(true);
        return res;
      })
      .catch((err) => {
        alert("正常に処理が出来ませんでした");
        setDeletedItemFlag(false);
        return err;
      });

    console.log(listData);
  };
  return { deleteItem, deletedItemFlag, setDeletedItemFlag, f4Flag, setf4Flag };
};
