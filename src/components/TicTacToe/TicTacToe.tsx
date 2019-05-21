import * as React from "react";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

import PCPlayer from "../../utils/PCPlayer";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import { gameActions } from '../../bus/game/actions';

export interface ITicTacToeProps {
    isMyTurn: boolean;
	type: number;
	items: VOTicItem[][];    
    isStepsExist: boolean;
    isWin:boolean;
    actions:any;
}

export interface ITicTacToeAppState {}

class TicTacToe extends React.Component<
	ITicTacToeProps,
	ITicTacToeAppState
> {    
    private _pcPlayer:PCPlayer;    
    private _timer: NodeJS.Timeout | undefined;

	constructor(props: ITicTacToeProps) {
		super(props);
        
        this._pcPlayer = new PCPlayer();
	}


/*	private _reset = (): void => {
		// console.log(this.state.gameType);
		this.setState((prevState, props) => {
			return {
				isYourTurn: true,
				items: initGameItems(prevState.gameType)
			};
		});
	};*/

	private _handlerClickItem = (id: number): void => {		
        console.log(id);
        const { actions, isMyTurn, isStepsExist, isWin } = this.props;
        
        actions.setChoice(id);
        
        console.log("isMyTurn" + isMyTurn);
        if(!isWin && isStepsExist && !isMyTurn === false) {
            console.log("PC CHOICE")
            this._timer = setTimeout(() => {
                this._madePCChoice();
            }, 2000);
        }
    };       

    private _madePCChoice = () => {
        const { items, type, isWin } = this.props;

        if(!isWin) {
            console.log("GET PC STEP ==> "+ type);
            console.log(items);
            let pId:number = this._pcPlayer.getHardStep(items, type);
            // let pId:number = this._pcPlayer.getEasyStep(items, gameType);
            //let pId:number = this._pcPlayer.getMiddleStep(items, gameType);
        
            this._handlerClickItem(pId);
        }
    }





	private _getGameArea = (): any => {
		const { items, isMyTurn } = this.props;
        
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
                                isMyTurn={isMyTurn}
							/>
						);
					})}
				</div>
			);
		});
	};

	public render() {
        const { isWin, isMyTurn } = this.props;
        
		return (
            <>
                { isWin ? isMyTurn ? <p>You Win</p> : <p>Your opponent</p> : null}
                <div className={Styles.TicTacToe}>{this._getGameArea()}</div>
            </>
        );
	}
}



const mapStateToProps = (state:any) => {
    return {
        items:          state.game.get('items'),
        type:           state.game.get('type'),
        isWin:          state.game.get('isWin'),
        isMyTurn:       state.game.get('isMyTurn'),
        isStepsExist:   state.game.get('isStepsExist'),
    };
};

const mapDispatchToProps = (dispatch:any) => {
    return {
        actions: bindActionCreators({ ...gameActions }, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
