import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import * as states from "../../recoil/RecoilState";
import { useRecoilValue } from "recoil";
import { FormContainer } from "../atoms/FormContainer";
import { SelectBox } from "../atoms/SelectBox";

//輸入盤区分
export const SelectImportType = ({
  defaultImportType,
  setItemAttributeSoftInfo,
}) => {
  const importType = useRecoilValue(states.importTypeData);
  const [selectImportType, setSelectImportType] = useState();

  const selectImport = (event) => {
    setSelectImportType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      import_type: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultImportType}
        value={selectImportType}
        onChange={selectImport}
      >
        {importType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//メディア形態コード
export const SelectSpecialMediaType = ({
  defaultSpecialMediaType,
  setItemAttributeSoftInfo,
}) => {
  const specialMediaType = useRecoilValue(states.specialMediaTypeData);
  const [selectSpecialMediaType, setSelectSpecialMediaType] = useState();

  const selectSpecialMedia = (event) => {
    setSelectSpecialMediaType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      special_media_type: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultSpecialMediaType}
        value={selectSpecialMediaType}
        onChange={selectSpecialMedia}
      >
        {specialMediaType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//コピー制限区分
export const SeletCopyguardType = ({
  defaultCopyguardType,
  setItemAttributeSoftInfo,
}) => {
  const copyguardType = useRecoilValue(states.copyguardTypeData);
  const [selectCopyguardType, setSelectCopyguardType] = useState();

  const selectCopyguard = (event) => {
    setSelectCopyguardType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      copyguard_type: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultCopyguardType}
        value={selectCopyguardType}
        onChange={selectCopyguard}
      >
        {copyguardType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//エディション
export const SelectEdition = ({ defaultEdition, setItemAttributeSoftInfo }) => {
  const edition = useRecoilValue(states.editionData);
  const [selectEdition, setSelectEdition] = useState();

  const select = (event) => {
    setSelectEdition(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      edition: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultEdition}
        value={selectEdition}
        onChange={select}
      >
        {edition.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//販売経路別コード
export const SelectSalesChannelCode = ({
  defaultSalesChannelCode,
  setItemAttributeSoftInfo,
}) => {
  const salesChannelCode = useRecoilValue(states.salesChannelCodeData);
  const [selectSalesChannelCode, setSelectSalesChannelCode] = useState();

  const selectSalesChannel = (event) => {
    setSelectSalesChannelCode(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      sales_channel_code: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultSalesChannelCode}
        value={selectSalesChannelCode}
        onChange={selectSalesChannel}
      >
        {salesChannelCode.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//タイトルAVCG
export const SelectTitleAvcg = ({
  defaultTitleAvcg,
  setItemAttributeSoftInfo,
}) => {
  const titleAvcg = useRecoilValue(states.titleAvcgData);
  const [selectTitleAvcg, setSelectTitleAvcg] = useState();

  const selectTitle = (event) => {
    setSelectTitleAvcg(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      title_avcg: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultTitleAvcg}
        value={selectTitleAvcg}
        onChange={selectTitle}
      >
        {titleAvcg.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//経過区分
export const SelectProgressType = ({
  defaultProgressType,
  setItemAttributeSoftInfo,
}) => {
  const progressType = useRecoilValue(states.progressTypeData);
  const [selectProgressType, setSelectProgressType] = useState();

  const selectProgress = (event) => {
    setSelectProgressType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      progress_type: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultProgressType}
        value={selectProgressType}
        onChange={selectProgress}
      >
        {progressType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//販売単売可否
export const SelectSalesType = ({
  defaultSalesType,
  setItemAttributeSoftInfo,
}) => {
  const salesType = useRecoilValue(states.salesTypeData);
  const [selectSalesType, setSelectSalesType] = useState();

  const selectSales = (event) => {
    setSelectSalesType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      contents_sales_type: value,
    }));
  };
  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultSalesType}
        value={selectSalesType}
        onChange={selectSales}
      >
        {salesType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//準新譜／再発売
export const SelectSeminewRerelease = ({
  defaultSeminewRerelease,
  setItemAttributeSoftInfo,
}) => {
  const seminewRerelease = useRecoilValue(states.seminewRereleaseData);
  const [selectSeminewRerelease, setSelectSeminewRerelease] = useState();

  const selectSeminew = (event) => {
    setSelectSeminewRerelease(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      seminew_rerelease: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultSeminewRerelease}
        value={selectSeminewRerelease}
        onChange={selectSeminew}
      >
        {seminewRerelease.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//ヒットチャート区分
export const SelectHitChartType = ({
  defaultHitChartType,
  setItemAttributeSoftInfo,
}) => {
  const hitChartType = useRecoilValue(states.hitChartTypeData);
  const [selectHitChartType, setSelectHitChartType] = useState();

  const handleChange = (event) => {
    setSelectHitChartType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      hit_chart_type: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultHitChartType}
        value={selectHitChartType}
        onChange={handleChange}
      >
        {hitChartType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//マキシシングル区分
export const SelectMaxiSingleType = ({
  defaultMaxiSingle,
  setItemAttributeSoftInfo,
}) => {
  const maxiSingleType = useRecoilValue(states.maxiSingleTypeData);
  const [selectMaxiSingleType, setSelectMaxiSingleType] = useState();

  const selectMaxiSingle = (event) => {
    setSelectMaxiSingleType(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      maxi_single_type: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultMaxiSingle}
        value={selectMaxiSingleType}
        onChange={selectMaxiSingle}
      >
        {maxiSingleType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//施策区分
export const SelectLimitedType = ({
  defaultLimitedType,
  setItemAttributeSoftInfo,
}) => {
  const limitedTypeCode = useRecoilValue(states.lmitedTypeCodeData);
  const [selectLimitedTypeCode, setSelectLimitedTypeCode] = useState();

  const selectLimitedType = (event) => {
    setSelectLimitedTypeCode(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      limited_type_code: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultLimitedType}
        value={selectLimitedTypeCode}
        onChange={selectLimitedType}
      >
        {limitedTypeCode.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
//メディア形態コード
export const SelectMediaFormatCode = ({
  defaultMediaFormatCode,
  setItemAttributeSoftInfo,
}) => {
  const mediaFormatCode = useRecoilValue(states.mediaFormatCodeData);
  const [selectMediaFormatCode, setSelectMediaFormatCode] = useState();

  const selectMediaFormat = (event) => {
    setSelectMediaFormatCode(event.target.value);
    let value = event.target.value;
    setItemAttributeSoftInfo((prevState) => ({
      ...prevState,
      media_format_code: value,
    }));
  };

  return (
    <FormContainer
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <SelectBox
        defaultValue={defaultMediaFormatCode}
        value={selectMediaFormatCode}
        onChange={selectMediaFormat}
      >
        {mediaFormatCode.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_code}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </SelectBox>
    </FormContainer>
  );
};
