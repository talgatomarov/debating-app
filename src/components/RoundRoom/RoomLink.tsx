import React from "react";
import {
  IconButton,
  Container,
  TextField,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Link, FileCopy } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

type Props = {
  linkToCopy: string;
};

const RoomLink: React.FC<Props> = (props) => {
  function copyToClipboard() {
    navigator.clipboard.writeText(props.linkToCopy);
  }

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className={classes.margin}>
        <Grid
          item
          container
          spacing={1}
          alignItems="flex-end"
          justify="space-between"
          xs={12}
        >
          <Grid item xs={1}>
            <Link />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="input-with-icon-grid"
              InputLabelProps={{ shrink: false }}
              defaultValue={props.linkToCopy}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={copyToClipboard}>
              <FileCopy />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default RoomLink;
