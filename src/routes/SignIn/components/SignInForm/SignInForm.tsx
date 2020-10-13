import React, { useState } from "react";
import app from "app";
import { AuthError, LocationState } from "interfaces";
import {
  makeStyles,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInForm: React.FC = () => {
  const [error, setError] = useState<AuthError | null>(null);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: "/" } };

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const elements = (e.target as HTMLFormElement).elements;
    const email = elements.namedItem("email") as HTMLInputElement;
    const password = elements.namedItem("password") as HTMLInputElement;

    try {
      await app.auth().signInWithEmailAndPassword(email.value, password.value);
      history.replace(from);
    } catch (err) {
      setError(err);
    }
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
