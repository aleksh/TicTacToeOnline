
import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { MODAL_TYPES } from "../../../../components/Modals/Modals";
import { auth, fb } from "../../../../init/firebaseConfig";
import VOUser from "../../../../VO/VOUser";
import { allUsersActions } from "../../../allUsers/actions";
import { gameActions } from "../../../game/actions";
import { modalActions } from "../../../modal/actions";


export function* getUsers() {
    try {
        const channel = yield call(_createUsersChannel);

        while (true) {

            const snap = yield take(channel);

            const userId: any = auth.currentUser!.uid;
            let needRemoveGame: boolean = false;
            let game: any = yield select(getState);

            if (snap.exists()) {
                let usersList: VOUser[] = [];

                snap.forEach((child: any) => {
                    let item = child.val();

                    // check if your opponent goes offline during the game
                    if (game.choosedUser && game.choosedUser.uid === item.uid && !item.isOnline && game.isPlaying) {
                        needRemoveGame = true;
                    }

                    if (userId !== item.uid) {
                        usersList.push(item as VOUser);
                    }
                });

                yield put(allUsersActions.updateUsers(usersList));

                // check if your opponent goes offline during the game
                if (needRemoveGame) {
                    yield put(gameActions.removeGameAsync(game.gameId));
                    yield put(modalActions.showModal({
                        modalType: MODAL_TYPES.INFO,
                        modalProps: {
                            message: game.choosedUser.displayName + " is disconnected",
                        }
                    }));
                }
            }

        }

    } catch (error) {
        yield put(modalActions.showError('Error getUsers saga => ' + error.message));
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
