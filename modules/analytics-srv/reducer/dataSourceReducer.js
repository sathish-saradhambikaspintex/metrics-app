import * as TYPES from "./types";
import { set, unset } from "./utils";
import { compose, reduce, assoc, mergeAll } from "ramda";

const clearAll = key => {
	if (key) {
		return compose(
			unset(`dataSource.${key}.isLoading`),
			unset(`dataSource.${key}.error`),
			unset(`dataSource.${key}.message`)
		);
	}

	return compose(unset("isLoading"), unset("error"), unset("message"));
};

const setInitialState = (state, action) => {
	const key = action.meta.collectionName;
	if (key) {
		return compose(
			set(`dataSource.${key}.isLoading`, true),
			unset(`dataSource.${key}.message`),
			unset(`dataSource.${key}.error`)
		)(state);
	}
	return compose(set("dataSource.isLoading", true), unset("dataSource.message"), unset("dataSource.error"))(state);
};

const setErrorState = (state, action) => {
	const name = action.meta.collectionName;
	const error = action.payload;
	const message = action.payload.message;
	if (name)
		return compose(
			unset(`dataSource.${name}.isLoading`),
			set(`dataSource.${name}.error`, error),
			set(`dataSource.${name}.message`, message)
		)(state);
	return compose(unset("dataSource.isLoading"), set("dataSource.error", error), set("dataSource.message", message))(
		state
	);
};

const REQUEST_TYPES = [
	TYPES.GET_DATASOURCES_REQUEST,
	TYPES.GET_DATASOURCE_REQUEST,
	TYPES.ADD_DATASOURCE_REQUEST,
	TYPES.REMOVE_DATASOURCE_REQUEST,
	TYPES.CREATE_JOIN_TABLE_REQUEST,
	TYPES.GET_JOIN_TABLE_REQUEST,
];
const FAILURE_TYPES = [
	TYPES.GET_DATASOURCES_FAILURE,
	TYPES.GET_DATASOURCE_FAILURE,
	TYPES.ADD_DATASOURCE_FAILURE,
	TYPES.REMOVE_DATASOURCE_FAILURE,
	TYPES.CREATE_JOIN_TABLE_FAILURE,
	TYPES.GET_JOIN_TABLE_FAILURE,
];

const successMap = {
	[TYPES.GET_DATASOURCES_SUCCESS]: (state, action) => {
		const { data } = action.payload;
		const setData = compose(set("dataSource", data), clearAll());
		return setData(state);
	},
	[TYPES.GET_DATASOURCE_SUCCESS]: (state, action) => {
		const { items: newItems } = action.payload;
		const { collectionName } = action.meta;
		const setData = compose(set(`dataSource.${collectionName}.items`, newItems), clearAll(collectionName));
		return setData(state);
	},
	[TYPES.ADD_DATASOURCE_SUCCESS]: () => {
		return;
	},
	[TYPES.REMOVE_DATASOURCE_SUCCESS]: () => {
		return;
	},
	[TYPES.GET_JOIN_TABLE_SUCCESS]: (state, action) => {
		const { data } = action.payload;
		const setData = compose(set("dataSource.joinTable", data), clearAll());
		return setData(state);
	},
	[TYPES.CREATE_JOIN_TABLE_SUCCESS]: (state, action) => {
		const { data } = action.meta;
		const setData = compose(set(`dataSource.joinTable.${data}`, data), clearAll());
		return setData(state);
	},
};
const requestsMap = reduce((o, n) => assoc(n, setInitialState, o), {}, REQUEST_TYPES);
const failuresMap = reduce((o, n) => assoc(n, setErrorState, o), {}, FAILURE_TYPES);

const reducer = mergeAll([requestsMap, failuresMap, successMap]);

export { reducer };
