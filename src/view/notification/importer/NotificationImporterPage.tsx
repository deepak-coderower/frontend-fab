import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/notification/importer/notificationImporterActions';
import fields from 'src/modules/notification/importer/notificationImporterFields';
import selectors from 'src/modules/notification/importer/notificationImporterSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';
import PageTitle from 'src/view/shared/styles/PageTitle';

const NotificationImportPage = (props) => {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.notification.importer.hint'),
  );
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [
            i18n('entities.notification.menu'),
            '/notification',
          ],
          [i18n('entities.notification.importer.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.notification.importer.title')}
        </PageTitle>

        <Importer />
      </ContentWrapper>
    </>
  );
};

export default NotificationImportPage;
