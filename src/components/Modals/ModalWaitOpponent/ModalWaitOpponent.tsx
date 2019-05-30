import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameActions } from "../../../bus/game/actions";
import { modalActions } from "../../../bus/modal/actions";

interface IModalWaitOpponentProps {
	modalProps: any;
	actions: any;
}

interface IModalWaitOpponentState {}

class ModalWaitOpponent extends React.Component<
	IModalWaitOpponentProps,
	IModalWaitOpponentState
> {
	_handlerCancelPopup = () => {
		const { gameId } = this.props.modalProps;
		const { actions } = this.props;

		actions.removeGameAsync(gameId);
		actions.hideModal();
	};

	public render() {
		const { message } = this.props.modalProps;
		return (
			<>
				<div className="modal show">
					<div className="modal-dialog modal-sm">
						<div className="modal-content">
							<div className="modal-header">
								<button
									type="button"
									className="close"
									onClick={this._handlerCancelPopup}
								>
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body text-center">
								<h5>{message}</h5>
							</div>
							<div className="modal-footer justify-content-center">
								<button
									type="button"
									className="btn btn-success"
									onClick={this._handlerCancelPopup}
								>
									Cancel Game
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className="modal-backdrop show"
					onClick={this._handlerCancelPopup}
				/>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(
			{ ...modalActions, ...gameActions },
			dispatch
		)
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ModalWaitOpponent);
