import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import React from "react";

type FieldType = "text" | "password";

interface IProps {
  error: boolean;
  disabled: boolean;
  fieldType: FieldType;
  name: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus?: boolean;
  onBlur?: () => void;
  errorText?: string;
}

const LoginFormField = (props: IProps) => {
  const { error, disabled, fieldType, name, text, onChange, value, autoFocus, onBlur, errorText } = props;

  const autoComplete = fieldType === "password" ? "current-password" : "email";

  return (
    <FormControl
      margin="normal"
      required={true}
      fullWidth={true}
      disabled={disabled}
      error={error}
    >
      <InputLabel htmlFor={name}>{text}</InputLabel>
      <Input
        name={name}
        type={fieldType}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
      {errorText && error && (
        <FormHelperText>{errorText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default LoginFormField;
