import * as TYPES from "./types";
import { reduce, assoc, mergeAll } from "ramda";

const setInitialState = () => {
	return;
};
const setErrorState = () => {
	return;
};

const REQUEST_TYPES = [
	TYPES.GET_SHEETS_REQUEST,
	TYPES.CREATE_SHEET_REQUEST,
	TYPES.EDIT_SHEET_REQUEST,
	TYPES.DELETE_SHEET_REQUEST,
];
const FAILURE_TYPES = [
	TYPES.GET_SHEETS_FAILURE,
	TYPES.CREATE_SHEET_FAILURE,
	TYPES.EDIT_SHEET_FAILURE,
	TYPES.DELETE_SHEET_FAILURE,
];

const requestsMap = reduce((o, n) => assoc(n, setInitialState, o), {}, REQUEST_TYPES);
const failuresMap = reduce((o, n) => assoc(n, setErrorState, o), {}, FAILURE_TYPES);
const successMap = {
	[TYPES.GET_SHEETS_SUCCESS]: () => {
		return;
	},
	[TYPES.CREATE_SHEET_SUCCESS]: () => {
		return;
	},
	[TYPES.EDIT_SHEET_SUCCESS]: () => {
		return;
	},
	[TYPES.DELETE_SHEET_SUCCESS]: () => {
		return;
	},
};
const reducer = mergeAll([requestsMap, failuresMap, successMap]);

export { reducer };
