import React from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  AttributeBookInfoList1,
  AttributeBookInfoList2,
  AttributeBookInfoList3,
} from "../../listItems/ListItemText";
import { useRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { convertBookAttribute } from "../../utils/convertBookAttribute";
import {
  bookAttribute1,
  bookAttribute2,
  bookAttribute3,
} from "../../models/bookAttribute";
import { AttributrBookGroup1Item } from "../molecules/AttributrBookGroup1Item";
import { AttributrBookGroup2Item } from "../molecules/AttributrBookGroup2Item";
import { AttributrBookGroup3Item } from "../molecules/AttributrBookGroup3Item";

export const AttributeBookInfo = () => {
  const [itemAttributeBookInfo, setItemAttributeBookInfo] = useRecoilState(
    states.itemAttributeBookInfo
  );

  //書籍系属性情報を画面表示用に変換
  /*属性情報グループ1(巻次・巻次数・最終巻次・副書名・副書名カナ・個別書名・個別書名カナ・シリーズ名・シリーズ名カナ
・シリーズ名巻次・副シリーズ名・副シリーズ名カナ・副シリーズ名巻次)*/
  const bookAttributeGroup1 = convertBookAttribute(
    itemAttributeBookInfo,
    bookAttribute1
  ).bookAttribute;
  /*属性情報グループ2(出版社名・発売会社名・販売形態・発行形態・内容コード)*/
  const bookAttributeGroup2 = convertBookAttribute(
    itemAttributeBookInfo,
    bookAttribute2
  ).bookAttribute;
  /*属性情報グループ3:(サイズ情報・判型・NDC分類・BOOKPAGE分類・雑誌コード)*/
  const bookAttributeGroup3 = convertBookAttribute(
    itemAttributeBookInfo,
    bookAttribute3
  ).bookAttribute;

  return (
    <>
      <div>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <List>
              {AttributeBookInfoList1.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={9}>
            {bookAttributeGroup1.map((item) => (
              <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <AttributrBookGroup1Item
                  key={item.label}
                  item={item}
                  setItemAttributeBookInfo={setItemAttributeBookInfo}
                  bookAttributeGroup1={bookAttributeGroup1}
                />
              </List>
            ))}
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container item xs={12}>
          <Grid item xs={3}>
            <List>
              {AttributeBookInfoList2.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={3}>
            {bookAttributeGroup2.map((item) => (
              <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <AttributrBookGroup2Item
                  key={item.label}
                  item={item}
                  setItemAttributeBookInfo={setItemAttributeBookInfo}
                  bookAttributeGroup2={bookAttributeGroup2}
                />
              </List>
            ))}
          </Grid>
          <Grid item xs={3}>
            <List>
              {AttributeBookInfoList3.map((item) => {
                return (
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemText key={item.key} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={3}>
            {bookAttributeGroup3.map((item) => (
              <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <AttributrBookGroup3Item
                  key={item.label}
                  item={item}
                  setItemAttributeBookInfo={setItemAttributeBookInfo}
                  bookAttributeGroup3={bookAttributeGroup3}
                />
              </List>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AttributeBookInfo;
