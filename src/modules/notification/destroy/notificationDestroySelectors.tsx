import { createSelector } from 'reselect';

const selectRaw = (state) => state.notification.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const notificationDestroySelectors = {
  selectLoading,
};

export default notificationDestroySelectors;
