import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../bus/user/actions";
import Catcher from "../components/Catcher/Catcher";
import Login from "../components/Login/Login";

interface ILoginPageProps {
	actions: any;
}

interface ILoginPageState {}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
	_handlerLogin = () => {
		const { actions } = this.props;
		actions.loginAsync();
	};

	public render() {
		return (
			<Catcher>
				<Login click={this._handlerLogin} />
			</Catcher>
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
)(LoginPage);
