import { Button, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import app from "app";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { ChevronRight } from "@material-ui/icons";

const BPFFormation: React.FC = observer(() => {
  const currentUser = app.auth().currentUser!;
  const { roomStore } = useStores();

  const teamOrder = [
    "Opening Government",
    "Opening Opposition",
    "Closing Government",
    "Closing Opposition",
  ];

  const speakerOrder: { [key: string]: string[] } = {
    "Opening Government": ["Prime Minister", "Deputy Prime Minister"],
    "Opening Opposition": ["Leader of Opposition", "Deputy Prime Minister"],
    "Closing Government": ["Government Member", "Government Whip"],
    "Closing Opposition": ["Opposition Member", "Opposition Whip"],
  };

  return (
    <>
      <div
        className="grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridTemplateRows: "auto auto",
          gridColumnGap: "10px",
          gridRowGap: "10px",
          margin: "10px",
        }}
      >
        {/* TODO: Fix HTML element keys */}
        {teamOrder.map((teamName: string) => {
          return (
            <div key={teamName}>
              <div className="grid-item">
                <Card
                  variant="outlined"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={teamName + "-card"}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {teamName}
                    </Typography>
                    {speakerOrder[teamName].map((speakerTitle: string) => {
                      const user = roomStore.positions[teamName][speakerTitle];
                      return (
                        <div key={teamName + speakerTitle}>
                          <Typography variant="body2" component="p">
                            {speakerTitle}:
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {user ? (
                              user.name
                            ) : (
                              // <IconButton
                              //   color="primary"
                              //   aria-label="add to shopping cart"
                              //   onClick={() =>
                              //     roomStore.selectPosition(
                              //       teamName,
                              //       speakerTitle
                              //     )
                              //   }
                              //   size="small"

                              // >
                              //   <Typography>Select</Typography>
                              //   <ChevronRight />
                              // </IconButton>
                              <Button
                                color="primary"
                                size="small"
                                disabled={user !== null}
                                onClick={() =>
                                  roomStore.selectPosition(
                                    teamName,
                                    speakerTitle
                                  )
                                }
                                startIcon={<ChevronRight />}
                              >
                                Select
                              </Button>
                            )}
                          </Typography>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
      {roomStore.judges ? (
        <>
          <p>Judges</p>
          <ul>
            {roomStore.judges.map((judge) => (
              <li key={judge.name}>{judge.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <div>No judges</div>
      )}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => roomStore.adjudicate()}
      >
        Adjudicate
      </Button>
      <br />
      {roomStore.owner === currentUser.uid && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => roomStore.startPreparation()}
        >
          Start preparation
        </Button>
      )}
    </>
  );
});

export default BPFFormation;
