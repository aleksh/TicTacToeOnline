// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

// Reducers
import { uiReducer as ui } from '../bus/ui/reducer';
import { userReducer as user } from '../bus/user/reducer';

export const rootReducer = (history:any) => combineReducers({
    router: connectRouter(history),
    ui,
    user    
})
