import React from "react";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, providerFacebook, fb } from "./init/firebaseConfig";

import { userActions } from "./bus/user/actions";
import { allUsersActions } from "./bus/allUsers/actions";
import { gameActions } from "./bus/game/actions";
import VOUser from "./VO/VOUser";
import User from "./components/User/User";
import Game from "./components/Game/Game";
import Opponents from "./components/Opponents/Opponents";

interface IAppProps {
	isMyTurn: boolean;
	user: VOUser;
	actions: any;
}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
	componentDidMount = () => {        
		//auth.signOut();
		// need add is Loading state for user global
		auth.onAuthStateChanged((user: any) => {
			//	console.log("Check if user logged in");
			//	console.log(user);
			if (user) {
             //   runActionToTest();
				this._checkIfUserExistIDB(user);
				this._addListenersForGame();
			}
		});
	};

	_addListenersForGame = () => {
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
				this.props.actions.updateUsers(usersList);
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
						this.props.actions.setOpponent(opponentUser);
						//console.log("invitedMe");
						// console.log("DECLINE GAME");
						//fb.database().ref(`games/${gameKey}`).remove();

						console.log("APP START PlayGame");
						fb.database()
							.ref(`games/${gameId}`)
							.child("isPlaying")
							.set(true);

						this.props.actions.playWithUser({
							gameId,
							isMyTurn: false,
							amICross: false
						});
					}

					fb.database()
						.ref(`games/${gameId}`)
						.child("stepId")
						.on("value", snapshot => {
							console.log("STEPID ");
							console.log(this.props.isMyTurn);
							console.log(snapshot.val());
							if (!this.props.isMyTurn && snapshot.val() !== 0) {
								this.props.actions.setChoice(snapshot.val());
							}
						});
				}
			}
		});
	};

	_checkIfUserExistIDB = (user: any) => {
		//	console.log("_checkIfUserExistIDB");
		//	console.log(user);

		if (user) {
			fb.database()
				.ref("users/" + user.uid)
				.once("value")
				.then(snapshot => {
					var pIsUser = snapshot.val();
					if (pIsUser) {
						this._setUpUser(pIsUser);
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
										this._setUpUser(user);
									}
								}
							);
					}
				});
		}
	};

	_setUpUser = (user: any) => {
		const { actions } = this.props;

		const pUser: VOUser = new VOUser(
			user.uid,
			user.displayName,
			user.photoURL,
			true
		);
		actions.setUser(pUser);
	};

	_handlerLogin = () => {
		auth.signInWithPopup(providerFacebook);
	};

	public render() {
		const { user } = this.props;
		return !user ? (
			<Login click={this._handlerLogin} />
		) : (
			<div className="container-fluid">
				<div className="row justify-content-center">
					<User />
					<Game />
					<Opponents />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		user: state.user.get("user"),
		isMyTurn: state.game.get("isMyTurn")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(
			{ ...userActions, ...allUsersActions, ...gameActions },
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
