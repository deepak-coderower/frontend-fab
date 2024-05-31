import React from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'src/i18n';
import statuses from 'src/modules/shared/importer/importerStatuses';
import ImporterErrorStatusMessage from 'src/view/shared/importer/styles/ImporterErrorStatusMessage';
import ColoredChip from 'src/view/shared/ColoredChip';

function ImporterRowStatus(props) {
  const { value, errorMessage } = props;

  if (value === statuses.PENDING) {
    return (
      <ColoredChip
        label={i18n('importer.pending')}
      ></ColoredChip>
    );
  }

  if (value === statuses.IMPORTED) {
    return (
      <ColoredChip
        color="green"
        label={i18n('importer.imported')}
      ></ColoredChip>
    );
  }

  if (value === statuses.ERROR) {
    return (
      <>
        <ColoredChip
          color="red"
          label={i18n('importer.error')}
        ></ColoredChip>{' '}
        <ImporterErrorStatusMessage>
          {errorMessage}
        </ImporterErrorStatusMessage>
      </>
    );
  }

  return null;
}

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
