import {
  Avatar,
  createStyles,
  CssBaseline,
  LinearProgress,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { postLogin } from "../../Utilities/Api";
import LoginForm from "./LoginForm";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    formContainer: {
      marginTop: theme.spacing.unit * 8,
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
  });

interface IProps extends WithStyles<typeof styles> {}

function SignIn({ classes, history }: IProps & RouteComponentProps<any>) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit = (email: string, password: string) => {
    setLoading(true);

    setTimeout(() => {
      postLogin({ email, password })
        .then(response => {
          history.replace("/");
        })
        .catch(error => {
          setError(true);
        })
        .then(() => {
          setLoading(false);
        });
    }, 1500);
  };

  return (
    <main className={classes.main}>
      <CssBaseline />

      <div className={classes.formContainer}>
        {loading && <LinearProgress />}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
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

export default withRouter(withStyles(styles)(SignIn));
