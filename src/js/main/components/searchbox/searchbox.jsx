import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import './searchbox.scss';

const ESC_KEY_CODE = 27;

export default class Searchbox extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
        onResetClick: PropTypes.func.isRequired,
    };

    componentWillMount() {
        document.body.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeydown);
    }

    onKeydown = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
            this.props.onResetClick();
        }
    };

    onChangeSearchString = (event, value) => {
        this.props.onChangeSearchString(value);
    };

    render() {
        const { searchString } = this.props;

        return (
            <div className="searchbox">
                <div className="searchbox__header">GitHub Browser</div>
                <TextField
                    value={searchString}
                    hintText="Enter github user name"
                    floatingLabelText="Search"
                    floatingLabelFixed
                    fullWidth
                    onChange={this.onChangeSearchString}
                />
            </div>
        );
    }
}
