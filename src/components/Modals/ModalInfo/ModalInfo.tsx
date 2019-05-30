import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { modalActions } from "../../../bus/modal/actions";

interface IModalInfoProps {
	modalProps: any;
	actions: any;
}

interface IModalInfoState {}

class ModalInfo extends React.Component<IModalInfoProps, IModalInfoState> {
	_handlerClosedPopup = () => {
		const { actions } = this.props;
		actions.hideModal();
	};

	_handlerOkPopup = () => {
		const { click, clickParams } = this.props.modalProps;

		if (click) {
			click(clickParams);
		}

		this._handlerClosedPopup();
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
									onClick={this._handlerOkPopup}
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...modalActions }, dispatch)
	};
};

export default connect(
	null,
	mapDispatchToProps
)(ModalInfo);
