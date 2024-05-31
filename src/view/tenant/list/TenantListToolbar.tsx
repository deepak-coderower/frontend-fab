import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function TenantToolbar(props) {
  return (
    <ToolbarWrapper>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/tenant/new"
        startIcon={<AddIcon />}
        size="small"
      >
        {i18n('common.new')}
      </Button>
    </ToolbarWrapper>
  );
}

export default TenantToolbar;
