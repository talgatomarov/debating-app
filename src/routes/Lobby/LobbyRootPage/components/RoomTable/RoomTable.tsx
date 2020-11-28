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
import { useHistory, useLocation } from "react-router-dom";

export interface RoomListProps {
  rooms: Room[] | undefined;
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const location = useLocation();
  const history = useHistory();

  const onJoinRoomClick = (roomId: string) => {
    history.push(`${location.pathname}/${roomId}/waiting-room`);
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
              <TableCell>{room.participantsCount}</TableCell>
              <TableCell>
                {room.judge.name === "" ? "no judge" : room.judge.name}
              </TableCell>
              <TableCell onClick={() => room.id && onJoinRoomClick(room.id)}>
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
