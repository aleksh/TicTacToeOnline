// Types
import { types } from './types';
import VOUser from '../../VO/VOUser';

export const allUsersActions = {
    
    setOpponent: (id: number) => {
        return {
            type: types.CHOOSE_OPPONENT,
            payload: id,
        };
    },
    
}