import { connect } from 'react-redux';

import { changeSearchStringValue, resetAll } from '../actions/main-actions';

import Searchbox from '../components/searchbox/searchbox';

const mapStateToProps = state => ({
    searchString: state.mainReducer.get('searchString'),
});

const mapDispatchToProps = dispatch => ({
    onChangeSearchString: (string) => {
        dispatch(changeSearchStringValue(string));
    },
    onResetClick: () => {
        dispatch(resetAll());
    },
});

const SearchboxContainer = connect(mapStateToProps, mapDispatchToProps)(Searchbox);

export default SearchboxContainer;
