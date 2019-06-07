// Types
import VOUser from "../../VO/VOUser";
import { types } from "./types";

export const userActions = {

    // Sync
    initialized: () => {
        return {
            type: types.INITIALIZED,
        };
    },

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

    profileUpdating: () => {
        return {
            type: types.PROFILE_UPDATING,
        }
    },

    profileUpdated: (data:any) => {
        return {
            type: types.PROFILE_UPDATED,
            payload: data,
        }
    },

    profileUpdateReset: () => {
        return {
            type: types.PROFILE_UPDATE_RESET,
        }
    },

    profileUpdateError: () => {
        return {
            type: types.PROFILE_UPDATE_ERROR,
        }
    },

    // Async
    loginAsync: (provider: any) => {
        return {
            type: types.LOGIN_ASYNC,
            payload: provider,
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

    updateProfile: (data: any) => {
        return {
            type: types.UPDATE_PROFILE_ASYNC,
            payload: data,
        };
    },
}