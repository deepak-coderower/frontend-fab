import { Typography } from '@material-ui/core';
import MaterialLink from '@material-ui/core/Link';
import selectors from 'src/modules/user/userSelectors';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserViewItem(props) {
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

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

  const label = (record) => {
    if (!record) {
      return null;
    }

    if (!record.fullName) {
      return record.email;
    }

    return `${record.fullName} <${record.email}>`;
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
          <MaterialLink
            component={Link}
            to={`/user/${record.id}`}
          >
            {label(record)}
          </MaterialLink>
        </div>
      );
    }

    return <div key={record.id}>{label(record)}</div>;
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography variant="subtitle2">
        {props.label}
      </Typography>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </div>
  );
}

UserViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default UserViewItem;
