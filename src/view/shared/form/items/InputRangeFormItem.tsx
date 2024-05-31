import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

function InputRangeFormItem(props) {
  const {
    label,
    name,
    hint,
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
    setValue,
    watch,
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const originalValue = watch(name);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const handleStartChanged = (value) => {
    setValue(name, [value, endValue()], {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange([value, endValue()]);
  };

  const handleEndChanged = (value) => {
    setValue(name, [startValue(), value], {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange([value, startValue()]);
  };

  const startValue = () => {
    if (!originalValue) {
      return null;
    }

    if (Array.isArray(!originalValue)) {
      return null;
    }

    if (!originalValue.length) {
      return null;
    }

    return originalValue[0];
  };

  const endValue = () => {
    if (!originalValue) {
      return null;
    }

    if (Array.isArray(!originalValue)) {
      return null;
    }

    if (originalValue.length < 2) {
      return null;
    }

    return originalValue[1];
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'baseline',
      }}
    >
      <TextField
        fullWidth
        label={`${label} ${i18n('common.start')}`}
        variant="outlined"
        size="small"
        margin="normal"
        type={props.type}
        id={`${name}Start`}
        name={`${name}Start`}
        onChange={(event) =>
          handleStartChanged(event.target.value)
        }
        value={startValue()}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        InputLabelProps={{
          shrink: true,
        }}
        error={Boolean(errorMessage)}
        helperText={errorMessage || hint}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
      />

      <div
        style={{
          flexShrink: 1,
          marginLeft: '8px',
          marginRight: '8px',
        }}
      >
        ~
      </div>

      <TextField
        type={props.type}
        label={`${label} ${i18n('common.end')}`}
        id={`${name}End`}
        name={`${name}End`}
        required={required}
        margin="normal"
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) =>
          handleEndChanged(event.target.value)
        }
        value={endValue()}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        InputLabelProps={{
          shrink: true,
        }}
        error={errorMessage}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
      />
    </div>
  );
}

InputRangeFormItem.defaultProps = {
  required: false,
  type: 'text',
};

InputRangeFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
};

export default InputRangeFormItem;
