import * as TYPES from "./types";
import { set, unset } from "./utils";
import { compose, reduce, assoc, mergeAll } from "ramda";

const clearAll = key => {
	if (key) {
		return compose(unset(`books.${key}.isLoading`), unset(`books.${key}.error`), unset(`books.${key}.message`));
	}

	return compose(unset("books.isLoading"), unset("books.error"), unset("books.message"));
};
const setInitialState = (state, action) => {
	const key = action.meta.name;
	if (key) {
		return compose(set(`books.${key}.isLoading`, true), unset(`books.${key}.message`), unset(`books.${key}.error`))(
			state
		);
	}
	return compose(set("books.isLoading", true), unset("books.message"), unset("books.error"))(state);
};
const setErrorState = (state, action) => {
	const name = action.meta.name;
	const error = action.payload;
	const message = action.payload.message;
	if (name)
		return compose(
			unset(`books.${name}.isLoading`),
			set(`books.${name}.error`, error),
			set(`books.${name}.message`, message)
		)(state);
	return compose(unset("books.isLoading"), set("books.error", error), set("books.message", message))(state);
};

const REQUEST_TYPES = [
	TYPES.GET_WORKBOOKS_REQUEST,
	TYPES.CREATE_WORKBOOK_REQUEST,
	TYPES.EDIT_WORKBOOK_REQUEST,
	TYPES.DELETE_WORKBOOK_REQUEST,
];
const FAILURE_TYPES = [
	TYPES.GET_WORKBOOKS_FAILURE,
	TYPES.CREATE_WORKBOOK_FAILURE,
	TYPES.EDIT_WORKBOOK_FAILURE,
	TYPES.DELETE_WORKBOOK_FAILURE,
];
const requestsMap = reduce((o, n) => assoc(n, setInitialState, o), {}, REQUEST_TYPES);
const failuresMap = reduce((o, n) => assoc(n, setErrorState, o), {}, FAILURE_TYPES);
const successMap = {
	[TYPES.GET_WORKBOOKS_SUCCESS]: (state, action) => {
		const data = action.payload;
		const setData = compose(set("books", data), clearAll());
		return setData(state);
	},
	[TYPES.CREATE_WORKBOOK_SUCCESS]: (state, action) => {
		const { data, message } = action.payload;
		const { name } = data;
		const setData = compose(set(`books.${name}.message`, message), set(`books.${name}`, data), clearAll());
		return setData(state);
	},
	[TYPES.EDIT_WORKBOOK_SUCCESS]: (state, action) => {
		const { data, message } = action.payload;
		const { name } = action.meta;
		const setData = compose(set(`books.${name}.message`, message), set(`books.${name}`, data), clearAll());
		return setData(state);
	},
	[TYPES.DELETE_WORKBOOK_SUCCESS]: (state, action) => {
		const { name } = action.meta;
		const setData = compose(unset(`books.${name}`), clearAll());
		return setData(state);
	},
};
const reducer = mergeAll([requestsMap, failuresMap, successMap]);

export { reducer };
