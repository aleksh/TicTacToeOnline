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
            let users:VOUser[] = state.get("allUsers") as VOUser[];
            const choosedUser = users.filter((item) => item.id === action.payload)[0];
            console.log(choosedUser)
            

            return state.set("choosedUser", choosedUser);
        default:
            return state;
    }
};
