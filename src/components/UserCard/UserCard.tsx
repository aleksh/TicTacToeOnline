import * as React from "react";
import cl from "classnames";


interface IUserCardProps {
    displayName:string,
    isOnline:boolean,
    avatarUrl:string,
    click:Function,
}

interface IUserCardState {}

export default class UserCard extends React.Component<
    IUserCardProps,
    IUserCardState
> {	

    private _handlerClick = () => {
        const { click } = this.props;
        click();
    }

	public render() {        
        const { displayName, isOnline, avatarUrl } = this.props;   
          
        const badgeClass = cl({
            "ml-2": true,
            "badge badge-pill": true,
            "badge-success": isOnline,
            "badge-danger": !isOnline,
        });

        const btnClass = cl({
            "btn  mt-3": true,            
            "btn-success": isOnline,
            "btn-secondary": !isOnline,
        });

		return (
			<div className="card text-center">
                <div className="card-header">
                    <strong>{displayName}</strong>
                    <span className={badgeClass}>&nbsp;</span>
                </div>                
                <div className="card-body">                                                            
                    <img src={avatarUrl} className="card-img-top rounded-circle w-50" alt={displayName} />
                    <button type="button" disabled = {isOnline ? false : true } onClick={this._handlerClick} className={btnClass}>Play with Me</button>
                </div>
            </div>
		);
	}
}
