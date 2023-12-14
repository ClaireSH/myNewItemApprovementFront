import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as states from "../../recoil/RecoilState";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  CommonInfoList1,
  CommonInfoList2,
  CommonInfoList3,
} from "../../listItems/ListItemText";
import {
  SelectBumonGroup,
  SelectExmallooperation,
  SelectPriceDisplay,
  SelectRestrictedType,
  SelectSoukoCooperationType,
  SelectTriCooperationType,
} from "../molecules/CommonInfoSelectMenu";
import {
  unspecified1,
  unspecified2,
  unspecified3,
} from "../../config/filterSelection";
import { convertItemCommonInfo } from "../../utils/convertItemCommonInfo";
import { commonInfo1, commonInfo2, commonInfo3 } from "../../models/commonInfo";
import { CommonInfoGroup1_L_TEXT_Item } from "../molecules/CommonInfoGroup1_L_TEXT_Item";
import { CommonInfoGroup2_M_TEXT_Item } from "../molecules/CommonInfoGroup2_M_TEXT_Item";
import { CommonInfoGroup2_L_SELECT_Item } from "../molecules/CommonInfoGroup2_L_SELECT_Item";
import { CommonInfoPriceText } from "../molecules/CommonInfoPriceText";
import { CommonInfoDate } from "../molecules/CommonInfoDate";
import { CommonInfoGroup3_M_TEXT_Item } from "../molecules/CommonInfoGroup3_M_TEXT_Item";
import { CommonInfoGroup1_XL_TEXT_Item } from "../molecules/CommonInfoGroup1_XL_TEXT_Item";

