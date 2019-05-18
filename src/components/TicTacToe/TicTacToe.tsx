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
        if ((gameStapesCount+1) >= gameType && isStepsExist) {
            console.log("Check For Win");

            let isWin:boolean = false;
            //check By X
            for(let i:number = 0; i < items.length; i++) {
                let pRow:VOTicItem[] = items[i];
                let pRowXAcross = this._filterFilledItems(pRow, true);
                                
                if (pRowXAcross.length === gameType){
                    isWin = true;
                    console.log("WIN ROW ACROSS => "+ i);
                    break;                    
                }
                
                let pRowXCircle = this._filterFilledItems(pRow, false);
                
                if (pRowXCircle.length === gameType){
                    isWin = true;
                    console.log("WIN ROW CIRCLE => "+ i);
                    break;                    
                }                
            }

            // check By Y if no win
            if(!isWin) {
                for(let i:number = 0; i < gameType; i++) {
                    let pColumn:VOTicItem[] = [];

                    for (let j:number = 0; j < gameType; j++) {
                        if (!items[j][i].isEmpty) {
                            pColumn.push(items[j][i]);          
                        }              
                    }

                    if(pColumn.length === gameType) {                        
                        let pColumnYAcross = this._filterFilledItems(pColumn, true);
                                                        
                        if (pColumnYAcross.length === gameType){
                            isWin = true;
                            console.log("WIN COLUMN ACROSS => "+i);                
                            break;                    
                        }
                        
                        let pColumnYCircle = this._filterFilledItems(pColumn, false);
                                            
                        if (pColumnYCircle.length === gameType){
                            isWin = true;                        
                            console.log("WIN COLUMN CIRCLE => "+i);                
                            break;                    
                        } 
                    }                                        
                }
            }

            //check By Cross
            if(!isWin) {
                let pLeftCross:VOTicItem[] = [];
                let pRightCross:VOTicItem[] = [];

                for (let i:number = 0; i < gameType; i++) {
                    let pLeftItem:VOTicItem = items[i][i];
                    if(!pLeftItem.isEmpty) { pLeftCross.push(items[i][i]); }

                    let pRightItem:VOTicItem = items[gameType-1-i][i];
                    if (!pRightItem.isEmpty) { pRightCross.push(pRightItem); }
                }


                // check Left Cross
                if(pLeftCross.length === gameType) {
                    let pAcross = this._filterFilledItems(pLeftCross, true);
                    
                    if (pAcross.length === gameType){
                        isWin = true;                                
                        console.log("WIN  1 across");                                   
                    }

                    if (!isWin) {
                        let pCircle = this._filterFilledItems(pLeftCross, false);
                                            
                        if (pCircle.length === gameType){
                            isWin = true;        
                            console.log("WIN  1 CIRCLE");                                   
                        }
                    }
                }

                if(!isWin && pRightCross.length === gameType) {
                    let pAcross = this._filterFilledItems(pRightCross, true);
                    
                    if (pAcross.length === gameType){
                        isWin = true;                                
                        console.log("WIN  2 ACROSS");
                    }

                    if (!isWin) {
                        let pCircle = this._filterFilledItems(pRightCross, false);
                                            
                        if (pCircle.length === gameType){
                            isWin = true;  
                            
                            console.log("WIN  2 CIRCLE");
                        }
                    }
                }
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
    
    private _filterFilledItems = (pItems:VOTicItem[], pByAcross:boolean) => {
        return pItems.filter(item => item.isEmpty === false &&  item.isAcross === pByAcross);
    }


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
