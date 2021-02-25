import { Button, Card, CardContent, Typography } from "@material-ui/core";
import { Room } from "interfaces/Room";
import React from "react";
import axios from "axios";
import app from "app";
import { RouteParams } from "../Room";
import { useParams } from "react-router-dom";

interface BPFFormationProps {
  room: Room;
}

const BPFFormation: React.FC<BPFFormationProps> = ({ room }) => {
  const currentUser = app.auth().currentUser!;
  const { roomId } = useParams<RouteParams>();

  const handleSelectPosition = async (
    teamName: string,
    speakerTitle: string
  ) => {
    const requestBody = {
      displayName: currentUser.displayName,
      teamName,
      speakerTitle,
    };

    const authToken = await currentUser.getIdToken(true);

    // TODO: handle error
    await axios.post(`/api/rooms/${roomId}/select`, requestBody, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  };

  const handleStartPreparation = async () => {
    const authToken = await currentUser.getIdToken(true);

    // TODO: handle error
    await axios.post(`/api/rooms/${roomId}/startPreparation`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  };

  const handleAdjudicate = async () => {
    const requestBody = {
      displayName: currentUser.displayName,
      adjudicate: true,
    };

    const authToken = await currentUser.getIdToken(true);

    // TODO: handle error
    await axios.post(`/api/rooms/${roomId}/select`, requestBody, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  };

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
                  key={teamName}
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
                                onClick={() =>
                                  handleSelectPosition(teamName, speakerTitle)
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
      {room.judges ? (
        <>
          <p>Judges</p>
          <ul>
            {room.judges.map((judge) => (
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
        onClick={() => handleAdjudicate()}
      >
        Adjudicate
      </Button>
      <br />
      {room.owner === currentUser.uid && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleStartPreparation()}
        >
          Start preparation
        </Button>
      )}
    </>
  );
};

export default BPFFormation;
