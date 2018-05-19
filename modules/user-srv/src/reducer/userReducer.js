import * as TYPES from "./types";
import { set, unset } from "./utils";
import { compose, assoc, merge, reduce, mergeAll, map, prop } from "ramda";

const clearAll = compose(unset("isLoading"), unset("error"), unset("message"));
const setInitialState = (state, action) => {
	const key = action.meta.collectionName;
	if (key) {
		return compose(set(`${key}.isLoading`, true), unset(`${key}.message`), unset(`${key}.error`))(state);
	}
	return compose(set("isLoading", true), unset("message"), unset("error"))(state);
};
const setErrorState = (state, action) => {
	const name = action.meta.collectionName;
	const error = action.payload;
	const message = action.payload.message;
	if (name)
		return compose(unset(`${name}.isLoading`), set(`${name}.error`, error), set(`${name}.message`, message))(state);
	return compose(unset("isLoading"), set("error", error), set("message", message))(state);
};

const REQUEST_TYPES = [
	TYPES.GET_USERS_REQUEST,
	TYPES.GET_USER_REQUEST,
	TYPES.CREATE_USER_REQUEST,
	TYPES.EDIT_USER_REQUEST,
	TYPES.DELETE_USER_REQUEST,
];
const FAILURE_TYPES = [
	TYPES.GET_USERS_FAILURE,
	TYPES.GET_USER_FAILURE,
	TYPES.CREATE_USER_FAILURE,
	TYPES.EDIT_USER_FAILURE,
	TYPES.DELETE_USER_FAILURE,
];

const requestsMap = reduce((o, n) => assoc(n, setInitialState, o), {}, REQUEST_TYPES);
const failuresMap = reduce((o, n) => assoc(n, setErrorState, o), {}, FAILURE_TYPES);

const successMap = {
	[TYPES.GET_USERS_SUCCESS]: (state, action) => {
		const data = action.payload;
		const modifiedData = map(v => assoc("displayName", prop("username", v), v), data);
		const setData = compose(merge(modifiedData), clearAll);
		return setData(state);
	},

	[TYPES.GET_USER_SUCCESS]: (state, action) => {
		let data = action.payload;
		const { username } = action.meta;
		const modifiedData = assoc("displayName", username, data);
		const setData = compose(set(username, modifiedData), clearAll);
		return setData(state);
	},

	[TYPES.CREATE_USER_SUCCESS]: (state, action) => {
		const data = action.payload;
		const { username } = data;
		const modifiedData = assoc("displayName", username, data);
		const setData = compose(set(username, modifiedData), clearAll);
		return setData(state);
	},

	[TYPES.EDIT_USER_SUCCESS]: (state, action) => {
		let data = action.payload;
		const { username } = action.meta;
		const modifiedData = assoc("displayName", username, data);
		const setData = compose(set(username, modifiedData), clearAll);
		return setData(state);
	},

	[TYPES.DELETE_USER_SUCCESS]: (state, action) => {
		const { message } = action.payload;
		const { username } = action.meta;
		const setData = compose(set("message", message), unset(username), clearAll);
		return setData(state);
	},

	[TYPES.ADD_CURRENT_USER]: (state, action) => {
		const { data } = action.payload;
		const setData = set("currentUser", data);
		return setData(state);
	},
	[TYPES.REMOVE_CURRENT_USER]: set("currentUser", {}),
};
const reducer = mergeAll([requestsMap, failuresMap, successMap]);

export { reducer };
