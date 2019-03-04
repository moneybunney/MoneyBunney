import {
  Button,
  createStyles,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React from "react";

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
      <FormControl
        margin="normal"
        required={true}
        fullWidth={true}
        disabled={loading}
        error={emailError}
      >
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          autoFocus={true}
          onChange={onUsernameChange}
          value={username}
        />
        {emailError && (
          <FormHelperText id="component-error-text">
            This email is already in use!
          </FormHelperText>
        )}
      </FormControl>
      <FormControl
        margin="normal"
        required={true}
        fullWidth={true}
        disabled={loading}
        error={!passwordsMatch}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onPasswordChange}
          value={password}
          onBlur={checkIfPasswordsMatch}
        />
      </FormControl>
      <FormControl
        margin="normal"
        required={true}
        fullWidth={true}
        disabled={loading}
        error={!passwordsMatch}
      >
        <InputLabel htmlFor="password">Confirm password</InputLabel>
        <Input
          name="password"
          type="password"
          id="confirm_password"
          autoComplete="current-password"
          onChange={onPasswordConfirmationChange}
          value={passwordConfirmation}
          onBlur={checkIfPasswordsMatch}
        />
        {!passwordsMatch && (
          <FormHelperText id="component-error-text">
            Passwords do not match
          </FormHelperText>
        )}
      </FormControl>
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
