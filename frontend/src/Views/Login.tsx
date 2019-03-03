import {
  Avatar, Button, Checkbox, CssBaseline, FormControl, FormControlLabel,
  Input, InputLabel, Paper, Typography, CircularProgress, FormHelperText
} from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";

const styles = (theme: Theme) => createStyles({
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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

interface IProps extends WithStyles<typeof styles> {}

function SignIn(props: IProps) {
  const { classes } = props;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if(username === 'username' && password === 'password'){
        alert('Login success');
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
          {loading &&
            <CircularProgress className={classes.progress} />
          }
        </Typography>


        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required={true} fullWidth={true} disabled={loading} error={error}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus={true} onChange={onUsernameChange} value={username} />
          </FormControl>
          <FormControl margin="normal" required={true} fullWidth={true} disabled={loading} error={error}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={onPasswordChange} value={password} />
            {error &&
              <FormHelperText id="component-error-text">Wrong password</FormHelperText>
            }
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(SignIn);
