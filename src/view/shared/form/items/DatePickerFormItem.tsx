import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { getLanguage } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

export function DatePickerFormItem(props) {
  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    autoComplete,
    externalErrorMessage,
    required,
    showTime,
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

  const DateTimePickerComponent = showTime
    ? DateTimePicker
    : DatePicker;

  const format = showTime
    ? 'yyyy-MM-dd HH:mm'
    : 'yyyy-MM-dd';

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={getLanguage().dateFns}
    >
      <DateTimePickerComponent
        format={format}
        id={name}
        name={name}
        label={label}
        required={required}
        margin="normal"
        fullWidth
        inputVariant="outlined"
        size="small"
        onChange={(value) => {
          setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
          });
          props.onChange && props.onChange(value);
        }}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        value={watch(name)}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        InputLabelProps={{
          shrink: true,
        }}
        error={Boolean(errorMessage)}
        helperText={errorMessage || hint}
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
}

DatePickerFormItem.defaultProps = {
  required: false,
};

DatePickerFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  showTime: PropTypes.bool,
};

export default DatePickerFormItem;
