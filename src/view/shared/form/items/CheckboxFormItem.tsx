import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

export function CheckboxFormItem(props) {
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
      <FormLabel component="legend">{label}</FormLabel>
      <div>
        <Checkbox
          id={name}
          name={name}
          checked={watch(name) || false}
          onChange={(e) => {
            setValue(name, Boolean(e.target.checked), {
              shouldValidate: true,
              shouldDirty: true,
            });
            props.onChange &&
              props.onChange(e.target.checked);
          }}
          onBlur={() => props.onBlur && props.onBlur(null)}
          color="secondary"
          size="small"
        ></Checkbox>
      </div>
      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CheckboxFormItem.defaultProps = {};

CheckboxFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default CheckboxFormItem;
