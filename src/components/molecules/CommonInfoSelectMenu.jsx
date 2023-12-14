import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { useEffect } from "react";

export const SelectBumonGroup = (props) => {
  const { defaultBumonCategory, bumomGroup, setItemCommonInfo } = props;
  const [defaultBumomGroup, setDefaultBumomGroup] = useState("");

  useEffect(() => {
    const filteredBumomGroup = bumomGroup.filter((item) => {
      return item.group_code === defaultBumonCategory;
    });
    setDefaultBumomGroup(filteredBumomGroup);
  }, [defaultBumonCategory]);

  //部門分類更新関数
  const selectBumon = (event) => {
    const filtererdValue = bumomGroup.filter((item) => {
      return item.group_name === event.target.value;
    });
    let value = filtererdValue[0].group_code;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      bumon_category: value,
    }));
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <Select
        value={
          defaultBumomGroup.length !== 0
            ? defaultBumomGroup[0].group_name
            : null
        }
        onChange={selectBumon}
      >
        {bumomGroup.map((item) => {
          return [
            <MenuItem key={item.index} value={item.group_name}>
              {item.group_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </Select>
    </FormControl>
  );
};

export const SelectPriceDisplay = ({
  defaultPriceDisplay,
  priceDisplay,
  setItemCommonInfo,
}) => {
  const [defaultPrice, setDefaultPrice] = useState("");

  useEffect(() => {
    const filteredDefaultPrice = priceDisplay.filter((item) => {
      return item.type_code === defaultPriceDisplay;
    });
    setDefaultPrice(filteredDefaultPrice);
  }, [defaultPriceDisplay]);

  //定価フラグ更新関数
  const selectPrice = (event) => {
    const filtererdValue = priceDisplay.filter((item) => {
      return item.type_name === event.target.value;
    });
    let value = filtererdValue[0].type_code;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      price_display_method: value,
    }));
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 85, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <Select
        value={defaultPrice.length !== 0 ? defaultPrice[0].type_name : null}
        onChange={selectPrice}
      >
        {priceDisplay.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_name}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </Select>
    </FormControl>
  );
};

export const SelectRestrictedType = ({
  defaultRestrictedType,
  restrictedType,
  setItemCommonInfo,
}) => {
  const [defaultRestricted, setDefaultRestricted] = useState("");

  useEffect(() => {
    const filteredDefaultRestricted = restrictedType.filter((item) => {
      return item.type_code === defaultRestrictedType;
    });
    setDefaultRestricted(filteredDefaultRestricted);
  }, [defaultRestrictedType]);

  //年齢制限区分更新関数
  const selectRestricted = (event) => {
    const filtererdValue = restrictedType.filter((item) => {
      return item.type_name === event.target.value;
    });
    let value = filtererdValue[0].type_code;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      restricted_type: value,
    }));
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <Select
        value={
          defaultRestricted.length !== 0 ? defaultRestricted[0].type_name : null
        }
        onChange={selectRestricted}
      >
        {restrictedType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_name}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </Select>
    </FormControl>
  );
};

export const SelectSoukoCooperationType = ({
  defaultSoukoCooperationType,
  soukoCooperationType,
  setItemCommonInfo,
}) => {
  const [defaultSoukoCooperation, setDefaultSoukoCooperation] = useState("");

  useEffect(() => {
    const filteredDefaultSoukoCooperation = soukoCooperationType.filter(
      (item) => {
        return item.type_code === defaultSoukoCooperationType;
      }
    );
    setDefaultSoukoCooperation(filteredDefaultSoukoCooperation);
  }, [defaultSoukoCooperationType]);

  //倉庫連携区分更新関数
  const selectSoukoCooperation = (event) => {
    const filtererdValue = soukoCooperationType.filter((item) => {
      return item.type_name === event.target.value;
    });
    let value = filtererdValue[0].type_code;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      souko_cooperation_type: value,
    }));
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <Select
        value={
          defaultSoukoCooperation.length !== 0
            ? defaultSoukoCooperation[0].type_name
            : null
        }
        onChange={selectSoukoCooperation}
      >
        {soukoCooperationType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_name}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </Select>
    </FormControl>
  );
};

export const SelectTriCooperationType = (props) => {
  const { defaultTriCooperationType, triCooperationType, setItemCommonInfo } =
    props;

  const [defaultTriCooperation, setDefaultTriCooperation] = useState("");

  useEffect(() => {
    const filteredDefaultTriCooperation = triCooperationType.filter((item) => {
      return item.type_code === defaultTriCooperationType;
    });
    setDefaultTriCooperation(filteredDefaultTriCooperation);
  }, [defaultTriCooperationType]);

  //店舗連携区分更新関数
  const selectTriCooperation = (event) => {
    const filtererdValue = triCooperationType.filter((item) => {
      return item.type_name === event.target.value;
    });
    let value = filtererdValue[0].type_code;
    setItemCommonInfo((prevState) => ({
      ...prevState,
      tri_cooperation_type: value,
    }));
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 170, boxShadow: 1, p: 0, m: 0 }}
      size="small"
    >
      <Select
        value={
          defaultTriCooperation.length !== 0
            ? defaultTriCooperation[0].type_name
            : null
        }
        onChange={selectTriCooperation}
      >
        {triCooperationType.map((item) => {
          return [
            <MenuItem key={item.index} value={item.type_name}>
              {item.type_name}
            </MenuItem>,
            <br />,
          ];
        })}
      </Select>
    </FormControl>
  );
};

export const SelectExmallooperation = () => {
  const [radioFlag, setRadioFlag] = useRecoilState(states.radioFlag);
  const setExmallCooperation = useSetRecoilState(states.exmallCooperationInfo);

  //外部連携区分更新関数
  const handleChange = (event, radioButtonIndex) => {
    let radioButtonValue = event.target.value;
    let radioButtonValue2 = null;
    setRadioFlag((prevState) =>
      prevState.map((item, index) =>
        index === radioButtonIndex
          ? {
              enable_cooperation: radioButtonValue,
              exmall_type: item.exmall_type,
            }
          : item
      )
    );
    if (radioButtonValue === "0") {
      radioButtonValue2 = false;
    } else if (radioButtonValue === "1") {
      radioButtonValue2 = true;
    }
    setExmallCooperation((prevState) =>
      prevState.map((item, index) =>
        index === radioButtonIndex
          ? {
              enable_cooperation: radioButtonValue2,
              exmall_type: item.exmall_type,
            }
          : item
      )
    );
  };

  return (
    <>
      {radioFlag.map((item, index) => (
        <div
          onChange={(event) => handleChange(event, index)}
          style={{ display: "flex", padding: "6.5% 0 2% 0" }}
        >
          <input
            type="radio"
            checked={item.enable_cooperation === "1"}
            value="1"
          />
          <div style={{ padding: "0 10% 0 2%" }}>表示</div>
          <input
            type="radio"
            checked={item.enable_cooperation === "0"}
            value="0"
          />
          <div style={{ padding: "0 10% 0 2%" }}>非表示</div>
        </div>
      ))}
    </>
  );
};
