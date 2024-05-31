import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/view/userViewSelectors';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';

function UserViewToolbar(props) {
  const { match } = props;

  const user = useSelector(selectors.selectUser);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <Button
          component={Link}
          to={`/user/${id}/edit`}
          variant="contained"
          color="primary"
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </Button>
      )}

      {hasPermissionToAuditLogs && (
        <Button
          component={Link}
          to={`/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </Button>
      )}

      {user && user.email && hasPermissionToAuditLogs && (
        <Button
          component={Link}
          type="button"
          to={`/audit-logs?createdByEmail=${encodeURIComponent(
            user.email,
          )}`}
          startIcon={<VisibilityIcon />}
          size="small"
        >
          {i18n('user.view.activity')}
        </Button>
      )}
    </ToolbarWrapper>
  );
}

export default UserViewToolbar;
