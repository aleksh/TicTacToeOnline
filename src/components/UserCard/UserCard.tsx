import cl from "classnames";
import * as React from "react";
import Utils from "../../utils/Utils";
import StatusIndicator from "../StatusIndIcator/StatusIndicator";
import Styles from "./UserCard.module.scss";

interface IUserCardProps {
	displayName: string;
	isOnline: boolean;
	avatarUrl: string;
	btnTitle: string;
	click: Function;
	isPlaying: boolean;
	clickBtn2?: Function;
	btnTitle2?: string;
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

	private _handlerClickBtn2 = () => {
		const { clickBtn2 } = this.props;
		if (clickBtn2) {
			clickBtn2();
		}
	};

	public render() {
		const {
			displayName,
			isOnline,
			avatarUrl,
			isPlaying,
			btnTitle,
			btnTitle2
		} = this.props;

		const btnClass = cl({
			"btn mt-3 btn-sm": true,
			"btn-success": isOnline && !isPlaying,
			"btn-secondary": !isOnline || (isOnline && isPlaying)
		});

		const imgClass = cl({
			"card-img-top rounded-circle": true,
			[Styles.userAvatar]: true
		});

		return (
			<div className="card text-center bg-grey mt-3">
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
					<div className="d-flex justify-content-around">
						{btnTitle2 && (
							<button
								type="button"
								disabled={isOnline ? false : true}
								onClick={this._handlerClickBtn2}
								className={btnClass}
							>
								{btnTitle2}
							</button>
						)}
						<button
							type="button"
							disabled={isOnline ? false : true}
							onClick={this._handlerClick}
							className={btnClass}
						>
							{btnTitle}
						</button>
					</div>
				</div>
			</div>
		);
	}
}
