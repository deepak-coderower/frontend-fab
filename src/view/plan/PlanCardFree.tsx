import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import Plans from 'src/security/plans';
import { planCardStyles } from 'src/view/plan/styles/planCardStyles';

const useStyles = makeStyles(planCardStyles as any);

export default function PlanCardFree(props) {
  const classes = useStyles();

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const isCurrentPlan =
    currentTenant.plan === Plans.values.free;

  const buttonState = isCurrentPlan ? 'current' : null;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          {i18n(`plan.${Plans.values.free}.label`)}
        </div>
        <div className={classes.pricing}>
          {i18n(`plan.free.price`)}
          <span className={classes.pricingPeriod}>
            {i18n('plan.pricingPeriod')}
          </span>
        </div>
        <div className={classes.spacer}></div>

        {buttonState === 'current' && (
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={true}
          >
            {i18n('plan.current')}
          </Button>
        )}
      </div>
    </>
  );
}
