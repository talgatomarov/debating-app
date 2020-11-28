import React from "react";
import { Button, Box, Container } from "@material-ui/core";
import { compose, spacing, palette } from "@material-ui/system";
import { styled } from "@material-ui/core/styles";
import app from "app";

type Props = {
  roomId: string;
  isOwner: boolean;
};

type State = {
  timerOn: boolean;
  speechStart: number;
  timeLeft: number;
  timeDisplayed: number;
};

export class Timer extends React.Component<Props, State> {
  private timer: any;
  speechDuration = 420000;

  /** initially in db
     timerOn: false
     speechStart: 0
     timeLeft: speechDuration
     **/
  constructor(props: Props) {
    super(props);
    this.state = {
      timerOn: false,
      speechStart: 0,
      timeLeft: this.speechDuration,
      timeDisplayed: this.speechDuration,
    };
  }

  componentDidMount(): void {
    app
      .firestore()
      .collection("rooms")
      .doc(this.props.roomId)
      .onSnapshot((snapshot) => {
        const timerInfo = snapshot.get("timerInfo");
        this.setState({
          timerOn: timerInfo.timerOn,
          speechStart: timerInfo.speechStart,
          timeLeft: timerInfo.timeLeft,
          timeDisplayed: timerInfo.timeLeft,
        });
        if (this.state.timerOn) {
          if (
            this.state.timeLeft - (Date.now() - this.state.speechStart) >
            -60
          ) {
            this.timer = setInterval(() => {
              this.setState({
                timeDisplayed:
                  this.state.timeLeft - (Date.now() - this.state.speechStart),
              });
            }, 1000);
          }
        } else {
          clearInterval(this.timer);
        }
      });
  }

  startTimer = () => {
    app
      .firestore()
      .collection("rooms")
      .doc(this.props.roomId)
      .update({
        "timerInfo.speechStart": Date.now(),
        "timerInfo.timerOn": true,
      })
      .then(function () {
        console.log("Timer was started!");
      });
  };

  pauseTimer = () => {
    app
      .firestore()
      .collection("rooms")
      .doc(this.props.roomId)
      .update({
        "timerInfo.timerOn": false,
        "timerInfo.timeLeft":
          this.state.timeLeft - (Date.now() - this.state.speechStart),
      })
      .then(function () {
        console.log("Timer was paused!");
      });
  };

  resetTimer = () => {
    app
      .firestore()
      .collection("rooms")
      .doc(this.props.roomId)
      .update({
        "timerInfo.timeLeft": this.speechDuration,
        "timerInfo.speechStart": Date.now(),
      })
      .then(function () {
        console.log("Timer was reset!");
      });
  };

  secondsToTime(secs: number) {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  Box = styled("div")(compose(spacing, palette));

  render() {
    const timeInSeconds = Math.round(this.state.timeDisplayed / 1000);
    const addTime = timeInSeconds < 0;
    const timeDisplayed = addTime
      ? this.secondsToTime(-timeInSeconds)
      : this.secondsToTime(timeInSeconds);
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          p={1}
          color="white"
          fontSize={40}
          margin="5px"
          borderRadius="borderRadius"
          bgcolor={
            timeInSeconds > 360
              ? "text.primary"
              : timeInSeconds > 60
              ? "success.main"
              : timeInSeconds > 0
              ? "warning.main"
              : "error.main"
          }
        >
          {addTime ? "+" : null}
          {timeDisplayed.m < 10 ? 0 : null}
          {timeDisplayed.m}:{timeDisplayed.s < 10 ? 0 : null}
          {timeDisplayed.s}
        </Box>
        {this.props.isOwner && (
          <Box display="flex" flexDirection="row" padding="5px">
            <Box pr={0.5} flexGrow={1}>
              {!this.state.timerOn && (
                <Button
                  color="primary"
                  fullWidth
                  onClick={this.startTimer}
                  variant="contained"
                  disabled={timeInSeconds === 0 || !this.props.isOwner}
                >
                  {timeInSeconds === this.speechDuration / 1000
                    ? "START"
                    : "RESUME"}
                </Button>
              )}
              {this.state.timerOn && (
                <Button
                  color="secondary"
                  fullWidth
                  onClick={this.pauseTimer}
                  variant="contained"
                  disabled={!this.props.isOwner}
                >
                  PAUSE
                </Button>
              )}
            </Box>
            <Box pl={0.5} flexGrow={1}>
              <Button
                variant="contained"
                fullWidth
                onClick={this.resetTimer}
                disabled={
                  this.state.timerOn ||
                  timeInSeconds === this.speechDuration / 1000
                }
              >
                RESET
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    );
  }
}
