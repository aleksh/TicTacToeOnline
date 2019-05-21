import * as React from "react";
import cl from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { allUsersActions } from "../../bus/allUsers/actions";
import VOUser from "../../VO/VOUser";

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

	_handlerClick = (event: any): void => {
		const { choosedUser, actions } = this.props;
		let pId: number = Number(event.target.value);

		if (!choosedUser || choosedUser.id !== pId) {
			actions.setOpponent(pId);
		}
	};

	_getUsersList = () => {
		const { choosedUser, allUsers } = this.props;
		let usersList = allUsers.map(item => {
			const btnClass = cl({
				"list-group-item list-group-item-action": true,
				active: choosedUser ? choosedUser.id === item.id && true : false
			});

			return (
				<button key={item.id} value={item.id} className={btnClass}>
					{item.displayName}
				</button>
			);
		});

		return usersList;
	};

	public render() {
		return (
			<div className="list-group" onClick={this._handlerClick}>
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
