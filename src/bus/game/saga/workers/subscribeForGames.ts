import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
// Instruments
import { auth, fb } from '../../../../init/firebaseConfig';
import GameUtils from '../../../../utils/GameUtils';
import { allUsersActions } from "../../../allUsers/actions";
import { confirmSaga } from '../../../modal/saga/workers/index';
import { gameActions } from "../../actions";


export function* subscribeForGames() {

    const channel = yield call(_createGamesChannel);
    let isGameNotFound = true;
    let game: any = {};

    try {

        while (isGameNotFound) {
            const snap = yield take(channel);

            if (snap.exists()) {
                const userId: any = auth.currentUser!.uid;

                snap.forEach((child: any) => {
                    if (child.val().player2.uid === userId) {
                        game.type = Number(child.val().type);
                        game.gameId = child.key;
                        game.opponentUser = child.val().player1;
                        //Accept Invite
                    } else if (child.val().player1.uid === userId) {
                        isGameNotFound = false;
                        channel.close();
                    }
                });

                if (game.gameId !== undefined && String(game.gameId).length > 0) {
                    isGameNotFound = false;
                    channel.close();
                }
            }
        }

        if (game.gameId !== undefined && String(game.gameId).length > 0) {
            channel.close();

            const confirmed = yield call(confirmSaga, GameUtils.GetInviteMessage(game.opponentUser));
            const isGameStillExist = yield call(_checkIfGameStillExist, game.gameId);

            if (confirmed && isGameStillExist) {

                yield put(allUsersActions.setOpponent(game.opponentUser));
                const data = yield call(_acceptGame, game);

                if (data) {
                    yield put(gameActions.playWithUser({
                        gameId: game.gameId,
                        isMyTurn: false,
                        amICross: false,
                        type: game.type,
                        isItFirstPlayer: false,
                    }));

                    yield put(gameActions.subscribeForCurrentGameAsync({ gameId: game.gameId, isItFirstPlayer: false }));
                }
            } else {
                yield put(gameActions.removeGameAsync(game.gameId));
                yield put(gameActions.subscribeForGamesAsync());
            }
        }

    } catch (error) {
        channel.close();
    } finally {
        channel.close();
    }
}

const _createGamesChannel = () => {
    return eventChannel((emit): any => {
        const ref = fb.database().ref(`games`);
        ref.on('value', snap => {
            emit(snap);
        })

        const unsubscribe = () => {
            ref.off();
        }

        return unsubscribe;
    });
}

const _acceptGame = (game: any) => {
    return new Promise((resolve, reject) => {
        fb.database().ref(`games/${game.gameId}`).child("isPlaying")
            .set(true).then((value) => {
                resolve(true);
            }).catch((error) => {
                reject(false)
            });
    });
}

const _checkIfGameStillExist = (gameId: string) => {
    return new Promise((resolve, reject) => {
        fb.database().ref('games').child(`${gameId}`).once('value', snap => {
            if (snap.exists()) {
                resolve(true)
            } else {
                resolve(false);
            }
        }).catch((error) => {
            resolve(false);
        });
    });
}