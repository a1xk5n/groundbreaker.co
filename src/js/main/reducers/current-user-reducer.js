import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
    createDefaultUser,
    changeUserLoadingStatus,
    changeCurrentUserInfo,
    changeCurrentUserRepos,
    changeIssuesCount,
} from '../actions/current-user-actions';

import { resetCurrentUserReducer } from '../actions/main-actions';

import CurrentUserRecord from '../records/current-user-record';

const currentUserReducer = handleActions(
    {
        [createDefaultUser]: (state, action) =>
            state.set(action.payload.userId, new CurrentUserRecord()),

        [changeUserLoadingStatus]: (state, action) =>
            state.setIn([action.payload.userId, 'isUserLoading'], action.payload.loadingStatus),

        [changeCurrentUserInfo]: (state, action) =>
            state.update(action.payload.userId, (userRecord) => {
                const updatedUser = userRecord
                    .set('repos', action.payload.userRepos)
                    .set('id', action.payload.userInfo.get('id'))
                    .set('userName', action.payload.userInfo.get('userName'))
                    .set('avatarUrl', action.payload.userInfo.get('avatarUrl'));
                return updatedUser;
            }),

        [changeCurrentUserRepos]: (state, action) =>
            state.setIn([action.payload.userId, 'repos'], action.payload.userRepos),

        [changeIssuesCount]: (state, action) =>
            state
                .setIn(
                    [action.payload.userId, 'repos', action.payload.repoIndex, 'issuesCount'],
                    action.payload.issuesCount,
                )
                .setIn(
                    [action.payload.userId, 'repos', action.payload.repoIndex, 'isIssueLoading'],
                    false,
                ),
        [resetCurrentUserReducer]: () => Map(),
    },
    Map(),
);

export default currentUserReducer;
