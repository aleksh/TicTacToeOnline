//actions
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Styles from "./Login.module.scss";

interface ILoginProps {
	click: Function;
}

interface ILoginState {}

export default class Login extends React.Component<ILoginProps, ILoginState> {
	private _handlerClick = () => {
		const { click } = this.props;
		click();
	};

	public render() {
		return (
			<div className="d-flex h-100 justify-content-center align-items-center bd-highlight">
				<button
					type="button"
					className={"btn btn-lg " + Styles.btnFacebook}
					onClick={this._handlerClick}
				>
					<FontAwesomeIcon className="mr-2" icon={faFacebookF} />
					Sign in with Facebook
				</button>
			</div>
		);
	}
}
