import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { LobbyLayout } from "containers/layout";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Player } from "interfaces/Player";
import app from "app";
import firebase from "firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const getSteps = () => {
  return [
    "Check video and audio are enabled on your device",
    "Choose position",
    "Wait till all players and judge join the room",
  ];
};
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

const constraints = {
  video: {
    facingMode: "user",
    height: { min: 360, ideal: 720, max: 1080 },
  },
  audio: true,
};

interface RouteParams {
  roomId: string;
}

const WaitingRoomPage: FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const steps = getSteps();
  const roomId = match.params.roomId;
  const currentUser = app.auth().currentUser!;
  const database = app.firestore();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stream, setStream] = useState<MediaStream>();
  const [playerChosePosition, setPlayerChosePosition] = useState<boolean>(
    false
  );
  const [rawRoomData, setRawRoomData] = useState<
    firebase.firestore.DocumentData
  >();
  const [judgeJoinedRoom, setJudgeJoinedRoom] = useState<boolean>(false);
  const [playerIsJudge, setPlayerIsJudge] = useState<boolean>(false);

  const [players, judge, participantsCount, enteredPlayersCount] = useMemo(
    () =>
      (rawRoomData && [
        rawRoomData.players,
        rawRoomData.judge,
        rawRoomData.participantsCount,
        rawRoomData.enteredPlayersCount,
      ]) ||
      [],
    [rawRoomData]
  );

  const fetchPlayers = useCallback(
    () =>
      database
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((doc) => {
          setRawRoomData(doc.data());
        }),
    [roomId, database]
  );
  const fetchJudgeJoinedRoom = useCallback(
    () =>
      database
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((doc) => {
          const data = doc.data();
          setJudgeJoinedRoom(data && data.judgeJoinedRoundRoom);
        }),
    [database, roomId]
  );
  const addPlayer = useCallback(
    (positionIndex: number) => {
      const newPlayers = players;
      newPlayers[positionIndex] = {
        id: currentUser.uid,
        name: currentUser.displayName,
      };
      database
        .collection("rooms")
        .doc(roomId)
        .update({
          players: newPlayers,
          participantsCount: participantsCount + 1,
        });
    },
    [currentUser, players, roomId, database, participantsCount]
  );
  const addJudge = useCallback(() => {
    const newJudge = {
      id: currentUser.uid,
      name: currentUser.displayName,
    };
    database
      .collection("rooms")
      .doc(roomId)
      .update({
        judge: newJudge,
        participantsCount: participantsCount + 1,
        owner: currentUser.uid,
      });
  }, [currentUser, roomId, database, participantsCount]);
  const cancelPlayer = useCallback(
    () =>
      database
        .collection("rooms")
        .doc(roomId)
        .update({
          players: players.map((n: Player) =>
            n.id === currentUser.uid
              ? {
                  id: null,
                  name: null,
                }
              : n
          ),
          participantsCount: participantsCount - 1,
        }),
    [currentUser, roomId, database, players, participantsCount]
  );
  const cancelJudge = useCallback(
    () =>
      database
        .collection("rooms")
        .doc(roomId)
        .update({
          judge: {
            id: null,
            name: null,
          },
          participantsCount: participantsCount - 1,
        }),
    [roomId, database, participantsCount]
  );
  const incrementEnteredPlayers = useCallback(
    () =>
      database
        .collection("rooms")
        .doc(roomId)
        .update({
          enteredPlayersCount: enteredPlayersCount + 1,
        }),
    [database, enteredPlayersCount, roomId]
  );
  const handleNext = useCallback(
    () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
    []
  );
  const handleBack = useCallback(() => {
    if (activeStep === 0) {
      history.push("/lobby");
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [activeStep, history]);
  const handleReset = useCallback(() => setActiveStep(0), []);
  const handleChange = useCallback(() => {
    if (judge.id === currentUser.uid) {
      cancelJudge();
      setPlayerIsJudge(false);
    } else {
      cancelPlayer();
    }
    setPlayerChosePosition(false);
    fetchPlayers();
  }, [cancelPlayer, fetchPlayers, cancelJudge, currentUser, judge]);
  const onChoosePositionClick = useCallback(
    (index: number) => () => {
      addPlayer(index);
      setPlayerChosePosition(true);
      fetchPlayers();
    },
    [addPlayer, fetchPlayers]
  );
  const onChooseJudgeClick = useCallback(() => {
    addJudge();
    setPlayerChosePosition(true);
    setPlayerIsJudge(true);
    fetchPlayers();
  }, [addJudge, fetchPlayers]);
  const checkDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return [...devices].some((device) => device.label !== "");
  }, []);

  useEffect(() => {
    const check = checkDevices();
    if (!check) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          setStream(stream);
        })
        .catch((err) => {
          if (err instanceof DOMException) {
            alert("Cannot open webcam and/or microphone");
          } else {
            console.log(err);
          }
        });
    } else {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        setStream(stream);
      });
    }
  }, [checkDevices]);
  useEffect(() => {
    if (activeStep === 1) {
      fetchPlayers();
    }
    if (activeStep === 2) {
      fetchJudgeJoinedRoom();
    }
  }, [activeStep, fetchPlayers, fetchJudgeJoinedRoom]);
  useEffect(() => {
    if (
      rawRoomData &&
      players &&
      players.find((n: Player) => n.id === currentUser.uid)
    ) {
      setPlayerChosePosition(true);
    }
    if (rawRoomData && judge && judge.id === currentUser.uid) {
      setPlayerChosePosition(true);
      setPlayerIsJudge(true);
    }
  }, [players, currentUser, rawRoomData, judge]);
  useEffect(() => {
    if (activeStep === 2 && (playerIsJudge || judgeJoinedRoom)) {
      incrementEnteredPlayers();
      if (playerIsJudge) {
        database.collection("room").doc(roomId).update({
          judgeJoinedRoundRoom: true,
        });
      }
      history.push(`/lobby/${roomId}/round-room`);
    }
  }, [
    playerIsJudge,
    judgeJoinedRoom,
    history,
    roomId,
    activeStep,
    incrementEnteredPlayers,
    database,
  ]);

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            {stream ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="primary">
                  Your audio and video are checked. Proceed to the next step.
                </Typography>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="primary">
                  Checking your video and audio...
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  data-testid="loading"
                >
                  <CircularProgress />
                </Box>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button onClick={handleBack} className={classes.backButton}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!stream}
              >
                Next
              </Button>
            </div>
          </>
        );
      case 1:
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
              {players &&
                players.map((n: Player, i: number) => (
                  <div className="grid-item" key={i}>
                    <Card
                      variant="outlined"
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            gutterBottom
                          >
                            {positions[i]}
                          </Typography>
                        </div>
                        <br />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            component="p"
                            color="primary"
                          >
                            {n.name !== null
                              ? n.name
                              : n.id !== null
                              ? n.id
                              : "No one is here yet."}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions disableSpacing>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          disabled={n.id !== null || playerChosePosition}
                          onClick={onChoosePositionClick(i)}
                        >
                          Choose this position
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              {judge && (
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
                      Judge
                    </Typography>
                    <Typography variant="body2" component="p">
                      {judge.name !== null
                        ? judge.name
                        : judge.id !== null
                        ? judge.id
                        : "No one is here yet."}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={judge.name !== null || playerChosePosition}
                      onClick={onChooseJudgeClick}
                    >
                      Judge this round
                    </Button>
                  </CardActions>
                </Card>
              )}
            </div>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              gutterBottom
              align="center"
            >
              You will not be able to change the position after this step.
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleChange}
                className={classes.backButton}
                disabled={!playerChosePosition}
              >
                Change position
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!playerChosePosition}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <Typography>
                {participantsCount} participant(s) joined the room
              </Typography>
              <CircularProgress
                size="3rem"
                variant="static"
                value={(participantsCount * 100) / 9}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Change position
              </Button>
            </div>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <LobbyLayout>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%" }} className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
            </div>
          )}
        </div>
      </div>
    </LobbyLayout>
  );
};

export default WaitingRoomPage;
