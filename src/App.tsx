import React from "react";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, providerFacebook } from "./init/firebaseConfig";

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
		const { actions } = this.props;
		//auth.signOut();
		// need add is Loading state for user global
		auth.onAuthStateChanged((user: any) => {
			console.log("Check if user logged in");
			if (user) {
				const pUser: VOUser = new VOUser(
					user.uid,
					user.displayName,
					user.photoURL
				);

				actions.setUser(pUser);
			}
		});
	};

	_handlerLogin = () => {
		const { actions } = this.props;
		console.log("click Login");
		auth.signInWithPopup(providerFacebook)
			.then(result => {
				const user: any = result.user;
				console.log(user);
				const pUser: VOUser = new VOUser(
					user.uid,
					user.displayName,
					user.photoURL
				);

				actions.setUser(pUser);
			})
			.catch(error => {
				console.log("Error Login");
			});
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
