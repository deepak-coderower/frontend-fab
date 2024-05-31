import { Grid } from '@material-ui/core';
import React from 'react';
import { i18n } from 'src/i18n';
import Plans from 'src/security/plans';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PlanCardFree from 'src/view/plan/PlanCardFree';
import PlanCardPaid from 'src/view/plan/PlanCardPaid';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';

function PlanPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('plan.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('plan.title')}</PageTitle>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <PlanCardFree />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PlanCardPaid plan={Plans.values.growth} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PlanCardPaid plan={Plans.values.enterprise} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </>
  );
}

export default PlanPage;
