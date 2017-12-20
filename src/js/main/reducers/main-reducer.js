import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import {
    changeSearchString,
    changeSelectedUserId,
    resetMainReducer,
} from '../actions/main-actions';

const MainReducerRecord = Record({
    searchString: '',
    selectedUserId: null,
});

const mainReducer = handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),
        [changeSelectedUserId]: (state, action) =>
            state.set('selectedUserId', action.payload.userId),
        [resetMainReducer]: () => new MainReducerRecord(),
    },
    new MainReducerRecord(),
);

export default mainReducer;
