import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "./../recoil/RecoilState";

export const useF2RecordItem = () => {
  const [checkBox, setCheckBox] = useRecoilState(states.checkBoxInstoreCode);
  const setResisteredItemFlag = useSetRecoilState(states.resisteredItemFlag);
  const setF2RecordFlag = useSetRecoilState(states.f2RecordFlag);
  const setRecordErrorMessage = useSetRecoilState(states.recordErrorMessage);
  const putNewItem = async (instoreCode, checkBoxFlag) => {
    await API.graphql(
      graphqlOperation(mutations.put_new_item, {
        input: {
          check_4_duplicate: checkBoxFlag,
          instore_code: instoreCode,
        },
      })
    )
      .then((res) => {
        //バックエンドからのエラー処理
        if (res.data.put_new_item.error === "") {
          setResisteredItemFlag(true);
        } else {
          //バックエンドエラーメッセージ設定 ※重複エラーメッセージは表示しない
          const errorMessage = res.data.put_new_item.error.includes(
            "重複対象が存在しているため、登録をスキップしました"
          )
            ? null
            : res.data.put_new_item.error;
          //エラーメッセージをパース
          const replacedErrorMessage = errorMessage?.replace(/'/g, '"'); //エラーメッセージがJSONの場合パースできるように、キーの'' を ""に変換
          const parsingErrorMessage = replacedErrorMessage?.includes("{") //JSON形式判定で分岐
            ? JSON.parse(replacedErrorMessage) //JSONの場合：パースして返す。
            : replacedErrorMessage; //文言の場合：そのまま返す。
          //文言エラーメッセージ用リスト
          const non_JSON_errorMessage = [];
          non_JSON_errorMessage.push(parsingErrorMessage);
          //表示するエラーメッセージをリスト化
          const errorMessageList =
            typeof parsingErrorMessage === "object"
              ? //JSONの場合：キーを抽出し表示
                Object.keys(parsingErrorMessage).map(
                  (message) => ` '${message}'、`
                )
              : //文言の場合：文言をそのまま表示
                non_JSON_errorMessage;
          errorMessageList.unshift("異常が発生しました：");
          //重複エラーの場合は、メッセージは表示しない
          errorMessage && setRecordErrorMessage(errorMessageList);
          //バックエンドエラー通知
          // alert(res.data.put_new_item.error);
          setF2RecordFlag(false);
          setResisteredItemFlag(false);
          setCheckBox(checkBox);
        }
        return res;
      })
      .catch((err) => {
        //AWS Amplifyからのエラー処理
        if (err.errors[0].errorType === "ExecutionTimeout") {
          alert("正常に処理が出来ませんでした。(タイムアウトエラー)");
        } else if (err.errors[0].errorType === "TransportQueryError") {
          alert(err.errors[0].message);
        }
        //F2新規登録フラグ初期化
        setF2RecordFlag(false);
        setResisteredItemFlag(false);
        return err;
      });
  };
  return { putNewItem };
};
