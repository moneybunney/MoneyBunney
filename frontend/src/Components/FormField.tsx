import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";
import React from "react";

type FieldType = "text" | "password" | "number";
type AutoCompleteType = "email" | "current-password" | "new-password";

interface IProps {
  error?: boolean;
  disabled?: boolean;
  fieldType: FieldType;
  name: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus?: boolean;
  onBlur?: () => void;
  errorText?: string;
  autoComplete?: AutoCompleteType;
  startAdornment?: React.ReactNode;
}

const FormField = ({
  error,
  disabled,
  fieldType,
  name,
  text,
  onChange,
  value,
  autoFocus,
  onBlur,
  errorText,
  autoComplete,
  startAdornment
}: IProps) => {
  return (
    <FormControl
      margin="normal"
      required={true}
      fullWidth={true}
      disabled={disabled}
      error={error}
    >
      <InputLabel error={error} htmlFor={name}>
        {text}
      </InputLabel>
      <Input
        name={name}
        type={fieldType}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        autoFocus={autoFocus}
        startAdornment={startAdornment}
      />
      {errorText && error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
