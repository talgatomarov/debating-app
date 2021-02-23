import React, { useState } from "react";
import app from "app";
import { Format, Room, Stage } from "interfaces/Room";
import {
  Button,
  createStyles,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ spacing, zIndex, mixins }: Theme) =>
  createStyles({
    form: {
      width: "100%",
    },
  })
);

const CreateRoomForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [roomName, setRoomName] = useState<Room["roomName"]>("");
  const [format, setFormat] = useState<Room["format"]>(Format.BPF);
  const [publicRoom, setPublicRoom] = useState<Room["publicRoom"]>(false);
  const [motion, setMotion] = useState<Room["motion"]>("");
  const [infoslide, setInfoslide] = useState<Room["infoslide"]>(null);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = app.auth().currentUser!;

    const data: Room = {
      roomName: roomName,
      stage: Stage.preparation,
      format: format,
      publicRoom: publicRoom,
      motion: motion,
      infoslide: infoslide,
      owner: currentUser.uid,
      participantsCount: 0,
      players: [
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
        {
          id: null,
          name: null,
        },
      ],
      judgeJoinedRoundRoom: false,
      enteredPlayersCount: 0,
      judge: {
        id: null,
        name: null,
      },
      timerInfo: {
        timerOn: false,
        speechStart: 0,
        timeLeft: 420000,
      },
    };

    try {
      const ref = await app.firestore().collection("rooms").add(data);
      setError(null);
      history.push(`/lobby/${ref.id}/waiting-room`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12}>
          <TextField
            id="roomName"
            name="roomName"
            required
            onChange={(e) => setRoomName(e.target.value)}
            label="Room name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="format-label" required>
            Format
          </InputLabel>
          <Select
            name="format"
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            labelId="format-label"
            data-testid="format-select"
            fullWidth
            required
          >
            <MenuItem value={Format.BPF}>{Format.BPF}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="motion"
            required
            onChange={(e) => setMotion(e.target.value)}
            label="Motion"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="infoslide"
            onChange={(e) => setInfoslide(e.target.value)}
            label="Infoslide"
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={publicRoom}
                onChange={(e) => setPublicRoom(e.target.checked)}
              />
            }
            label="Make Public"
            labelPlacement="end"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateRoomForm;
