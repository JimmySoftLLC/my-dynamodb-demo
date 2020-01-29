import React, { useReducer, useContext } from 'react';
import TeamContext from './teamContext';
import TeamReducer from './teamReducer';
import DataAndMethodsContext from '../dataAndMethods/dataAndMethodsContext';
import AlertDialogContext from '../alertDialog/alertDialogContext';

import {
    ADD_USER_TO_TEAM,
    REMOVE_USER_FROM_TEAM,
    SET_MY_USERS,
    SET_TEAM_DATA,
    SET_REDIRECT_TO,
    SET_USERS,
} from '../types';

const TeamState = props => {
    const initialState = {
        my_users: [],
        my_teams: [],
        team_id: 0,
        team_name: ' ',
        team_data: ' ',
    };

    const [state, dispatch] = useReducer(TeamReducer, initialState);

    const gitHubContext = useContext(DataAndMethodsContext);
    const alertDialogContext = useContext(AlertDialogContext);

    const removeUserFromTeam = async (login, redirectPath) => {
        let tempUser = [];
        for (var i = 0; i < state.my_users.length; i++) {
            if (state.my_users[i].login !== login) {
                tempUser.push(this.my_users[i]);
            }
        }
        dispatch({ type: REMOVE_USER_FROM_TEAM, payload: tempUser });
        //setRedirectTo(redirectPath);
    };

    const addUserToTeam = async (myUser, redirectPath) => {
        console.log(gitHubContext)
        console.log(myUser)

        alertDialogContext.setAlertDialog(
            true, 'Got to add user.', 'Info'
        );
        // let foundDuplicate = false;
        // for (let j = 0; j < state.my_users.length; j++) {
        //     if (state.my_users[j].login === this.myUser.login) {
        //         foundDuplicate = true;
        //     }
        // }
        // if (foundDuplicate) {
        //     alertDialogContext.setAlertDialog(
        //         'Developer already in My Team, human cloning not currently implemented.'
        //     );
        // } else {
        //     let tempUser = state.my_users.slice(0);
        //     tempUser.push(myUser);
        //     let tempUser2 = [];
        //     for (var i = 0; i < gitHubContext.users.length; i++) {
        //         if (gitHubContext.users[i].login !== myUser.login) {
        //             tempUser2.push(gitHubContext.users[i]);
        //         }
        //     }
        //     dispatch({ type: ADD_USER_TO_TEAM, payload: tempUser });
        //     //setUsers(tempUser2);
        // }
        //setRedirectTo(redirectPath);
    };

    return (
        <TeamContext.Provider
            value={{
                my_users: state.my_users,
                my_teams: state.my_teams,
                addUserToTeam,
                removeUserFromTeam,
            }}
        >
            {props.children}
        </TeamContext.Provider>
    );
};

export default TeamState;