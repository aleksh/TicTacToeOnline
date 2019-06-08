import * as React from "react";
import VOUser from "../../VO/VOUser";
import Catcher from "../Catcher/Catcher";
import UserItem from "./UserItem";
import Styles from "./UserList.module.scss";

interface ITicItemProps {
	click: Function;
	choosedUser: VOUser;
	allUsers: VOUser[];
	isPlaying: boolean;
	disabled?: boolean;
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
        const { disabled } = this.props;
		const classes = "list-group rounded " + Styles.ScrollStyle;

		return (
			<Catcher>
                <div className="card mt-3 rounded">
                    <div className={classes}>
                        {this._getUsersList()}					
                    </div>
                    {disabled && <div className="disabledBg" />}
                </div>
			</Catcher>
		);
	}
}
