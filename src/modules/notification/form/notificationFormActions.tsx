import NotificationService from 'src/modules/notification/notificationService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'NOTIFICATION_FORM';

const notificationFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: notificationFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NotificationService.find(id);
      }

      dispatch({
        type: notificationFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.INIT_ERROR,
      });

      getHistory().push('/notification');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: notificationFormActions.CREATE_STARTED,
      });

      await NotificationService.create(values);

      dispatch({
        type: notificationFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.notification.create.success'),
      );

      getHistory().push('/notification');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: notificationFormActions.UPDATE_STARTED,
      });

      await NotificationService.update(id, values);

      dispatch({
        type: notificationFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.notification.update.success'),
      );

      getHistory().push('/notification');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default notificationFormActions;
