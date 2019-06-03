import * as React from "react";
import GameSettings from "../GameSettings/GameSettings";
import TicTacToe from "../TicTacToe/TicTacToe";

interface IGameProps {}

interface IGameState {}

export default class Game extends React.Component<IGameProps, IGameState> {
	public render() {
		return (
			<div className="col-md-5 col-lg-4 bg-grey p-3 m-3 rounded">
				<GameSettings />
				<TicTacToe />
			</div>
		);
	}
}
