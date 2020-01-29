import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    ADD_USER_TO_TEAM,
    REMOVE_USER_FROM_TEAM,
    SET_MY_USERS,
    SET_TEAM_DATA,
    SET_REDIRECT_TO,
    SET_USERS,
    SET_ON_MY_TEAM_PAGE,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        my_users: [],
        my_teams: [],
        team_id: 0,
        team_name: ' ',
        team_data: ' ',
        redirectTo: ' ',
        onMyTeamPage: false,
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    const alertDialogContext = useContext(AlertDialogContext);

    //search dataAndMethods users
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

    const removeUserFromTeam = async (login, redirectPath) => {
        let new_my_users = [];
        for (var i = 0; i < state.my_users.length; i++) {
            if (state.my_users[i].login !== login) {
                new_my_users.push(state.my_users[i]);
            }
        }
        dispatch({ type: REMOVE_USER_FROM_TEAM, payload: new_my_users });
        state.redirectTo = redirectPath;
    };

    const addUserToTeam = async (myUser, redirectPath) => {
        let foundDuplicate = false;
        for (let j = 0; j < state.my_users.length; j++) {
            if (state.my_users[j].login === myUser.login) {
                foundDuplicate = true;
            }
        }
        if (foundDuplicate) {
            alertDialogContext.setAlertDialog(
                true, 'Developer already in My Team, human cloning not currently implemented.', 'Error'
            );
        } else {
            let new_my_users = state.my_users.slice(0);
            new_my_users.push(myUser);
            let new_users = [];
            for (var i = 0; i < state.users.length; i++) {
                if (state.users[i].login !== myUser.login) {
                    new_users.push(state.users[i]);
                }
            }
            dispatch({ type: ADD_USER_TO_TEAM, payload: new_my_users });
            state.users = new_users;
        }
        state.redirectTo = redirectPath;
    };

    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    const setLoading = () => dispatch({ type: SET_LOADING });

    const setOnMyTeamPage = (myBool) => dispatch({ type: SET_ON_MY_TEAM_PAGE, payload: myBool })

    return (
        <DataAndMethodsContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                redirectTo: state.redirectTo,
                my_users: state.my_users,
                my_teams: state.my_teams,
                onMyTeamPage: state.onMyTeamPage,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
                addUserToTeam,
                removeUserFromTeam,
                setOnMyTeamPage,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;
