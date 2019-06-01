import React from "react";
import { Redirect, Route, Switch } from "react-router";
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
				<Route component={MainPage} path={Path.game} />
				<Redirect to={Path.game} />
			</Switch>
		);
	}
}
