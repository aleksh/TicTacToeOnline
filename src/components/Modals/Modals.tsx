import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//actions
import { gameActions } from "../../bus/game/actions";
import ModalInfo from "./ModalInfo/ModalInfo";
import VOUser from "../../VO/VOUser";
import ModalInvite from "./ModalInvite/ModalInvite";

interface IModalsProps {
	isInviteMe: boolean;
	isMyTurn: boolean;
	isDraw: boolean;
	isWin: boolean;
    user: VOUser;
    gameId:string;
	actions: any;
}
interface IModalsState {}

class Modals extends React.Component<IModalsProps, IModalsState> {
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

	_handlerInviteAccept = () => {};

	_handlerInviteCancel = () => {};

	_resetGame = () => {
        const { actions, gameId } = this.props;
        console.log("gameId from popup")
        console.log(gameId)
        actions.removeGameAsync(gameId);		
	};

	public render() {
		const { isWin, isDraw, isInviteMe } = this.props;
		const showWinPopup = isWin || isDraw;
		return (
			<>
				{isInviteMe && (
					<ModalInvite
						show={true}
						message={this._getMessage()}
						clickOk={this._handlerInviteAccept}
						clickCancel={this._handlerInviteCancel}
					/>
				)}

				{showWinPopup && (
					<ModalInfo
						show={true}
						message={this._getMessage()}
						click={this._resetGame}
					/>
				)}
			</>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		isInviteMe: state.game.get("isInviteMe"),
		isMyTurn: state.game.get("isMyTurn"),
		isDraw: state.game.get("isDraw"),
        isWin: state.game.get("isWin"),
        gameId: state.game.get("gameId"),
		user: state.user.get("user")
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
)(Modals);
