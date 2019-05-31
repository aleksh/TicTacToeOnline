// Types
import { Map } from "immutable";
import { types } from "./types";

const initialState = Map({
    modalType: null,
    modalProps: null,
});

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.SHOW_MODAL:
            return state.merge({
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps
            });

        case types.HIDE_MODAL:
            return state.clear();

        default:
            return state;
    }
};
