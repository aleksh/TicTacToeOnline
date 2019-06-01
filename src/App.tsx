import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "./bus/user/actions";
import Loading from "./components/Loading/Loading";
import Private from "./navigation/Private";
import Public from "./navigation/Public";

interface IAppProps {
	isInitialized: boolean;
	isLoggedIn: boolean;
	actions: any;
}

interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
	componentDidMount = () => {
		this.props.actions.authChangedAsync();
	};

	public render() {
		const { isInitialized, isLoggedIn } = this.props;

		if (!isInitialized) {
			return <Loading />;
		}

		return !isLoggedIn ? <Private /> : <Public />;
	}
}

const mapStateToProps = (state: any) => {
	return {
		isInitialized: state.user.get("isInitialized"),
		isLoggedIn: state.user.get("isLoggedIn")
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
)(App);
