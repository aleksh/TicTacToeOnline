import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyBApghjyCca6umqEEJ-rc_R41h92Ixuqp8",
    authDomain: "tic-tac-game-504c0.firebaseapp.com",
    databaseURL: "https://tic-tac-game-504c0.firebaseio.com",
    projectId: "tic-tac-game-504c0",
    storageBucket: "tic-tac-game-504c0.appspot.com",
    messagingSenderId: "635413277069",
    appId: "1:635413277069:web:5a191563cf13e8de"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
