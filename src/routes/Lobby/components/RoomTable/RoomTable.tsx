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
import { useHistory } from "react-router-dom";
import { useStores } from "hooks";

export interface RoomListProps {
  rooms: Room[] | undefined;
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const history = useHistory();
  const { roomStore } = useStores();

  const onJoinRoomClick = (roomId: string) => {
    return async () => {
      await roomStore.join(roomId);
      history.push(`/room`);
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
              <TableCell onClick={onJoinRoomClick(room.id!)}>
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
