//actions
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../bus/user/actions";
import { providerFacebook, providerGoogle } from "../../init/firebaseConfig";
import Styles from "./Login.module.scss";

interface ILoginProps {
	actions: any;
}

interface ILoginState {}

class Login extends React.Component<ILoginProps, ILoginState> {
	private _handlerClickFacebook = () => {
		const { actions } = this.props;
		actions.loginAsync(providerFacebook);
	};

	private _handlerClickGoogle = () => {
		const { actions } = this.props;
		actions.loginAsync(providerGoogle);
	};

	public render() {
		return (
			<div className="d-flex h-100 justify-content-center align-items-center">
				<button
					type="button"
					className={"btn mr-2 btn-lg " + Styles.btnFacebook}
					onClick={this._handlerClickFacebook}
				>
					<FontAwesomeIcon className="mr-2" icon={faFacebookF} />
					Sign in with Facebook
				</button>

				<button
					type="button"
					className={"btn ml-2 btn-lg " + Styles.btnGoogle}
					onClick={this._handlerClickGoogle}
				>
					<FontAwesomeIcon className="mr-2" icon={faGoogle} />
					Sign in with Google
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...userActions }, dispatch)
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Login);
