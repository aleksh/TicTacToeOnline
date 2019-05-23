// Types
import { types } from './types';
import VOUser from '../../VO/VOUser';

export const userActions = {
    
    // Sync
    setUser: (user:VOUser) => {
        return {
            type:    types.SET_USER,
            payload: user,
        };
    },    
    
}