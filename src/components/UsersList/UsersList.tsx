import * as React from "react";
import VOUser from "../../VO/VOUser";
import UserItem from "./UserItem";

interface ITicItemProps {
	click: Function;
	choosedUser: VOUser;
	allUsers: VOUser[];
	isPlaying: boolean;
}

export interface ITicItemState {}

export default class UsersList extends React.Component<
	ITicItemProps,
	ITicItemState
> {
	_getUsersList = () => {
		const { choosedUser, allUsers, click, isPlaying } = this.props;
		let usersList = allUsers.map(user => {
			const isActive: boolean = choosedUser
				? choosedUser.uid === user.uid && true
				: false;
			return (
				<UserItem
					disabled={isPlaying}
					user={user}
					key={user.uid}
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
