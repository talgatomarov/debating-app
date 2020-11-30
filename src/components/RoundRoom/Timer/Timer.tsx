import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Button, Box, Container } from "@material-ui/core";
import app from "app";

type Props = {
  roomId: string;
  isOwner: boolean;
};

const Timer: React.FC<Props> = (props) => {
  const speechDuration = 420000;
  const roomId = props.roomId;
  const isOwner = props.isOwner;

  const roomRef = useMemo(() => {
    return app.firestore().collection("rooms").doc(roomId);
  }, [roomId]);

  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [speechStart, setSpeechStart] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState<number>(speechDuration);
  const [timeDisplayed, setTimeDisplayed] = useState<number>(speechDuration);

  const startTimer = useCallback(() => {
    roomRef
      .update({
        "timerInfo.speechStart": Date.now(),
        "timerInfo.timerOn": true,
      })
      .then(function () {
        console.log("Timer was started!");
      });
  }, [roomRef]);

  const pauseTimer = useCallback(() => {
    roomRef
      .update({
        "timerInfo.timerOn": false,
        "timerInfo.timeLeft": timeLeft - (Date.now() - speechStart),
      })
      .then(function () {
        console.log("Timer was paused!");
      });
  }, [roomRef, speechStart, timeLeft]);

  const resetTimer = useCallback(() => {
    roomRef
      .update({
        "timerInfo.timeLeft": speechDuration,
        "timerInfo.speechStart": Date.now(),
      })
      .then(function () {
        console.log("Timer was reset!");
      });
    setTimeDisplayed(speechDuration);
  }, [roomRef]);

  const secondsToTime = useCallback((secs: number) => {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  }, []);

  const timeInSeconds = useMemo(() => Math.round(timeDisplayed / 1000), [
    timeDisplayed,
  ]);
  const addTime = useMemo(() => timeInSeconds < 0, [timeInSeconds]);
  const time = useMemo(
    () =>
      addTime ? secondsToTime(-timeInSeconds) : secondsToTime(timeInSeconds),
    [addTime, timeInSeconds, secondsToTime]
  );

  useEffect(() => {
    roomRef.onSnapshot((snapshot) => {
      const timerInfo = snapshot.get("timerInfo");
      setTimerOn(timerInfo.timerOn);
      setSpeechStart(timerInfo.speechStart);
      setTimeLeft(timerInfo.timeLeft);
      setTimeDisplayed(timerInfo.timeLeft);
    });
  }, [roomRef]);

  useEffect(() => {
    if (timerOn) {
      setTimeout(() => {
        if (timeLeft - (Date.now() - speechStart) < -60000) {
          return;
        }
        setTimeDisplayed(timeLeft - (Date.now() - speechStart));
      }, 1000);
    }
  }, [timerOn, timeLeft, speechStart, timeDisplayed]);

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
        {time.m < 10 ? 0 : null}
        {time.m}:{time.s < 10 ? 0 : null}
        {time.s}
      </Box>
      {isOwner && (
        <Box display="flex" flexDirection="row" padding="5px">
          <Box pr={0.5} flexGrow={1}>
            {!timerOn && (
              <Button
                color="primary"
                fullWidth
                onClick={startTimer}
                variant="contained"
                disabled={timeInSeconds === 0}
              >
                {timeInSeconds === speechDuration / 1000 ? "START" : "RESUME"}
              </Button>
            )}
            {timerOn && (
              <Button
                color="secondary"
                fullWidth
                onClick={pauseTimer}
                variant="contained"
              >
                PAUSE
              </Button>
            )}
          </Box>
          <Box pl={0.5} flexGrow={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={resetTimer}
              disabled={timerOn || timeInSeconds === speechDuration / 1000}
            >
              RESET
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Timer;
