import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@material-ui/core';

function CustomViewItem(props) {
  const isBlank =
    (!props.value &&
      props.value !== 0 &&
      props.value !== false) ||
    (Array.isArray(props.value) && !props.value.length);

  if (isBlank) {
    return null;
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="subtitle2">
        {props.label}
      </Typography>
      {props.render(props.value)}
    </div>
  );
}

CustomViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  render: PropTypes.func,
};

export default CustomViewItem;
