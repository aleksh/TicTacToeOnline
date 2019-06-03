import * as React from "react";
import { history } from "../../init/middleware/core";
import { Path } from "../../navigation/path";

interface IEditProfileProps {}

interface IEditProfileState {}

export default class EditProfile extends React.Component<
	IEditProfileProps,
	IEditProfileState
> {
	private _handlerClickBack = () => {
		history.push(Path.game);
	};

	public render() {
		return (
			<div className="col-md-5 col-lg-4 bg-grey p-3 m-3 rounded">
				<button
					type="button"
					onClick={this._handlerClickBack}
					className="btn btn-sm btn-success"
				>
					Back
				</button>
				<p>Edit Profile</p>
			</div>
		);
	}
}
