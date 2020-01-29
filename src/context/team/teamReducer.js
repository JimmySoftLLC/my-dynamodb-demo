import {
    ADD_USER_TO_TEAM,
    REMOVE_USER_FROM_TEAM
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case ADD_USER_TO_TEAM:
            return {
                ...state,
                user: action.payload,
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