import cl from "classnames";
import * as React from "react";
import VOTicItem from "../../VO/VOTicItem";
import TicItem from "../TicItem/TicItem";
import Styles from "./Grid.module.scss";

interface IGridProps {
	items: VOTicItem[][];
	isMyTurn: boolean;
	type: number;
	click: Function;
}

interface IGridState {}

export default class Grid extends React.Component<IGridProps, IGridState> {
	private _handlerClickItem = (stepId: number): void => {
		const { click } = this.props;

		click(stepId);
	};

	private _getGameArea = (): any => {
		const { items, isMyTurn } = this.props;

		return items.map(row => {
			return row.map(item => {
				return (
					<TicItem
						key={item.id}
						id={item.id}
						done={item.done}
						click={this._handlerClickItem}
						isEmpty={item.isEmpty}
						isAcross={item.isAcross}
						isMyTurn={isMyTurn}
					/>
				);
			});
		});
	};

	public render() {
		const { type } = this.props;

		const gameClass = cl({
			[Styles.TicTacToe3]: type === 3,
			[Styles.TicTacToe5]: type === 5,
			[Styles.TicTacToe7]: type === 7
		});

		return <div className={gameClass}>{this._getGameArea()}</div>;
	}
}
