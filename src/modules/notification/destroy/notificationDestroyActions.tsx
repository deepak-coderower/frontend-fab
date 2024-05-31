import listActions from 'src/modules/notification/list/notificationListActions';
import NotificationService from 'src/modules/notification/notificationService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'NOTIFICATION_DESTROY';

const notificationDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: notificationDestroyActions.DESTROY_STARTED,
      });

      await NotificationService.destroyAll([id]);

      dispatch({
        type: notificationDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.notification.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/notification');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: notificationDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: notificationDestroyActions.DESTROY_ALL_STARTED,
      });

      await NotificationService.destroyAll(ids);

      dispatch({
        type: notificationDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.notification.destroyAll.success'),
      );

      getHistory().push('/notification');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: notificationDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default notificationDestroyActions;
