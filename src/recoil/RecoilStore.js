import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "./RecoilState";
import { logger } from "../index";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import { commentForm } from "../config/comment";
import {
  switchValue,
  formtDate,
  formatTime,
} from "../service/converter/switch";
import { useFetchOptionData } from "../service/fetchData/useFetchOptionData";

export default function RecoilStore() {
  const setUserInfo = useSetRecoilState(states.userInfo);
  const setNewProductData = useSetRecoilState(states.newProductData);
  const setItemCommonGenre = useSetRecoilState(states.itemCommonGenreInfo);
  const setBumonGroupData = useSetRecoilState(states.bumonGroupData);
  const [providerInfo, setProviderInfo] = useRecoilState(states.providerInfo);
  const [inputType, setInputType] = useRecoilState(states.inputType);
  const setItemCommentInfoLocal = useSetRecoilState(
    states.itemCommentInfoLocal
  );
  const setUrl = useSetRecoilState(states.url);
  const setDuplicateItemsName = useSetRecoilState(states.duplicateItemsName);
  const { fetchOptionData } = useFetchOptionData();

  useEffect(() => {
    getUrl();
  }, []);

  //URL取得
  function getUrl() {
    const url = new URL(window.location.href);
    setUrl(url.href);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    Auth.currentAuthenticatedUser({
      bypassCache: false,
    })
      .then((user) => {
        logger.debug("RecoilStore-getUserInfo user: ", user);
        const userName = user.username;
        const groups = user.signInUserSession.idToken.payload["cognito:groups"];
        const groupName = groups ? groups[0] : "NOGROUP";

        setUserInfo({ userName: userName, groupName: groupName });
      })
      .catch((error) =>
        logger.error("RecoilStore-getUserInfo error:", JSON.stringify(error))
      );
  }

  useEffect(() => {
    getNewProductData();
  }, [providerInfo, inputType]);

  const getNewProductData = async () => {
    const newProductData = await API.graphql(
      graphqlOperation(queries.scan_file)
    );
    newProductData.data.scan_file.map(function (str) {
      //提供会社に変換
      providerInfo.length !== 0 && //providerInfoにデータが取得できたタイミングで変換。
        (str.provider = switchValue(str.provider, providerInfo));

      //取込種別に変換
      inputType.length !== 0 && //inputTypeにデータが取得できたタイミングで変換。
        (str.import_group_type = switchValue(str.import_group_type, inputType));

      //取込日付フォーマット変換 ex) YYYYMMDD =>  YYYY/MM/DD
      str.import_date = formtDate(str.import_date);
      //取込時刻フォーマット変換 ex) HHMMSS =>  HH/MM/SS
      str.import_time = formatTime(str.import_time);
    });

    //提供会社・取込種別が変換されたタイミングで表示するデータを入れる。
    const firstProvider = Number(newProductData.data.scan_file[0].provider);
    const firstInputType = Number(
      newProductData.data.scan_file[0].import_group_type
    );
    isNaN(firstProvider) && //一番最初のデータで提供会社が変換されているか判定
      isNaN(firstInputType) && //一番最初のデータで取込種別が変換されているか判定
      setNewProductData(newProductData);
  };

  useEffect(() => {
    getSelectBoxData();
  }, []);

  const getSelectBoxData = async () => {
    const selectBoxData = await API.graphql(
      graphqlOperation(queries.scan_class, {
        input: {
          target_class: [
            { group_code: "0001" },
            { group_code: "0004" },
            { group_code: "0005" },
            { group_code: "0006" },
            { group_code: "0007" },
            { group_code: "0009" },
            { group_code: "0011" },
            { group_code: "0012" },
            { group_code: "0013" },
            { group_code: "0014" },
            { group_code: "0015" },
            { group_code: "JM01" },
            { group_code: "JM02" },
            { group_code: "JM03" },
            { group_code: "JM04" },
            { group_code: "JM05" },
            { group_code: "JM06" },
            { group_code: "JM07" },
            { group_code: "JM08" },
            { group_code: "JM09" },
            { group_code: "JM10" },
          ],
        },
      })
    );
    selectBoxData.data.scan_class.forEach((optionList) => {
      //セレクトボックスオプションデータ取得
      fetchOptionData(optionList);
    });
  };

  useEffect(() => {
    getBumonGroup();
  }, []);

  const getBumonGroup = async () => {
    const bumonGroupData = await API.graphql(
      graphqlOperation(queries.query_bol_bumon_group)
    );
    setBumonGroupData(bumonGroupData.data.query_bol_bumon_group);
  };

  useEffect(() => {
    getSelectBoxProviderInfoAndInputType();
  }, []);

  const getSelectBoxProviderInfoAndInputType = async () => {
    const selectBoxData = await API.graphql(
      graphqlOperation(queries.scan_class, {
        input: {
          target_class: [{ group_code: "0101" }, { group_code: "0102" }],
        },
      })
    );
    setProviderInfo(selectBoxData.data.scan_class[0].details);
    setInputType(selectBoxData.data.scan_class[1].details);
  };

  useEffect(() => {
    itemCommonGenre();
  }, []);

  const itemCommonGenre = async () => {
    const itemCommonGenreData = await API.graphql(
      graphqlOperation(queries.scan_genre, {
        input: {
          genre_type: "1",
          rows: "3768",
        },
      })
    );
    setItemCommonGenre(itemCommonGenreData.data.scan_genre.items);
  };

  useEffect(() => {
    getItemCommentLocalInfo();
  }, []);

  function getItemCommentLocalInfo() {
    setItemCommentInfoLocal(commentForm);
  }

  useEffect(() => {
    getDuplicateItemsName();
  }, []);

  //重複商品の重複項目名を取得
  const getDuplicateItemsName = async () => {
    const duplicateItemsName = await API.graphql(
      graphqlOperation(queries.scan_class, {
        input: {
          target_class: { group_code: "0008" },
        },
      })
    );
    setDuplicateItemsName(duplicateItemsName.data.scan_class[0].details);
  };

  return null;
}
