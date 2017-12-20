import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import CustomPropTypes from '../../tools/custom-prop-types';
import RepoRecord from '../../records/repo-record';

import Spinner from '../spinner/spinner';

import './modal.scss';

export default class Modal extends React.PureComponent {
    static propTypes = {
        isUserLoading: PropTypes.bool,
        userName: PropTypes.string,
        avatarUrl: PropTypes.string,
        repos: CustomPropTypes.immutableListOf(PropTypes.instanceOf(RepoRecord)),
    };

    static defaultProps = {
        isUserLoading: false,
        userName: '',
        avatarUrl: '',
        repos: List(),
    };

    getIssuesMockup = (repo) => {
        if (repo.get('isIssueLoading')) {
            return <Spinner className="modal__issue-spinner" />;
        }

        return repo.get('issuesCount');
    };

    render() {
        if (this.props.isUserLoading) {
            return <Spinner className="modal__spinner" />;
        }

        return (
            <div className="modal">
                <div className="modal__title">{this.props.userName}</div>
                <div className="modal__image-container">
                    <img className="modal__image" src={this.props.avatarUrl} alt="" />
                </div>
                <div className="modal__table">
                    <Table height="175px" fixedHeader selectable={false}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn tooltip="The Name" className="modal__table-cell">
                                    Name
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    tooltip="The Description"
                                    className="modal__table-cell"
                                >
                                    Description
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    tooltip="The Issues"
                                    className="modal__table-cell"
                                >
                                    Issues
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.props.repos.map(repo => (
                                <TableRow key={repo.get('id')}>
                                    <TableRowColumn className="modal__table-cell">
                                        {repo.get('name')}
                                    </TableRowColumn>
                                    <TableRowColumn className="modal__table-cell">
                                        {repo.get('description')}
                                    </TableRowColumn>
                                    <TableRowColumn className="modal__table-cell">
                                        {this.getIssuesMockup(repo)}
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}
