// Types
import { types } from './types';

export const modalActions = {

    showModal: (props:any) => {
        return {
            type: types.SHOW_MODAL,
            payload:props, 
        };
    },

    hideModal: () => {        
        return {
            type: types.HIDE_MODAL,
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
