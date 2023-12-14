import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloudStorageIcon from "../../Icons/CloudStorageIcon";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import clsx from "clsx";
import SimpleMenu from "../molecules/SimpleMenu";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useStyles from "../../style/drawerStyle";
import { Auth } from "aws-amplify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as states from "../../recoil/RecoilState";
import { items } from "../../config/Titles";
import { logger } from "../../index";
import { useRecoilState } from "recoil";
import { useInitialiseSate } from "../../api/useInnitializeState";

export default function ClippedDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const accountMenuIcon = <AccountCircle />;
  const accountMenuItems = ["Profile", "My account"];
  const notificationIcon = <NotificationsIcon />;
  const notificationMenuItems = ["info1", "info2", "info3", "info4"];
  const infoIcon = <InfoOutlinedIcon />;
  const userInfo = useRecoilValue(states.userInfo);
  const infoMenuItems = [
    "11111111",
    "22222222",
    "33333333",
    "44444444",
    "55555555",
    "66666666",
    "77777777",
    "88888888",
  ];
  const [itemIschanged, setItemIschanged] = useRecoilState(
    states.itemIschanged
  );
  //新規商品詳細バリデーションエラー初期化コンポーネント
  const { initialiseState } = useInitialiseSate();
  const [checkedIndex, setCheckedIndex] = useRecoilState(states.checkedIndex);
  const currentUrl = useRecoilValue(states.url);
  const setCommnentFlag = useSetRecoilState(states.commnentFlag);
  const setRecordErrorMessage = useSetRecoilState(states.recordErrorMessage);
  const setSelectedRepresentative = useSetRecoilState(states.autorRep);

  useEffect(() => {
    const menuSelection = window.location.pathname;
    if (menuSelection === "/edit") {
      setSelectedIndex(2);
    } else if (menuSelection === "/createAll") {
      setSelectedIndex(4);
    } else {
      setSelectedIndex(0);
    }
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      logger.debug("Sign Out error: ", error);
    }
  }

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleListItemClick2 = (event, index) => {
    setCheckedIndex([]);
    setSelectedIndex(index);
    setItemIschanged(false);
    //新規商品詳細バリデーションエラー初期化
    initialiseState();
    //コメント内容更新フラグ初期化
    setCommnentFlag(false);
    //F2 新規登録エラーメッセージの初期化
    setRecordErrorMessage([]);
    //著作者代表者順番初期化
    setSelectedRepresentative("rep-0");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar variant={"dense"}>
          <Link to="/" className={classes.link}>
            <CloudStorageIcon className={classes.menuButton} />
          </Link>
          <Typography variant="subtitle1" noWrap style={{ color: "#FFFFFF" }}>
            {items.MAINTITLE}
          </Typography>
          <div className={classes.environmentLabel}>
            <Typography variant="h5">
              {currentUrl.includes("stg")
                ? items.STG_ENV
                : currentUrl.includes("dev")
                ? items.DEV_ENV
                : null}
            </Typography>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <SimpleMenu
              badgeNum={4}
              menuIcon={notificationIcon}
              menuItems={notificationMenuItems}
            />
            <SimpleMenu
              badgeNum={10}
              menuIcon={infoIcon}
              menuItems={infoMenuItems}
            />
            <div className={classes.userInfo}>
              <Typography>
                {userInfo.groupName}の{userInfo.userName}さん
              </Typography>
            </div>
            <SimpleMenu
              menuIcon={accountMenuIcon}
              menuItems={accountMenuItems}
            />
            <Button
              aria-controls="signout-menu"
              aria-haspopup="true"
              edge="end"
              color="inherit"
              onClick={handleSignOut}
            >
              logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        id="drawer"
        className={classes.drawer}
        variant="permanent"
        // eslint-disable-next-line react/jsx-no-duplicate-props
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/" className={classes.link}>
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick2(event, 0)}
              >
                <ListItemIcon>
                  <ListAltIcon
                    className={classes.drawerIcon}
                    fontSize="large"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={"List"}
                  className={classes.ListItemText}
                ></ListItemText>
              </ListItem>
            </Link>
          </List>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose} size="large">
              {open === false ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
            </IconButton>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
