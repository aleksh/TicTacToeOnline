import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameActions } from "../../bus/game/actions";
import { modalActions } from "../../bus/modal/actions";
import GameUtils from "../../utils/GameUtils";
import PCPlayer from "../../utils/PCPlayer";
import VOTicItem from "../../VO/VOTicItem";
import VOUser from "../../VO/VOUser";
import Catcher from "../Catcher/Catcher";
import Grid from "../Grid/Grid";
import { MODAL_TYPES } from "../Modals/Modals";

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
				}, 1500);
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
			let pId: number = this._pcPlayer.getStepId(
				items,
				type,
				choosedUser
			);

			actions.setChoice(pId);
		}
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
		const { type, items, isMyTurn } = this.props;
		this._showWinModal();
		return (
			<Catcher>
				<Grid
					type={type}
					items={items}
					isMyTurn={isMyTurn}
					click={this._handlerClickItem}
				/>
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
