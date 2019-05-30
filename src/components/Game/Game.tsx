import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import { gameActions } from "../../bus/game/actions";
import GameSettings from "../GameSettings/GameSettings";
import TicTacToe from "../TicTacToe/TicTacToe";

interface IGameProps {
	type: number;
	actions: any;
}

interface IGameState {}

class Game extends React.Component<IGameProps, IGameState> {
	public render() {
		return (
			<div className="col-4 bd-highlight">
				<GameSettings />
				<TicTacToe />
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		type: state.game.get("type")
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
)(Game);
