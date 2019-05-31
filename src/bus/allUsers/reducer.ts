import { Map } from "immutable";
import { PC_USERS } from "../../utils/Constants";
import VOUser from "../../VO/VOUser";
import { types } from "./types";

const initialState = Map({
    allUsers: PC_USERS,
    choosedUser: PC_USERS[0],
});

export const allUsersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.CHOOSE_OPPONENT:

            return state.set("choosedUser", action.payload);
        case types.UPDATE_USERS_LIST:
            let choosedUser = state.get("choosedUser") as VOUser;
            let users: VOUser[] = action.payload;

            if (choosedUser) {
                let getUpdatedUser = users.filter((user) => user.uid === choosedUser.uid)
                if (getUpdatedUser.length > 0) {
                    choosedUser = getUpdatedUser[0];
                }
            }

            const usersList = [...PC_USERS, ...users];
            return state.merge({ allUsers: usersList, choosedUser });

        default:
            return state;
    }
};
