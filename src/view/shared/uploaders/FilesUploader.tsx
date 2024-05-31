import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'src/modules/shared/fileUpload/fileUploader';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import AddIcon from '@material-ui/icons/Add';
import LinkIcon from '@material-ui/icons/Link';
import ClearIcon from '@material-ui/icons/Clear';
import {
  Button,
  Link as MaterialLink,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },

  linkIcon: {
    marginRight: theme.spacing(1),
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearLink: {
    marginLeft: theme.spacing(1),
  },
}));

function FilesUploader(props) {
  const [loading, setLoading] = useState(false);
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
        formats: props.formats,
      });

      setLoading(true);

      file = await FileUploader.upload(file, {
        storage: props.storage,
        formats: props.formats,
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

  const formats = () => {
    const { schema } = props;

    if (schema && schema.formats) {
      return schema.formats
        .map((format) => `.${format}`)
        .join(',');
    }

    return undefined;
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
        accept={formats()}
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
        <div>
          {value().map((item) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                key={item.id}
              >
                <MaterialLink
                  className={classes.link}
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <LinkIcon
                    className={classes.linkIcon}
                    color="primary"
                  />

                  {item.name}
                </MaterialLink>

                {!readonly && (
                  <MaterialLink
                    component="button"
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    className={classes.clearLink}
                  >
                    <ClearIcon fontSize="small" />
                  </MaterialLink>
                )}
              </Box>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

FilesUploader.propTypes = {
  readonly: PropTypes.bool,
  max: PropTypes.number,
  formats: PropTypes.arrayOf(PropTypes.string),
  storage: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FilesUploader;
