import { createSelector } from 'reselect';

const selectRaw = (state) => state.notification.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const notificationViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default notificationViewSelectors;
