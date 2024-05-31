import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

function SwitchFormItem(props) {
  const {
    label,
    name,
    hint,
    required,
    externalErrorMessage,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const formHelperText = errorMessage || hint;

  return (
    <FormControl
      required={required}
      fullWidth
      error={Boolean(errorMessage)}
      component="fieldset"
      size="small"
    >
      <FormLabel
        component="legend"
        style={{ marginBottom: '8px' }}
      >
        {label}
      </FormLabel>
      <Switch
        id={name}
        name={name}
        checked={watch(name) || false}
        onChange={(e) => {
          setValue(name, e.target.checked, {
            shouldValidate: true,
            shouldDirty: true,
          });
          props.onChange &&
            props.onChange(e.target.checked);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        color="secondary"
        size="small"
      ></Switch>
      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

SwitchFormItem.defaultProps = {};

SwitchFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default SwitchFormItem;
