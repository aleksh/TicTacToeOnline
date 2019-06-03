import React from "react";
import Catcher from "../components/Catcher/Catcher";
import Game from "../components/Game/Game";
import Modals from "../components/Modals/Modals";
import Opponents from "../components/Opponents/Opponents";
import User from "../components/User/User";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (
	props: IMainPageProps
) => {
	return (
		<Catcher>
			<div className="container-fluid">
				<div className="row m-0 justify-content-center flex-nowrap">
					<User />
					<Game />
					<Opponents />
				</div>
			</div>
			<Modals />
		</Catcher>
	);
};

export default MainPage;
