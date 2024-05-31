import { Button } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import { i18n } from 'src/i18n';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function SettingsFormToolbar(props) {
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );

  return (
    <ToolbarWrapper>
      {hasPermissionToAuditLogs && (
        <Button
          component={Link}
          to="/audit-logs?entityNames=settings"
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </Button>
      )}
    </ToolbarWrapper>
  );
}

export default SettingsFormToolbar;
