import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

export const useRestore = () => {
  const restoreItem = async (instoreCode) => {
    const listData = await API.graphql(
      graphqlOperation(mutations.restore_status, {
        input: {
          instore_code: instoreCode,
        },
      })
    ).then((res) => {
      alert("復元しました。");
      console.log(res);
    });
    console.log(listData);
  };
  return { restoreItem };
};
