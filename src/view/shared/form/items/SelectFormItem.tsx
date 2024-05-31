import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { i18n } from 'src/i18n';
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from 'src/view/shared/form/items/shared/reactSelectMaterialUi';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

const useStyles = makeStyles(materialUiStyles as any);

function SelectFormItem(props) {
  const {
    label,
    name,
    hint,
    options,
    required,
    mode,
    placeholder,
    isClearable,
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

  const value = () => {
    const { mode } = props;
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (originalValue) {
      return originalValue.map((value) =>
        options.find((option) => option.value === value),
      );
    }

    return [];
  };

  const valueOne = () => {
    const { options } = props;

    if (originalValue != null) {
      return options.find(
        (option) => option.value === originalValue,
      );
    }

    return null;
  };

  const handleSelect = (data) => {
    const { mode } = props;
    if (mode === 'multiple') {
      return handleSelectMultiple(data);
    } else {
      return handleSelectOne(data);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setValue(name, [], {
        shouldValidate: true,
        shouldDirty: true,
      });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values
      .map((data) => (data ? data.value : data))
      .filter((value) => value != null);

    setValue(name, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (data) => {
    if (!data) {
      setValue(name, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    setValue(name, data.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange(data.value);
  };

  const classes = useStyles();

  const controlStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      marginTop: '16px',
      marginBottom: '8px',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: errorMessage ? 'red' : undefined,
    }),
  };

  return (
    <Select
      styles={controlStyles}
      classes={classes}
      value={value()}
      onChange={handleSelect}
      inputId={name}
      TextFieldProps={{
        label,
        required,
        variant: 'outlined',
        fullWidth: true,
        size: 'small',
        error: Boolean(errorMessage),
        helperText: errorMessage || hint,
        InputLabelProps: {
          shrink: true,
        },
      }}
      components={materialUiComponents}
      onBlur={(event) => {
        props.onBlur && props.onBlur(event);
      }}
      options={options}
      isMulti={mode === 'multiple'}
      placeholder={placeholder || ''}
      isClearable={isClearable}
      loadingMessage={() => i18n('autocomplete.loading')}
      noOptionsMessage={() =>
        i18n('autocomplete.noOptions')
      }
    />
  );
}

SelectFormItem.defaultProps = {
  required: false,
  isClearable: true,
};

SelectFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SelectFormItem;
