export const getRepoIndex = (getState, userId, { repoId }) =>
    getState()
        .currentUserReducer.getIn([userId, 'repos'])
        .findIndex(currentRepo => currentRepo.get('id') === repoId);
