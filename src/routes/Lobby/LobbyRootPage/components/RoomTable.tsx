import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HelpIcon from "@material-ui/icons/Help";
import { Room } from "interfaces/Room";
import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

export interface RoomListProps {
  rooms: Room[] | undefined;
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const history = useHistory();
  const location = useLocation();
  const onJoinRoomClick = useCallback(
    (room: Room) => () => {
      history.push(`${location.pathname}/${room.id}/waiting-room`);
    },
    [history, location]
  );

  return (
    <Table data-testid="room-table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="left">
            <Typography variant="inherit" noWrap>
              Format
              <Tooltip title="bpf - British Parliamentary Format">
                <IconButton size="small">
                  <HelpIcon style={{ fontSize: "14px" }} />
                </IconButton>
              </Tooltip>
            </Typography>
          </TableCell>
          <TableCell>Players</TableCell>
          <TableCell>Judge</TableCell>
          <TableCell>Join</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rooms &&
          rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.roomName}</TableCell>
              <TableCell>{room.format}</TableCell>
              <TableCell>
                <List>
                  {room.players.map((n, i) => (
                    <ListItem key={i}>{n.id}</ListItem>
                  ))}
                </List>
              </TableCell>
              <TableCell>
                {room.judge.id === null ? "no judge" : room.judge.id}
              </TableCell>
              <TableCell onClick={onJoinRoomClick(room)}>
                <IconButton>
                  <ArrowForwardIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default RoomList;
