import { createAction } from 'redux-actions';

import * as RequestContoller from '../controllers/request-controller';
import * as MainController from '../controllers/main-controller';

import { resetAll } from '../actions/main-actions';

import Waiter from '../tools/waiter';

export const changeUsersLoadingStatus = createAction(
    'CHANGE_USERS_LOADING_STATUS',
    loadingStatus => ({
        loadingStatus,
    }),
);

export const updateUsers = createAction('UPDATE_USERS', users => ({
    users,
}));

const searchUsersFunc = (dispatch, getState) => {
    dispatch(changeUsersLoadingStatus(true));

    const userName = MainController.getUserName(getState());
    RequestContoller.getUsers(userName).then(
        (users) => {
            if (MainController.getUserName(getState())) {
                dispatch(changeUsersLoadingStatus(false));
                dispatch(updateUsers(users));
            }
        },
        () => {
            dispatch(changeUsersLoadingStatus(false));
        },
    );
};

const searchUsersWaiter = new Waiter(searchUsersFunc);

export const searchUsers = userName => (dispatch, getState) => {
    if (userName) {
        searchUsersWaiter.start(dispatch, getState);
    } else {
        searchUsersWaiter.stop();
        dispatch(resetAll());
    }
};
