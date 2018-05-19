import * as TYPES from "./types";
import { reduce, assoc, mergeAll } from "ramda";

const setInitialState = () => {
	return;
};
const setErrorState = () => {
	return;
};

const REQUEST_TYPES = [
	TYPES.GET_DASHBOARDS_REQUEST,
	TYPES.CREATE_DASHBOARD_REQUEST,
	TYPES.EDIT_DASHBOARD_REQUEST,
	TYPES.DELETE_DASHBOARD_REQUEST,
];
const FAILURE_TYPES = [
	TYPES.GET_DASHBOARDS_FAILURE,
	TYPES.CREATE_DASHBOARD_FAILURE,
	TYPES.EDIT_DASHBOARD_FAILURE,
	TYPES.DELETE_DASHBOARD_FAILURE,
];

const requestsMap = reduce((o, n) => assoc(n, setInitialState, o), {}, REQUEST_TYPES);
const failuresMap = reduce((o, n) => assoc(n, setErrorState, o), {}, FAILURE_TYPES);
const successMap = {
	[TYPES.GET_DASHBOARDS_SUCCESS]: () => {
		return;
	},
	[TYPES.CREATE_DASHBOARD_SUCCESS]: () => {
		return;
	},
	[TYPES.EDIT_DASHBOARD_SUCCESS]: () => {
		return;
	},
	[TYPES.DELETE_DASHBOARD_SUCCESS]: () => {
		return;
	},
};
const reducer = mergeAll([requestsMap, failuresMap, successMap]);

export { reducer };
