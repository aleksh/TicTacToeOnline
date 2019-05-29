import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import Modals from "./components/Modals/Modals";
import Opponents from "./components/Opponents/Opponents";
import User from "./components/User/User";
import { userActions } from "./bus/user/actions";
import { gameActions } from "./bus/game/actions";
import VOUser from "./VO/VOUser";

interface IAppProps {
	user: VOUser;
	actions: any;
}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
	componentDidMount = () => {		
        
        this.props.actions.authChangedAsync();        
        this.props.actions.subscribeForGamesAsync(); 

     /*   auth.onAuthStateChanged((user: any) => {
			//	console.log("Check if user logged in");
			//	console.log(user);
			if (user) {
				_checkIfUserExistIDB(user);
				_addListenersForGame();
				console.log("USER  LOGIN  OUT");
			} else {
				console.log("USER Sign OUT");
				this.props.actions.logout();
			}
        });    */
      //  _addListenersForGame();

	};

	_handlerLogin = () => {
		const { actions } = this.props;
		actions.loginAsync();
	};

	public render() {
		const { user } = this.props;
		return !user ? (
			<Login click={this._handlerLogin} />
		) : (
			<>
				<div className="container-fluid">
					<div className="row justify-content-center">
						<User />
						<Game />
						<Opponents />
					</div>
				</div>
				<Modals />
			</>
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
		actions: bindActionCreators({ ...userActions, ...gameActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
