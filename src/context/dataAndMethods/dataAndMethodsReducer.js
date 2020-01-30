import {
    SET_USERS,
    SET_LOADING,
    CLEAR_USERS,
    SET_USER,
    SET_REPOS,
    SET_MY_TEAM,
    SET_ON_MY_TEAM_PAGE,
    SET_REDIRECT_TO,
    SET_MY_TEAMS,
    SET_TEAM_ID,
    SET_TEAM_NAME,
    SET_TEAM_DATA,
    SET_AMAZON_RESPONSE,
    SET_EMAIL_TO,
    SET_EMAIL_SUBJECT,
    SET_EMAIL_BCC,
    SET_EMAIL_BODY,
    SET_EMAIL_CC,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_ON_MY_TEAM_PAGE:
            return {
                ...state,
                onMyTeamPage: action.payload,
            };
        case SET_REDIRECT_TO:
            return {
                ...state,
                redirectTo: action.payload,
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_REPOS:
            return {
                ...state,
                repos: action.payload,
            };
        case SET_MY_TEAM:
            return {
                ...state,
                my_team: action.payload,
                team_data: JSON.stringify(action.payload),
            };
        case SET_MY_TEAMS:
            return {
                ...state,
                my_teams: action.payload,
            };
        case SET_AMAZON_RESPONSE:
            return {
                ...state,
                amazonResponse: action.payload,
            };
        case SET_TEAM_ID:
            return {
                ...state,
                team_id: action.payload,
            };
        case SET_TEAM_NAME:
            return {
                ...state,
                team_name: action.payload,
            };
        case SET_TEAM_DATA:
            return {
                ...state,
                team_data: action.payload,
            };
        case SET_EMAIL_TO:
            return {
                ...state,
                email_to: action.payload,
            };
        case SET_EMAIL_SUBJECT:
            return {
                ...state,
                email_subject: action.payload,
            };
        case SET_EMAIL_BCC:
            return {
                ...state,
                email_bcc: action.payload,
            };
        case SET_EMAIL_BODY:
            return {
                ...state,
                email_body: action.payload,
            };
        case SET_EMAIL_CC:
            return {
                ...state,
                email_cc: action.payload,
            };
        default:
            return state;
    }
};
