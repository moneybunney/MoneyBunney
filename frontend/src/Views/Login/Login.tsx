import {
  Avatar,
  LinearProgress,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import React from "react";
import useReactRouter from "use-react-router";

import { postLogin } from "../../Utilities/Api";
import LoginForm from "./LoginForm";

// @ts-ignore
import Logo from "./logo.png";

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  formContainer: {
    marginTop: theme.spacing.unit * 8
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit
  }
}));

function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const { history } = useReactRouter();
  const classes = useStyles();

  const onSubmit = (email: string, password: string) => {
    setLoading(true);

    setTimeout(() => {
      postLogin({ email, password })
        .then(() => {
          history.replace("/");
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }, 1500);
  };

  return (
    <main className={classes.main}>
      <div className={classes.formContainer}>
        {loading && <LinearProgress />}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} src={Logo} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm
            loading={loading}
            error={error}
            onSubmit={onSubmit}
            setError={setError}
          />
        </Paper>
      </div>
    </main>
  );
}

export default SignIn;
