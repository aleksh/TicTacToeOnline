import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { allUsersActions } from "../../bus/allUsers/actions";
import { gameActions } from "../../bus/game/actions";
import GameUtils from "../../utils/GameUtils";
import VOUser from "../../VO/VOUser";
import UserCard from "../UserCard/UserCard";
import UsersList from "../UsersList/UsersList";

interface IOpponentsProps {
	user: VOUser;
	choosedUser: VOUser;
	allUsers: VOUser[];
	actions: any;
	isPlaying: boolean;
	type: number;
	disabled?: boolean;
}

interface IOpponentsState {}

class Opponents extends React.Component<IOpponentsProps, IOpponentsState> {
	_handlerInviteForPlay = () => {
		const { choosedUser, actions, user, type } = this.props;

		if (choosedUser.isPC) {
			actions.playWithPC();
		} else {
			const newGame = {
				player1: user,
				player2: choosedUser,
				stepId: 0,
				isPlaying: false,
				isFirstPlayerTurn: true,
				type
			};

			// invite Opponent
			this.props.actions.inviteToGameAsync(newGame);
		}
	};

	_handlerSetOpponent = (pUser: VOUser) => {
		const { actions } = this.props;
		actions.setOpponent(pUser);
	};

	public render() {
		const { choosedUser, allUsers, isPlaying, disabled } = this.props;

		return (
			<div className="userCol">
				<UserCard
					isPlaying={isPlaying}
					displayName={choosedUser.displayName}
					isOnline={choosedUser.isOnline}
					avatarUrl={choosedUser.photoURL}
					click={this._handlerInviteForPlay}
					disabled={disabled}
					btnTitle={GameUtils.GetInviteButtonLabel(choosedUser.isPC)}
				/>

				<UsersList
					isPlaying={isPlaying}
					choosedUser={choosedUser}
					allUsers={allUsers}
					disabled={disabled}
					click={this._handlerSetOpponent}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		choosedUser: state.allUsers.get("choosedUser"),
		allUsers: state.allUsers.get("allUsers"),
		isPlaying: state.game.get("isPlaying"),
		user: state.user.get("user"),
		type: state.game.get("type")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(
			{ ...gameActions, ...allUsersActions },
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Opponents);
