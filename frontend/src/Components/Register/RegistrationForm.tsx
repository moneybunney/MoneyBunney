import {
  Button,
  createStyles,
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
  emailError: boolean;
  handleRegistration: (email: string, password: string) => void;
}

const RegistrationForm = ({
  classes,
  loading,
  emailError,
  handleRegistration,
}: IProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordsMatch(true);
    setPassword(event.target.value);
  };

  const onPasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordsMatch(true);
    setPasswordConfirmation(event.target.value);
  };

  const checkIfPasswordsMatch = () => {
    if (
      password !== "" &&
      passwordConfirmation !== "" &&
      passwordConfirmation !== password
    ) {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordConfirmation === password) {
      handleRegistration(email, password);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <LoginFormField
        error={emailError}
        disabled={loading}
        fieldType="text"
        name="email"
        text="Email Address"
        onChange={onEmailChange}
        value={email}
        autoFocus={true}
        errorText="This email is already in use!"
      />
      <LoginFormField
        error={!passwordsMatch}
        disabled={loading}
        fieldType="password"
        name="password"
        text="Password"
        onChange={onPasswordChange}
        value={password}
        onBlur={checkIfPasswordsMatch}
      />
      <LoginFormField
        error={!passwordsMatch}
        disabled={loading}
        fieldType="password"
        name="passwordConfirmation"
        text="Confirm Password"
        onChange={onPasswordConfirmationChange}
        value={passwordConfirmation}
        onBlur={checkIfPasswordsMatch}
        errorText="Passwords do not match"
      />
      <div className={classes.buttonContainer}>
        <Route
          render={({ history }) => (
            <Button
              color="primary"
              disabled={loading}
              onClick={() => {
                history.replace("/login");
              }}
            >
              Log in instead
            </Button>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !passwordsMatch}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default withStyles(styles)(RegistrationForm);
