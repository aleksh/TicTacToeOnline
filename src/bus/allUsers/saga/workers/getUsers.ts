
import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { MODAL_TYPES } from "../../../../components/Modals/Modals";
import { auth, fb } from "../../../../init/firebaseConfig";
import VOUser from "../../../../VO/VOUser";
import { allUsersActions } from "../../../allUsers/actions";
import { gameActions } from "../../../game/actions";
import { modalActions } from "../../../modal/actions";
import { userActions } from "../../../user/actions";


export function* getUsers() {
    try {
        const channel = yield call(_createUsersChannel);

        while (true) {

            const snap = yield take(channel);
            if (snap.exists()) {
                let usersList: VOUser[] = [];
                let currentUser: any;
                const userId: any = auth.currentUser!.uid;
                snap.forEach((child: any) => {
                    if (userId !== child.val().uid) {
                        usersList.push(child.val() as VOUser);
                    } else {
                        currentUser = child.val() as VOUser;
                    }
                });

                yield put(userActions.setUser(currentUser));
                let game: any = yield select(getState);

                // check if your opponent goes offline during the game
                if (game.choosedUser && !game.choosedUser.isOnline && game.isPlaying) {
                    yield put(gameActions.removeGameAsync(game.gameId));
                    yield put(modalActions.showModal({
                        modalType: MODAL_TYPES.INFO,
                        modalProps: {
                            message: game.choosedUser.displayName + " is disconnected",
                        }
                    }));
                }

                yield put(allUsersActions.updateUsers(usersList));
            }

        }

    } catch (error) {
        yield put(modalActions.showError('Error getUsers saga'));
    }
}


const _createUsersChannel = () => {
    return eventChannel((emit): any => {
        const ref = fb.database().ref("users");
        ref.on('value', snap => {
            emit(snap);
        })

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe
    });
}

export const getState = (state: any) => {
    return {
        choosedUser: state.allUsers.get("choosedUser"),
        gameId: state.game.get("gameId"),
        isPlaying: state.game.get("isPlaying"),
    };
};
