// Types
import { types } from './types';

export const gameActions = {

    setChoice: (id:number) => {
        return {
            type: types.SET_CHOICE,
            payload: id,
        };
    }

};
