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



export const _addListenersForGame = () => {

    console.log("GET STATE FROM STORE");
    console.log();
    /// get all users for users List
    var starCountRef = fb.database().ref("users");
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

    let gameId: any = "";
    //////////////////////////check for game invite
    const gamesRef = fb.database().ref("games");
    let isItFirstUser = false;

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
                    //Accept Invite
                } else if (child.val().player1.uid === userId) {
                    /// need refactro fro first user get game id from store
                    gameId = child.key;
                    isItFirstUser = true;
                }
            });

            console.log(" GAME KEY ");
            console.log(gameId);
            if (String(gameId).length > 0) {
                console.log(" ccccccccccccccccccccccccccc ");
                //unsubscribe from games by the end of game
                gamesRef.off();

                if (!isItFirstUser) {
                    dispatch(actions.setOpponent(opponentUser));
                    //console.log("invitedMe");
                    // console.log("DECLINE GAME");
                    //fb.database().ref(`games/${gameKey}`).remove();

                    console.log("APP START PlayGame");
                    fb.database()
                        .ref(`games/${gameId}`)
                        .child("isPlaying")
                        .set(true);

                    dispatch(actions.playWithUser({
                        gameId,
                        isMyTurn: false,
                        amICross: false
                    }));
                }

                fb.database()
                    .ref(`games/${gameId}`)
                    .child("stepId")
                    .on("value", snapshot => {
                        console.log("STEPID ");
                        console.log("isMy Turn drom STORE" + store.getState().game.get("isMyTurn"));
                        console.log(snapshot.val());
                        if (!store.getState().game.get("isMyTurn") && snapshot.val() !== 0) {
                            dispatch(actions.setChoice(snapshot.val()));
                        }
                    });
            }
        }
    });
};










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