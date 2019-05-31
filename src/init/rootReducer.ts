import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { allUsersReducer as allUsers } from "../bus/allUsers/reducer";
import { gameReducer as game } from "../bus/game/reducer";
import { modalReducer as modal } from "../bus/modal/reducer";
import { userReducer as user } from "../bus/user/reducer";

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    user,
    game,
    allUsers,
    modal
})
