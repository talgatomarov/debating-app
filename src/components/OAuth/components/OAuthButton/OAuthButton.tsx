import React from "react";
import app from "app";
import firebase from "firebase";
import { useHistory, useLocation } from "react-router-dom";
import { LocationState } from "interfaces";
import {
  Button,
  ButtonProps,
  ButtonClassKey,
  Typography,
  makeStyles,
  StandardProps,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";

export interface AuthButtonProps
  extends StandardProps<ButtonProps, ButtonClassKey> {
  provider: firebase.auth.AuthProvider;
  icon: IconDefinition;
  backgroundColor: string;
  className?: string | undefined;
}

const useStyles = makeStyles((props) => ({
  icon: {
    marginRight: "16px",
  },
  title: {
    textTransform: "none",
  },
  button: {
    justifyContent: "left",
    width: "100%",
    color: "white",
    backgroundColor: (props: { backgroundColor: string }) =>
      props.backgroundColor,
    opacity: 0.85,
    "&:hover": {
      backgroundColor: (props: { backgroundColor: string }) =>
        props.backgroundColor,
      opacity: 1,
    },
  },
}));

const AuthButton: React.FC<AuthButtonProps> = ({
  provider,
  icon,
  children,
  className,
  backgroundColor,
  ...rest
}) => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: "/" } };
  const classes = useStyles({ backgroundColor: backgroundColor });

  async function handleClick() {
    try {
      await app.auth().signInWithPopup(provider);
      history.replace(from);
    } catch (error) {
      if (
        error.email &&
        error.credential &&
        error.code === "auth/account-exists-with-different-credential"
      ) {
        const providers = await app
          .auth()
          .fetchSignInMethodsForEmail(error.email);

        if (providers.includes("google.com")) {
          const googleProvider = new firebase.auth.GoogleAuthProvider();
          googleProvider.setCustomParameters({ login_hint: error.email });
          const googleCredentials = await app
            .auth()
            .signInWithPopup(googleProvider);

          if (googleCredentials.user) {
            googleCredentials.user.linkWithCredential(error.credential);
            history.replace(from);
          }
        }
      }
    }
  }
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className={clsx(className, classes.button)}
      {...rest}
    >
      <FontAwesomeIcon className={classes.icon} icon={icon} />
      <Typography variant="body2" align="left" className={classes.title}>
        {children}
      </Typography>
    </Button>
  );
};

export default AuthButton;
