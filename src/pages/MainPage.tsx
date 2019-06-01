import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { gameActions } from "../bus/game/actions";
import Catcher from "../components/Catcher/Catcher";
import Game from "../components/Game/Game";
import Modals from "../components/Modals/Modals";
import Opponents from "../components/Opponents/Opponents";
import User from "../components/User/User";

interface IMainProps {
	actions: any;
}

interface IMainState {}

class Main extends React.Component<IMainProps, IMainState> {
	componentDidMount = () => {
		this.props.actions.subscribeForGamesAsync();
	};

	public render() {
		return (
			<Catcher>
				<div className="container-fluid">
					<div className="row justify-content-center flex-nowrap">
						<User />
						<Game />
						<Opponents />
					</div>
				</div>
				<Modals />
			</Catcher>
		);
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...gameActions }, dispatch)
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Main);
