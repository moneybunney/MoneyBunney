import {
  Button,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";

import LoginFormField from "../Login/LoginFormField";

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
  emailError: boolean;
  handleRegistration: (email: string, password: string) => void;
}

const RegistrationForm = (props: IProps) => {
  const { classes, loading, emailError, handleRegistration } = props;

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
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
      handleRegistration(username, password);
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
        onChange={onUsernameChange}
        value={username}
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
      <Button
        type="submit"
        fullWidth={true}
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={loading || !passwordsMatch}
      >
        Register
      </Button>
    </form>
  );
};

export default withStyles(styles)(RegistrationForm);
