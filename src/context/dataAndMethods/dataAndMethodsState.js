import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import AlertDialogContext from '../alertDialog/alertDialogContext';
import {
    SET_USERS,
    SET_LOADING,
    CLEAR_USERS,
    SET_USER,
    SET_REPOS,
    SET_MY_TEAM,
    SET_MY_TEAMS,
    SET_REDIRECT_TO,
    SET_ON_MY_TEAM_PAGE,
    SET_EMAIL_TO,
    SET_TEAM_ID,
    SET_TEAM_NAME,
    SET_TEAM_DATA,
    SET_AMAZON_RESPONSE,
    SET_EMAIL_SUBJECT,
    SET_EMAIL_BCC,
    SET_EMAIL_BODY,
    SET_EMAIL_CC,
} from '../types';

const DataAndMethodsState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        my_team: [],
        my_teams: [],
        team_id: 0,
        team_name: ' ',
        team_data: ' ',
        redirectTo: ' ',
        onMyTeamPage: false,
        amazonResponse: '',
        tableName: 'my_open_source_team',
        email_to: '',
        email_subject: '',
        email_bcc: '',
        email_body: '',
        email_cc: '',
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);
    const alertDialogContext = useContext(AlertDialogContext);
    const lambdaFunctionURL =
        'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi';

    //search dataAndMethods users
    const searchUsers = async text => {
        setLoading(true);
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
            setUsers(res.data.items);
        } catch (err) {
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
            setUsers([]);
        }
        setLoading(false);
    };

    const getUser = async userName => {
        setLoading(true);
        try {
            const res = await axios.get(
                'https://api.github.com/users/' +
                userName +
                '?client_id=' +
                process.env.REACT_APP_GITHUB_CLIENT_ID +
                '&client_secret=' +
                process.env.REACT_APP_GITHUB_CLIENT_SECRET
            );
            setUser(res.data);
        } catch (err) {
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
            setUser({})
        }
        setLoading(false);
    };

    const getUserRepos = async userName => {
        setLoading(true);
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
            setRepos(res.data);
        } catch (err) {
            setRepos({});
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
        setLoading(false);
    };

    const removeUserFromTeam = async (login, redirectPath) => {
        let new_my_team = [];
        for (var i = 0; i < state.my_team.length; i++) {
            if (state.my_team[i].login !== login) {
                new_my_team.push(state.my_team[i]);
            }
        }
        dispatch({ type: SET_MY_TEAM, payload: new_my_team });
        setRedirectTo(redirectPath);
    };

    const addUserToTeam = async (myUser, redirectPath) => {
        let foundDuplicate = false;
        for (let j = 0; j < state.my_team.length; j++) {
            if (state.my_team[j].login === myUser.login) {
                foundDuplicate = true;
            }
        }
        if (foundDuplicate) {
            alertDialogContext.setAlertDialog(
                true, 'Developer already in My Team, human cloning not currently implemented.', 'Error'
            );
        } else {
            let new_my_team = state.my_team.slice(0);
            new_my_team.push(myUser);
            let new_users = [];
            for (var i = 0; i < state.users.length; i++) {
                if (state.users[i].login !== myUser.login) {
                    new_users.push(state.users[i]);
                }
            }
            setMy_team(new_my_team);
            setUsers(new_users);
        }
        setRedirectTo(redirectPath);
    };

    const getUsersForEmail = async users => {
        setLoading(true);
        setEmail_to('');
        let myToEmails = '';
        for (let i = 0; i < users.length; i++) {
            try {
                const res = await axios.get(
                    'https://api.github.com/users/' +
                    users[i].login +
                    '?client_id=' +
                    process.env.REACT_APP_GITHUB_CLIENT_ID +
                    '&client_secret=' +
                    process.env.REACT_APP_GITHUB_CLIENT_SECRET
                );
                if (res.data.email !== null) {
                    myToEmails += res.data.email + ',';
                }
            } catch (err) { }
        }
        setEmail_to(myToEmails);
        setLoading(false);
    };

    const scanDynamoDB = async TableName => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                    },
                    myMethod: 'scan',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            let myResData = res.data;
            let myMessage = 'Number of teams: ' + myResData.Count + '\n';
            myMessage += '----------------------\n';
            for (let i = 0; i < myResData.Count; i++) {
                myMessage +=
                    'Team: ' +
                    myResData.Items[i].team_id +
                    ' Name: ' +
                    myResData.Items[i].team_name +
                    '\n';
            }
            setAmazonResponse(myMessage);
            setMy_Teams(myResData.Items);
        } catch (err) {
            setAmazonResponse('');
            setMy_Teams([]);
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
    };

    const putItemDynamoDB = async (TableName, team_id, team_name, team_data) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Item: {
                            team_id: team_id,
                            team_name: team_name,
                            team_data: team_data,
                        },
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'putItem',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            setAmazonResponse(JSON.stringify(res.data));
        } catch (err) {
            alertDialogContext.setAlertDialog(true, 'Put not completed because this team is write protected.', 'Error');
        }
    };

    const updateItemDynamoDB = async (
        TableName,
        team_id,
        team_name,
        team_data
    ) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Item: {
                            team_id: team_id,
                            team_name: team_name,
                            team_data: team_data,
                        },
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'putItem',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            setAmazonResponse(JSON.stringify(res.data));
        } catch (err) {
            alertDialogContext.setAlertDialog(true, 'Update not completed because this team is write protected.', 'Error');
        }
    };

    const deleteItemDynamoDB = async (TableName, team_id) => {
        try {
            const res = await axios.post(
                'https://yfyft0meu9.execute-api.us-east-1.amazonaws.com/default/restapi',
                {
                    myMethod: 'deleteItem',
                    myBody: {
                        TableName: TableName,
                        Key: {
                            team_id: team_id,
                        },
                    },
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            setAmazonResponse(JSON.stringify(res.data));
            setTeam_id('');
            setTeam_name('');
            setTeam_data('[]');
            setMy_team([]);
            setLoading(false);
        } catch (err) {
            alertDialogContext.setAlertDialog(true, 'Update not completed because this team is write protected.', 'Error');
        }
    };

    const getItemDynamoDB = async (TableName, team_id) => {
        try {
            const res = await axios.post(
                lambdaFunctionURL,
                {
                    myBody: {
                        TableName: TableName,
                        Key: {
                            team_id: team_id,
                        },
                        ReturnConsumedCapacity: 'TOTAL',
                    },
                    myMethod: 'getItem',
                },
                {
                    headers: {
                        Accept: '*/*',
                    },
                }
            );
            setAmazonResponse(JSON.stringify(res.data));
            setTeam_id(res.data.Item.team_id);
            setTeam_name(res.data.Item.team_name);
            setTeam_data(res.data.Item.team_data);
            setMy_team(JSON.parse(res.data.Item.team_data));
        } catch (err) {
            alertDialogContext.setAlertDialog(true, err.message, 'Error');
        }
    };

    const setRepos = (repos) => { dispatch({ type: SET_REPOS, payload: repos }); }

    const setUsers = (users) => { dispatch({ type: SET_USERS, payload: users }) }

    const setUser = (user) => { dispatch({ type: SET_USER, payload: user }) }

    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    const setLoading = (myBool) => dispatch({ type: SET_LOADING, payload: myBool });

    const setOnMyTeamPage = (myBool) => dispatch({ type: SET_ON_MY_TEAM_PAGE, payload: myBool })

    const setRedirectTo = (myVal) => dispatch({ type: SET_REDIRECT_TO, payload: myVal })

    const setEmail_to = (myVal) => dispatch({ type: SET_EMAIL_TO, payload: myVal })

    const setEmail_subject = (myVal) => dispatch({ type: SET_EMAIL_SUBJECT, payload: myVal })

    const setEmail_bcc = (myVal) => dispatch({ type: SET_EMAIL_BCC, payload: myVal })

    const setEmail_body = (myVal) => dispatch({ type: SET_EMAIL_BODY, payload: myVal })

    const setEmail_cc = (myVal) => dispatch({ type: SET_EMAIL_CC, payload: myVal })

    const setMy_Teams = (myTeams) => dispatch({ type: SET_MY_TEAMS, payload: myTeams })

    const setTeam_id = (myval) => dispatch({ type: SET_TEAM_ID, payload: myval })

    const setTeam_name = (myval) => dispatch({ type: SET_TEAM_NAME, payload: myval })

    const setTeam_data = (myval) => dispatch({ type: SET_TEAM_DATA, payload: myval })

    const setAmazonResponse = (myval) => dispatch({ type: SET_AMAZON_RESPONSE, payload: myval })

    const setMy_team = (myval) => dispatch({ type: SET_MY_TEAM, payload: myval })

    return (
        <DataAndMethodsContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                redirectTo: state.redirectTo,
                my_team: state.my_team,
                my_teams: state.my_teams,
                onMyTeamPage: state.onMyTeamPage,
                tableName: state.tableName,
                amazonResponse: state.amazonResponse,
                team_id: state.team_id,
                team_name: state.team_name,
                team_data: state.team_data,
                email_to: state.email_to,
                email_subject: state.email_subject,
                email_bcc: state.email_bcc,
                email_body: state.email_body,
                email_cc: state.email_cc,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
                addUserToTeam,
                removeUserFromTeam,
                setOnMyTeamPage,
                setRedirectTo,
                getUsersForEmail,
                putItemDynamoDB,
                scanDynamoDB,
                updateItemDynamoDB,
                deleteItemDynamoDB,
                getItemDynamoDB,
                setRepos,
                setUsers,
                setUser,
                setTeam_id,
                setTeam_name,
                setTeam_data,
                setAmazonResponse,
                setEmail_to,
                setEmail_subject,
                setEmail_bcc,
                setEmail_body,
                setEmail_cc,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;