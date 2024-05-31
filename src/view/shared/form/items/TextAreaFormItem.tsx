import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import { TextField } from '@material-ui/core';

function TextAreaFormItem(props) {
  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    autoComplete,
    externalErrorMessage,
    required,
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
      label={label}
      required={required}
      margin="normal"
      fullWidth
      variant="outlined"
      size="small"
      inputRef={register}
      placeholder={placeholder || undefined}
      autoFocus={autoFocus || undefined}
      autoComplete={autoComplete || undefined}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => {
        props.onChange &&
          props.onChange(event.target.value);
      }}
      onBlur={(event) => {
        props.onBlur && props.onBlur(event);
      }}
      multiline
      rows={4}
      error={Boolean(errorMessage)}
      helperText={errorMessage || hint}
    />
  );
}

TextAreaFormItem.defaultProps = {
  type: 'text',
  required: false,
};

TextAreaFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default TextAreaFormItem;
