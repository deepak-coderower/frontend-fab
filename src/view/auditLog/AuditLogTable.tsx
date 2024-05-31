import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auditLog/auditLogActions';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import moment from 'moment';

function AuditLogTable(props) {
  const dispatch = useDispatch();

  const doOpenSelectdValues = (values) => {
    const data = JSON.stringify(values, null, 2);
    const jsonWindow = (window as any).open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400',
    );
    jsonWindow.document.write(`<pre>${data}</pre>`);
  };

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

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

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
                name={'timestamp'}
                label={i18n('auditLog.fields.timestamp')}
              />

              <TableCellCustom
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'createdByEmail'}
                label={i18n(
                  'auditLog.fields.createdByEmail',
                )}
              />

              <TableCellCustom
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'entityName'}
                label={i18n('auditLog.fields.entityName')}
              />

              <TableCellCustom
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'action'}
                label={i18n('auditLog.fields.action')}
              />

              <TableCellCustom
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'entityId'}
                label={i18n('auditLog.fields.entityId')}
              />

              <TableCellCustom size="sm" />
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
                    {moment(row.timestamp).format(
                      'YYYY-MM-DD HH:mm',
                    )}
                  </TableCell>
                  <TableCell>
                    {row.createdByEmail}
                  </TableCell>
                  <TableCell>{row.entityName}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.entityId}</TableCell>
                  <TableCell align="right">
                    <Tooltip title={i18n('common.view')}>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          doOpenSelectdValues(row.values)
                        }
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />
    </>
  );
}

export default AuditLogTable;
