import React from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  IconButton,
  Tooltip,
  Button,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HelpIcon from "@material-ui/icons/Help";

export interface RoomListProps {
  rooms:
    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    | undefined;
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <Table>
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
        {rooms?.docs.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>{doc.data().roomName}</TableCell>
            <TableCell>{doc.data().format}</TableCell>
            <TableCell>{doc.data().players.length}</TableCell>
            <TableCell>
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
