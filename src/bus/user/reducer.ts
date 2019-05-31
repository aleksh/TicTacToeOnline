// Types
import { Map } from "immutable";
import { types } from "./types";

const initialState = Map({
    isLoggedIn: false,
    user: null,
});

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SET_USER:          
            return state.merge({
                user: action.payload,
                isLoggedIn: true,
            });

        case types.LOGOUT:
            return state.clear();

        default:
            return state;
    }
};
