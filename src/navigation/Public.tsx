import React from "react";
import { Redirect, Route, Switch } from "react-router";
import EditProfilePage from "../pages/EditProfilePage";
import MainPage from "../pages/MainPage";
import { Path } from "./path";

interface IPublicProps {}

interface IPublicState {}

export default class Public extends React.Component<
	IPublicProps,
	IPublicState
> {
	public render() {
		return (
			<Switch>
				<Route render={MainPage} path={Path.game} />
				<Route render={EditProfilePage} path={Path.profile} />
				<Redirect to={Path.game} />
			</Switch>
		);
	}
}
