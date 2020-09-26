import React, { useState } from "react";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import AuthError from "interfaces/AuthError";
import AuthLayout from "containers/layout/AuthLayout";
import {
  Theme,
  createStyles,
  withStyles,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    paper: {
      marginTop: spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: spacing(1),
      backgroundColor: palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: spacing(1),
    },
    submit: {
      margin: spacing(3, 0, 2),
    },
  });

const Register = withStyles(styles)(
  observer((props: any) => {
    const { classes } = props;
    const [error, setError] = useState<AuthError | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { authStore } = useStores();

    const signIn = async () => {
      try {
        await authStore.createUserWithEmailAndPassword(email, password);
      } catch (err) {
        setError(err);
      }
    };

    return (
      <AuthLayout>
        {/* <div> */}
        {/* <form
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            const elements = (e.target as HTMLFormElement).elements;
            const email = elements.namedItem("email") as HTMLInputElement;
            const password = elements.namedItem("password") as HTMLInputElement;

            try {
              await authStore.createUserWithEmailAndPassword(
                email.value,
                password.value
              );
            } catch (err) {
              setError(err);
            }
          }}
        >
          <label htmlFor="email">Email</label>
          <input id="email" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
          <button type="submit">Register</button>
        </form>
      {error !== null ? <p>{error.message}</p> : null}
      {authStore.user !== null ? <p>{authStore.user.uid}</p> : null} */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e: any) => setEmail(e.value)}
              />
            </Grid>
            <Grid item xs={12}>
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
                onChange={(e: any) => setPassword(e.value)}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => signIn()}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </AuthLayout>
    );
  })
);

export default Register;
