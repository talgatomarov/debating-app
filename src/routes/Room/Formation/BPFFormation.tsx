import { Button, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import app from "app";
import { useStores } from "hooks";

const BPFFormation: React.FC = () => {
  const currentUser = app.auth().currentUser!;
  const { roomStore } = useStores();

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
        {/* TODO: Fix HTML element keys */}
        {Object.keys(roomStore.positions).map((teamName) => {
          const teamMembers = roomStore.positions[teamName];

          return (
            <div>
              <div className="grid-item">
                <Card
                  variant="outlined"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={teamName}
                >
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {teamName}
                    </Typography>
                    {Object.keys(teamMembers).map((speakerTitle) => {
                      const user = roomStore.positions[teamName][speakerTitle];
                      return (
                        <>
                          <Typography variant="body1" component="p">
                            {speakerTitle}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {user ? (
                              user.name
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={user !== null}
                                onClick={() =>
                                  roomStore.selectPosition(
                                    teamName,
                                    speakerTitle
                                  )
                                }
                              >
                                Select
                              </Button>
                            )}
                          </Typography>
                        </>
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
};

export default BPFFormation;
