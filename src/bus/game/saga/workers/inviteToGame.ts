import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { MODAL_TYPES } from "../../../../components/Modals/Modals";
import { fb } from "../../../../init/firebaseConfig";
import GameUtils from "../../../../utils/GameUtils";
import { gameActions } from "../../../game/actions";
import { modalActions } from "../../../modal/actions";


export function* inviteToGame({ payload }: any) {
    const { gameId } = yield call(_sendInvite, payload);
    const channel = yield call(_createFirstUserGameChannel, gameId);
    let isListening = true;

    yield put(modalActions.showModal({
        modalType: MODAL_TYPES.WAITING_FOR_OPPONENT,
        modalProps: {
            message: GameUtils.GetWaitOpponentMessage(payload.player2),
            gameId,
        }
    }))

    try {
        while (isListening) {
            const snap = yield take(channel);

            if (snap.exists()) {
                const stepId = snap.val().stepId;

                if (snap.val().isPlaying === true && stepId === 0) {
                    yield put(gameActions.playWithUser({
                        gameId,
                        isMyTurn: true,
                        amICross: true,
                        type: snap.val().type,
                        isItFirstPlayer: true,
                    }));
                    isListening = false;
                    channel.close();

                    yield put(modalActions.hideModal());
                    yield put(gameActions.subscribeForCurrentGameAsync({ gameId, isItFirstPlayer: true }));
                }
            } else {
                isListening = false;
                channel.close();

                yield put(gameActions.removeGameAsync(gameId));
                yield put(modalActions.hideModal());
                yield put(gameActions.subscribeForGamesAsync());
            }
        }
    } catch (error) {
        channel.close();
        yield put(modalActions.showError('Error inviteToGame saga'));
    } finally {
        channel.close();
    }
}

const _sendInvite = (invite: any) => {
    return new Promise((resolve, reject) => {
        fb.database().ref("games").push(invite).then((response) => {
            const gameId = response.key;
            resolve({ gameId });
        }).catch((error) => {
            reject({ error });
        });
    });
}

const _createFirstUserGameChannel = (gameId: string) => {
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