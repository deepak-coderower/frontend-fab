import PropTypes from 'prop-types';
import React from 'react';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import { Typography } from '@material-ui/core';

function ImagesViewItem(props) {
  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="subtitle2">
        {props.label}
      </Typography>
      <ImagesUploader readonly value={valueAsArray()} />
    </div>
  );
}

ImagesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default ImagesViewItem;
