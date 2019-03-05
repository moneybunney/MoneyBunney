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

import LoginFormField from "../Shared/LoginFormField";

const styles = (theme: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  loading: boolean;
  error: boolean;
  handleLogin: (email: string, password: string) => void;
  setError: (error: boolean) => void;
}

const LoginForm = (props: IProps) => {
  const { classes, loading, error, handleLogin, setError } = props;

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
  );
};

export default withStyles(styles)(LoginForm);
