import { Button, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { ChevronRight } from "@material-ui/icons";
import { Judge } from "interfaces/Judge";

const BPFFormation: React.FC = observer(() => {
  const { userStore, roomStore } = useStores();

  const teamOrder = [
    "Opening Government",
    "Opening Opposition",
    "Closing Government",
    "Closing Opposition",
  ];

  const speakerOrder: { [key: string]: string[] } = {
    "Opening Government": ["Prime Minister", "Deputy Prime Minister"],
    "Opening Opposition": [
      "Leader of Opposition",
      "Deputy Leader of Opposition",
    ],
    "Closing Government": ["Government Member", "Government Whip"],
    "Closing Opposition": ["Opposition Member", "Opposition Whip"],
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Players
      </Typography>
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
        {teamOrder.map((teamName: string, i: number) => (
          <div key={teamName + i} className="grid-item">
            <Card
              variant="outlined"
              style={{
                height: "100%",
                display: "flex",
              }}
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
                          <Button
                            color="primary"
                            size="small"
                            disabled={user !== null}
                            data-testid={`select ${speakerTitle}`}
                            onClick={() =>
                              roomStore.selectPosition(teamName, speakerTitle)
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
        ))}
      </div>
      <Typography variant="h6" gutterBottom>
        Judges
      </Typography>
      {roomStore?.judges?.length !== 0 ? (
        <ul>
          {roomStore?.judges?.map((judge: Judge) => (
            <li key={judge.name}>{judge.name}</li>
          ))}
        </ul>
      ) : (
        <div>No judges</div>
      )}
      <Button
        color="primary"
        size="small"
        onClick={() => roomStore.adjudicate()}
        startIcon={<ChevronRight />}
      >
        Adjudicate
      </Button>
      <br />
      {roomStore.owner === userStore.currentUser?.uid && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => roomStore.startPreparation()}
          style={{
            display: "flex",
            margin: "auto",
          }}
        >
          Start preparation
        </Button>
      )}
    </>
  );
});

export default BPFFormation;
