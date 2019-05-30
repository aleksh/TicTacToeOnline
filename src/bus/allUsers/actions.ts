// Types
import VOUser from '../../VO/VOUser';
import { types } from './types';

export const allUsersActions = {

    setOpponent: (pUser: VOUser) => {
        return {
            type: types.CHOOSE_OPPONENT,
            payload: pUser,
        };
    },

    test: () => {
        return {
            type: "test",
        };
    },


    updateUsers: (pUsers: VOUser[]) => {
        return {
            type: types.UPDATE_USERS_LIST,
            payload: pUsers,
        };
    },


    //get Users Async
    getUsersAsync: () => {
        return {
            type: types.GET_USERS_ASYNC,
        };
    },

}