import { combineReducers } from 'redux';
import mainReducer from './main-reducer';
import usersReducer from './users-reducer';
import currentUserReducer from './current-user-reducer';

const reducer = combineReducers({ mainReducer, usersReducer, currentUserReducer });

export default reducer;
