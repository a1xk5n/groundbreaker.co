import PropTypes from 'prop-types';
import _ from 'lodash';
import Immutable from 'immutable';

const makeIsRequired = (propTypeChecker) => {
    propTypeChecker.isRequired = (props, propName, componentName) => {
        if (!props[propName]) {
            return new Error(`Required prop \'${propName}\' was not specified in \'${componentName}\'.`);
        }

        return propTypeChecker(props, propName, componentName);
    };

    return propTypeChecker;
};

const immutableCollectionItemsAndKeysOfChecker = (
    itemPropTypeChecker,
    keyPropTypeChecker,
    props,
    propName,
    componentName,
) => {
    let itemError = null;
    let keyError = null;

    props[propName].forEach((item, key) => {
        if (itemPropTypeChecker) {
            itemError = PropTypes.checkPropTypes(
                {
                    item: itemPropTypeChecker,
                },
                {
                    item,
                },
                'prop',
                componentName,
            );
        }

        if (keyPropTypeChecker) {
            keyError = PropTypes.checkPropTypes(
                {
                    key: keyPropTypeChecker,
                },
                {
                    key,
                },
                'prop',
                componentName,
            );
        }

        if (itemError instanceof Error || keyError instanceof Error) {
            return false;
        }

        return true;
    });

    if (itemError) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Wrong item type: ${
            itemError.message
        }`);
    }

    if (keyError) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Wrong key type: ${
            keyError.message
        }`);
    }
};

const immutableIterableOfChecker = (itemPropTypeChecker, props, propName, componentName) => {
    let itemError;

    if (!props[propName]) {
        return;
    }

    if (!(props[propName] instanceof Immutable.Iterable)) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Expected: Immutable.Iterable, type: ${typeof props[
            propName
        ]}`);
    }

    return immutableCollectionItemsAndKeysOfChecker(
        itemPropTypeChecker,
        null,
        props,
        propName,
        componentName,
    );
};

const immutableListOfChecker = (itemPropTypeChecker, props, propName, componentName) => {
    let itemError;

    if (!props[propName]) {
        return;
    }

    if (!(props[propName] instanceof Immutable.List)) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Expected: Immutable.List, type: ${typeof props[
            propName
        ]}`);
    }

    return immutableCollectionItemsAndKeysOfChecker(
        itemPropTypeChecker,
        null,
        props,
        propName,
        componentName,
    );
};

const immutableSetOfChecker = (itemPropTypeChecker, props, propName, componentName) => {
    if (!props[propName]) {
        return;
    }

    if (!(props[propName] instanceof Immutable.Set)) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Expected: Immutable.Set, type: ${typeof props[
            propName
        ]}`);
    }

    return immutableCollectionItemsAndKeysOfChecker(
        itemPropTypeChecker,
        null,
        props,
        propName,
        componentName,
    );
};

const immutableMapOfChecker = (
    itemPropTypeChecker,
    keyPropTypeChecker,
    props,
    propName,
    componentName,
) => {
    if (!props[propName]) {
        return;
    }

    if (!(props[propName] instanceof Immutable.Map)) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Expected: Immutable.Map, type: ${typeof props[
            propName
        ]}`);
    }

    return immutableCollectionItemsAndKeysOfChecker(
        itemPropTypeChecker,
        keyPropTypeChecker,
        props,
        propName,
        componentName,
    );
};

const customPropTypes = {
    immutableIterableOf: itemPropTypeChecker =>
        makeIsRequired((...args) => immutableIterableOfChecker(itemPropTypeChecker, ...args)),
    immutableListOf: itemPropTypeChecker =>
        makeIsRequired((...args) => immutableListOfChecker(itemPropTypeChecker, ...args)),
    immutableSetOf: itemPropTypeChecker =>
        makeIsRequired((...args) => immutableSetOfChecker(itemPropTypeChecker, ...args)),
    immutableMapOf: (itemPropTypeChecker, keyPropTypeChecker) =>
        makeIsRequired((...args) =>
            immutableMapOfChecker(itemPropTypeChecker, keyPropTypeChecker, ...args)),
};

export default customPropTypes;
