import React from 'react';
import PaginationWrapper from 'src/view/shared/table/styles/PaginationWrapper';
import { i18n } from 'src/i18n';
import PropTypes from 'prop-types';
import {
  TablePagination,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

function Pagination(props) {
  const theme = useTheme();

  const onChangeRowsPerPage = (pageSize) => {
    props.onChange({
      current: 1,
      pageSize: pageSize || 10,
    });
  };

  const onChangePage = (event, current) => {
    const pageSize = Number(
      props.pagination.pageSize || 10,
    );
    props.onChange({
      current: current + 1,
      pageSize,
    });
  };

  const { pagination } = props;
  const { current, pageSize, total } = pagination;
  const labelDisplayedRows =
    props.labelDisplayedRows ||
    (({ from, to, count }) =>
      i18n(
        'pagination.labelDisplayedRows',
        from,
        to,
        count,
      ));

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <PaginationWrapper>
      <TablePagination
        labelDisplayedRows={labelDisplayedRows}
        labelRowsPerPage={
          isSmUp ? i18n('pagination.labelRowsPerPage') : ''
        }
        rowsPerPageOptions={[10, 20, 30, 40]}
        component="div"
        count={total}
        rowsPerPage={Number(pageSize)}
        page={current - 1}
        onChangePage={onChangePage}
        onChangeRowsPerPage={(event) =>
          onChangeRowsPerPage(+event.target.value)
        }
      />
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  labelDisplayedRows: PropTypes.func,
};

export default Pagination;
