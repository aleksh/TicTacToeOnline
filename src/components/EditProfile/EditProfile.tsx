import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../bus/user/actions";
import { history } from "../../init/middleware/core";
import { Path } from "../../navigation/path";
import Utils from "../../utils/Utils";
import VOUser from "../../VO/VOUser";
import FormIndicator from "../FormIndicator/FormIndicator";

interface IEditProfileProps {
	user: VOUser;
	isUpdating: boolean;
	isUpdated: boolean;
	isUpdateError: boolean;
	actions: any;
}

interface IEditProfileState {
	file: any;
	loadedPhoto: any;
	displayName: string;
	formErrors: any;
	displayNameValid: boolean;
	formValid: boolean;
	[key: string]: any;
}

class EditProfile extends React.Component<
	IEditProfileProps,
	IEditProfileState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			file: null,
			loadedPhoto: null,
			displayName: "",
			formErrors: { displayName: "" },
			displayNameValid: true,
			formValid: false,
			formChanged: false
		};
	}

	componentDidMount = () => {
		const { user } = this.props;
		this.setState({
			displayName: user.displayName,
			loadedPhoto: user.photoURL
		});
	};

	componentWillUnmount = () => {
		const { actions } = this.props;
		actions.profileUpdateReset();
	};

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

		const { actions } = this.props;
		const { loadedPhoto, displayName, file, formValid } = this.state;

		if (formValid) {
			actions.updateProfile({ loadedPhoto, displayName, file });
			this.setState({ formChanged: false }, this._validateForm);
		}
	};

	private _onImageChange = (event: any) => {
		event.preventDefault();

		let files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const isImage = Utils.IsImageFile(file.name);

			if (isImage) {
				Utils.GetResizedImage(file, 90, 90).then(loadedPhoto => {
					this.setState(
						{ file, loadedPhoto, formChanged: true },
						this._validateForm
					);
				});
			}
		}
	};

	_handleUserInput = (event: any) => {
		const { name, value } = event.target;

		this.setState({ [name]: value, formChanged: true }, () => {
			this._validateField(name, value);
		});
	};

	_validateField = (fieldName: string, value: string) => {
		let { formErrors, displayNameValid } = this.state;

		switch (fieldName) {
			case "displayName":
				displayNameValid = value.length >= 6;
				formErrors.displayName = displayNameValid ? "" : "Too short";
				break;
			default:
				break;
		}

		this.setState({ formErrors, displayNameValid }, this._validateForm);
	};

	_validateForm = () => {
		this.setState((prevState, props) => {
			return {
				formValid: prevState.displayNameValid && prevState.formChanged
			};
		});
	};

	public render() {
		const {
			loadedPhoto,
			displayName,
			formErrors,
			displayNameValid
		} = this.state;
		const { isUpdating, isUpdateError, isUpdated } = this.props;
		return (
			<div className="col-md-5 col-lg-4 bg-grey p-3 m-3 rounded">
				<div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
					<button
						type="button"
						onClick={this._handlerClickBack}
						className="btn btn-success"
					>
						Back
					</button>

					<FormIndicator
						loading={isUpdating}
						done={isUpdated}
						error={isUpdateError}
					/>
				</div>

				<div>
					<form onSubmit={this._handleSubmit}>
						<div className="form-group">
							<label htmlFor="displayName">Display Name</label>
							<input
								type="text"
								className={`form-control ${!displayNameValid &&
									"is-invalid"}`}
								id="displayName"
								name="displayName"
								value={displayName}
								onChange={this._handleUserInput}
							/>
							<div className="invalid-feedback">
								{formErrors.displayName}
							</div>
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
								</div>
							</div>

							<div className="mx-auto">
								<img
									src={loadedPhoto}
									className="rounded-circle userAvatar"
									alt=""
								/>
							</div>
						</div>

						<div className="d-flex">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isUpdating}
							>
								Update
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
		user: state.user.get("user"),
		isUpdating: state.user.get("isUpdating"),
		isUpdated: state.user.get("isUpdated"),
		isUpdateError: state.user.get("isUpdateError")
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
