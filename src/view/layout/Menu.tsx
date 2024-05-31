import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import menus from 'src/view/menus';
import clsx from 'clsx';
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  toolbar: theme.mixins.toolbar,
  listItemIcon: {
    minWidth: '48px',
  },
  listItemDisabled: {
    opacity: 0.5,
  },
}));

function Menu(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );
  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  useLayoutEffect(() => {
    const toggleMenuOnResize = () => {
      (window as any).innerWidth < 576
        ? dispatch(actions.doHideMenu())
        : dispatch(actions.doShowMenu());
    };

    toggleMenuOnResize();

    (window as any).addEventListener(
      'resize',
      toggleMenuOnResize,
    );

    return () => {
      (window as any).removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
  }, [dispatch]);

  const selectedKeys = () => {
    const url = props.url;

    const match = menus.find((option) => {
      if (option.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }

    return [];
  };

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  const CustomRouterLink = (props) => (
    <div
      style={{
        flexGrow: 1,
      }}
    >
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
        {...props}
      />
    </div>
  );

  if (!menuVisible) {
    return null;
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}></div>
      <List>
        {menus
          .filter((menu) => match(menu.permissionRequired))
          .map((menu) => (
            <CustomRouterLink
              key={menu.path}
              to={menu.path}
            >
              <ListItem button>
                <ListItemIcon
                  className={clsx({
                    [classes.listItemIcon]: true,
                    [classes.active]:
                      selectedKeys().includes(menu.path),
                  })}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  className={clsx({
                    [classes.active]:
                      selectedKeys().includes(menu.path),
                  })}
                >
                  {menu.label}
                </ListItemText>
              </ListItem>
            </CustomRouterLink>
          ))}

        {menus
          .filter((menu) =>
            lockedForCurrentPlan(menu.permissionRequired),
          )
          .map((menu) => (
            <ListItem
              key={menu.path}
              className={classes.listItemDisabled}
            >
              <ListItemIcon
                className={classes.listItemIcon}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText>{menu.label}</ListItemText>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
}

export default Menu;
