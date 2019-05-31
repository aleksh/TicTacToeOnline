import cl from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//actions
import { gameActions } from "../../bus/game/actions";
import { modalActions } from "../../bus/modal/actions";
import GameUtils from "../../utils/GameUtils";
import PCPlayer from "../../utils/PCPlayer";
import VOTicItem from "../../VO/VOTicItem";
import VOUser from "../../VO/VOUser";
import Catcher from "../Catcher/Catcher";
import { MODAL_TYPES } from "../Modals/Modals";
import TicItem from "../TicItem/TicItem";
// Styles
import Styles from "./TixTacToe.module.scss";

export interface ITicTacToeProps {
	gameId: string;
	isItFirstPlayer: boolean;
	isMyTurn: boolean;
	choosedUser: VOUser;
	type: number;
	items: VOTicItem[][];
	isWin: boolean;
	isDraw: boolean;
	isPlaying: boolean;
	actions: any;
}

export interface ITicTacToeAppState {}

class TicTacToe extends React.Component<ITicTacToeProps, ITicTacToeAppState> {
	private _pcPlayer: PCPlayer;

	constructor(props: ITicTacToeProps) {
		super(props);

		this._pcPlayer = new PCPlayer();
	}

	private _handlerClickItem = (stepId: number): void => {
		console.log(stepId);
		const {
			actions,
			choosedUser,
			isPlaying,
			isMyTurn,
			gameId,
			isItFirstPlayer
		} = this.props;

		if (isMyTurn && isPlaying) {
			actions.setChoice(stepId);
			if (!choosedUser.isPC) {
				actions.setChoiceToDBAsync({ gameId, stepId, isItFirstPlayer });
			}

			if (choosedUser.isPC && !isMyTurn === false) {
				setTimeout(() => {
					this._madePCChoice();
				}, 1000);
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

	private _showWinModal = () => {
		const { actions, isWin, isDraw, gameId, isMyTurn } = this.props;
		const isShow: boolean = isWin || isDraw;

		if (isShow) {
			actions.showModal({
				modalType: MODAL_TYPES.INFO,
				modalProps: {
					message: GameUtils.GetEndGameMessage(
						isDraw,
						isWin,
						isMyTurn
					),
					click: actions.removeGameAsync,
					clickParams: gameId
				}
			});
		}
	};

	public render() {
		const { type } = this.props;

		const gameClass = cl({
			[Styles.TicTacToe3]: type === 3,
			[Styles.TicTacToe5]: type === 5,
			[Styles.TicTacToe7]: type === 7
		});

		this._showWinModal();
		return (
			<Catcher>
				<div className={gameClass}>{this._getGameArea()}</div>
			</Catcher>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		isItFirstPlayer: state.game.get("isItFirstPlayer"),
		items: state.game.get("items"),
		type: state.game.get("type"),
		gameId: state.game.get("gameId"),
		isWin: state.game.get("isWin"),
		isDraw: state.game.get("isDraw"),
		isMyTurn: state.game.get("isMyTurn"),
		isPlaying: state.game.get("isPlaying"),
		choosedUser: state.allUsers.get("choosedUser")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(
			{ ...gameActions, ...modalActions },
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TicTacToe);
