import * as React from "react";

interface IModalInfoProps {
	modalProps: any;
}

interface IModalInfoState {}

export default class ModalInfo extends React.Component<
	IModalInfoProps,
	IModalInfoState
> {
	_handlerClosedPopup = () => {
		const { click, clickParams, hideModal } = this.props.modalProps;
		click(clickParams);
		hideModal();
	};

	public render() {
		const { message } = this.props.modalProps;
		console.log("Modal Info");
		return (
			<>
				<div className="modal show">
					<div className="modal-dialog modal-sm">
						<div className="modal-content">
							<div className="modal-header">
								<button
									type="button"
									className="close"
									onClick={this._handlerClosedPopup}
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
									onClick={this._handlerClosedPopup}
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className="modal-backdrop show"
					onClick={this._handlerClosedPopup}
				/>
			</>
		);
	}
}
