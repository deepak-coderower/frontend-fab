import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

export function InputFormItem(props) {
  const {
    label,
    name,
    hint,
    type,
    placeholder,
    autoFocus,
    autoComplete,
    required,
    externalErrorMessage,
    disabled,
    endAdornment,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <TextField
      id={name}
      name={name}
      type={type}
      label={label}
      required={required}
      inputRef={register}
      onChange={(event) => {
        props.onChange &&
          props.onChange(event.target.value);
      }}
      onBlur={(event) => {
        props.onBlur && props.onBlur(event);
      }}
      margin="normal"
      fullWidth
      variant="outlined"
      size="small"
      placeholder={placeholder || undefined}
      autoFocus={autoFocus || undefined}
      autoComplete={autoComplete || undefined}
      InputLabelProps={{
        shrink: true,
      }}
      error={Boolean(errorMessage)}
      helperText={errorMessage || hint}
      InputProps={{ endAdornment }}
      inputProps={{
        name,
      }}
      disabled={disabled}
    />
  );
}

InputFormItem.defaultProps = {
  type: 'text',
  required: false,
};

InputFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  onChange: PropTypes.func,
  endAdornment: PropTypes.any,
};

export default InputFormItem;
