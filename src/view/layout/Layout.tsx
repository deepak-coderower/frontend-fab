import React from 'react';
import Header from 'src/view/layout/Header';
import Menu from 'src/view/layout/Menu';
import { makeStyles } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'rgba(0, 0, 0, 0.65)',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    fontFamily: `'Roboto', sans-serif`,

    '& h1, h2, h3, h4, h5, h6': {
      color: 'rgba(0, 0, 0, 0.85)',
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
    overflowX: 'hidden',
  },

  toolbar: theme.mixins.toolbar,
}));

function Layout(props) {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <div className={classes.root}>
      <Header />
      <Menu url={match.url} />
      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
