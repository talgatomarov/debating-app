import React from "react";
import { Room, Format } from "interfaces/Room";
import BPFFormation from "./BPFFormation";
import { Alert } from "@material-ui/lab";

interface FormationProps {
  room: Room;
}

const Formation: React.FC<FormationProps> = ({ room }) => {
  // TODO: Maybe we do not need separate components for each format
  const selectFormation = (format: string) => {
    switch (format) {
      case Format.BPF:
        return <BPFFormation room={room} />;
      default:
        return (
          <Alert severity="error" data-testid="error">
            Unknown room format
          </Alert>
        );
    }
  };
  return selectFormation(room.format);
};

export default Formation;
