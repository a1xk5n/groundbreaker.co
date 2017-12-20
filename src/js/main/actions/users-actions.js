import { createAction } from 'redux-actions';

import * as RequestContoller from '../controllers/request-controller';
import * as MainController from '../controllers/main-controller';

export const changeUsersLoadingStatus = createAction(
    'CHANGE_USERS_LOADING_STATUS',
    loadingStatus => ({
        loadingStatus,
    }),
);

export const updateUsers = createAction('UPDATE_USERS', users => ({
    users,
}));

export const searchUsers = () => (dispatch, getState) => {
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
