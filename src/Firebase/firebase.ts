import firebase from 'firebase';
import { allUsersActions } from "../bus/allUsers/actions";
import { gameActions } from "../bus/game/actions";
import { userActions } from "../bus/user/actions";
import { firebaseConfig } from "../init/firebaseConfig";
import { store } from "../init/store";


export const fb = firebase.initializeApp(firebaseConfig);
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();

let isItFirstPlayer: boolean = false;
let gameId: any = "";
let gamesRef: firebase.database.Reference;
let currentGameRef: firebase.database.Reference;

let type = 3;
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
                    type = Number(child.val().type);
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

                if (!isItFirstPlayer) { ////////////////////////////////////////////////////// HERE POPUP FOR GAME INVITE
                    dispatch(actions.setOpponent(opponentUser));
                    //console.log("invitedMe");

                    ////////////////////////////////// DECLINE GAME
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
                                amICross: false,
                                type,
                                isItFirstPlayer: false,                                
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
    /// get all users for users List    
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

const actions = { ...gameActions, ...userActions, ...allUsersActions };

const dispatch = (action: any) => {
    store.dispatch(action);
}