import { connect } from 'react-redux';

import { changeCurrentUser } from '../actions/current-user-actions';

import UsersList from '../components/users-list/users-list';

const mapStateToProps = state => ({
    isUsersLoaded: state.usersReducer.get('isUsersLoaded'),
    isUsersLoading: state.usersReducer.get('isUsersLoading'),
    users: state.usersReducer.get('users'),
});

const mapDispatchToProps = dispatch => ({
    onUserClick: (userId, username) => {
        dispatch(changeCurrentUser(userId, username));
    },
});

const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default UsersListContainer;
