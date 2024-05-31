import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { i18n } from 'src/i18n';
import FormErrors from 'src/view/shared/form/formErrors';
import DateFnsUtils from '@date-io/date-fns';
import { getLanguage } from 'src/i18n';

function DatePickerRangeFormItem(props) {
  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    autoComplete,
    required,
    showTime,
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
    props.onChange && props.onChange([startValue(), value]);
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

    return originalValue[0] || null;
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

    return originalValue[1] || null;
  };

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
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'baseline',
        }}
      >
        <DateTimePickerComponent
          id={`${name}Start`}
          name={`${name}Start`}
          onChange={(value) => handleStartChanged(value)}
          value={startValue()}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          format={format}
          label={`${label} ${i18n('common.start')}`}
          required={required}
          margin="normal"
          fullWidth
          inputVariant="outlined"
          size="small"
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          error={Boolean(errorMessage)}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={errorMessage || hint}
          autoOk
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

        <DateTimePickerComponent
          id={`${name}End`}
          name={`${name}End`}
          onChange={(value) => handleEndChanged(value)}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          value={endValue()}
          format={format}
          label={`${label} ${i18n('common.end')}`}
          required={required}
          margin="normal"
          fullWidth
          inputVariant="outlined"
          size="small"
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          error={Boolean(errorMessage)}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={errorMessage || hint}
          autoOk
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

DatePickerRangeFormItem.defaultProps = {
  required: false,
};

DatePickerRangeFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  showTime: PropTypes.bool,
};

export default DatePickerRangeFormItem;
