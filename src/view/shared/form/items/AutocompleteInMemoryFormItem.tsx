import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FormErrors from 'src/view/shared/form/formErrors';
import Select from 'react-select';
import { i18n } from 'src/i18n';
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from 'src/view/shared/form/items/shared/reactSelectMaterialUi';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormContext } from 'react-hook-form';
import _uniqBy from 'lodash/uniqBy';

const useStyles = makeStyles(materialUiStyles as any);

function AutocompleteInMemoryFormItem(props) {
  const {
    errors,
    watch,
    setValue,
    register,
    formState: { touched, isSubmitted },
  } = useFormContext();

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    externalErrorMessage,
    mode,
    required,
    isClearable,
    mapper,
    fetchFn,
  } = props;

  const originalValue = watch(name);

  const [fullDataSource, setFullDataSource] = useState<
    Array<any>
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);

      try {
        let fullDataSource = await fetchFn();

        fullDataSource = fullDataSource.map((data) =>
          mapper.toAutocomplete(data),
        );

        setFullDataSource(fullDataSource);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFullDataSource([]);
        setLoading(false);
        return [];
      }
    };

    fetchAllResults().then(() => {});
    // eslint-disable-next-line
  }, []);

  const prioritizeFromDataSource = (selected) => {
    return (
      (fullDataSource || []).find(
        (item) => item.value === selected.value,
      ) || selected
    );
  };

  const value = () => {
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (originalValue) {
      return originalValue.map((value) =>
        prioritizeFromDataSource(
          mapper.toAutocomplete(value),
        ),
      );
    }

    return [];
  };

  const valueOne = () => {
    if (originalValue) {
      return prioritizeFromDataSource(
        mapper.toAutocomplete(originalValue),
      );
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
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

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setValue(name, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setValue(name, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setValue(name, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const options = () => {
    const { mode } = props;

    if (!fullDataSource) {
      return [];
    }

    // Includes the selected value on the options
    if (value()) {
      if (mode === 'multiple') {
        return _uniqBy(
          [...fullDataSource, ...value()],
          'value',
        );
      } else {
        return _uniqBy(
          [...fullDataSource, value()],
          'value',
        );
      }
    }

    return fullDataSource;
  };

  const hintOrLoading = loading
    ? i18n('autocomplete.loading')
    : hint;

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select
        styles={controlStyles}
        classes={classes}
        inputId={name}
        TextFieldProps={{
          label,
          required,
          variant: 'outlined',
          fullWidth: true,
          error: Boolean(errorMessage),
          helperText: errorMessage || hintOrLoading,
          size: 'small',
          InputLabelProps: {
            shrink: true,
          },
        }}
        components={materialUiComponents}
        isMulti={mode === 'multiple' ? true : false}
        placeholder={placeholder || ''}
        autoFocus={autoFocus || undefined}
        onChange={handleSelect}
        onBlur={() => props.onBlur && props.onBlur(null)}
        value={value()}
        isClearable={isClearable}
        options={options()}
        loadingMessage={() => i18n('autocomplete.loading')}
        noOptionsMessage={() =>
          i18n('autocomplete.noOptions')
        }
      />

      {props.showCreate && props.hasPermissionToCreate ? (
        <IconButton
          style={{
            marginLeft: '16px',
            marginTop: '16px',
            marginBottom: '8px',
            flexShrink: 0,
          }}
          color="secondary"
          onClick={props.onOpenModal}
        >
          <AddIcon />
        </IconButton>
      ) : null}
    </div>
  );
}

AutocompleteInMemoryFormItem.defaultProps = {
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteInMemoryFormItem.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,
};

export default AutocompleteInMemoryFormItem;
