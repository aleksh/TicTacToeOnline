import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameActions } from "./bus/game/actions";
import { userActions } from "./bus/user/actions";
import Catcher from "./components/Catcher/Catcher";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import Modals from "./components/Modals/Modals";
import Opponents from "./components/Opponents/Opponents";
import User from "./components/User/User";
import VOUser from "./VO/VOUser";

interface IAppProps {
	user: VOUser;
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
		const { user } = this.props;
		return !user ? (
			<Login click={this._handlerLogin} />
		) : (
			<Catcher>
				<div className="container-fluid">
					<div className="row justify-content-center">
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
		user: state.user.get("user")
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
