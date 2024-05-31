import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import ImporterRowStatus from 'src/view/shared/importer/ImporterRowStatus';
import Pagination from 'src/view/shared/table/Pagination';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import {
  TableBody,
  TableRow,
  TableCell,
  Table,
  Box,
  TableHead,
} from '@material-ui/core';

export default (selectors, actions, fields) => {
  function ImporterList() {
    const dispatch = useDispatch();
    const rows: Array<any> = useSelector(
      selectors.selectRows,
    );
    const currentPageRows: Array<any> = useSelector(
      selectors.selectCurrentPageRows,
    );
    const pendingRowsCount: number = useSelector(
      selectors.selectPendingRowsCount,
    );
    const errorRowsCount: number = useSelector(
      selectors.selectErrorRowsCount,
    );
    const importedRowsCount: number = useSelector(
      selectors.selectImportedRowsCount,
    );
    const sorter: any = useSelector(selectors.selectSorter);
    const pagination: any = useSelector(
      selectors.selectPagination,
    );

    const labelDisplayedRows = (from, to, count) => {
      return i18n(
        'importer.total',
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      );
    };

    const doChangeSort = (field) => {
      const order =
        sorter.field === field && sorter.order === 'asc'
          ? 'desc'
          : 'asc';

      dispatch(
        actions.doChangeSort(rows, {
          field,
          order,
        }),
      );
    };

    const doChangePagination = (pagination) => {
      dispatch(actions.doChangePagination(pagination));
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
                  hasRows={true}
                  sorter={sorter}
                  name="_line"
                  label={i18n('importer.line')}
                />
                {fields.map((schemaItem) => (
                  <TableCellCustom
                    key={schemaItem.name}
                    onSort={doChangeSort}
                    hasRows={true}
                    sorter={sorter}
                    name={schemaItem.name}
                    label={schemaItem.label}
                  />
                ))}
                <TableCellCustom
                  onSort={doChangeSort}
                  hasRows={true}
                  sorter={sorter}
                  name="_status"
                  label={i18n('importer.status')}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageRows.map((row) => (
                <TableRow key={row._line}>
                  <TableCell>{row._line}</TableCell>
                  {fields.map((schemaItem) => (
                    <TableCell key={schemaItem.name}>
                      <pre
                        style={{ fontFamily: 'inherit' }}
                      >
                        {schemaItem.render
                          ? schemaItem.render(
                              row[schemaItem.name],
                            )
                          : row[schemaItem.name] != null
                            ? String(row[schemaItem.name])
                            : null}
                      </pre>
                    </TableCell>
                  ))}
                  <TableCell>
                    <ImporterRowStatus
                      value={row._status}
                      errorMessage={row._errorMessage}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Pagination
          onChange={doChangePagination}
          pagination={pagination}
          labelDisplayedRows={labelDisplayedRows}
        />
      </>
    );
  }

  return ImporterList;
};
