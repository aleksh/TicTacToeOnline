// Types
import { types } from './types';
import { Map} from 'immutable';
import { PC_USERS } from '../../utils/Constsnts';
import VOUser from '../../VO/VOUser';

const initialState = Map ({
    allUsers: PC_USERS,
    choosedUser: {},
});

export const allUsersReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.CHOOSE_OPPONENT:            
            return state.set("choosedUser", action.payload);
        default:
            return state;
    }
};
