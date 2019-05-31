import * as React from "react";
import Styles from "./Catcher.module.scss";

interface ICatcherProps {}

interface ICatcherState {}

export default class Catcher extends React.Component<
	ICatcherProps,
	ICatcherState
> {
	state = {
		error: false
	};

	componentDidCatch(error: any, stack: any) {
		console.log("ERROR:", error.message);
		console.log("STACKTRACE:", stack.componentStack);

		this.setState({
			error: true
		});
	}

	render() {
		const { error } = this.state;
		const { children } = this.props;

		if (error) {
			return (
				<section className={Styles.catcher}>
					<span>A mysterious error occured.</span>
					<p>
						Our space engineers strike team is already working in
						order to fix that for you!
					</p>
				</section>
			);
		}

		return children;
	}
}
