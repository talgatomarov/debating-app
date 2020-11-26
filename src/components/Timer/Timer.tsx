import React from "react";
import { Button, Box, Container } from "@material-ui/core";
import { compose, spacing, palette } from "@material-ui/system";
import { styled } from "@material-ui/core/styles";

type Props = {
  isOwner: boolean;
  duration: number;
};

type State = {
  timerOn: boolean;
  timerStart: number;
  timeRemaining: number;
};

class Timer extends React.Component<Props, State> {
  private timer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: Date.now(),
      timeRemaining: this.props.duration,
    };
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemaining > 0) {
      this.setState({
        timeRemaining: this.state.timeRemaining - 1000,
      });
    } else {
      clearInterval(this.timer!);
      this.setState({ timerOn: false });
    }
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timeRemaining: this.state.timeRemaining,
    });
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    if (!this.state.timerOn) {
      this.setState({
        timeRemaining: this.props.duration,
        timerOn: false,
        timerStart: Date.now(),
      });
    }
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
    const timeRemaining = this.state.timeRemaining / 1000;

    const addTime = timeRemaining < 15;
    const timeLeft = addTime
      ? this.secondsToTime(15 - timeRemaining)
      : this.secondsToTime(timeRemaining - 15);
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
            timeRemaining > 375
              ? "text.primary"
              : timeRemaining > 75
              ? "success.main"
              : timeRemaining > 15
              ? "warning.main"
              : "error.main"
          }
        >
          {addTime ? "+" : null}
          {timeLeft.m < 10 ? 0 : null}
          {timeLeft.m}:{timeLeft.s < 10 ? 0 : null}
          {timeLeft.s}
        </Box>
        <Box display="flex" flexDirection="row" padding="5px">
          <Box pr={0.5} flexGrow={1}>
            {!this.state.timerOn && (
              <Button
                color="primary"
                fullWidth
                onClick={this.startTimer}
                variant="contained"
                disabled={timeRemaining === 0 || !this.props.isOwner}
              >
                {timeRemaining === this.props.duration / 1000
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
                timeRemaining === this.props.duration / 1000
              }
            >
              RESET
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Timer;
