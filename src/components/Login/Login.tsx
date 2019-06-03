//actions
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../../bus/user/actions";
import Styles from "./Login.module.scss";

interface ILoginProps {
	actions: any;
}

interface ILoginState {}

class Login extends React.Component<ILoginProps, ILoginState> {
	private _handlerClick = () => {
		const { actions } = this.props;
		actions.loginAsync();
	};

	public render() {
		return (
			<div className="d-flex h-100 justify-content-center align-items-center">
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...userActions }, dispatch)
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Login);
