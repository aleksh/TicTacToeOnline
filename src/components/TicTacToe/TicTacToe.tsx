import * as React from "react";
import cl from "classnames";

// Styles
import Styles from "./TixTacToe.module.scss";
import TicItem from "../TicItem/TicItem";
import VOTicItem from "../../VO/VOTicItem";

import PCPlayer from "../../utils/PCPlayer";
import { fb } from "../../init/firebaseConfig";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { gameActions } from "../../bus/game/actions";
import VOUser from "../../VO/VOUser";
import ModalInfo from "../Modals/ModalInfo/ModalInfo";

export interface ITicTacToeProps {
    gameId: string;
	isMyTurn: boolean;
	choosedUser: VOUser;
	type: number;
	items: VOTicItem[][];
	isStepsExist: boolean;
	isWin: boolean;
	isDraw: boolean;
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

	private _handlerClickItem = (id: number): void => {
		console.log(id);
		const { actions, choosedUser, isPlaying, isMyTurn, gameId } = this.props;
        console.log("isMyTurn==> "+isMyTurn);
        console.log("isPlaying==> "+isPlaying);
		if (isMyTurn && isPlaying) {
			console.log("Click Click Click");            

            if (!choosedUser.isPC) {
                actions.setChoice(id);
                fb.database()
                    .ref(`games/${gameId}`)
                    .child("stepId")
                    .set(id).then((res) => {
                        console.log("set Choice to DB");                       
                    });         
            } else {
                actions.setChoice(id);
            }

			if (choosedUser.isPC && !isMyTurn === false) {
				console.log("PC CHOICE");
				this._timer = setTimeout(() => {
					this._madePCChoice();
				}, 2000);
			} 
		}
	};

	private _madePCChoice = () => {
		const {
			actions,
			items,
			type,
			isWin,
			isDraw,
			isPlaying,
			choosedUser
		} = this.props;

		if (!isWin && !isDraw && isPlaying) {
			console.log("GET PC STEP ==> " + type);
			let pId: number = this._pcPlayer.getStepId(
				items,
				type,
				choosedUser
			);
			actions.setChoice(pId);
		}
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

	private _resetGame = () => {
		const { actions } = this.props;
		actions.resetGame();
	};

	_getMessage = (): string => {
		const { isMyTurn, isWin, isDraw } = this.props;
		let message: string = "";
		isDraw
			? (message = "DRAW !!!!")
			: isWin && isMyTurn
			? (message = "YOU WIN !!!!")
			: (message = "YOU LOSE !!!");

		return message;
	};

	public render() {
		const { isWin, isDraw, type, isMyTurn, isPlaying } = this.props;
		const showPopup = isWin || isDraw;

        console.log("==============================================");
        console.log("isMyTurn "+ isMyTurn);
        console.log("isPlaying "+ isPlaying);

		const gameClass = cl({
			[Styles.TicTacToe3]: type === 3,
			[Styles.TicTacToe5]: type === 5,
			[Styles.TicTacToe7]: type === 7,
		});

		return (
			<>
				{showPopup && (
					<ModalInfo
						show={true}
						message={this._getMessage()}
						click={this._resetGame}
					/>
				)}
				<div className={gameClass}>{this._getGameArea()}</div>
			</>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		items: state.game.get("items"),
        type: state.game.get("type"),
        gameId: state.game.get("gameId"), 
		isWin: state.game.get("isWin"),
		isDraw: state.game.get("isDraw"),
		isMyTurn: state.game.get("isMyTurn"),
		isStepsExist: state.game.get("isStepsExist"),
		isPlaying: state.game.get("isPlaying"),
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
