import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import ImporterStatusWrapper from 'src/view/shared/importer/styles/ImporterStatusWrapper';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import { LinearProgress } from '@material-ui/core';

export default (selectors) => {
  function ImporterStatus() {
    const completed = useSelector(
      selectors.selectCompleted,
    );
    const importing = useSelector(
      selectors.selectImporting,
    );
    const nonPendingRowsCount = useSelector(
      selectors.selectNonPendingRowsCount,
    );
    const rowsCount = useSelector(
      selectors.selectRowsCount,
    );
    const percent: number = useSelector(
      selectors.selectPercent,
    );
    const errorRowsCount = useSelector(
      selectors.selectErrorRowsCount,
    );

    const renderCompleted = () => {
      return (
        <div style={{ color: green[500] }}>
          {i18n('importer.completed.success')}
        </div>
      );
    };

    const renderCompletedSomeErrors = () => {
      return (
        <div style={{ color: orange[500] }}>
          {i18n('importer.completed.someErrors')}
        </div>
      );
    };

    const renderCompletedAllErrors = () => {
      return (
        <div style={{ color: red[500] }}>
          {i18n('importer.completed.allErrors')}
        </div>
      );
    };

    const renderProcessing = () => {
      return (
        <>
          <LinearProgress
            color="primary"
            variant="determinate"
            value={percent}
          />
          <p>
            {i18n(
              'importer.importedMessage',
              nonPendingRowsCount,
              rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </p>
        </>
      );
    };

    const renderBody = () => {
      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return renderCompletedAllErrors();
      }

      const isSomeErrors = Boolean(errorRowsCount);

      if (completed && isSomeErrors) {
        return renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return renderCompleted();
      }

      return renderProcessing();
    };

    if (!importing && !completed) {
      return null;
    }

    return (
      <ImporterStatusWrapper>
        {renderBody()}
      </ImporterStatusWrapper>
    );
  }

  return ImporterStatus;
};
