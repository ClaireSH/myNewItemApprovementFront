import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container1: {
    marginRight: theme.spacing(2),
    minWidth: "95%",
  },
  root: {
    flexGrow: 1,
    marginBottom: "5%",
  },
  content: {
    width: "96%",
  },
  content2: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  container2: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  header: {
    position: "sticky",
    paddingTop: 0,
    top: theme.spacing(6),
    backgroundColor: "#fafafa",
    zIndex: "999",
  },
  headerRow2: {
    background:
      "linear-gradient(90deg, rgb(56 51 103) 0%, rgba(101,242,215,1) 72%, rgb(235 255 30) 100%)",
  },
  dataTalble: {
    padding: 4,
  },
  title: {
    color: "#292961",
    fontFamily: "Kosugi Maru",
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  title2: {
    fontFamily: "Kosugi Maru",
    padding: "0px",
    margin: "0px",
    paddingTop: theme.spacing(3),
  },
  filterMsg: {
    padding: theme.spacing(2),
  },
  tagNameWidth: {
    width: "100%",
  },
  button: {
    width: "6em",
    height: "40px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "solid 1px #C0C0C0",
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchButton: {
    width: "6em",
    height: "40px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "solid 1px #C0C0C0",
    "&:hover": {
      cursor: "pointer",
    },
  },
  confirmButton: {
    width: "6em",
    height: "40px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "solid 1px #C0C0C0",
    marginRight: "5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  //F2 新規登録　エラーメッセージ　全体用
  recordErrorMessage: {
    color: "red",
    fontWeight: "bold",
    display: "flex",
    flexFlow: "row wrap",
    width: 900,
    paddingLeft: 2,
  },
  //F2 新規登録　エラーメッセージ リスト用
  recordErrorMessage_ul: {
    listStyle: "none",
    paddingLeft: 2,
  },
}));

export default useStyles;
