import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";

import { Route } from "react-router-dom";

import LoginFormField from "../Shared/LoginFormField";

const styles = (theme: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    buttonContainer: {
      marginTop: theme.spacing.unit * 3,
      display: "flex",
      justifyContent: "space-between",
    },
  });

interface IProps extends WithStyles<typeof styles> {
  loading: boolean;
  error: boolean;
  handleLogin: (email: string, password: string) => void;
  setError: (error: boolean) => void;
}

const LoginForm = ({
  classes,
  loading,
  error,
  handleLogin,
  setError,
}: IProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <LoginFormField
        error={error}
        disabled={loading}
        fieldType="text"
        name="email"
        text="Email Address"
        onChange={onEmailChange}
        value={email}
        autoFocus={true}
      />
      <LoginFormField
        error={error}
        disabled={loading}
        fieldType="password"
        name="password"
        text="Password"
        onChange={onPasswordChange}
        value={password}
        errorText="Wrong password"
      />
      <FormControlLabel
        control={
          <Checkbox value="remember" color="primary" disabled={loading} />
        }
        label="Remember me"
      />
      <div className={classes.buttonContainer}>
        <Route
          render={({ history }) => (
            <Button
              color="primary"
              disabled={loading}
              onClick={() => {
                history.replace("/register");
              }}
            >
              Register
            </Button>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default withStyles(styles)(LoginForm);
