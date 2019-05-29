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
        console.log("hide Modal Action");
        return {
            type: types.HIDE_MODAL,
        };
    },
   
};
