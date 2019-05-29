import * as React from "react";

interface IModalConfirmProps {
	modalProps: any;
}

interface IModalConfirmState {}

export default class ModalConfirm extends React.Component<
	IModalConfirmProps,
	IModalConfirmState
> {
	_handlerCancel = () => {
		const { clickCancel, hideModal } = this.props.modalProps;
		//	clickCancel();
		hideModal();
	};

	_handlerOk = () => {
		const { clickOk, hideModal } = this.props.modalProps;
		//	clickOk();
		hideModal();
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
									onClick={this._handlerCancel}
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
									className="btn btn-secondary"
									onClick={this._handlerCancel}
								>
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-success"
									onClick={this._handlerOk}
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className="modal-backdrop show"
					onClick={this._handlerCancel}
				/>
			</>
		);
	}
}