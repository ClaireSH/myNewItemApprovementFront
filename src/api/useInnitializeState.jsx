import { useSetRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";

//新規商品詳細バリデーションエラー初期化コンポーネント
export const useInitialiseSate = () => {
  const setAttributeBookGroup1Error = useSetRecoilState(
    states.attributeBookGroup1Error
  );
  const setAttributeBookGroup2Error = useSetRecoilState(
    states.attributeBookGroup2Error
  );
  const setAttributeBookGroup3Error = useSetRecoilState(
    states.attributeBookGroup3Error
  );
  const setCommonInfoGroup1Error = useSetRecoilState(
    states.commonInfoGroup1Error
  );
  const setCommonInfoGroup2Error = useSetRecoilState(
    states.commonInfoGroup2Error
  );
  const setCommonInfoGroup3Error = useSetRecoilState(
    states.commonInfoGroup3Error
  );
  const setAttributeSoftGroup1Error = useSetRecoilState(
    states.attributeSoftGroup1Error
  );
  const setAttributeSoftGroup2Error = useSetRecoilState(
    states.attributeSoftGroup2Error
  );
  const setAuhorError = useSetRecoilState(states.authorError);
  const setAuthorKanaError = useSetRecoilState(states.authorKanaError);
  const setAuhorEngError = useSetRecoilState(states.authorEngError);
  const setCommnentError = useSetRecoilState(states.commnentError);
  const setTagError = useSetRecoilState(states.tagError);

  const initialiseState = () => {
    setAttributeBookGroup1Error(false);
    setAttributeBookGroup2Error(false);
    setAttributeBookGroup3Error(false);
    setCommonInfoGroup1Error(false);
    setCommonInfoGroup2Error(false);
    setCommonInfoGroup3Error(false);
    setAttributeSoftGroup1Error(false);
    setAttributeSoftGroup2Error(false);
    setAuhorError(false);
    setAuthorKanaError(false);
    setAuhorEngError(false);
    setTagError(false);
    setCommnentError(false);
  };
  return { initialiseState };
};
