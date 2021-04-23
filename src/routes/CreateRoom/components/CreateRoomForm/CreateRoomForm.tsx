import React, { useState } from "react";
import { Format, Room } from "interfaces/Room";
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
import { useStores } from "hooks";

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

  const [name, setName] = useState<Room["name"]>("");
  const [format, setFormat] = useState<Room["format"]>(Format.BPF);
  const [privacy, setPrivacy] = useState<Room["privacy"]>("public");
  const [motion, setMotion] = useState<Room["motion"]>("");
  const [infoslide, setInfoslide] = useState<Room["infoslide"]>();
  const [error, setError] = useState<Error | null>(null);
  const { roomStore } = useStores();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await roomStore.create({
        name,
        format,
        privacy,
        motion,
        infoslide,
      });

      setError(null);
      history.push(`/room`);
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
            onChange={(e) => setName(e.target.value)}
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
            <MenuItem value="public">public</MenuItem>
            <MenuItem value="private">private</MenuItem>
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
            <MenuItem value={Format.APF}>{Format.APF}</MenuItem>
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
