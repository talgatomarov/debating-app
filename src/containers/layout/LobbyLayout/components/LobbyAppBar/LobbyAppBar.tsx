import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import app from "app";

const useStyles = makeStyles(({ spacing, zIndex, breakpoints }: Theme) =>
  createStyles({
    appBar: {
      zIndex: zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: spacing(2),
      [breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

export interface LobbyAppBarProps {
  onMenuClick: () => void;
}

const LobbyAppBar: React.FC<LobbyAppBarProps> = ({ onMenuClick }) => {
  const classes = useStyles();

  async function handleSignOut() {
    await app.auth().signOut();
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
        <Button color="inherit" onClick={handleSignOut}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default LobbyAppBar;
