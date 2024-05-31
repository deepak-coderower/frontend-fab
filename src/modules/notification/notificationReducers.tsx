import list from 'src/modules/notification/list/notificationListReducers';
import form from 'src/modules/notification/form/notificationFormReducers';
import view from 'src/modules/notification/view/notificationViewReducers';
import destroy from 'src/modules/notification/destroy/notificationDestroyReducers';
import importerReducer from 'src/modules/notification/importer/notificationImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
