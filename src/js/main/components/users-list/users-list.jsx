import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';

import Spinner from '../spinner/spinner';
import Modal from '../../containers/modal-container';

import CustomPropTypes from '../../tools/custom-prop-types';
import UserRecord from '../../records/user-record';

import './users-list.scss';

export default class UsersList extends React.PureComponent {
    static propTypes = {
        isUsersLoading: PropTypes.bool.isRequired,
        isUsersLoaded: PropTypes.bool.isRequired,
        users: CustomPropTypes.immutableListOf(PropTypes.instanceOf(UserRecord)).isRequired,
        onUserClick: PropTypes.func.isRequired,
    };

    state = {
        open: false,
    };

    getContent() {
        if (this.props.isUsersLoading) {
            return <Spinner className="users-list__spinner" />;
        }

        if (!this.props.isUsersLoaded) {
            return <div className="users-list__title">Result Panel</div>;
        }

        if (!this.props.users.size) {
            return <div className="users-list__title">No results</div>;
        }

        return (
            <div className="users-list__list">
                <List>
                    {this.props.users.map(user => (
                        <ListItem
                            key={user.get('id')}
                            primaryText={user.get('userName')}
                            leftAvatar={<Avatar src={user.get('avatarUrl')} />}
                            onClick={() => {
                                this.props.onUserClick(user.get('id'), user.get('userName'));
                                this.handleOpen();
                            }}
                        />
                    ))}
                </List>
                <Dialog
                    actions={[<FlatButton label="Cancel" primary onClick={this.handleClose} />]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <Modal />
                </Dialog>
            </div>
        );
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return <div className="users-list">{this.getContent()}</div>;
    }
}
