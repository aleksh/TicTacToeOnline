import * as React from "react";
import cl from "classnames";

import Styles from './UserCard.module.scss';


interface IUserCardProps {
    displayName:string,
    isOnline:boolean,
    avatarUrl:string,
    btnTitle:string,
    click?:Function,
    isPlaying?: boolean,
}

interface IUserCardState {}

export default class UserCard extends React.Component<
    IUserCardProps,
    IUserCardState
> {	

    private _handlerClick = () => {
        const { click } = this.props;
        if(click) {
            click();
        }
    }

	public render() {        
        const { displayName, isOnline, avatarUrl, isPlaying, btnTitle } = this.props;   
          
        const badgeClass = cl({
            "ml-2": true,
            "badge badge-pill": true,
            "badge-success": isOnline,
            "badge-danger": !isOnline,
        });

        const btnClass = cl({
            "btn mt-3": true,            
            "btn-success": isOnline && !isPlaying,
            "btn-secondary": !isOnline || (isOnline && isPlaying),
        });

        const imgClass = cl({
            "card-img-top rounded-circle": true,            
            [Styles.userAvatar] : true,
        });        

		return (
			<div className="card text-center">
                <div className="card-header">
                    <strong>{displayName}</strong>
                    <span className={badgeClass}>&nbsp;</span>
                </div>                
                <div className="card-body">                                                            
                    <img src={avatarUrl} className={imgClass} alt={displayName} />
                    <p><button type="button" disabled = {isOnline ? false : true } onClick={this._handlerClick} className={btnClass}>{btnTitle}</button></p>
                </div>
            </div>
		);
	}
}
