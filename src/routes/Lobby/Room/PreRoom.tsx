import React, { FC, useState, useEffect, useCallback } from "react";
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
} from "@material-ui/core";
import { LobbyLayout } from "containers/layout";
import { RouteComponentProps } from "react-router";

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

const mockPLayers = [
  {
    id: "1",
    name: "Aiya Yegenberdiyeva",
  },
  {
    id: "",
    name: "",
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
    id: "",
    name: "",
  },
  {
    id: "",
    name: "",
  },
  {
    id: "4",
    name: "John Doe",
  },
  {
    id: "",
    name: "",
  },
];

const judge = {
  id: "",
  name: "",
};

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

const PreRoomPage: FC<RouteComponentProps<RouteParams>> = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [playerChoosePosition, setPlayerChoosePosition] = useState<boolean>(
    false
  );

  // TODO: Fix later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playersCount, setPlayersCount] = useState<number>(5);
  const steps = getSteps();

  // TODO: Fix later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const roomId = props.match.params.roomId;

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  const onChoosePositionClick = useCallback(
    (index: number) => () => {
      //post request to update players array
      setPlayerChoosePosition(true);
      mockPLayers[index] = {
        id: "567",
        name: "Name Surname",
      };
    },
    []
  );

  const onChooseJudgeClick = useCallback(() => {
    //post request to update judge
    setPlayerChoosePosition(true);
    judge.id = "test";
    judge.name = "testName";
  }, []);

  useEffect(() => {
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
  });

  useEffect(() => {
    if (playersCount === 9) {
      props.history.push(`${props.match.url}/room`);
    }
  });

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Please enable your audio and video by clicking on the lock at the
              top of the screen.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!stream}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
                        {n.name !== "" ? n.name : "No one is here yet."}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={n.name !== "" || playerChoosePosition}
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
              }}
            >
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
                    {judge.name !== "" ? judge.name : "No one is here yet."}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={judge.name !== "" || playerChoosePosition}
                    onClick={onChooseJudgeClick}
                  >
                    Judge this round
                  </Button>
                </CardActions>
              </Card>
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
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!playerChoosePosition}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <Typography>{playersCount} participants joined the room</Typography>
            <CircularProgress
              size="3rem"
              variant="static"
              value={100 / playersCount}
            />
          </div>
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

export default PreRoomPage;
