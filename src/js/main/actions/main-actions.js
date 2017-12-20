import { createAction } from 'redux-actions';

export const changeSearchString = createAction('CHANGE_SEARCH_STRING', searchString => ({
    searchString,
}));

export const changeSelectedUserId = createAction('CHANGE_SELECTED_USER_ID', userId => ({
    userId,
}));

export const resetMainReducer = createAction('RESET_MAIN_REDUCER');
export const resetUsersReducer = createAction('RESET_USERS_REDUCER');
export const resetCurrentUserReducer = createAction('RESET_CURRENT_USER_REDUCER');

export const resetAll = () => (dispatch) => {
    dispatch(resetMainReducer());
    dispatch(resetUsersReducer());
    dispatch(resetCurrentUserReducer());
};
