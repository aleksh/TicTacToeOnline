import * as React from "react";
import VOUser from "../../VO/VOUser";
import cl from "classnames";

interface ITicItemProps {
	user: VOUser;
    isActive: boolean;
    click:Function;
}

export interface ITicItemState {}

export default class UserItem extends React.Component<
	ITicItemProps,
	ITicItemState
> {

    private _handlerClick = () => {
        const { user, click, isActive } = this.props;
        if(!isActive){
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
			<button value={user.id} className={btnClass} onClick={this._handlerClick}>
				{user.displayName}
			</button>
		);
	}
}
