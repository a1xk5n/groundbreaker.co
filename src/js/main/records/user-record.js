import { Record } from 'immutable';

const User = Record({
    id: null,
    userName: null,
    avatarUrl: null,
});

export default class UserRecord extends User {
    static parse(user) {
        return new UserRecord({
            id: user.id,
            userName: user.login,
            avatarUrl: user.avatar_url,
        });
    }
}