export const CommonInfo = () => {
  const restrictedType = useRecoilValue(states.restrictedTypeData);
  const exmallType = useRecoilValue(states.exmallTeypeData);
  const priceDisplay = useRecoilValue(states.priceDisplayData);
  const soukoCooperationType = useRecoilValue(states.soukoCooperationType);
  const triCooperationType = useRecoilValue(states.triCooperationType);
  const [itemCommonInfo, setItemCommonInfo] = useRecoilState(
    states.itemCommonInfo
  );
  const itemCommonGenreInfo = useRecoilValue(states.itemCommonGenreInfo);
  const bumomGroup = useRecoilValue(states.bumonGroupData);

  //共通情報を画面表示用に変換
  /*共通情報グループ1(インストアコード・JANコード・商品名・商品名カナ・商品名英字)*/
  const commonInfoGroup1 = convertItemCommonInfo(
    itemCommonInfo,
    commonInfo1
  ).commonInfo.filter((item) => !item.id);
  /*共通情報グループ2(ジャンル1・ジャンル2・ジャンル3・部門分類・定価・発売日・年齢制限区分・限定表示)*/
  const commonInfoGroup2 = convertItemCommonInfo(
    itemCommonInfo,
    commonInfo2
  ).commonInfo.filter((item) => !item.id);
  /*共通情報グループ3コンテンツ名・サブコンテンツ名・倉庫連携区分・店舗連携区分・外部連携区分)*/
  const commonInfoGroup3 = convertItemCommonInfo(
    itemCommonInfo,
    commonInfo3
  ).commonInfo.filter((item) => !item.id);

  return (
    <>
      <div>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <List>
              {CommonInfoList1.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={9}>
            {commonInfoGroup1.map((item) => {
              return (
                <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  {item.input_style === "XL_TEXT" ? (
                    <CommonInfoGroup1_XL_TEXT_Item
                      item={item}
                      setItemCommonInfo={setItemCommonInfo}
                      commonInfoGroup1={commonInfoGroup1}
                    />
                  ) : (
                    item.input_style === "L_TEXT" && (
                      <CommonInfoGroup1_L_TEXT_Item
                        item={item}
                        setItemCommonInfo={setItemCommonInfo}
                        commonInfoGroup1={commonInfoGroup1}
                      />
                    )
                  )}
                </List>
              );
            })}
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <List>
              {CommonInfoList2.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={3}>
            {commonInfoGroup2.map((item) => {
              return (
                <List>
                  {item.input_style === "M_TEXT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <CommonInfoGroup2_M_TEXT_Item
                        item={item}
                        setItemCommonInfo={setItemCommonInfo}
                        commonInfoGroup2={commonInfoGroup2}
                      />
                    </ListItem>
                  ) : item.input_style === "L_SELECT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Grid item xs={8}>
                        <CommonInfoGroup2_L_SELECT_Item
                          item={item}
                          itemCommonGenreInfo={itemCommonGenreInfo}
                          itemCommonInfo={itemCommonInfo}
                          setItemCommonInfo={setItemCommonInfo}
                          unspecified1={unspecified1}
                          unspecified2={unspecified2}
                          unspecified3={unspecified3}
                        />
                      </Grid>
                    </ListItem>
                  ) : item.input_style === "S_SELECT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Grid item xs={8}>
                        {item.label === "bumon_category" ? (
                          <SelectBumonGroup
                            defaultBumonCategory={item.value}
                            bumomGroup={bumomGroup}
                            setItemCommonInfo={setItemCommonInfo}
                          />
                        ) : item.label === "restricted_type" ? (
                          <SelectRestrictedType
                            defaultRestrictedType={item.value}
                            restrictedType={restrictedType}
                            setItemCommonInfo={setItemCommonInfo}
                          />
                        ) : null}
                      </Grid>
                    </ListItem>
                  ) : item.input_style === "S_TEXT SS_SELECT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <CommonInfoPriceText
                        item={item}
                        setItemCommonInfo={setItemCommonInfo}
                        commonInfoGroup2={commonInfoGroup2}
                      />
                      <SelectPriceDisplay
                        defaultPriceDisplay={item.value.price_display_method}
                        priceDisplay={priceDisplay}
                        setItemCommonInfo={setItemCommonInfo}
                      />
                    </ListItem>
                  ) : item.input_style === "DATE" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <CommonInfoDate
                        item={item}
                        itemCommonInfo={itemCommonInfo}
                        setItemCommonInfo={setItemCommonInfo}
                        commonInfoGroup2={commonInfoGroup2}
                      />
                    </ListItem>
                  ) : null}
                </List>
              );
            })}
          </Grid>
          <Grid item xs={3}>
            <List>
              {CommonInfoList3.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
              {exmallType.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText
                      key={item.index}
                      value={item.type_code}
                      primary={item.type_name}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={3}>
            {commonInfoGroup3.map((item) => {
              return (
                <List>
                  {item.input_style === "M_TEXT" ? (
                    <CommonInfoGroup3_M_TEXT_Item
                      item={item}
                      setItemCommonInfo={setItemCommonInfo}
                      commonInfoGroup3={commonInfoGroup3}
                    />
                  ) : item.input_style === "S_SELECT" ? (
                    <ListItem
                      sx={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 0 }}
                    >
                      <Grid item xs={8}>
                        {item.label === "souko_cooperation_type" ? (
                          <SelectSoukoCooperationType
                            defaultSoukoCooperationType={item.value}
                            soukoCooperationType={soukoCooperationType}
                            setItemCommonInfo={setItemCommonInfo}
                          />
                        ) : item.label === "tri_cooperation_type" ? (
                          <SelectTriCooperationType
                            defaultTriCooperationType={item.value}
                            triCooperationType={triCooperationType}
                            setItemCommonInfo={setItemCommonInfo}
                          />
                        ) : null}
                      </Grid>
                    </ListItem>
                  ) : null}
                </List>
              );
            })}
            <ListItem>
              <Grid></Grid>
            </ListItem>
            <ListItem>
              <Grid></Grid>
            </ListItem>
            <ListItem>
              <Grid></Grid>
            </ListItem>
            <SelectExmallooperation />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CommonInfo;
