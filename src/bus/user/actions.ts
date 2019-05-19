// Types
import { types } from './types';

export const userActions = {
    
    // Sync
    login: (user:any) => {
        return {
            type:    types.LOGIN,
            payload: user,
        };
    },    

    // Async
    loginAsync: (data:any) => {
        return {
            type:       types.LOGIN_ASYNC,
            payload:    data
        }
    },   
    
}