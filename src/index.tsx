import "bootstrap/dist/css/bootstrap.css";
import { ConnectedRouter as Router } from "connected-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { history } from "./init/middleware/core";
import { store } from "./init/store";

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);
