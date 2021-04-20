import React from "react";
import { Format } from "interfaces/Room";
import BPFFormation from "./BPFFormation";
import APFFormation from "./APFFormation";
import { Alert } from "@material-ui/lab";
import { useStores } from "hooks";
import { observer } from "mobx-react";

const Formation: React.FC = observer(() => {
  const { roomStore } = useStores();
  // TODO: Maybe we do not need separate components for each format
  const selectFormation = (format: string | undefined) => {
    switch (format) {
      case Format.BPF:
        return <BPFFormation />;
      case Format.APF:
        return <APFFormation />;
      default:
        return (
          <Alert severity="error" data-testid="error">
            Unknown room format
          </Alert>
        );
    }
  };
  return selectFormation(roomStore.format);
});

export default Formation;
