import * as React from "react";
import $ from "jquery";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { gameActions } from "../../../bus/game/actions";

interface IGameProps {
	isMyTurn: boolean;
	isWin: boolean;
	isDraw: boolean;
	actions: any;
}

interface IGameState {}

class ModalInfo extends React.Component<IGameProps, IGameState> {
	private _refModal!: JQuery<HTMLElement>;

	componentDidMount = () => {
		this._refModal = $("#modalInfo");
		// this._refModal.modal('show');
		console.log("modal Mount");
		this._refModal.on("hide.bs.modal", this._handlerClosedPopup);
	};

	componentWillMount = () => {
		if (this._refModal) {
			this._refModal.off("hide.bs.modal");
		}
	};

	_handlerClosedPopup = () => {
		const { actions } = this.props;
		actions.resetGame();
	};

    _showModal = () => {
        const { isWin, isDraw } = this.props;

        if(isWin || isDraw) {
            this._refModal.modal('show');
        }
    }

    _getMessage = ():string => {
        const { isMyTurn, isWin, isDraw } = this.props;
		let message: string = "";
		isDraw && (message = "DRAW !!!!");
		isWin && isMyTurn
			? (message = "YOU WIN !!!!")
            : (message = "YOU LOSE !!!");
            
        return message;
    }

	public render() {		
        let message: string = this._getMessage();
        this._showModal();

		return (
			<div
				className="modal fade"
				id="modalInfo"
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-sm" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body text-center">
							<h5>{message}</h5>
						</div>
						<div className="modal-footer justify-content-center">
							<button
								type="button"
								className="btn btn-success"
								data-dismiss="modal"
							>
								Ok
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		isWin: state.game.get("isWin"),
		isDraw: state.game.get("isDraw"),
		isMyTurn: state.game.get("isMyTurn")
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
)(ModalInfo);
