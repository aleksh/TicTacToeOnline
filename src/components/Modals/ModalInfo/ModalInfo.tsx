import * as React from "react";
import $ from "jquery";

interface IGameProps {
    message: string;
    show: boolean;
	click:Function;
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
        console.log("modal UN MOUNT");
		if (this._refModal) {            
			this._refModal.off("hide.bs.modal");
		}
	};
    
    _handlerClosedPopup = () => {
		const { click } = this.props;
		click();
	};

    _showModal = () => {
        const { show } = this.props;

        if(show) {
            console.log("TIMER in MODAL ");
            setTimeout(() => {
                this._refModal.modal('show');
            }, 4000);
        }
    }

	public render() {		
        const { message } = this.props;
        this._showModal();

        console.log("RenderModal")
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
export default ModalInfo;
