// Types
import { types } from './types';
import VOUser from '../../VO/VOUser';

export const userActions = {

    // Sync
    setUser: (user: VOUser) => {
        return {
            type: types.SET_USER,
            payload: user,
        };
    },

    logout: () => {
        return {
            type: types.LOGOUT,
        }
    },

    // Async
    loginAsync: () => {
        return {
            type: types.LOGIN_ASYNC,
        };
    },


    logoutAsync: () => {
        return {
            type: types.LOGOUT_ASYNC,
        };
    },

    authChangedAsync: () => {
        return {
            type: types.AUTH_CHANGED_ASYNC,
        };
    },
}