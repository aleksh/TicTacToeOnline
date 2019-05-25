import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//actions
import { userActions } from "../../bus/user/actions";
import UserCard from "../UserCard/UserCard";
import VOUser from "../../VO/VOUser";

interface IUserProps {
	type: number;
	user: VOUser;
	actions: any;
}

interface IUserState {}

class User extends React.Component<IUserProps, IUserState> {

	public render() {
		const { user } = this.props;
		return (
			<div className="bd-highlight userCol">
				<UserCard
					displayName={user.displayName}
					isOnline={true}
					btnTitle={"Login"}
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
