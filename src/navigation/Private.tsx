import React from "react";
import { Switch, Redirect, Route } from "react-router";
import LoginPage from "../pages/LoginPage";


import { Path } from './path';


interface IPrivateProps {}

interface IPrivateState {}

export default class Private extends React.Component<IPrivateProps, IPrivateState> {
	public render() {
		return (
            <Switch>
                <Route component = { LoginPage } path = { Path.login } />
                <Redirect to = { Path.login } />
            </Switch>
        );
	}
}
