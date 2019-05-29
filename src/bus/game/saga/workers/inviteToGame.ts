import { eventChannel } from "redux-saga";
import { call, put, take } from 'redux-saga/effects';
// Instruments
import { fb } from "../../../../Firebase/firebase";
import { gameActions } from "../../../game/actions";


export function* inviteToGame({ payload }: any) {
    console.log("inviteToGame");

    const { gameId } = yield call(_sendInvite, payload);
    const channel = yield call(_createFirstUserGameChannel, gameId);
    let isListening = true;

    try {
        while (isListening) {
            const snap = yield take(channel);
            console.log("inviteToGame ONNNN")
            //console.log(snap.val());            
            if (snap.exists()) {
                console.log("OPPONENT COMP Play Game");
                const stepId = snap.val().stepId;

                if (snap.val().isPlaying === true && stepId === 0) {
                    yield put(gameActions.playWithUser({
                        gameId,
                        isMyTurn: true,
                        amICross: true,
                        type: snap.val().type,
                        isItFirstPlayer: true,
                    }));
                    console.log("inviteToPlay");

                } else if (snap.val().isFirstPlayerTurn && stepId !== 0) {
                    yield put(gameActions.setChoice(stepId));
                }
            } else {
                isListening = false;
                // means user decline accept
                channel.close();
                console.log("CLOSE Channel and Remove Game ");
                //yield put(gameActions.removeGameAsync(gameId));
            }
        }
    } catch (error) {
        console.log("inviteToGame saga Error");
        channel.close();
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        channel.close();
        console.log('inviteToGame CLOSE CHANELL');
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