import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const reducer = combineReducers({});
const store = createStore(reducer, applyMiddleware(thunk));

export default () => (
    <Provider store={store}>
        <p>Hello</p>
    </Provider>
);
