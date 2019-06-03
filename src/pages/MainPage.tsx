import React from "react";
import Catcher from "../components/Catcher/Catcher";
import Game from "../components/Game/Game";
import Modals from "../components/Modals/Modals";
import Opponents from "../components/Opponents/Opponents";
import User from "../components/User/User";

interface IMainProps {}

interface IMainState {}

export default class MainPage extends React.Component<IMainProps, IMainState> {
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
