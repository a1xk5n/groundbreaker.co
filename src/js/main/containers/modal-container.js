import { connect } from 'react-redux';

import {
    getCurrentUserName,
    getCurrentUserLoadingStatus,
    getCurrentUserAvatar,
    getCurrentUserRepos,
} from '../selectors/current-user-selectors';

import Modal from '../components/modal/modal';

const mapStateToProps = state => ({
    userName: getCurrentUserName(state),
    isUserLoading: getCurrentUserLoadingStatus(state),
    avatarUrl: getCurrentUserAvatar(state),
    repos: getCurrentUserRepos(state),
});

const mapDispatchToProps = () => ({});

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal);

export default ModalContainer;
