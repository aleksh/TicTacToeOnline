import * as React from "react";
import VOUser from "../../VO/VOUser";
import UserItem from "./UserItem";

interface ITicItemProps {
	click: Function;
	choosedUser: VOUser;
	allUsers: VOUser[];
}

export interface ITicItemState {}

export default class UsersList extends React.Component<
	ITicItemProps,
	ITicItemState
> {
	_getUsersList = () => {
		const { choosedUser, allUsers, click } = this.props;
		let usersList = allUsers.map(user => {
			const isActive: boolean = choosedUser
				? choosedUser.id === user.id && true
				: false;
			return (
				<UserItem
					user={user}
					key={user.id}
					click={click}
					isActive={isActive}
				/>
			);
		});

		return usersList;
	};

	public render() {
		return <div className="list-group">{this._getUsersList()}</div>;
	}
}
