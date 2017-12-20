import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from '../../store/store';

import Searchbox from '../../containers/searchbox-container';
import UsersList from '../../containers/users-list-container';

import './main.scss';

export default () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <div className="main__wrapper">
                <Searchbox />
                <UsersList />
            </div>
        </MuiThemeProvider>
    </Provider>
);
