import NotificationService from 'src/modules/notification/notificationService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'NOTIFICATION_VIEW';

const notificationViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: notificationViewActions.FIND_STARTED,
      });

      const record = await NotificationService.find(id);

      dispatch({
        type: notificationViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationViewActions.FIND_ERROR,
      });

      getHistory().push('/notification');
    }
  },
};

export default notificationViewActions;
