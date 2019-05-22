import * as React from "react";
import UserCard from "../UserCard/UserCard";
import UsersList from "../UsersList/UsersList";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import VOUser from "../../VO/VOUser";

import { gameActions } from "../../bus/game/actions";
import { allUsersActions } from "../../bus/allUsers/actions";

interface IOpponentsProps {
	choosedUser: VOUser;
	allUsers: VOUser[];
	actions: any;
}

interface IOpponentsState {}

class Opponents extends React.Component<IOpponentsProps, IOpponentsState> {
	_handlerInviteForPlay = () => {
		const { choosedUser, actions } = this.props;

		actions.inviteToPlay(choosedUser);
	};

	_handlerSetOpponent = (pUser: VOUser) => {
		const { actions } = this.props;
		actions.setOpponent(pUser);
	};

	public render() {
		const { choosedUser, allUsers } = this.props;
		return (
			<div className="col-2 bd-highlight">
				USER 2
				<UserCard
					displayName={choosedUser.displayName}
					isOnline={choosedUser.isOnline}
					avatarUrl={choosedUser.avatarUrl}
					click={this._handlerInviteForPlay}
				/>
				<UsersList
					choosedUser={choosedUser}
					allUsers={allUsers}
					click={this._handlerSetOpponent}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		choosedUser: state.allUsers.get("choosedUser"),
		allUsers: state.allUsers.get("allUsers")
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
