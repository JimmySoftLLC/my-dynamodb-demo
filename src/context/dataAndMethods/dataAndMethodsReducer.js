import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    ADD_USER_TO_TEAM,
    REMOVE_USER_FROM_TEAM,
    SET_ON_MY_TEAM_PAGE,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_ON_MY_TEAM_PAGE:
            return {
                ...state,
                onMyTeamPage: action.payload,
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };
        case ADD_USER_TO_TEAM:
            return {
                ...state,
                my_users: action.payload,
                loading: false,
            };
        case REMOVE_USER_FROM_TEAM:
            return {
                ...state,
                my_users: action.payload,
                team_data: JSON.stringify(action.payload),
            };
        default:
            return state;
    }
};
