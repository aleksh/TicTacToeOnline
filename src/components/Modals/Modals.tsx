import * as React from "react";
import { connect } from "react-redux";
import ModalConfirm from "./ModalConfirm/ModalConfirm";
//actions
import ModalInfo from "./ModalInfo/ModalInfo";
import ModalWaitOpponent from "./ModalWaitOpponent/ModalWaitOpponent";

interface IModalsProps {
	modalType: string;
	modalProps: any;
}
interface IModalsState {}

export const MODAL_TYPES = {
	INFO: "INFO",
	WAITING_FOR_OPPONENT: "WAITING_FOR_OPPONENT",
	CONFIRM_INVITE: "CONFIRM_INVITE"
};

class Modals extends React.Component<IModalsProps, IModalsState> {
	public render() {
		const { modalType, modalProps } = this.props;

		return (
			<>
				{modalType
					? (modalType === MODAL_TYPES.INFO && (
							<ModalInfo modalProps={modalProps} />
					  )) ||
					  (modalType === MODAL_TYPES.CONFIRM_INVITE && (
							<ModalConfirm modalProps={modalProps} />
					  )) ||
					  (modalType === MODAL_TYPES.WAITING_FOR_OPPONENT && (
							<ModalWaitOpponent modalProps={modalProps} />
					  ))
					: null}
			</>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		modalType: state.modal.get("modalType"),
		modalProps: state.modal.get("modalProps")
	};
};

export default connect(
	mapStateToProps,
	null
)(Modals);
