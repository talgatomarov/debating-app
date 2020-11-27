import React, { FC, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Player } from "interfaces/Room";

const positions = [
  "Prime Minister",
  "Deputy Prime Minister",
  "Leader of Opposition",
  "Deputy Leader of Opposition",
  "Member of Government",
  "Government Whip",
  "Member of Opposition",
  "Opposition Whip",
];

const mockPLayers: Player[] = [
  {
    id: "1",
    name: "Aiya Yegenberdiyeva",
  },
  {
    id: null,
    name: null,
  },
  {
    id: "2",
    name: "Lyailya Mussakhanova",
  },
  {
    id: "3",
    name: "Talgat Omarov",
  },
  {
    id: null,
    name: null,
  },
  {
    id: null,
    name: null,
  },
  {
    id: "4",
    name: "John Doe",
  },
  {
    id: null,
    name: null,
  },
];

const ChoosePosition: FC = () => {
  const onChoosePositionClick = useCallback(
    (positionIndex: number) => () => {
      //post request to update players array
    },
    []
  );

  return (
    <>
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: "25% 25% 25% 25%",
          gridColumnGap: "5px",
          gridRowGap: "5px",
          margin: "5px",
        }}
      >
        {mockPLayers.map((n, i) => (
          <div className="grid-item">
            <Card
              variant="outlined"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {positions[i]}
                </Typography>
                <Typography variant="body2" component="p">
                  {n.name !== null ? n.name : "No one is here yet."}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={n.name !== null}
                  onClick={onChoosePositionClick(i)}
                >
                  Play in this position
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChoosePosition;
