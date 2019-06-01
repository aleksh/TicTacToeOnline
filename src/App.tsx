import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameActions } from "./bus/game/actions";
import { userActions } from "./bus/user/actions";
import Catcher from "./components/Catcher/Catcher";
import Game from "./components/Game/Game";
import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import Modals from "./components/Modals/Modals";
import Opponents from "./components/Opponents/Opponents";
import User from "./components/User/User";

interface IAppProps {
	isInitialized: boolean;
	isLoggedIn: boolean;
	actions: any;
}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
	componentDidMount = () => {
		this.props.actions.authChangedAsync();

		// move this when user LogedIn
		this.props.actions.subscribeForGamesAsync();
    };    

	_handlerLogin = () => {
		const { actions } = this.props;
		actions.loginAsync();
	};

	public render() {
		const { isInitialized, isLoggedIn } = this.props;

		if (!isInitialized) {
			return <Loading />;
		}

		return !isLoggedIn ? (
			<Login click={this._handlerLogin} />
		) : (
			<Catcher>
				<div className="container-fluid">
					<div className="row justify-content-center flex-nowrap">
						<User />
						<Game />
						<Opponents />
					</div>
				</div>
				<Modals />
			</Catcher>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		isInitialized: state.user.get("isInitialized"),
		isLoggedIn: state.user.get("isLoggedIn")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(
			{ ...userActions, ...gameActions },
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
