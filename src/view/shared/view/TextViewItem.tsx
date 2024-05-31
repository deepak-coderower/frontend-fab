import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@material-ui/core';

function TextViewItem(props) {
  if (
    !props.value &&
    props.value !== 0 &&
    props.value !== false
  ) {
    return null;
  }

  const value = `${props.prefix ? `${props.prefix} ` : ''}${
    props.value
  }`;

  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="subtitle2">
        {props.label}
      </Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </div>
  );
}

TextViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  prefix: PropTypes.string,
};

export default TextViewItem;
