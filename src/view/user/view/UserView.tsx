import { Typography } from '@material-ui/core';
import React from 'react';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserStatusView from 'src/view/user/view/UserStatusView';
import { i18n } from 'src/i18n';

function UserView(props) {
  const { user, loading } = props;

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <div>
      <TextViewItem
        label={i18n('user.fields.email')}
        value={user.email}
      />
      <TextViewItem
        label={i18n('user.fields.firstName')}
        value={user.firstName}
      />
      <TextViewItem
        label={i18n('user.fields.lastName')}
        value={user.lastName}
      />
      <TextViewItem
        label={i18n('user.fields.phoneNumber')}
        value={user.phoneNumber}
        prefix={'+'}
      />

      <ImagesViewItem
        label={i18n('user.fields.avatars')}
        value={user.avatars}
      />

      <CustomViewItem
        label={i18n('user.fields.roles')}
        value={user.roles}
        render={(value) =>
          value.map((roleId) => (
            <div key={roleId}>
              <Typography variant="subtitle1">
                {Roles.labelOf(roleId)}
              </Typography>
            </div>
          ))
        }
      />

      <CustomViewItem
        label={i18n('user.fields.status')}
        value={user.status}
        render={(value) => <UserStatusView value={value} />}
      />
    </div>
  );
}

export default UserView;
