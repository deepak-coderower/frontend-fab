import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.notification.fields.id'),
  },

  {
    name: 'title',
    label: i18n('entities.notification.fields.title'),
  },

  {
    name: 'description',
    label: i18n('entities.notification.fields.description'),
  },

  {
    name: 'date',
    label: i18n('entities.notification.fields.date'),
    render: exporterRenders.date(),
  },

  {
    name: 'createdAt',
    label: i18n('entities.notification.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n('entities.notification.fields.updatedAt'),
    render: exporterRenders.datetime(),
  },
];
