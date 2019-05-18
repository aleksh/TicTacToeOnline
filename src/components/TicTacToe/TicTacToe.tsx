import * as React from "react";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

export interface ITicTacToeProps {}

export interface ITicTacToeAppState {
    isUser:boolean,
    gameType:number,
    items:VOTicItem[][]
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
            items: this._initGameGrid(3)
        };
	}

    
    private _initGameGrid = (pCellNum:number):VOTicItem[][] => {
        let items:any[] = [];
        let id:number = 1;

        for(let i=0; i < pCellNum; i++) {
            let pRow:VOTicItem[] = [];

            for (let j=1; j<=pCellNum; j++) {
                pRow.push(new VOTicItem(id));
                id++;
            }

            items.push(pRow);
        }

        return items;
    }

	private _reset = (): void => {
       // console.log(this.state.gameType);        
        this.setState((prevState, props) => {
            return {
                isUser:true,
                items: this._initGameGrid(prevState.gameType),
            };
        })
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
                    isUser ? item.isAcross = true : item.isAcross = false;                        
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
	}

	public render() {
		return <div className={Styles.TicTacToe}>{this._getGameArea()}</div>;
	}
}
