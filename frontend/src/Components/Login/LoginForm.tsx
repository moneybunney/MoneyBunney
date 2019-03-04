import {
  Button,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
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
  error: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = (props: IProps) => {
  const { classes, loading, error, handleSubmit,
          username, onUsernameChange, password, onPasswordChange } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <FormControl
        margin="normal"
        required={true}
        fullWidth={true}
        disabled={loading}
        error={error}
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
      </FormControl>
      <FormControl
        margin="normal"
        required={true}
        fullWidth={true}
        disabled={loading}
        error={error}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onPasswordChange}
          value={password}
        />
        {error && (
          <FormHelperText id="component-error-text">
            Wrong password
          </FormHelperText>
        )}
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
  );
};

export default withStyles(styles)(LoginForm);
