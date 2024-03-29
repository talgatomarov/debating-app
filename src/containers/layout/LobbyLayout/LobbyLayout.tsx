import React from "react";
import {
  Toolbar,
  Theme,
  createStyles,
  makeStyles,
  Box,
} from "@material-ui/core";
import { LobbyDrawer, LobbyAppBar } from "./components";
import Footer from "components/Footer";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: "100vw",
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
      <Box
        display="flex"
        flexDirection="row"
        flex="auto"
        minHeight="100vh"
        justifyContent="space-between"
      >
        <LobbyDrawer open={mobileOpen} onClose={handleDrawerToggle} />
        <main className={classes.content}>
          <Toolbar />
          {children}
          <Footer />
        </main>
      </Box>
    </div>
  );
};

export default LobbyLayout;
