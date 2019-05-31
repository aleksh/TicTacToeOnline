import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../bus/user/actions";
import VOUser from "../../VO/VOUser";
import UserCard from "../UserCard/UserCard";

interface IUserProps {
	type: number;
	isPlaying: boolean;
	user: VOUser;
	actions: any;
}

interface IUserState {}

class User extends React.Component<IUserProps, IUserState> {
	private _handlerLogout = () => {
		const { actions } = this.props;
		actions.logoutAsync();
	};

	public render() {
		const { user, isPlaying } = this.props;
		return (
			<div className="bd-highlight userCol">
				<UserCard
					isPlaying={isPlaying}
					displayName={user.displayName}
					isOnline={true}
					btnTitle={"Log Out"}
					click={this._handlerLogout}
					avatarUrl={user.photoURL}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		isPlaying: state.game.get("isPlaying"),
		type: state.game.get("type"),
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
)(User);
