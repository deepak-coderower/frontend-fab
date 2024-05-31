import React from 'react';
import { i18n } from 'src/i18n';
import NotificationListFilter from 'src/view/notification/list/NotificationListFilter';
import NotificationListTable from 'src/view/notification/list/NotificationListTable';
import NotificationListToolbar from 'src/view/notification/list/NotificationListToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

const NotificationListPage = (props) => {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.notification.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>
          {i18n('entities.notification.list.title')}
        </PageTitle>

        <NotificationListToolbar />
        <NotificationListFilter />
        <NotificationListTable />
      </ContentWrapper>
    </>
  );
};

export default NotificationListPage;
