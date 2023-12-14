import { useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";

//セレクトボックスオプションデータ取得コンポーネント
export const useFetchOptionData = () => {
  const setRestrictedType = useSetRecoilState(states.restrictedTypeData);
  const setAutorRoleType = useSetRecoilState(states.authorRoleTypeData);
  const setUpdateType = useSetRecoilState(states.updateTypeData);
  const setCommentType = useSetRecoilState(states.commentTypeData);
  const setExmallType = useSetRecoilState(states.exmallTeypeData);
  const setPriceDisplay = useSetRecoilState(states.priceDisplayData);
  const setSoukoCooperationType = useSetRecoilState(
    states.soukoCooperationType
  );
  const setTriCooperationType = useSetRecoilState(states.triCooperationType);
  const setImportType = useSetRecoilState(states.importTypeData);
  const setSpecialMediaType = useSetRecoilState(states.specialMediaTypeData);
  const setCopyguardType = useSetRecoilState(states.copyguardTypeData);
  const setEdition = useSetRecoilState(states.editionData);
  const setSalesChannelCode = useSetRecoilState(states.salesChannelCodeData);
  const setTitleAvcg = useSetRecoilState(states.titleAvcgData);
  const setProgressType = useSetRecoilState(states.progressTypeData);
  const setSalesType = useSetRecoilState(states.salesTypeData);
  const setSeminewRerelease = useSetRecoilState(states.seminewRereleaseData);
  const setHitChartType = useSetRecoilState(states.hitChartTypeData);
  const setMaxiSingleType = useSetRecoilState(states.maxiSingleTypeData);
  const setLimitedTypeCode = useSetRecoilState(states.lmitedTypeCodeData);
  const setMediaFormatCode = useSetRecoilState(states.mediaFormatCodeData);

  const fetchOptionData = (optionList) => {
    switch (optionList["group_code"]) {
      case "0001":
        setRestrictedType(optionList.details);
        break;
      case "0004":
        setAutorRoleType(optionList.details);
        break;
      case "0005":
        setUpdateType(optionList.details);
        break;
      case "0006":
        setCommentType(optionList.details);
        break;
      case "0007":
        setExmallType(optionList.details);
        break;
      case "0009":
        setPriceDisplay(optionList.details);
        break;
      case "0011":
        setImportType(optionList.details);
        break;
      case "0012":
        setSpecialMediaType(optionList.details);
        break;
      case "0013":
        setCopyguardType(optionList.details);
        break;
      case "0014":
        setSoukoCooperationType(optionList.details);
        break;
      case "0015":
        setTriCooperationType(optionList.details);
        break;
      case "JM01":
        setEdition(optionList.details);
        break;
      case "JM02":
        setSalesChannelCode(optionList.details);
        break;
      case "JM03":
        setTitleAvcg(optionList.details);
        break;
      case "JM04":
        setProgressType(optionList.details);
        break;
      case "JM05":
        setSalesType(optionList.details);
        break;
      case "JM06":
        setSeminewRerelease(optionList.details);
        break;
      case "JM07":
        setHitChartType(optionList.details);
        break;
      case "JM08":
        setMaxiSingleType(optionList.details);
        break;
      case "JM09":
        setLimitedTypeCode(optionList.details);
        break;
      case "JM10":
        setMediaFormatCode(optionList.details);
        break;
    }
  };
  return { fetchOptionData };
};
