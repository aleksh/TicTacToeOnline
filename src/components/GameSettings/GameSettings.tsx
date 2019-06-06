import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import { gameActions } from "../../bus/game/actions";
import { GAME_TYPES } from "../../utils/Constants";
import Utils from "../../utils/Utils";
import VOUser from "../../VO/VOUser";

interface IGameSettingsProps {
	type: number;
	isPlaying: boolean;
	isMyTurn: boolean;
	actions: any;
	choosedUser: VOUser;
}

export interface IGameSettingsState {}

class GameSettings extends React.Component<
	IGameSettingsProps,
	IGameSettingsProps
> {
	_handlerTypeUpdated = (event: any) => {
		const { actions } = this.props;

		actions.changeGameType(Number(event.target.value));
	};

	_getOptions = () => {
		return GAME_TYPES.map(item => {
			return (
				<option value={item} key={item}>
					{item}
				</option>
			);
		});
	};

	_getGameStatus = (): string => {
		const { isPlaying, isMyTurn, choosedUser } = this.props;

		let message: string = "Invite to Game";

		if (isPlaying) {
			isMyTurn
				? (message = "My Turn")
				: (message = `${Utils.CutString(
						choosedUser.displayName
				  )} Turn`);
		}

		return message;
	};

	public render() {
		const { type, isPlaying } = this.props;

		return (
			<div className="d-flex align-items-center flex-wrap border-bottom mb-3 pb-3">
				<div className="text-nowrap flex-grow-1">
					<strong>Game Status:&nbsp;</strong>
					<span className="text-primary">
						<strong>{this._getGameStatus()}</strong>
					</span>
				</div>
				<form className="form-inline">
					<div className="form-group">
						<label htmlFor="type" className="form-label pr-3">
							<strong>Game Type</strong>
						</label>
						<select
							className="form-control"
							id="type"
							disabled={isPlaying}
							value={type}
							onChange={this._handlerTypeUpdated}
						>
							{this._getOptions()}
						</select>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		type: state.game.get("type"),
		isPlaying: state.game.get("isPlaying"),
		isMyTurn: state.game.get("isMyTurn"),
		choosedUser: state.allUsers.get("choosedUser")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...gameActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameSettings);
