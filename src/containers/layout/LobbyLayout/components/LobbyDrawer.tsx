import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles,
  Theme,
  Hidden,
  Typography,
} from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AddIcon from "@material-ui/icons/Add";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useStores } from "hooks";

const useStyles = makeStyles(({ mixins, breakpoints }: Theme) =>
  createStyles({
    drawer: {
      [breakpoints.up("sm")]: {
        width: "240px",
        flexShrink: 0,
      },
    },
    drawerPaper: {
      [breakpoints.up("sm")]: {
        width: "240px",
        flexShrink: 0,
      },
      width: "66%",
    },
    drawerContainer: {
      overflow: "auto",
    },
    toolbar: mixins.toolbar,
    menuTitle: {
      paddingTop: "16px",
    },
  })
);

export interface LobbyDrawerProps {
  window?: () => Window;
  open: boolean;
  onClose: () => void;
}

const LobbyDrawer: React.FC<LobbyDrawerProps> = ({ window, open, onClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const { userStore, roomStore } = useStores();

  /* istanbul ignore next */
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div className={classes.toolbar}>
      <div className={classes.drawerContainer}>
        <List>
          {!userStore.loading && !userStore.roomId && (
            <>
              <ListItem button component={RouterLink} to="/lobby">
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Lobby" />
              </ListItem>
              <ListItem button component={RouterLink} to="/create-room">
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create room" />
              </ListItem>
            </>
          )}
          {userStore.roomId && (
            <>
              {/* TODO: Handle exit */}
              <ListItem
                button
                onClick={async () => {
                  await roomStore.exit();
                  history.push("/lobby");
                }}
              >
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Exit" />
              </ListItem>
            </>
          )}
        </List>
      </div>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          container={container}
          variant="temporary"
          anchor="left"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Typography variant="h6" align="center" className={classes.menuTitle}>
            Menu
          </Typography>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default LobbyDrawer;
