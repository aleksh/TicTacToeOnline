import firebase from 'firebase';
import { firebaseConfig } from "../init/firebaseConfig";
import { gameActions } from "../bus/game/actions";
import { userActions } from "../bus/user/actions";
import { allUsersActions } from "../bus/allUsers/actions";

import { store } from "../init/store";
import VOUser from '../VO/VOUser';
import { Ref } from 'react';

export const fb = firebase.initializeApp(firebaseConfig);
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();

let isMyTurn = false;

export const inviteToPlay = (invite: object) => {

    fb.database().ref("games").push(invite).then((response) => {
        const gameId = response.key;
        console.log("KKKKKKKKKEEEYYY");
        console.log(gameId);
        const curGameRef = fb.database().ref(`games/${gameId}`);
        curGameRef.on('value', snapshot => {
            console.log("snaphott GAAAAME waiting for invite");
            console.log(snapshot.val());

            if (snapshot.exists()) {
                console.log("OPPONENT COMP Play Game");
                console.log(snapshot.val());

                if (snapshot.val().isPlaying === true) {
                    curGameRef.off();

                    // const reStepId = fb.database().ref(`games/${key}`)

                    dispatch(actions.playWithUser({
                        gameId,
                        isMyTurn: true,
                        amICross: true,
                    }));


                    console.log("Play Game");
                }
            } else {
                //Decline or Game End
            }
        })
    });
}

let starCountRef: firebase.database.Reference;

const addUsersListListener = () => {
    starCountRef = fb.database().ref("users");
    starCountRef.on("value", snapshot => {
        let usersList: VOUser[] = [];
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                usersList.push(child.val() as VOUser);
            });

            const userId: any = auth.currentUser!.uid;
            if (auth.currentUser && auth.currentUser.uid) {
                usersList = usersList.filter(item => item.uid !== userId);
            }

            dispatch(actions.updateUsers(usersList));
        }
    });
}

let isItFirstPlayer: boolean = false;
let gameId: any = "";
let gamesRef: firebase.database.Reference;
let currentGameRef: firebase.database.Reference;


const addAllGamesListener = () => {

    console.log("ADD addAllGamesListener");
    gamesRef = fb.database().ref("games");
    //////////////////////////check for game invite
    gamesRef.on("value", snapshot => {
        if (snapshot.exists()) {
            //check if user isnot playing
            const userId: any = auth.currentUser!.uid;
            let opponentUser: any;
            console.log("check GAMES");
            snapshot.forEach(child => {
                if (child.val().player2.uid === userId) {
                    gameId = child.key;
                    opponentUser = child.val().player1;
                    isItFirstPlayer = false;
                    //Accept Invite
                } else if (child.val().player1.uid === userId) {
                    /// need refactro fro first user get game id from store
                    gameId = child.key;
                    isItFirstPlayer = true;
                }
            });

            console.log(" GAME KEY ");
            console.log(gameId);
            if (String(gameId).length > 0) {
                console.log(" ccccccccccccccccccccccccccc ");
                //unsubscribe from games by the end of game
                gamesRef.off();
                console.log("REMOVE addAllGamesListener");

                if (!isItFirstPlayer) {
                    dispatch(actions.setOpponent(opponentUser));
                    //console.log("invitedMe");
                    // console.log("DECLINE GAME");
                    //fb.database().ref(`games/${gameKey}`).remove();

                    console.log("APP START PlayGame");
                    fb.database()
                        .ref(`games/${gameId}`)
                        .child("isPlaying")
                        .set(true).then((value) => {
                            console.log("start Game Play ===> " + value);
                            dispatch(actions.playWithUser({
                                gameId,
                                isMyTurn: false,
                                amICross: false
                            }));
                        });

                    isMyTurn = false;
                } else {
                    isMyTurn = true;
                }

                currentGameRef = fb.database().ref(`games/${gameId}`);
                currentGameRef.child("stepId")
                    .on("value", (snapshot) => {
                        const stepId = snapshot.val();

                        if (isMyTurn === false && stepId !== 0) {
                            dispatch(actions.setChoice(stepId));
                            isMyTurn = true;
                        }
                });
            }
        }
    });
}

export const _addListenersForGame = () => {
    console.log("GET STATE FROM STORE");
    console.log();
    /// get all users for users List
    addUsersListListener();
    addAllGamesListener();
};

export const removeGame = (id: any) => {
    if (currentGameRef) {
        console.log("REMOVE GAME FROM DATABASE");
        currentGameRef.off();
        currentGameRef.remove();
        gameId = "";        
    }
};

export const setChoiceToDB = (gameId: any, stepId: any) => {
    isMyTurn = true;
    fb.database().ref(`games/${gameId}`)
        .child("stepId")
        .set(stepId).then((res) => {
            isMyTurn = false;
        });
}



export const _checkIfUserExistIDB = (user: any) => {
    //	console.log("_checkIfUserExistIDB");
    //	console.log(user);
    if (user) {
        fb.database()
            .ref("users/" + user.uid)
            .once("value")
            .then(snapshot => {
                var pIsUser = snapshot.val();
                if (pIsUser) {
                    _setUpUser(pIsUser);
                } else {
                    fb.database()
                        .ref("users/" + user.uid)
                        .set(
                            {
                                uid: user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                                isOnline: true
                            },
                            error => {
                                if (error) {
                                } else {
                                    _setUpUser(user);
                                }
                            }
                        );
                }
            });
    }
};

const _setUpUser = (user: any) => {

    const pUser: VOUser = new VOUser(
        user.uid,
        user.displayName,
        user.photoURL,
        true
    );
    dispatch(actions.setUser(pUser));
};


const actions = { ...gameActions, ...userActions, ...allUsersActions };

const dispatch = (action: any) => {
    store.dispatch(action);
}

/*
let isMyTurn = false;
store.subscribe(() => {
    console.log("STORE SUBSCRIBE");

    console.log(store.getState().game.get("isMyTurn"));
    console.log(store.getState().game.get("items"));
})
*/