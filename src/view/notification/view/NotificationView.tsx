import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import moment from 'moment';
import FilesViewItem from 'src/view/shared/view/FilesViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';

const NotificationView = (props) => {
  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return (
    <div>
      <TextViewItem
        label={i18n('entities.notification.fields.title')}
        value={record.title}
      />

      <TextViewItem
        label={i18n(
          'entities.notification.fields.description',
        )}
        value={record.description}
      />

      <TextViewItem
        label={i18n('entities.notification.fields.date')}
        value={record.date}
      />
    </div>
  );
};

export default NotificationView;
