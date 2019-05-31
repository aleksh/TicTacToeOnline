// Types
import { Map } from "immutable";
import { types } from "./types";

const initialState = Map({
    user: null,
});

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SET_USER:
            return state.set('user', action.payload);

        case types.LOGOUT:
            return state.clear();

        default:
            return state;
    }
};
