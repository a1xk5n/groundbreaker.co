import { createAction } from 'redux-actions';

import { changeSelectedUserId } from './main-actions';

import * as RequestContoller from '../controllers/request-controller';
import * as CurrentUserContoller from '../controllers/current-user-controller';

export const changeUserLoadingStatus = createAction(
    'CHANGE_USER_LOADING_STATUS',
    (userId, loadingStatus) => ({
        userId,
        loadingStatus,
    }),
);

export const changeIssuesLoadingStatus = createAction(
    'CHANGE_ISSUES_LOADING_STATUS',
    (userId, loadingStatus) => ({
        userId,
        loadingStatus,
    }),
);

export const changeCurrentUserInfo = createAction(
    'CHANGE_CURRENT_USER_INFO',
    (userId, userInfo, userRepos) => ({
        userId,
        userInfo,
        userRepos,
    }),
);

export const changeIssuesCount = createAction(
    'CHANGE_ISSUES_COUNT',
    (userId, repoIndex, { issuesCount }) => ({
        userId,
        repoIndex,
        issuesCount,
    }),
);

export const createDefaultUser = createAction('CREATE_DEFAULT_USER', userId => ({
    userId,
}));

const loadIssue = (userId, userName, repo) => (dispatch, getState) => {
    RequestContoller.getUserRepoIssues(userName, repo).then((issue) => {
        const repoIndex = CurrentUserContoller.getRepoIndex(getState, userId, issue);
        dispatch(changeIssuesCount(userId, repoIndex, issue));
    });
};

export const changeCurrentUser = (userId, userName) => (dispatch) => {
    dispatch(changeSelectedUserId(userId));

    dispatch(createDefaultUser(userId));
    dispatch(changeUserLoadingStatus(userId, true));

    Promise.all([RequestContoller.getUser(userName), RequestContoller.getUserRepos(userName)]).then(([userInfo, userRepos]) => {
        dispatch(changeUserLoadingStatus(userId, false));

        dispatch(changeCurrentUserInfo(userId, userInfo, userRepos));

        userRepos.forEach((repo) => {
            dispatch(loadIssue(userId, userName, repo));
        });
    });
};
