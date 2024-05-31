import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import { Button, Tooltip } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  function ImporterToolbar() {
    const dispatch = useDispatch();
    const [resetConfirmVisible, setResetConfirmVisible] =
      useState(false);
    const [
      discardConfirmVisible,
      setDiscardConfirmVisible,
    ] = useState(false);

    const hasRows = useSelector(selectors.selectHasRows);
    const importing = useSelector(
      selectors.selectImporting,
    );
    const completed = useSelector(
      selectors.selectCompleted,
    );

    const doOpenResetConfirmModal = () => {
      setResetConfirmVisible(true);
    };

    const doCloseResetConfirmModal = () => {
      setResetConfirmVisible(false);
    };

    const doOpenDiscardConfirmModal = () => {
      setDiscardConfirmVisible(true);
    };

    const doCloseDiscardConfirmModal = () => {
      setDiscardConfirmVisible(false);
    };

    const doReset = () => {
      doCloseDiscardConfirmModal();
      doCloseResetConfirmModal();
      dispatch(actions.doReset());
    };

    const doPause = () => {
      dispatch(actions.doPause());
    };

    const doImport = () => {
      dispatch(actions.doImport());
    };

    const doDownloadTemplate = () => {
      dispatch(actions.doDownloadTemplate());
    };

    const showDownloadTemplate = !hasRows;
    const showImport = hasRows && !importing && !completed;
    const showDiscard = hasRows && !importing && !completed;
    const showNew = Boolean(completed);
    const showPause = hasRows && importing;

    return (
      <ToolbarWrapper>
        {showDownloadTemplate && (
          <>
            <Button
              type="button"
              onClick={doDownloadTemplate}
              startIcon={<DescriptionIcon />}
              size="small"
            >
              {i18n('importer.form.downloadTemplate')}
            </Button>

            {templateHelp && (
              <Tooltip
                style={{ marginLeft: '8px' }}
                title={templateHelp}
              >
                <InfoIcon />
              </Tooltip>
            )}
          </>
        )}

        {showImport && (
          <Button
            variant="contained"
            color="primary"
            onClick={doImport}
            type="button"
            startIcon={<SaveIcon />}
            size="small"
          >
            {i18n('common.import')}
          </Button>
        )}

        {showPause && (
          <Button
            type="button"
            startIcon={<PauseIcon />}
            onClick={doPause}
            size="small"
          >
            {i18n('common.pause')}
          </Button>
        )}

        {showNew && (
          <Button
            type="button"
            startIcon={<AddIcon />}
            onClick={doOpenResetConfirmModal}
            size="small"
          >
            {i18n('common.new')}
          </Button>
        )}

        {showDiscard && (
          <Button
            type="button"
            startIcon={<DeleteIcon />}
            onClick={doOpenDiscardConfirmModal}
            size="small"
          >
            {i18n('common.discard')}
          </Button>
        )}

        {discardConfirmVisible && (
          <ConfirmModal
            title={i18n('importer.list.discardConfirm')}
            onConfirm={() => doReset()}
            onClose={() => doCloseDiscardConfirmModal()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}

        {resetConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => doReset()}
            onClose={() => doCloseResetConfirmModal()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </ToolbarWrapper>
    );
  }

  return ImporterToolbar;
};
