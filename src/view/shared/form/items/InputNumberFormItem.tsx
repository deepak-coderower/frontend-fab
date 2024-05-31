import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

export function InputNumberFormItem(props) {
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
      onChange={(event) => {
        props.onChange &&
          props.onChange(event.target.value);
      }}
      onBlur={(event) => {
        props.onBlur && props.onBlur(event);
      }}
      inputRef={register}
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
    />
  );
}

InputNumberFormItem.defaultProps = {
  type: 'number',
  required: false,
};

InputNumberFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default InputNumberFormItem;
