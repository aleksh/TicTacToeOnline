import * as React from "react";


import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { allUsersActions } from "../../bus/allUsers/actions";
import VOUser from "../../VO/VOUser";
import UserItem from "./UserItem";

interface ITicItemProps {
	actions: any;
	choosedUser: VOUser;
	allUsers: VOUser[];
}

export interface ITicItemState {}

class UsersList extends React.Component<ITicItemProps, ITicItemState> {
	constructor(props: any) {
		super(props);
	}

	_handlerClick = (pUser: VOUser): void => {		
		const { choosedUser, actions } = this.props;		

		if (!choosedUser || choosedUser.id !== pUser.id) {
            console.log(pUser)
			actions.setOpponent(pUser);
		}
	};

	_getUsersList = () => {
		const { choosedUser, allUsers } = this.props;
		let usersList = allUsers.map(user => {
        const isActive:boolean = choosedUser ? choosedUser.id === user.id && true : false;			
			return <UserItem user={user} key={user.id} click={this._handlerClick} isActive={isActive} />;
		});

		return usersList;
	};

	public render() {
		return (
			<div className="list-group">
				{this._getUsersList()}
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
		actions: bindActionCreators({ ...allUsersActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersList);
