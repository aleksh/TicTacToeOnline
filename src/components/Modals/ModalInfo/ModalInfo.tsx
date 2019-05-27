import * as React from "react";
import $ from "jquery";

interface IModalInfoProps {
	show: boolean;
	message: string;
	click: Function;
}

interface IModalInfoState {}

class ModalInfo extends React.Component<IModalInfoProps, IModalInfoState> {
	_handlerClosedPopup = () => {
		const { click } = this.props;
		click();
	};

	public render() {
		const { message } = this.props;

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
export default ModalInfo;
