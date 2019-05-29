import { call, put, apply, all, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

// Instruments
import {
    fb, auth
} from '../../../../init/firebaseConfig';
import { gameActions } from "../../actions";
import { allUsersActions } from "../../../allUsers/actions";

export function* subscribeForGames() {

    const channel = yield call(_createGamesChannel);
    let isGameNotFound = true;
    let game: any = {};

    try {
        console.log("subscribeForGames Saga");

        while (isGameNotFound) {
            const snap = yield take(channel);
            console.log("inviteToGame ONNNN")
            //console.log(snap.val());            
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
                    console.log(game)
                    isGameNotFound = false;
                    channel.close();
                    console.log("subscribeForGames saga Close Chanel Game Found");
                }
            }
        }

        if (game.gameId !== undefined && String(game.gameId).length > 0) {
            console.log(game);
            channel.close();
            //set Second player

            ////////////////////////////////// DECLINE GAME
            // console.log("DECLINE GAME");
            //fb.database().ref(`games/${gameKey}`).remove();

            // AcceptGame
            yield put(allUsersActions.setOpponent(game.opponentUser));
            // AcceptGame
            const data = yield call(_acceptGame, game);
            console.log("Accept Game Data");
            console.log(data);
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

            console.log("subscribeForGames saga Close Chanel Game Found");
        }


    } catch (error) {
        console.log("subscribeForGames saga Error" + error);
        channel.close();
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        channel.close();
        console.log("subscribeForGames saga completed");
        //yield put(userActions.stopUserFetching());
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