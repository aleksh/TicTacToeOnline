import * as React from "react";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

import PCPlayer from "../../utils/PCPlayer";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { gameActions } from "../../bus/game/actions";
import VOUser from "../../VO/VOUser";

export interface ITicTacToeProps {
    isMyTurn: boolean;
    choosedUser: VOUser;
	type: number;
	items: VOTicItem[][];
	isStepsExist: boolean;
	isWin: boolean;
	isDraw: boolean;
	isOpponentPC: boolean;
	isPlaying: boolean;
	actions: any;
}

export interface ITicTacToeAppState {}

class TicTacToe extends React.Component<ITicTacToeProps, ITicTacToeAppState> {
	private _pcPlayer: PCPlayer;
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
        const { actions, isOpponentPC, isPlaying, isMyTurn } = this.props;
                
        if(isMyTurn && isPlaying) {
            console.log("Click Click Click");
            actions.setChoice(id);

            if (isOpponentPC && !isMyTurn === false) {
                console.log("PC CHOICE");
                this._timer = setTimeout(() => {
                    this._madePCChoice();
                }, 2000);
            }
        }        
	};

	private _madePCChoice = () => {
		const { actions, items, type, isWin, isDraw, isPlaying, choosedUser } = this.props;

		if (!isWin && !isDraw && isPlaying) {
			console.log("GET PC STEP ==> " + type);		
			let pId: number = this._pcPlayer.getStepId(items, type, choosedUser);
			actions.setChoice(pId);
		}
	};

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
		const { isDraw, isWin, isMyTurn } = this.props;

		return (
			<>
				{isDraw && <p>"ничья"</p>}
				{!isDraw && isWin ? (
					isMyTurn ? (
						<p>You Win</p>
					) : (
						<p>Your opponent</p>
					)
				) : null}
				<div className={Styles.TicTacToe}>{this._getGameArea()}</div>
			</>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		items: state.game.get("items"),
		type: state.game.get("type"),
		isWin: state.game.get("isWin"),
		isDraw: state.game.get("isDraw"),
		isMyTurn: state.game.get("isMyTurn"),
		isStepsExist: state.game.get("isStepsExist"),
		isPlaying: state.game.get("isPlaying"),
		isOpponentPC: state.game.get("isOpponentPC"),
		choosedUser: state.allUsers.get("choosedUser")
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
)(TicTacToe);
