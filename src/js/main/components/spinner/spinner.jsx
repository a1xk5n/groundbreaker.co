import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './spinner.scss';

const Spinner = ({ className }) => (
    <div className={classNames('spinner', className)}>
        <span className="spinner__fa-spinner fa fa-spinner fa-pulse fa-3x fa-fw" />
        <span className="spinner__fa-spinner sr-only">Loading...</span>
    </div>
);

Spinner.propTypes = {
    className: PropTypes.string,
};

Spinner.defaultProps = {
    className: '',
};

export default Spinner;
