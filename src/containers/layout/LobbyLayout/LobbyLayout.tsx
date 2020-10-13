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

const useStyles = makeStyles(({ spacing, zIndex, mixins }: Theme) =>
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
      <LobbyDrawer open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        display="flex"
        flexDirection="column"
        flex="auto"
        minHeight="100vh"
        justifyContent="space-between"
      >
        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
        <Footer />
      </Box>
    </div>
  );
};

export default LobbyLayout;
