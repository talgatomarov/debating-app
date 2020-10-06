import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(({ spacing, zIndex, mixins }: Theme) =>
  createStyles({
    appBar: {
      zIndex: zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const LobbyAppBar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
};

export default LobbyAppBar;
