import {
  Avatar,
  LinearProgress,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useReactRouter from "use-react-router";

import { postRegister } from "../../Utilities/Api";
import RegistrationForm from "./RegistrationForm";

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
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  }
}));

function Register() {
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const { history } = useReactRouter();
  const classes = useStyles();

  const onSubmit = (email: string, password: string) => {
    setEmailError(false);
    setLoading(true);

    setTimeout(() => {
      postRegister({ email, password })
        .then(() => {
          history.replace("/");
        })
        .catch(() => {
          setEmailError(true);
          setLoading(false);
        });
    }, 1500);
  };

  return (
    <main className={classes.main}>
      <div className={classes.formContainer}>
        {loading && <LinearProgress />}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <RegistrationForm
            loading={loading}
            emailError={emailError}
            onSubmit={onSubmit}
          />
        </Paper>
      </div>
    </main>
  );
}

export default Register;
