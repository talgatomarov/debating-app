import React, { useState } from "react";
import { firestore, auth } from "app";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Switch,
  Grid,
  InputLabel,
  FormControlLabel,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FirebaseError } from "firebase";

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
  const [format, setFormat] = useState("");
  const [randomMotion, setRandomMotion] = useState(false);
  const [motion, setMotion] = useState("");
  const [infoslide, setInfoslide] = useState("");
  const [error, setError] = useState<FirebaseError | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const docRef = await firestore.collection("rooms").add({
        roomName: roomName,
        format: format,
        randomMotion: randomMotion,
        motion: motion,
        infoslide: infoslide,
        owner: auth.currentUser?.uid,
        players: [auth.currentUser?.uid],
      });
      setError(null);
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
            onChange={(e) => setFormat(e.target.value as string)}
            labelId="format-label"
            fullWidth
            required
          >
            <MenuItem value="bpf">British Parliamentary</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={randomMotion}
                onChange={(e) => setRandomMotion(e.target.checked)}
              />
            }
            label="Random Motion"
            labelPlacement="end"
          />
        </Grid>
        {!randomMotion && (
          <>
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
                required
                onChange={(e) => setInfoslide(e.target.value)}
                label="Infoslide"
                fullWidth
                multiline
              />
            </Grid>
          </>
        )}
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
