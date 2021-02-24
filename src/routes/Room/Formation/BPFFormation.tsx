import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Room } from "interfaces/Room";
import React from "react";

interface BPFFormationProps {
  room: Room;
}

const BPFFormation: React.FC<BPFFormationProps> = ({ room }) => {
  return (
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
      {Object.keys(room.positions).map((teamName) => {
        const teamMembers = room.positions[teamName];

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
              >
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {teamName}
                  </Typography>
                  {Object.keys(teamMembers).map((speakerTitle) => {
                    const user = room.positions[teamName][speakerTitle];
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
                              // onClick={onChoosePositionClick(i)}
                            >
                              Play in this position
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
  );
};

export default BPFFormation;
