import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/plan/planSelectors';
import actions from 'src/modules/plan/planActions';
import { planCardStyles } from 'src/view/plan/styles/planCardStyles';
import authSelectors from 'src/modules/auth/authSelectors';
import Plans from 'src/security/plans';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(planCardStyles as any);

export default function PlanCardPaid(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { plan } = props;

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const loading = useSelector(selectors.selectLoading);

  const hasPermissionToEdit = useSelector(
    selectors.selectPermissionToEdit,
  );

  const isPlanUser = useSelector(
    selectors.selectIsPlanUser,
  );

  const isCurrentPlan = currentTenant.plan === plan;

  const buttonState = isCurrentPlan
    ? 'manage'
    : currentTenant.plan === Plans.values.free
      ? 'payment'
      : 'none';

  const doCheckout = () => {
    dispatch(actions.doCheckout(plan));
  };

  const doPortal = () => {
    dispatch(actions.doPortal());
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          {i18n(`plan.${plan}.label`)}
        </div>
        <div className={classes.pricing}>
          {i18n(`plan.${plan}.price`)}
          <span className={classes.pricingPeriod}>
            {i18n('plan.pricingPeriod')}
          </span>
        </div>

        <div className={classes.spacer}></div>

        {isCurrentPlan &&
          currentTenant.planStatus ===
            'cancel_at_period_end' && (
            <p className={classes.cancelAtPeriodEnd}>
              {i18n('plan.cancelAtPeriodEnd')}
            </p>
          )}

        {isCurrentPlan &&
          currentTenant.planStatus === 'error' && (
            <p className={classes.somethingWrong}>
              {i18n('plan.somethingWrong')}
            </p>
          )}

        {buttonState === 'payment' && (
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={
              !hasPermissionToEdit || !isPlanUser || loading
            }
            onClick={doCheckout}
          >
            {i18n('plan.subscribe')}
          </Button>
        )}

        {buttonState === 'manage' && isPlanUser && (
          <Button
            fullWidth
            color="primary"
            variant="contained"
            disabled={!hasPermissionToEdit || loading}
            onClick={doPortal}
          >
            {i18n('plan.manage')}
          </Button>
        )}

        {buttonState === 'manage' && !isPlanUser && (
          <Tooltip title={i18n('plan.notPlanUser')}>
            <span>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                disabled={true}
              >
                {i18n('plan.manage')}
              </Button>
            </span>
          </Tooltip>
        )}
      </div>
    </>
  );
}
