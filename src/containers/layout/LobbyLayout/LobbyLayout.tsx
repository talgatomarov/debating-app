import React from "react";
import { Toolbar, Theme, createStyles, makeStyles } from "@material-ui/core";
import { LobbyDrawer, LobbyAppBar } from "./components";
import Footer from "components/Footer";

const useStyles = makeStyles(({ spacing, zIndex, mixins }: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      padding: spacing(3),
    },
  })
);

const LobbyLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LobbyAppBar />
      <LobbyDrawer />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LobbyLayout;
