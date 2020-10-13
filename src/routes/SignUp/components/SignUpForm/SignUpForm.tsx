import React, { useState } from "react";
import app from "app";
import { AuthError } from "interfaces";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState<AuthError | null>(null);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const elements = (e.target as HTMLFormElement).elements;
    const email = elements.namedItem("email") as HTMLInputElement;
    const password = elements.namedItem("password") as HTMLInputElement;

    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
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
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
