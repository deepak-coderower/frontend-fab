import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/notification/importer/notificationImporterSelectors';
import NotificationService from 'src/modules/notification/notificationService';
import fields from 'src/modules/notification/importer/notificationImporterFields';
import { i18n } from 'src/i18n';

const notificationImporterActions = importerActions(
  'NOTIFICATION_IMPORTER',
  selectors,
  NotificationService.import,
  fields,
  i18n('entities.notification.importer.fileName'),
);

export default notificationImporterActions;
