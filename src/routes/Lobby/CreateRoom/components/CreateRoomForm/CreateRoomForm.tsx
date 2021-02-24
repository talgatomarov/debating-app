import React, { useState } from "react";
import axios from "axios";
import app from "app";
import { Format, Room, Stage } from "interfaces/Room";
import {
  Button,
  createStyles,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { createPositions } from "./Positions";

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

  const [roomName, setRoomName] = useState<Room["name"]>("");
  const [format, setFormat] = useState<Room["format"]>(Format.BPF);
  const [privacy, setPrivacy] = useState<Room["privacy"]>("public");
  const [motion, setMotion] = useState<Room["motion"]>("");
  const [infoslide, setInfoslide] = useState<Room["infoslide"]>(null);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = app.auth().currentUser!;

    const data: Room = {
      name: roomName,
      stage: Stage.formation,
      format: format,
      privacy: privacy,
      motion: motion,
      infoslide: infoslide,
      owner: currentUser.uid,
      players: [currentUser.uid],
      positions: createPositions(format),
      judges: [],
      chair: null,
      timerInfo: {
        timerOn: false,
        speechStart: 0,
        timeLeft: 420000,
      },
    };

    try {
      const authToken = await currentUser.getIdToken(true);

      const response = await axios.post("/api/rooms", data, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });

      setError(null);
      history.push(`/rooms/${response.data.id}`);
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
          <InputLabel id="privacy-label" required>
            Privacy
          </InputLabel>
          <Select
            name="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value as string)}
            labelId="privacy-label"
            data-testid="privacy-select"
            fullWidth
            required
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
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
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateRoomForm;
