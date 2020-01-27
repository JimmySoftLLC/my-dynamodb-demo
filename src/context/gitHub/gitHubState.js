import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './gitHubContext';
import GitHubReducer from './gitHubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

const GitHubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GitHubReducer, initialState);

    //search github users
    const searchUsers = async text => {
        setLoading();
        try {
            const res = await axios.get(
                'https://api.github.com/search/users' +
                '?q=' +
                text +
                '&client_id=' +
                process.env.REACT_APP_GITHUB_CLIENT_ID +
                '&client_secret=' +
                process.env.REACT_APP_GITHUB_CLIENT_SECRET
            );
            dispatch({ type: SEARCH_USERS, payload: res.data.items });
        } catch (err) {
            dispatch({ type: SEARCH_USERS, payload: [] });
        }
    };

    const getUser = async userName => {
        setLoading();
        try {
            const res = await axios.get(
                'https://api.github.com/users/' +
                userName +
                '?client_id=' +
                process.env.REACT_APP_GITHUB_CLIENT_ID +
                '&client_secret=' +
                process.env.REACT_APP_GITHUB_CLIENT_SECRET
            );
            dispatch({ type: GET_USER, payload: res.data });
        } catch (err) {
            dispatch({ type: GET_USER, payload: {} });
        }
    };

    const getUserRepos = async userName => {
        setLoading();
        try {
            const res = await axios.get(
                'https://api.github.com/users/' +
                userName +
                '/repos?per_page=5&sort=created:asc' +
                '&client_id=' +
                process.env.REACT_APP_GITHUB_CLIENT_ID +
                '&client_secret=' +
                process.env.REACT_APP_GITHUB_CLIENT_SECRET
            );
            dispatch({ type: GET_REPOS, payload: res.data });
        } catch (err) {
            dispatch({ type: GET_REPOS, payload: {} });
        }
    };

    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GitHubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}
        >
            {props.children}
        </GitHubContext.Provider>
    );
};

export default GitHubState;
