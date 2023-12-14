import React from "react";
import { useRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  AttributeSoftInfoList1,
  AttributeSoftInfoList2,
} from "../../listItems/ListItemText";
import {
  SelectEdition,
  SelectHitChartType,
  SelectImportType,
  SelectLimitedType,
  SelectMaxiSingleType,
  SelectMediaFormatCode,
  SelectProgressType,
  SelectSalesChannelCode,
  SelectSalesType,
  SelectSeminewRerelease,
  SelectSpecialMediaType,
  SelectTitleAvcg,
  SeletCopyguardType,
} from "../molecules/AttributeSelectMenu";
import { convertSoftAttribute } from "../../utils/convertSoftAttribute";
import { softAttribute1, softAttribute2 } from "../../models/softAttribute";
import { AttributrSoftGroup1_M_TEXT_Item } from "../molecules/AttributrSoftGroup1_M_TEXT_Item";
import { AttributeSoftDateAndTime } from "../molecules/AttributeSoftDateAndTime";
import { AttributrSoftGroup2_M_TEXT_Item } from "../molecules/AttributrSoftGroup2_M_TEXT_Item";

export const AttributeSoftInfo = () => {
  const [itemAttributeSoftInfo, setItemAttributeSoftInfo] = useRecoilState(
    states.itemAttributeSoftInfo
  );

  //ソフト系属性情報を画面表示用に変換
  /*属性情報グループ1(規格品番・タイトル規格品番・販売会社・発売会社・組数・トラック数・時間・輸入盤区分・特殊形態区分
・コピー制限区分・リージョンコード・エディション・販売経路別コード・タイトルAVCG・経過区分・廃盤日・情報公開日・時間・販売単売可否・準新譜／再発売)*/
  const softAttributeGroup1 = convertSoftAttribute(
    itemAttributeSoftInfo,
    softAttribute1
  ).softAttribute;
  /*属性情報グループ2(旧品番・再発売商品番号・ヒットチャート区分・マキシシングル区分・施策区分・メディア情報・商品形状・特典情報・マスタリング情報・録音年等・
    プロモーション備考・セット数・総作品数・総収録時間・作品数・収録時間・メディア形態コード・メディア形態補足1・メディア形態補足2)*/
  const softAttributeGroup2 = convertSoftAttribute(
    itemAttributeSoftInfo,
    softAttribute2
  ).softAttribute;

  return (
    <>
      <div>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <List>
              {AttributeSoftInfoList1.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={3}>
            {softAttributeGroup1.map((item) => {
              return (
                <List>
                  {item.input_style === "M_TEXT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <AttributrSoftGroup1_M_TEXT_Item
                        item={item}
                        setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                        softAttributeGroup1={softAttributeGroup1}
                      />
                    </ListItem>
                  ) : item.input_style === "S_SELECT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Grid item xs={8}>
                        {item.label === "import_type" ? (
                          <SelectImportType
                            defaultImportType={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "special_media_type" ? (
                          <SelectSpecialMediaType
                            defaultSpecialMediaType={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "copyguard_type" ? (
                          <SeletCopyguardType
                            defaultCopyguardType={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "edition" ? (
                          <SelectEdition
                            defaultEdition={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "sales_channel_code" ? (
                          <SelectSalesChannelCode
                            defaultSalesChannelCode={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "title_avcg" ? (
                          <SelectTitleAvcg
                            defaultTitleAvcg={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "progress_type" ? (
                          <SelectProgressType
                            defaultProgressType={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "contents_sales_type" ? (
                          <SelectSalesType
                            defaultSalesType={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : item.label === "seminew_rerelease" ? (
                          <SelectSeminewRerelease
                            defaultSeminewRerelease={item.value}
                            setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          />
                        ) : null}
                      </Grid>
                    </ListItem>
                  ) : (
                    item.input_style === "DATE_TIME" && (
                      <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        <AttributeSoftDateAndTime
                          item={item}
                          itemAttributeSoftInfo={itemAttributeSoftInfo}
                          setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                          softAttributeGroup1={softAttributeGroup1}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              );
            })}
          </Grid>
          <Grid item xs={3}>
            <List>
              {AttributeSoftInfoList2.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={3}>
            {softAttributeGroup2.map((item) => {
              return (
                <List>
                  {item.input_style === "M_TEXT" ? (
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                      <AttributrSoftGroup2_M_TEXT_Item
                        item={item}
                        setItemAttributeSoftInfo={setItemAttributeSoftInfo}
                        softAttributeGroup2={softAttributeGroup2}
                      />
                    </ListItem>
                  ) : (
                    item.input_style === "S_SELECT" && (
                      <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Grid item xs={8}>
                          {item.label === "hit_chart_type" ? (
                            <SelectHitChartType
                              defaultHitChartType={item.value}
                              setItemAttributeSoftInfo={
                                setItemAttributeSoftInfo
                              }
                            />
                          ) : item.label === "maxi_single_type" ? (
                            <SelectMaxiSingleType
                              defaultMaxiSingle={item.value}
                              setItemAttributeSoftInfo={
                                setItemAttributeSoftInfo
                              }
                            />
                          ) : item.label === "limited_type_code" ? (
                            <SelectLimitedType
                              defaultLimitedType={item.value}
                              setItemAttributeSoftInfo={
                                setItemAttributeSoftInfo
                              }
                            />
                          ) : item.label === "media_format_code" ? (
                            <SelectMediaFormatCode
                              defaultMediaFormatCode={item.value}
                              setItemAttributeSoftInfo={
                                setItemAttributeSoftInfo
                              }
                            />
                          ) : null}
                        </Grid>
                      </ListItem>
                    )
                  )}
                </List>
              );
            })}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AttributeSoftInfo;
