// Types
import { types } from './types';
import { Map} from 'immutable';
import VOUser from '../../VO/VOUser';

const initialState = Map ({
    //user: new VOUser("111", "aaaa","https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg"), 
    user: null,    
});

export const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.SET_USER:
            return state.set('user', action.payload);        

        case types.LOGOUT: 
            return state.clear();
        
        default:
            return state;
    }
};
