import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import ImageModal from 'src/view/shared/modals/ImageModal';
import { Button, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },

  card: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: '100px',
    '&:hover div': {
      display: 'block',
    },
  },

  image: {
    borderRadius: '5px',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  },

  imageButtons: {
    display: 'none',
    position: 'relative',
    bottom: '3.1rem',
    width: '100px',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },

  imageButtonIcon: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
  },
}));

function ImagesUploader(props) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const input = useRef<any>();
  const classes = useStyles();

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.downloadUrl,
    }));
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const handleChange = async (event) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      FileUploader.validate(file, {
        storage: props.storage,
        image: true,
      });

      setLoading(true);

      file = await FileUploader.upload(file, {
        storage: props.storage,
        image: true,
      });

      input.current.value = '';

      setLoading(false);
      props.onChange([...value(), file]);
    } catch (error) {
      input.current.value = '';
      console.error(error);
      setLoading(false);
      Errors.showMessage(error);
    }
  };

  const doPreviewImage = (image) => {
    setImage({
      src: image.downloadUrl,
      alt: image.name,
    });
  };

  const doCloseImageModal = () => {
    setImage(null);
  };

  const { max, readonly } = props;

  const uploadButton = (
    <>
      <Button
        component="label"
        disabled={loading}
        startIcon={<AddIcon />}
        variant="outlined"
        size="small"
        className={classes.uploadButton}
        onClick={() => input.current.click()}
      >
        {i18n('fileUploader.upload')}
      </Button>
      <input
        style={{ display: 'none' }}
        disabled={loading || readonly}
        accept="image/*"
        type="file"
        onChange={handleChange}
        ref={input}
      />
    </>
  );

  return (
    <div>
      {readonly || (max && fileList().length >= max)
        ? null
        : uploadButton}

      {value() && value().length ? (
        <Box
          style={{ marginTop: '8px' }}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          {value().map((item) => {
            return (
              <div className={classes.card} key={item.id}>
                <img
                  alt={item.name}
                  src={item.downloadUrl}
                  className={classes.image}
                />

                <div className={classes.imageButtons}>
                  <IconButton
                    onClick={() => doPreviewImage(item)}
                  >
                    <SearchIcon
                      className={classes.imageButtonIcon}
                    />
                  </IconButton>

                  {!readonly && (
                    <IconButton
                      onClick={() => handleRemove(item.id)}
                    >
                      <CloseIcon
                        className={classes.imageButtonIcon}
                      />
                    </IconButton>
                  )}
                </div>
              </div>
            );
          })}
        </Box>
      ) : null}

      {image && (
        <ImageModal
          src={image.src}
          alt={image.alt}
          onClose={() => doCloseImageModal()}
        />
      )}
    </div>
  );
}

ImagesUploader.propTypes = {
  readonly: PropTypes.bool,
  max: PropTypes.number,
  storage: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default ImagesUploader;
