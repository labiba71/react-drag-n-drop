import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    searchContainer: {
      width: "100%",
    },
    cardList: {
      margin: "40px 0",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
    },
    rootDragNDrop: {
      flexGrow: 1,
    },
    paper: {
      height: 50,
      width: "20rem",
      textAlign: "center",
      padding: "14px",
      fontSize: "18px",
      border: "1px solid dodgerblue",
    },
    dragAndDrop: {
      display: "flex",
      width: "100%",
      justifyContent: "space-around",
    },
    column: {
      width: "30%",
    },
    droppableCol: {
      width: "100%",
      backgroundColor: "#b3cde0",
      padding: "10px 10px 0 10px",
      borderRadius: "7px",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
      height: "74vh"
    }
  })
);
