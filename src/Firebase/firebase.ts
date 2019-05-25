import firebase from 'firebase';
import { firebaseConfig } from "../init/firebaseConfig";
import { gameActions } from "../bus/game/actions";
import { userActions } from "../bus/user/actions";
import { allUsersActions } from "../bus/allUsers/actions";

import { store } from "../init/store";
import VOUser from '../VO/VOUser';

export const fb = firebase.initializeApp(firebaseConfig);
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();

let starCountRef: firebase.database.Reference;
let isItFirstPlayer: boolean = false;
let gameId: any = "";
let gamesRef: firebase.database.Reference;
let currentGameRef: firebase.database.Reference;

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


export const inviteToPlay = (invite: object) => {
    fb.database().ref("games").push(invite).then((response) => {
        const gameId = response.key;
        currentGameRef = fb.database().ref(`games/${gameId}`);
        currentGameRef.on('value', snapshot => {

            if (snapshot.exists()) {
                console.log("OPPONENT COMP Play Game");
                const stepId = snapshot.val().stepId;

                if (snapshot.val().isPlaying === true && stepId === 0) {
                    // const reStepId = fb.database().ref(`games/${key}`)

                    dispatch(actions.playWithUser({
                        gameId,
                        isMyTurn: true,
                        amICross: true,
                    }));

                    console.log("inviteToPlay");
                } else if (stepId !== 0) {
                    console.log("FIRST USER GET ID " + stepId);
                    if (snapshot.val().isFirstPlayerTurn) {
                        dispatch(actions.setChoice(stepId));
                    }
                }

            } else {
                //Decline or Game End
                removeGame();
            }
        })
    });
}


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
                    currentGameRef = fb.database().ref(`games/${gameId}`);
                    console.log("APP START PlayGame");
                    currentGameRef.child("isPlaying")
                        .set(true).then((value) => {
                            console.log("start Game Play ===> " + value);
                            dispatch(actions.playWithUser({
                                gameId,
                                isMyTurn: false,
                                amICross: false
                            }));
                        });

                   
                    currentGameRef.on("value", (snapshot) => {
                        if (snapshot.exists()) {
                            if (snapshot.val().isPlaying) {
                                const stepId = snapshot.val().stepId;
                                console.log("SECOND USER GET ID " + stepId);

                                if (!snapshot.val().isFirstPlayerTurn && stepId !== 0) {
                                    dispatch(actions.setChoice(stepId));
                                }
                            }
                        }
                    });
                }
            }
        }
    });
}


/// need remove games if User disconected  ( need on serverside)


export const _addListenersForGame = () => {
    console.log("GET STATE FROM STORE");
    console.log();
    /// get all users for users List
    addUsersListListener();
    addAllGamesListener();
};

export const removeGame = () => {
    if (currentGameRef) {
        console.log("REMOVE GAME FROM DATABASE");
        currentGameRef.off();
        currentGameRef.remove();
        gameId = "";
        isItFirstPlayer = false;

        addAllGamesListener();        
    }
};

export const setChoiceToDB = (gameId: any, stepId: any) => {
    fb.database().ref(`games/${gameId}`)
        .update({ stepId, isFirstPlayerTurn: !isItFirstPlayer })
}


export const _checkIfUserExistIDB = (user: any) => {
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