// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

// Reducers
import { uiReducer as ui } from '../bus/ui/reducer';
import { userReducer as user } from '../bus/user/reducer';
import { gameReducer as game } from '../bus/game/reducer';
import { allUsersReducer as allUsers } from '../bus/allUsers/reducer';

export const rootReducer = (history:any) => combineReducers({
    router: connectRouter(history),
    ui,
    user,
    game,
    allUsers
})
