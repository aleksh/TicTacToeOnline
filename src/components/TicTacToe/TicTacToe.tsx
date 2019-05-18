import * as React from "react";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

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

	constructor(props: ITicTacToeProps) {
		super(props);

		this.state = {
			isUser: true,
			gameType: 3,
			gameStapesCount: 0,
			items: this._initGameGrid(3)
		};
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
		console.log(this);
		console.log(id);
		const { items, isUser, gameStapesCount, gameType } = this.state;
		let isStepsExist: boolean = false;
		items.forEach(row => {
			row.forEach(item => {
				if (item.id === id && item.isEmpty === true) {
					item.isEmpty = false;
					isUser ? (item.isAcross = true) : (item.isAcross = false);
				}

				if (item.isEmpty === true && isStepsExist === false) {
					isStepsExist = true;
				}
			});
		});

        // here need check for User Win or for no more steps
        if ((gameStapesCount+1) >= gameType) {
            console.log("Check For Win");

            let isWin:boolean = false;
            //check By X
            for(let i:number = 0; i < items.length; i++) {
                let pRow:VOTicItem[] = items[i];
                let pRowXAcross = pRow.filter(currItem => currItem.isEmpty === false &&  currItem.isAcross === true);
                                
                if (pRowXAcross.length === gameType){
                    isWin = true;
                    break;                    
                }
                
                let pRowXCircle = pRow.filter(currItem => currItem.isEmpty === false &&  currItem.isAcross === false);
                
                if (pRowXCircle.length === gameType){
                    isWin = true;
                    break;                    
                }                
            }

            // check By Y if no win
            if(!isWin) {
                for(let i:number = 0; i < gameType; i++) {
                    let pRow:VOTicItem[] = items[i];

                    let pColumn:VOTicItem[] = [];
                    for (let j:number = 0; j < gameType; j++) {
                        pColumn.push(items[j][i]);                        
                    }

                    let pColumnYAcross = pColumn.filter(currItem => currItem.isEmpty === false &&  currItem.isAcross === true);
                                                    
                    if (pColumnYAcross.length === gameType){
                        isWin = true;                    
                        break;                    
                    }
                    
                    let pColumnYCircle = pColumn.filter(currItem => currItem.isEmpty === false &&  currItem.isAcross === false);
                                        
                    if (pColumnYCircle.length === gameType){
                        isWin = true;                        
                        break;                    
                    }       
                }
            }

            //check By Cross
            if(!isWin) {

            }

            if(isWin) {
                console.log("WIN");
            }
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
