import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HelpIcon from "@material-ui/icons/Help";
import { Room } from "interfaces/Room";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface RoomListProps {
  rooms: Room[] | undefined;
  props: RouteComponentProps;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, props }) => {
  const joinRoom = (id: string | undefined, roomName: string) => {
    props.history.push(`${props.match.url}/${roomName}/${id}`);
  };

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
          <TableCell>Join</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rooms &&
          rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.roomName}</TableCell>
              <TableCell>{room.format}</TableCell>
              <TableCell>{room.players.length}</TableCell>
              <TableCell onClick={() => joinRoom(room.id, room.roomName)}>
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
