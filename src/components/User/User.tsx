import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import { userActions } from "../../bus/user/actions";
import VOUser from "../../VO/VOUser";
import UserCard from "../UserCard/UserCard";

interface IUserProps {
	type: number;
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
		const { user } = this.props;
		return (
			<div className="bd-highlight userCol">
				<UserCard
					displayName={user.displayName}
					isOnline={true}
					btnTitle={"Login"}
					click={this._handlerLogout}
					avatarUrl={user.photoURL}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
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
