import { connect } from 'react-redux';

import { changeSearchString, resetAll } from '../actions/main-actions';
import { searchUsers } from '../actions/users-actions';

import Searchbox from '../components/searchbox/searchbox';

const mapStateToProps = state => ({
    searchString: state.mainReducer.get('searchString'),
});

const mapDispatchToProps = dispatch => ({
    onChangeSearchString: (string) => {
        dispatch(changeSearchString(string));
    },
    onSearchClick: () => {
        dispatch(searchUsers());
    },
    onResetClick: () => {
        dispatch(resetAll());
    },
});

const SearchboxContainer = connect(mapStateToProps, mapDispatchToProps)(Searchbox);

export default SearchboxContainer;
