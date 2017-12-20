import { Record } from 'immutable';

const Repo = Record({
    id: null,
    name: null,
    description: null,
    issuesCount: null,
    isIssueLoading: null,
});

export default class RepoRecord extends Repo {
    static parse(repo) {
        return new RepoRecord({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            isIssueLoading: true,
        });
    }
}
