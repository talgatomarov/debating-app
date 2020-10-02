import React, { useState } from "react";
import { auth } from "app";
import { makeStyles, Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AuthError } from "interfaces";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPasswordForm: React.FC = () => {
  const classes = useStyles();
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const elements = (e.target as HTMLFormElement).elements;
    const email = elements.namedItem("email") as HTMLInputElement;

    try {
      await auth.sendPasswordResetEmail(email.value);
      setError(null);
      setSuccess(true);
    } catch (error) {
      setError(error);
      setSuccess(false);
    }
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error.message}</Alert>}
      {success && <Alert severity="success">The email was sent.</Alert>}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Reset
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
