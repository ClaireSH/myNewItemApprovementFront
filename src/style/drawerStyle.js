import makeStyles from "@mui/styles/makeStyles";
import theme from "./theme";

let drawerWidth = 140;
const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
  },
  toolBar: { minHeight: "56px" },
  drawerContainer: {
    overflow: "hidden",
    variant: "elevation",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    minHeight: 40,
    color: "#FFFFFF",
  },
  drawerIcon: {
    color: "#FFFFFF !important",
    padddingLeft: "16px !important",
  },
  ListItemText: {
    color: "#FFFFFF",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    float: "left !important",
  },
  container: {
    display: "inline-block",
  },
  arrowIcon: {
    float: "right",
    marginRight: "0px",
    marginTop: "100px",
    color: theme.palette.text.primary,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    variant: "elevation",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#383749cc",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "#383749 !important",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: "60px",
    [theme.breakpoints.up("sm")]: {
      width: "60px",
    },
  },
  toolbar: {
    display: "flex",
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    bottom: 50,
    right: 0,
  },
  badge: {},
  environmentLabel: {
    paddingLeft: theme.spacing(3),
  },
});

export default useStyles;
