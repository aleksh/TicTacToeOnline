import * as React from "react";
import cl from "classnames";

import Utils from "../../utils/Utils";

import Styles from "./UserCard.module.scss";
import StatusIndicator from "../StatusIndIcator/StatusIndicator";

interface IUserCardProps {
	displayName: string;
	isOnline: boolean;
	avatarUrl: string;
	btnTitle: string;
	click?: Function;
	isPlaying?: boolean;
}

interface IUserCardState {}

export default class UserCard extends React.Component<
	IUserCardProps,
	IUserCardState
> {
	private _handlerClick = () => {
		const { click } = this.props;
		if (click) {
			click();
		}
	};

	public render() {
		const {
			displayName,
			isOnline,
			avatarUrl,
			isPlaying,
			btnTitle
		} = this.props;

		const btnClass = cl({
			"btn mt-3": true,
			"btn-success": isOnline && !isPlaying,
			"btn-secondary": !isOnline || (isOnline && isPlaying)
		});

		const imgClass = cl({
			"card-img-top rounded-circle": true,
			[Styles.userAvatar]: true
		});

		return (
			<div className="card text-center">
				<div className="card-header">
					<strong>{Utils.CutString(displayName)}</strong>
					<StatusIndicator isOnline={isOnline} />
				</div>
				<div className="card-body">
					<img
						src={avatarUrl}
						className={imgClass}
						alt={displayName}
					/>
					<p>
						<button
							type="button"
							disabled={isOnline ? false : true}
							onClick={this._handlerClick}
							className={btnClass}
						>
							{btnTitle}
						</button>
					</p>
				</div>
			</div>
		);
	}
}
