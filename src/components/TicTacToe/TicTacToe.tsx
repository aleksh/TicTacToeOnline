import * as React from "react";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

import { checkEmptyStepsExist,
    isWinGame } from "../../utils/Utils";
import PCPlayer from "../../utils/PCPlayer";

export interface ITicTacToeProps {}

export interface ITicTacToeAppState {
	isUser: boolean;
	gameType: number;
	items: VOTicItem[][];
	gameStapesCount: number;
}

export default class TicTacToe extends React.Component<
	ITicTacToeProps,
	ITicTacToeAppState
> {
    state: ITicTacToeAppState;
    private _pcPlayer:PCPlayer;

	constructor(props: ITicTacToeProps) {
		super(props);

		this.state = {
			isUser: true,
			gameType: 3,
			gameStapesCount: 0,
			items: this._initGameGrid(3)
        };
        
        this._pcPlayer = new PCPlayer();
	}

	private _initGameGrid = (pCellNum: number): VOTicItem[][] => {
		let items: any[] = [];
		let id: number = 1;

		for (let i = 0; i < pCellNum; i++) {
			let pRow: VOTicItem[] = [];

			for (let j = 1; j <= pCellNum; j++) {
				pRow.push(new VOTicItem(id));
				id++;
			}

			items.push(pRow);
		}

		return items;
	};

	private _reset = (): void => {
		// console.log(this.state.gameType);
		this.setState((prevState, props) => {
			return {
				isUser: true,
				items: this._initGameGrid(prevState.gameType)
			};
		});
	};

	private _handlerClickItem = (id: number): void => {		
		console.log(id);
		const { items, isUser, gameStapesCount, gameType } = this.state;
		let isStepsExist: boolean = checkEmptyStepsExist(items, id, isUser);                
        let isWin:boolean = false;
        // here need check for User Win or for no more steps
        if ((gameStapesCount+1) >= gameType && isStepsExist) {  
            isWin = isWinGame(items, gameType);            
        }

        if(isWin) {
            console.log("WIN");
        }

		if (isStepsExist) {
			this.setState(prevState => {
				return { ...prevState, isUser: !isUser, items, gameStapesCount: prevState.gameStapesCount + 1 };
			});
		} else {
			this._reset();
		}
    };       

	private _getGameArea = (): any => {
		const { items } = this.state;

		return items.map((row, rowIndex) => {
			return (
				<div className={Styles.row} key={rowIndex}>
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
	};

	public render() {
		return <div className={Styles.TicTacToe}>{this._getGameArea()}</div>;
	}
}
