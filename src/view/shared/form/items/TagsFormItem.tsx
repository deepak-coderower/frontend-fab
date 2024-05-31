import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { i18n } from 'src/i18n';
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from 'src/view/shared/form/items/shared/reactSelectMaterialUi';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';

const useStyles = makeStyles(materialUiStyles as any);

function TagsFormItem(props) {
  const {
    label,
    name,
    hint,
    externalErrorMessage,
    required,
    placeholder,
    isClearable,
    notFoundContent,
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

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const originalValue = watch(name);

  const handleChange = (data) => {
    if (!data || !data.length) {
      setValue(name, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    const commaSplittedValues = data
      .map((item) => item.value)
      .join(',')
      .split(',');

    setValue(name, commaSplittedValues, {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange(commaSplittedValues);
  };

  const value = () => {
    if (!originalValue || !originalValue.length) {
      return [];
    }

    return originalValue.map((item) => ({
      value: item,
      label: item,
    }));
  };

  const controlStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      marginTop: '16px',
      marginBottom: '8px',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: Boolean(errorMessage)
        ? 'red'
        : undefined,
    }),
  };

  const classes = useStyles();

  return (
    <CreatableSelect
      value={value()}
      classes={classes}
      onChange={handleChange}
      onBlur={(event) => {
        props.onBlur && props.onBlur(event);
      }}
      inputId={name}
      TextFieldProps={{
        label,
        required,
        variant: 'outlined',
        fullWidth: true,
        error: Boolean(errorMessage),
        helperText: errorMessage || hint,
        InputLabelProps: {
          shrink: true,
        },
        size: 'small',
      }}
      components={materialUiComponents}
      placeholder={placeholder || ''}
      isClearable={isClearable}
      styles={controlStyles}
      isMulti
      formatCreateLabel={(inputValue) => inputValue}
      loadingMessage={() => i18n('autocomplete.loading')}
      noOptionsMessage={() => notFoundContent || ''}
    />
  );
}

TagsFormItem.defaultProps = {
  required: false,
  isClearable: true,
};

TagsFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  notFoundContent: PropTypes.string,
};

export default TagsFormItem;
