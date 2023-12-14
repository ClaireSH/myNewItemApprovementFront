import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as states from "../recoil/RecoilState";
import { items } from "../config/Titles";
import useStyles from "../style/listStyles";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Container, Grid } from "@mui/material";
import { TabLists } from "../components/molecules/TabLists";
import { useQueryUpdateItem } from "../api/useQueryUpdateItem";
import { useF11UpdateItem } from "../api/useF11UpdateItem";
import { useInitialiseSate } from "../api/useInnitializeState";
import { commentForm } from "../config/comment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function NewProductDetail() {
  const { bookInstoreCode, softInstoreCode } = useQueryUpdateItem();
  const instoreCode =
    bookInstoreCode !== ""
      ? bookInstoreCode
      : softInstoreCode !== ""
      ? softInstoreCode
      : null;
  //新規商品詳細バリデーションエラー初期化コンポーネント
  const { initialiseState } = useInitialiseSate();
  //新規商品詳細更新コンポーネント
  const { upDateF11Items } = useF11UpdateItem();
  const [itemCommonInfo, setItemCommonInfo] = useRecoilState(
    states.itemCommonInfo
  );
  const [exmallCooperation, setExmallCooperation] = useRecoilState(
    states.exmallCooperationInfo
  );
  const [itemAttributeBookInfo, setItemAttributeBookInfo] = useRecoilState(
    states.itemAttributeBookInfo
  );
  const [itemAttributeSoftInfo, setItemAttributeSoftInfo] = useRecoilState(
    states.itemAttributeSoftInfo
  );
  const [itemAuthor, setItemAuthor] = useRecoilState(states.itemAuthorInfo);
  const [selectedRepresentative, setSelectedRepresentative] = useRecoilState(
    states.autorRep
  );
  const [itemCommentInfo, setItemCommentInfo] = useRecoilState(
    states.itemCommentInfo
  );
  const [itemTagInfo, setItemTagInfo] = useRecoilState(states.itemTagInfo);
  const [recordErrorMessage, setRecordErrorMessage] = useRecoilState(
    states.recordErrorMessage
  );
  const [itemCommentInfoLocal, setItemCommentInfoLocal] = useRecoilState(
    states.itemCommentInfoLocal
  );
  const [commnentFlag, setCommnentFlag] = useRecoilState(states.commnentFlag);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    //詳細画面初回読み込み時： コメントフォーム内容の初期化
    !commnentFlag && setItemCommentInfoLocal(commentForm);
  }, [commnentFlag]);

  const f11Function = (event) => {
    if (event.key === "F11") {
      upDateF11Items();
      event.preventDefault();
      return false;
    }
  };
  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", f11Function, false);
      return () => {
        document.removeEventListener("keydown", f11Function, false);
      };
    }
  }, [f11Function]);

  const onClickConfirm = () => {
    upDateF11Items();
  };

  const f12Function = useCallback(
    (event) => {
      if (event.key === "F12") {
        history.goBack();
        //F2 新規登録エラーメッセージの初期化
        setRecordErrorMessage([]);
        //コメント内容更新フラグ初期化
        setCommnentFlag(false);
        event.preventDefault();
        return false;
      }
    },
    [
      instoreCode,
      bookInstoreCode,
      softInstoreCode,
      exmallCooperation,
      itemCommentInfo,
      itemCommonInfo,
      itemAttributeBookInfo,
      itemAttributeSoftInfo,
      itemAuthor,
      itemCommentInfo,
      itemTagInfo,
    ]
  );

  useEffect(() => {
    if (document) {
      document.addEventListener("keydown", f12Function, false);
      return () => {
        document.removeEventListener("keydown", f12Function, false);
      };
    }
  }, [f12Function]);

  const onClickBack = () => {
    //新規商品詳細バリデーションエラー初期化
    initialiseState();
    //F2 新規登録エラーメッセージの初期化
    setRecordErrorMessage([]);
    //コメント内容更新フラグ初期化
    setCommnentFlag(false);
    //著作者代表者順番初期化
    setSelectedRepresentative("rep-0");
    history.goBack();
  };

  return (
    <main className={classes.content2}>
      <Toolbar id="back-to-top-anchor" variant="dense" />
      <Container maxWidth="xl" disableGutters className={classes.container}>
        <Typography
          variant="h5"
          gutterBottom
          color="primary"
          className={classes.title}
        >
          {items.NEWPRODUCTIMPORTDETAIL}
        </Typography>
      </Container>
      <Divider style={{ height: 2 }} />
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Container maxWidth={false} className={classes.container1}>
                <TabLists />
              </Container>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Container maxWidth="xl" disableGutters className={classes.container}>
        <Grid container paddingLeft="1.5em">
          <div
            style={{ marginRight: 70, marginLeft: "auto", display: "block" }}
          >
            <button onClick={onClickConfirm} className={classes.confirmButton}>
              {items.F11CONFIRM}
            </button>
            <button onClick={onClickBack} className={classes.button}>
              {items.F12BACK}
            </button>
          </div>
        </Grid>
      </Container>
    </main>
  );
}
