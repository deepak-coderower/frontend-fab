import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import React, { useState } from 'react';
import { getLanguage, getLanguages } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
  },
  text: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    color: theme.palette.getContrastText(
      theme.palette.primary.main,
    ),
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

function I18nSelect(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.button}
        onClick={handleClick}
      >
        <TranslateIcon />
        <span className={classes.text}>
          {getLanguage().label}
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {getLanguages().map((language) => (
          <MenuItem
            key={language.id}
            onClick={(event) =>
              doChangeLanguage(language.id)
            }
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default I18nSelect;
