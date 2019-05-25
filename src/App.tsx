import React from "react";
import { connect } from "react-redux";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import Opponents from "./components/Opponents/Opponents";
import User from "./components/User/User";
import { auth, providerFacebook, _addListenersForGame, _checkIfUserExistIDB, fb } from "./Firebase/firebase";
import VOUser from "./VO/VOUser";


interface IAppProps {
	user: VOUser;
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
				_checkIfUserExistIDB(user);
                _addListenersForGame();                                
			}
		});
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

export default connect(
	mapStateToProps,
	null
)(App);
