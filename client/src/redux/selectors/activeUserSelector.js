import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';

import { orm } from '../models';

export const ormSelector = (state) => state.orm;

export const userLoadingSelector = (state) => state.loadingReducer.userLoading;

export const liveNotificationCounterSelector = (state) =>
  state.userState.liveTabNotificationCounter;

export const currentNotificationCounterSelector = (state) =>
  state.userState.currentTabNotificationCounter;

export const activeUserSelector = createSelector(
  (state) => state,
  (redux) => {
    const userSelectorORM = ormCreateSelector(orm.ActiveUser);

    const user = userSelectorORM(redux);
    return user.length > 0 ? user[0] : {};
  }
);

export const activeUserFullNameSelector = createSelector(
  (state) => state,
  (redux) => {
    const userSelectorORM = ormCreateSelector(orm.ActiveUser);

    const user = userSelectorORM(redux);
    return user.length > 0 ? `${user[0].firstName} ${user[0].lastName}` : '';
  }
);

export const activeUserUuidSelector = createSelector(
  (state) => state,
  (redux) => {
    const userSelectorORM = ormCreateSelector(orm.ActiveUser);

    const user = userSelectorORM(redux);
    return user.length > 0 ? user[0].uuid : undefined;
  }
);
