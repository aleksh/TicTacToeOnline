import React from "react";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, providerFacebook, fb } from "./init/firebaseConfig";

import { userActions } from "./bus/user/actions";
import VOUser from "./VO/VOUser";
import User from "./components/User/User";
import Game from "./components/Game/Game";
import Opponents from "./components/Opponents/Opponents";

interface IAppProps {
	user: VOUser;
	actions: any;
}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
	componentDidMount = () => {
		//auth.signOut();
		// need add is Loading state for user global

		auth.onAuthStateChanged((user: any) => {
			console.log("Check if user logged in");
			console.log(user);
			if (user) {
				this._checkIfUserExistIDB(user);
			}
		});
	};

	_checkIfUserExistIDB = (user: any) => {
		console.log("_checkIfUserExistIDB");
		console.log(user);

		if (user) {
			if (user) {
				fb.database()
					.ref("users/" + user.uid)
					.once("value")
					.then(snapshot => {
						var pIsUser = snapshot.val();
						if (pIsUser) {
							console.log("_setUpUser 3333333333333333333");
							this._setUpUser(pIsUser);
							console.log("User exist");
						} else {
							console.log("User Null");
							fb.database()
								.ref("users/" + user.uid)
								.set(
									{
										uid: user.uid,
										displayName: user.displayName,
										photoURL: user.photoURL
									},
									error => {
										if (error) {
											// The write failed...
											console.log(
												"error Save User Data" + error
											);
										} else {
											// Data saved successfully!
											console.log(
												"data new User Data Saved"
											);
											console.log(
												"_setUpUser 222222222222222"
											);
											this._setUpUser(user);
										}
									}
								);
						}
					});
			}
		}
	};

	_setUpUser = (user: any) => {
		const { actions } = this.props;

		const pUser: VOUser = new VOUser(
			user.uid,
			user.displayName,
			user.photoURL
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
		user: state.user.get("user")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...userActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
