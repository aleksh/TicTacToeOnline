import React from "react";
import GameSettings from "../GameSettings/GameSettings";
import TicTacToe from "../TicTacToe/TicTacToe";

interface IGameProps {}

const Game: React.FunctionComponent<IGameProps> = (props: IGameProps) => {
	return (
		<div className="col-md-5 col-lg-4 bg-grey p-3 m-3 rounded content">
			<GameSettings />
			<TicTacToe />
		</div>
	);
};

export default Game;
