// Types
import { Map } from "immutable";
import { types } from "./types";

const initialState = Map({
    isLoggedIn: false,
    isInitialized: false,
    isSubscribed: false,
    user: null,
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

        case types.LOGOUT:
            return state.merge({
                user: null,
                isLoggedIn: false,
            });

        default:
            return state;
    }
};
