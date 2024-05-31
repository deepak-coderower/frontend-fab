import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { i18n } from 'src/i18n';
import DashboardBarChart from 'src/view/dashboard/DashboardBarChart';
import DashboardDoughnutChart from 'src/view/dashboard/DashboardDoughnutChart';
import DashboardHorizontalBarChart from 'src/view/dashboard/DashboardHorizontalBarChart';
import DashboardLineChart from 'src/view/dashboard/DashboardLineChart';
import DashboardMixChartOne from 'src/view/dashboard/DashboardMixChartOne';
import DashboardMixChartTwo from 'src/view/dashboard/DashboardMixChartTwo';
import DashboardPolarChart from 'src/view/dashboard/DashboardPolarChart';
import DashboardRadarChart from 'src/view/dashboard/DashboardRadarChart';

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
}));

function DashboardPage(props) {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          padding: 0,
        }}
      >
        <Grid spacing={2} container>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardDoughnutChart />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardMixChartTwo />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardBarChart />
            </div>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardMixChartOne />
            </div>
          </Grid>

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardPolarChart />
            </div>
          </Grid>

          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardHorizontalBarChart />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardLineChart />
            </div>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <div className={classes.chartWrapper}>
              <DashboardRadarChart />
            </div>
          </Grid>
        </Grid>

        <p
          style={{
            marginTop: '16px',
            width: '100%',
            textAlign: 'center',
            color: 'grey',
          }}
        >
          {i18n('dashboard.message')}
        </p>
      </div>
    </>
  );
}

export default DashboardPage;
