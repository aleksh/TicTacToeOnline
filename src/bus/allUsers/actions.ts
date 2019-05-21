// Types
import { types } from './types';
import VOUser from '../../VO/VOUser';

export const allUsersActions = {
    
    setOpponent: (pUser: VOUser) => {
        return {
            type: types.CHOOSE_OPPONENT,
            payload: pUser,
        };
    },
    
}