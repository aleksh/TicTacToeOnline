import React from "react";
import Catcher from "../components/Catcher/Catcher";
import Login from "../components/Login/Login";
import Modals from "../components/Modals/Modals";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (
	props: ILoginPageProps
) => {
	return (
		<Catcher>
			<Login />
			<Modals />
		</Catcher>
	);
};

export default LoginPage;
