import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import router from "./router";
import store from "./reduxStore";
import history from "./history";
import registerServiceWorker from "./registerServiceWorker";

function renderComponent(component) {
	const container = document.getElementById("app-root");
	ReactDOM.render(<Provider store={store}>{component}</Provider>, container);
	return;
}
function resolvePath(path) {
	return router.resolve(path).then(renderComponent);
}

resolvePath(history.location.pathname); // render the current URL
history.listen(location => resolvePath(location.pathname)); // render subsequent URLs
registerServiceWorker();
