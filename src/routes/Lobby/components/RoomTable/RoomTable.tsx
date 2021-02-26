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
import axios from "axios";
import app from "app";
import { useHistory } from "react-router-dom";

export interface RoomListProps {
  rooms: Room[] | undefined;
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const currentUser = app.auth().currentUser!;
  const history = useHistory();

  const onJoinRoomClick = (room: Room) => {
    return async () => {
      const authToken = await currentUser.getIdToken();
      await axios.post(`/api/rooms/${room.id}/join`, null, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });

      history.push(`/rooms/${room.id}`);
    };
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
          <TableCell>Participants joined</TableCell>
          <TableCell>Judge</TableCell>
          <TableCell>Join</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rooms &&
          rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.format}</TableCell>
              <TableCell>{room.players.length}</TableCell>
              <TableCell>
                {room.chair?.uid === null
                  ? "no judge"
                  : room.chair?.name === null
                  ? room.chair?.uid
                  : room.chair?.name}
              </TableCell>
              <TableCell onClick={onJoinRoomClick(room)}>
                <IconButton data-testid={"join-" + room.id}>
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