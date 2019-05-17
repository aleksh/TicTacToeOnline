import * as React from "react";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

import * as cn from "classnames";

export interface ITicTacToeProps {}

export interface ITicTacToeAppState {}

export default class TicTacToe extends React.Component<
	ITicTacToeProps,
	ITicTacToeAppState
> {
	state = {
        isUser: true,
		gameType: 3,
		items: [
			[new VOTicItem(1), new VOTicItem(2), new VOTicItem(3)],
			[new VOTicItem(4), new VOTicItem(5), new VOTicItem(6)],
			[new VOTicItem(7), new VOTicItem(8), new VOTicItem(9)]
		]
	};

	private _reset = (): void => {
        console.log(this.state.gameType);
		this.setState({
            isUser: true,
			items: [
                [new VOTicItem(1), new VOTicItem(2), new VOTicItem(3)],
                [new VOTicItem(4), new VOTicItem(5), new VOTicItem(6)],
                [new VOTicItem(7), new VOTicItem(8), new VOTicItem(9)]
            ]
		});
	}

	private _handlerClickItem = (id: number): void => {
		console.log(this);
        console.log(id);
        const { items, isUser } = this.state;
        let isStepsExist: boolean = false;
        items.forEach((row) => {
            row.forEach((item) => {
                if(item.id === id && item.isEmpty === true) {
                    item.isEmpty = false;
                    if (isUser) {
                        item.isAcross = true;
                    } else {
                        item.isAcross = false;
                    }                                   
                }

                if(item.isEmpty === true && isStepsExist === false) {
                    isStepsExist = true;
                }
            });               
        });

        // here need check for User Win or for no more steps

        if (isStepsExist) {
            this.setState((prevState) => {            
                return {...prevState, isUser: !isUser, items};
            })
        } else {
            this._reset();
        }
	}

	private _getGameArea = (): any => {
		const { items, gameType } = this.state;

		return items.map((row, rowIndex) => {
			let rowClass = cn.default({
				[Styles.row]: true,
				[Styles.rowTop]: rowIndex === 0,
				[Styles.rowBottom]: rowIndex === gameType - 1
			});
			return (
				<div className={rowClass} key={rowIndex}>
					{row.map(item => {
						return (
							<TicItem
								key={item.id}
								id={item.id}
								click={this._handlerClickItem}
								isEmpty={item.isEmpty}
								isAcross={item.isAcross}
							/>
						);
					})}
				</div>
			);
		});
	}

	public render() {
		return <div className={Styles.TicTacToe}>{this._getGameArea()}</div>;
	}
}
