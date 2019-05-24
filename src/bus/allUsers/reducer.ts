// Types
import { types } from './types';
import { Map} from 'immutable';
import { PC_USERS } from '../../utils/Constants';

const initialState = Map ({
    allUsers: PC_USERS,
    choosedUser: PC_USERS[0],
});

export const allUsersReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.CHOOSE_OPPONENT:            
            return state.set("choosedUser", action.payload);
        case types.UPDATE_USERS_LIST:
            console.log("AAAAAAAAAAAAAAAAAAAAAA");
            const usersList = [...PC_USERS, ...action.payload];
            return state.set("allUsers", usersList);
            
        default:
            return state;
    }
};
