import axios from 'axios';
import { List } from 'immutable';
import UserRecord from '../records/user-record';
import CurrentUserRecord from '../records/current-user-record';
import RepoRecord from '../records/repo-record';

const QUERY_API_PATH = 'https://api.github.com';
const ACCESS_TOKEN = '7a18f6e75ff39ed48368b17ad8b89c52f97b3361';

axios.defaults.baseURL = QUERY_API_PATH;
axios.defaults.headers.common.Authorization = `token ${ACCESS_TOKEN}`;

export const getUsers = userName =>
    axios
        .get(`/search/users?q=${userName}+in:login&type=user`)
        .then(response => response.data.items, error => Promise.reject(error))
        .then(
            users => List(users.map(user => UserRecord.parse(user))),
            error => Promise.reject(error),
        );

export const getUser = userName =>
    axios
        .get(`/users/${userName}`)
        .then(response => CurrentUserRecord.parse(response.data), error => Promise.reject(error));

export const getUserRepos = userName =>
    axios
        .get(`/users/${userName}/repos`)
        .then(
            response => List(response.data.map(repo => RepoRecord.parse(repo))),
            error => Promise.reject(error),
        );

export const getUserRepoIssues = (userName, repo) =>
    axios
        .get(`/repos/${userName}/${repo.get('name')}/issues`)
        .then(
            response => ({ issuesCount: response.data.length, repoId: repo.get('id') }),
            error => Promise.reject(error),
        );
