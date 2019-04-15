import { Button, Checkbox, FormControlLabel, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import useReactRouter from "use-react-router";

import FormField from "../../Components/FormField";
import { RegisterLocation } from "../../routes";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  buttonContainer: {
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    justifyContent: "space-between"
  }
}));

interface IProps {
  loading: boolean;
  error: boolean;
  onSubmit: (email: string, password: string) => void;
  setError: (error: boolean) => void;
}

const LoginForm = ({ loading, error, onSubmit, setError }: IProps) => {
  const classes = useStyles();

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
    onSubmit(email, password);
  };

  const { history } = useReactRouter();
  const registerButtonOnClick = () => {
    history.replace(RegisterLocation);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormField
        error={error}
        disabled={loading}
        fieldType="text"
        name="email"
        text="Email Address"
        onChange={onEmailChange}
        value={email}
        autoFocus={true}
        autoComplete="email"
      />
      <FormField
        error={error}
        disabled={loading}
        fieldType="password"
        name="password"
        text="Password"
        onChange={onPasswordChange}
        value={password}
        errorText="Wrong password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={
          <Checkbox value="remember" color="primary" disabled={loading} />
        }
        label="Remember me"
      />
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          disabled={loading}
          onClick={registerButtonOnClick}
        >
          Register
        </Button>
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

export default LoginForm;
