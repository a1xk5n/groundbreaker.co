import { handleActions } from 'redux-actions';
import { Record, List } from 'immutable';

import { changeUsersLoadingStatus, updateUsers } from '../actions/users-actions';
import { resetUsersReducer } from '../actions/main-actions';

const UsersReducerRecord = Record({
    isUsersLoaded: false,
    isUsersLoading: false,
    users: List(),
});

const usersReducer = handleActions(
    {
        [changeUsersLoadingStatus]: (state, action) =>
            state.set('isUsersLoading', action.payload.loadingStatus),
        [updateUsers]: (state, action) =>
            state.set('isUsersLoaded', true).set('users', action.payload.users),
        [resetUsersReducer]: () => new UsersReducerRecord(),
    },
    new UsersReducerRecord(),
);

export default usersReducer;
