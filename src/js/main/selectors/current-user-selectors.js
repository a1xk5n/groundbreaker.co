import { createSelector } from 'reselect';

export const getCurrentUserId = state => state.mainReducer.get('selectedUserId');

export const getCurrentUsersState = state => state.currentUserReducer;

export const getCurrentUserName = createSelector(
    getCurrentUserId,
    getCurrentUsersState,
    (userId, users) => users.getIn([userId, 'userName']),
);

export const getCurrentUserLoadingStatus = createSelector(
    getCurrentUserId,
    getCurrentUsersState,
    (userId, users) => users.getIn([userId, 'isUserLoading']),
);

export const getCurrentUserAvatar = createSelector(
    getCurrentUserId,
    getCurrentUsersState,
    (userId, users) => users.getIn([userId, 'avatarUrl']),
);

export const getCurrentUserRepos = createSelector(
    getCurrentUserId,
    getCurrentUsersState,
    (userId, users) => users.getIn([userId, 'repos']),
);
