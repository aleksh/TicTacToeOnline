import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { fb } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";
import { gameActions } from "../../actions";



export function* subscribeForCurrentGame({ payload: { gameId, isItFirstPlayer } }: any) {
    const channel = yield call(_createGameChannel, gameId);
    let isPlaying = true;

    try {

        while (isPlaying) {
            const snap = yield take(channel);
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
        channel.close();
        yield put(modalActions.showError('Error subscribeForCurrentGame saga'));
    } finally {
        channel.close();
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
