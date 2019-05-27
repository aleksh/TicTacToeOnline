import * as React from "react";
import $ from "jquery";

interface IModalInviteProps {
	show: boolean;
	message: string;
    clickCancel: Function;
    clickOk: Function;
}

interface IModalInviteState {}

class ModalInvite extends React.Component<IModalInviteProps, IModalInviteState> {
	_handlerClosedPopup = () => {
		const { clickCancel } = this.props;
		clickCancel();
    };
    
    _handlerOk = () => {
        const { clickOk } = this.props;
		clickOk();
    }

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
									className="btn btn-secondary"
									onClick={this._handlerClosedPopup}
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
					onClick={this._handlerClosedPopup}
				/>
			</>
		);
	}
}
export default ModalInvite;
