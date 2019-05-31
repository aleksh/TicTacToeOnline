// Types
import { MODAL_TYPES } from "../../components/Modals/Modals";
import { types } from "./types";

export const modalActions = {

    showModal: (props: any) => {
        return {
            type: types.SHOW_MODAL,
            payload: props,
        };
    },

    hideModal: () => {
        return {
            type: types.HIDE_MODAL,
        };
    },

    showError: (message: string) => {
        return {
            type: types.SHOW_MODAL,
            payload: {
                modalType: MODAL_TYPES.INFO,
                modalProps: { message }
            },
        };
    },

    confirmYes: () => {
        return {
            type: types.CONFIRM_YES,
        };
    },

    confirmNo: () => {
        return {
            type: types.CONFIRM_NO,
        };
    },

};
