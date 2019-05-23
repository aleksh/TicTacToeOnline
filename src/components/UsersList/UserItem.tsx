import * as React from "react";
import VOUser from "../../VO/VOUser";
import cl from "classnames";

interface ITicItemProps {
	user: VOUser;
    isActive: boolean;
    disabled: boolean;
    click:Function;
}

export interface ITicItemState {}

export default class UserItem extends React.Component<
	ITicItemProps,
	ITicItemState
> {

    private _handlerClick = () => {
        const { user, click, isActive, disabled } = this.props;
        if(!isActive && !disabled){
            click(user);
        }    
    }

	public render() {
        const { user, isActive } = this.props;
        const btnClass = cl({
            "list-group-item list-group-item-action": true,
            "active": isActive
        });
		return (
			<button value={user.uid} className={btnClass} onClick={this._handlerClick}>
				{user.displayName}
			</button>
		);
	}
}
