// Types
import { types } from './types';
import { Map} from 'immutable';

const initialState = Map ({
    isLoggedIn: false,    
});

export const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.LOGIN:
            return state.set('isLoggedIn', true);

        case types.LOGOUT:
            return state.set('isLoggedIn', false);

        default:
            return state;
    }
};
