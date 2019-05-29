import { call, put, apply, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

// Instruments
import {
    fb, auth
} from "../../../../init/firebaseConfig";
import { gameActions } from "../../actions";
import { allUsersActions } from "../../../allUsers/actions";

export function* subscribeForCurrentGame({ payload: { gameId, isItFirstPlayer } }: any) {
    const channel = yield call(_createGameChannel, gameId);
    let isPlaying = true;

    try {
        console.log("subscribeForCurrentGame Saga");

        while (isPlaying) {
            const snap = yield take(channel);
            console.log("inviteToGame ONNNN")
            //console.log(snap.val());            
            if (snap.exists()) {

                if (snap.val().isPlaying) {
                    const stepId = snap.val().stepId;
                    // set choice from DB depends on  who did it
                    if ((isItFirstPlayer && snap.val().isFirstPlayerTurn && stepId !== 0) || (!isItFirstPlayer && !snap.val().isFirstPlayerTurn && stepId !== 0)) {
                        yield put(gameActions.setChoice(stepId));
                    }
                }

            } else {
                channel.close();
                isPlaying = false;
                yield put(gameActions.subscribeForGamesAsync());
            }
        }

    } catch (error) {
        console.log("subscribeForCurrentGame saga Error");
        channel.close();
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        channel.close();
        console.log("subscribeForCurrentGame saga completed");
    }
}

const _createGameChannel = (gameId: any) => {
    return eventChannel((emit): any => {
        const ref = fb.database().ref(`games/${gameId}`);
        ref.on('value', snap => {
            emit(snap);
        })

        const unsubscribe = () => {
            ref.off();
        }

        return unsubscribe;
    });
}
