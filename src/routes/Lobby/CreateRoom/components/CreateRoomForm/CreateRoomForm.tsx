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
import { auth, firestore } from "app";
import { FirebaseError } from "firebase";
import { Format, Room } from "interfaces/Room";
import React, { useState } from "react";

const useStyles = makeStyles(({ spacing, zIndex, mixins }: Theme) =>
  createStyles({
    form: {
      width: "100%",
    },
  })
);

const CreateRoomForm: React.FC = () => {
  const classes = useStyles();
  const [roomName, setRoomName] = useState("");
  const [format, setFormat] = useState<Format>(Format.UNKNOWN);
  const [publicRoom, setPublicRoom] = useState(false);
  const [motion, setMotion] = useState("");
  const [infoslide, setInfoslide] = useState("");
  const [error, setError] = useState<FirebaseError | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let data: Room;

    if (auth.currentUser) {
      data = {
        roomName: roomName,
        format: format,
        publicRoom: publicRoom,
        motion: motion,
        infoslide: infoslide,
        owner: auth.currentUser.uid,
        players: [auth.currentUser.uid],
      };

      try {
        await firestore.collection("rooms").add(data);
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
            onChange={(e) => setFormat(parseInt(e.target.value as string))}
            labelId="format-label"
            fullWidth
            required
          >
            <MenuItem value={Format.BPF}>British Parliamentary</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={(e) => setMotion(e.target.value)}
            label="Motion"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
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
