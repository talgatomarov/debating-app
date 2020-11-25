import React, { useState } from "react";
import app from "app";
import { FirebaseError } from "firebase";
import { Format, Room } from "interfaces/Room";
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

const useStyles = makeStyles(({ spacing, zIndex, mixins }: Theme) =>
  createStyles({
    form: {
      width: "100%",
    },
  })
);

const CreateRoomForm: React.FC = () => {
  const classes = useStyles();
  const [roomName, setRoomName] = useState<string>("");
  const [format, setFormat] = useState<Format>(Format.BPF);
  const [publicRoom, setPublicRoom] = useState(false);
  const [motion, setMotion] = useState<string>();
  const [infoslide, setInfoslide] = useState<string>();
  const [error, setError] = useState<FirebaseError | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUser = app.auth().currentUser;

    let data: Room;

    if (currentUser) {
      data = {
        roomName: roomName,
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
        judge: {
          id: null,
          name: null,
        },
      };

      try {
        await app.firestore().collection("rooms").add(data);
        setError(null);
      } catch (error) {
        setError(error);
      }
    }
    // TODO: else throw/set error? But what kind
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
            <MenuItem value={Format.BPF}>British Parliamentary</MenuItem>
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
