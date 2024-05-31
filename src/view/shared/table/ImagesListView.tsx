import PropTypes from 'prop-types';
import React from 'react';
import { Avatar } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

function ImagesListView(props) {
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

  if (
    !valueAsArray().length ||
    !valueAsArray()[0].downloadUrl
  ) {
    return (
      <Avatar>
        <PhotoCameraIcon />
      </Avatar>
    );
  }

  const src = valueAsArray()[0].downloadUrl;
  return <Avatar src={src} />;
}

ImagesListView.propTypes = {
  src: PropTypes.any,
  value: PropTypes.any,
};

export default ImagesListView;
