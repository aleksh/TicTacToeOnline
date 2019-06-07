// Types
import { Map } from "immutable";
import VOUser from "../../VO/VOUser";
import { types } from "./types";

const initialState = Map({
    isLoggedIn: false,
    isInitialized: false,
    isSubscribed: false,
    user: null,
    isUpdating: false,
    isUpdated: false,
    isUpdateError: false,
});

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SET_USER:
            return state.merge({
                user: action.payload,
                isLoggedIn: true,
                isInitialized: true,
                isSubscribed: true,
            });

        case types.INITIALIZED:
            return state.set("isInitialized", true);

        case types.PROFILE_UPDATING:
            return state.merge({
                isUpdating: true,
                isUpdated: false,
                isUpdateError: false,
            });
        case types.PROFILE_UPDATED:
            const user = <VOUser><unknown>state.get("user");
            const updatedData = { ...user, ...action.payload };

            return state.merge({
                user: updatedData,
                isUpdating: false,
                isUpdated: true,
                isUpdateError: false,
            });
        case types.PROFILE_UPDATE_ERROR:
            return state.merge({
                isUpdating: false,
                isUpdated: false,
                isUpdateError: true,
            });
        case types.PROFILE_UPDATE_RESET:
            return state.merge({
                isUpdating: false,
                isUpdated: false,
                isUpdateError: false,
            });
        case types.LOGOUT:
            return state.merge({
                user: null,
                isLoggedIn: false,
            });

        default:
            return state;
    }
};
