import { Box, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { i18n } from 'src/i18n';
import destroyActions from 'src/modules/tenant/destroy/tenantDestroyActions';
import destroySelectors from 'src/modules/tenant/destroy/tenantDestroySelectors';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import actions from 'src/modules/tenant/list/tenantListActions';
import selectors from 'src/modules/tenant/list/tenantListSelectors';
import tenantSelectors from 'src/modules/tenant/tenantSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import authActions from 'src/modules/auth/authActions';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import ColoredChip from 'src/view/shared/ColoredChip';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Plans from 'src/security/plans';
import config from 'src/config';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';

function TenantListTable() {
  const dispatch = useDispatch();

  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);

  const [
    invitationTokenToDeclineInvitation,
    setInvitationTokenToDeclineInvitation,
  ] = useState(null);

  const listLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const invitationLoading = useSelector(
    invitationSelectors.selectLoading,
  );

  const loading =
    listLoading || destroyLoading || invitationLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    tenantSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    tenantSelectors.selectPermissionToDestroy,
  );
  const invitationToken = useSelector(
    tenantSelectors.selectInvitationToken,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doSelectTenant = (tenant) => {
    dispatch(authActions.doSelectTenant(tenant));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(destroyActions.doDestroy(id));
  };

  const doDeclineInvitation = (token) => {
    setInvitationTokenToDeclineInvitation(null);
    dispatch(invitationActions.doDecline(token));
  };

  const doAcceptInvitation = (token) => {
    dispatch(invitationActions.doAccept(token));
  };

  return (
    <>
      <Box
        style={{
          display: 'block',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Table
          style={{
            borderRadius: '5px',
            border: '1px solid rgb(224, 224, 224)',
            borderCollapse: 'initial',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCellCustom
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'name'}
                label={i18n('tenant.fields.name')}
              />
              {tenantSubdomain.isEnabled && (
                <TableCellCustom
                  label={i18n('tenant.fields.url')}
                />
              )}
              {config.isPlanEnabled && (
                <TableCellCustom
                  label={i18n('tenant.fields.plan')}
                />
              )}
              <TableCellCustom size="md" />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={100}>
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <TableCell colSpan={100}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {i18n('table.noData')}
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.name}
                    {Boolean(invitationToken(row)) && (
                      <ColoredChip
                        label={i18n(
                          'tenant.invitation.invited',
                        )}
                        color="yellow"
                        style={{ marginLeft: '8px' }}
                      />
                    )}
                  </TableCell>
                  {tenantSubdomain.isEnabled && (
                    <TableCell>{`${row.url}.${config.frontendUrl.host}`}</TableCell>
                  )}
                  {config.isPlanEnabled && (
                    <TableCell>
                      <ColoredChip
                        label={i18n(
                          `plan.${row.plan}.label`,
                        )}
                        color={
                          row.plan === Plans.values.free
                            ? ''
                            : 'yellow'
                        }
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    {Boolean(invitationToken(row)) ? (
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Tooltip
                          title={i18n(
                            'tenant.invitation.accept',
                          )}
                        >
                          <IconButton
                            style={{ color: green[500] }}
                            onClick={() =>
                              doAcceptInvitation(
                                invitationToken(row),
                              )
                            }
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          title={i18n(
                            'tenant.invitation.decline',
                          )}
                        >
                          <IconButton
                            style={{ color: red[500] }}
                            onClick={() =>
                              setInvitationTokenToDeclineInvitation(
                                invitationToken(row),
                              )
                            }
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                      >
                        {currentTenant.id !== row.id && (
                          <Tooltip
                            title={i18n('tenant.select')}
                          >
                            <Button
                              style={{ marginRight: '8px' }}
                              color="primary"
                              variant="contained"
                              onClick={() =>
                                doSelectTenant(row)
                              }
                              size="small"
                            >
                              <ExitToAppIcon />
                            </Button>
                          </Tooltip>
                        )}
                        {hasPermissionToEdit(row) && (
                          <Tooltip
                            title={i18n('common.edit')}
                          >
                            <IconButton
                              color="primary"
                              component={Link}
                              to={`/tenant/${row.id}/edit`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {hasPermissionToDestroy(row) && (
                          <Tooltip
                            title={i18n('common.destroy')}
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                setRecordIdToDestroy(row.id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <Pagination
        onChange={doChangePagination}
        pagination={pagination}
      />

      {invitationTokenToDeclineInvitation && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doDeclineInvitation(
              invitationTokenToDeclineInvitation,
            )
          }
          onClose={() =>
            setInvitationTokenToDeclineInvitation(null)
          }
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default TenantListTable;
