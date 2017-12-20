import { Record, List } from 'immutable';

const User = Record({
    isUserLoading: null,
    id: null,
    userName: null,
    avatarUrl: null,
    repos: List(),
});

export default class CurrentUserRecord extends User {
    static parse(user) {
        return new CurrentUserRecord({
            id: user.id,
            userName: user.login,
            avatarUrl: user.avatar_url,
        });
    }
}
