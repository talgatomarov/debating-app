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

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <LobbyAppBar onMenuClick={handleDrawerToggle} />
      <LobbyDrawer open={mobileOpen} onClose={handleDrawerToggle} />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LobbyLayout;
