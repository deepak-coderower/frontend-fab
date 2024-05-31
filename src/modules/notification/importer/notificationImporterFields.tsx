import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import notificationEnumerators from 'src/modules/notification/notificationEnumerators';
import moment from 'moment';

export default [
  {
    name: 'title',
    label: i18n('entities.notification.fields.title'),
    schema: schemas.string(
      i18n('entities.notification.fields.title'),
      {},
    ),
  },
  {
    name: 'description',
    label: i18n('entities.notification.fields.description'),
    schema: schemas.string(
      i18n('entities.notification.fields.description'),
      {},
    ),
  },
  {
    name: 'date',
    label: i18n('entities.notification.fields.date'),
    schema: schemas.date(
      i18n('entities.notification.fields.date'),
      {},
    ),

    render: (value) =>
      value && value instanceof Date
        ? moment(value).format('YYYY-MM-DD')
        : value,
  },
];
