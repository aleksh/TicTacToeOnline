import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import { gameActions } from "../../bus/game/actions";
import { GAME_TYPES } from "../../utils/Constants";
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

		let message: string = "Invite a friend into a Game";

		if (isPlaying) {
			isMyTurn
				? (message = "My Turn")
				: (message = `${choosedUser.displayName} Turn`);
		}

		return message;
	};

	public render() {
		const { type, isPlaying } = this.props;

		return (
			<div className="d-flex justify-content-between align-items-center ">
				<div className="p-3">
					<strong>Game Status:&nbsp;</strong> <span className="text-primary">{this._getGameStatus()}</span>
				</div>
				<form className="form-inline p-3">
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
