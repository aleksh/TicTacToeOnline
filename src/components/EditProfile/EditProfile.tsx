import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../bus/user/actions";
import { history } from "../../init/middleware/core";
import { Path } from "../../navigation/path";
import Utils from "../../utils/Utils";
import VOUser from "../../VO/VOUser";

interface IEditProfileProps {
	user: VOUser;
}

interface IEditProfileState {
	file: any;
	loadedPhoto: any;
}

class EditProfile extends React.Component<
	IEditProfileProps,
	IEditProfileState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			file: null,
			loadedPhoto: null
		};
	}

	private _getImageLabel = (): string => {
		const { file } = this.state;
		let label = "Choose file...";

		if (file) {
			label = Utils.CutString(
				file.name,
				20,
				"..." + Utils.GetImageExtensions(file.name)
			);
		}

		return label;
	};

	private _handlerClickBack = () => {
		history.push(Path.game);
	};

	private _handleSubmit = (event: any) => {
		event.preventDefault();
		console.log("submit");
	};

	private _onImageChange = (event: any) => {
		event.preventDefault();

		let files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const isImage = Utils.IsImageFile(file.name);

			if (isImage) {
				Utils.GetResizedImage(file, 90, 90).then(loadedPhoto => {
					this.setState({ file, loadedPhoto });
				});
			}
		}
	};

	public render() {
		const { user } = this.props;
		const { loadedPhoto } = this.state;
		return (
			<div className="col-md-5 col-lg-4 bg-grey p-3 m-3 rounded">
				<div className="d-flex align-items-center border-bottom mb-3 pb-3">
					<button
						type="button"
						onClick={this._handlerClickBack}
						className="btn btn-success"
					>
						Back
					</button>
				</div>

				<div>
					<form onSubmit={this._handleSubmit}>
						<div className="form-group">
							<label htmlFor="displayName">Display Name</label>
							<input
								type="text"
								className="form-control"
								id="displayName"
								defaultValue={user.displayName}
							/>
						</div>

						<div className="d-flex">
							<div className="form-group">
								<label>Profile Photo</label>
								<div className="custom-file">
									<input
										type="file"
										className="custom-file-input"
										id="validatedCustomFile"
										onChange={this._onImageChange}
									/>
									<label
										className="custom-file-label"
										htmlFor="validatedCustomFile"
									>
										{this._getImageLabel()}
									</label>
									<div className="invalid-feedback">
										Example invalid custom file feedback
									</div>
								</div>
							</div>

							<div className="mx-auto">
								<img
									src={loadedPhoto || user.photoURL}
									className="rounded-circle userAvatar"
									alt={user.photoURL}
								/>
							</div>
						</div>

						<div className="d-flex">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		user: state.user.get("user")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...userActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProfile);
