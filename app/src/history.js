import createHistory from "history/createBrowserHistory";

const history = createHistory();
const pushRoute = (path, isExternalRoute = false) => {
	if (!isExternalRoute) return () => history.push(path);
	return () => {
		window.location = `http://localhost:3009${path}`;
	};
};
const replaceRoute = path => () => history.replace(path);

export default history;
export { pushRoute, replaceRoute };
