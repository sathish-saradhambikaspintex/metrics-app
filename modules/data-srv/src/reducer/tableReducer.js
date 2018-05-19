import { set, unset } from "./utils";
import * as TYPES from "./types";
import {
	compose,
	insertAll,
	reduce,
	assoc,
	prop,
	mergeAll,
	path,
	update,
	remove,
	findIndex,
	propEq,
	append,
} from "ramda";

const clearAll = key => {
	if (key) {
		return compose(unset(`tables.${key}.isLoading`), unset(`tables.${key}.error`), unset(`tables.${key}.message`));
	}

	return compose(unset("tables.isLoading"), unset("tables.error"), unset("tables.message"));
};

const setInitialState = (state, action) => {
	const key = action.meta.collectionName;
	if (key) {
		return compose(set(`tables.${key}.isLoading`, true), unset(`tables.${key}.message`), unset(`tables.${key}.error`))(
			state
		);
	}
	return compose(set("tables.isLoading", true), unset("tables.message"), unset("tables.error"))(state);
};

const setErrorState = (state, action) => {
	const name = action.meta.collectionName;
	const error = action.payload;
	const message = action.payload.message;
	if (name)
		return compose(
			unset(`tables.${name}.isLoading`),
			set(`tables.${name}.error`, error),
			set(`tables.${name}.message`, message)
		)(state);
	return compose(unset("tables.isLoading"), set("tables.error", error), set("tables.message", message))(state);
};

const REQUEST_TYPES = [
	TYPES.GET_TABLES_REQUEST,
	TYPES.GET_TABLE_REQUEST,
	TYPES.ADD_TABLE_REQUEST,
	TYPES.UPDATE_TABLE_REQUEST,
	TYPES.STAR_TABLE_REQUEST,
	TYPES.DELETE_TABLE_REQUEST,
	TYPES.GET_DPS_REQUEST,
	TYPES.GET_DP_REQUEST,
	TYPES.CREATE_DP_REQUEST,
	TYPES.UPDATE_DP_REQUEST,
	TYPES.DELETE_DP_REQUEST,
];
const FAILURE_TYPES = [
	TYPES.GET_TABLES_FAILURE,
	TYPES.GET_TABLE_FAILURE,
	TYPES.ADD_TABLE_FAILURE,
	TYPES.UPDATE_TABLE_FAILURE,
	TYPES.STAR_TABLE_FAILURE,
	TYPES.DELETE_TABLE_FAILURE,
	TYPES.GET_DPS_FAILURE,
	TYPES.GET_DP_FAILURE,
	TYPES.CREATE_DP_FAILURE,
	TYPES.UPDATE_DP_FAILURE,
	TYPES.DELETE_DP_FAILURE,
];
const requestsMap = reduce((o, n) => assoc(n, setInitialState, o), {}, REQUEST_TYPES);
const failuresMap = reduce((o, n) => assoc(n, setErrorState, o), {}, FAILURE_TYPES);
const successMap = {
	[TYPES.GET_TABLES_SUCCESS]: (state, action) => {
		const { data } = action.payload;
		const setData = compose(set("tables", data), clearAll());
		return setData(state);
	},
	[TYPES.GET_TABLE_SUCCESS]: (state, action) => {
		const { data } = action.payload;
		const { collectionName } = action.meta;
		const setData = compose(set(`tables.${collectionName}`, data), clearAll(collectionName));
		return setData(state);
	},
	[TYPES.ADD_TABLE_SUCCESS]: (state, action) => {
		const { data, message } = action.payload;
		const { name } = data;
		const setData = compose(set("tables", message), set(`tables.${name}`, data), clearAll());
		return setData(state);
	},
	[TYPES.UPDATE_TABLE_SUCCESS]: (state, action) => {
		const { data, message } = action.payload;
		const { collectionName } = action.meta;
		const setData = compose(
			set(`tables.${collectionName}.message`, message),
			set(`tables.${collectionName}`, data),
			clearAll(collectionName)
		);
		return setData(state);
	},
	[TYPES.DELETE_TABLE_SUCCESS]: (state, action) => {
		const message = action.payload.message;
		const name = action.meta.collectionName;
		const deleteTemplate = compose(set("tables.message", message), unset(`tables.${name}`), clearAll(name));
		return deleteTemplate(state);
	},
	[TYPES.STAR_TABLE_SUCCESS]: (state, action) => {
		const { data, collectionName } = action.payload;
		const isFavorite = data.isFavorite;
		const setData = compose(set(`tables.${collectionName}.isFavorite`, isFavorite), clearAll(collectionName));
		return setData(state);
	},

	[TYPES.GET_DPS_SUCCESS]: (state, action) => {
		const { items: newItems, paging: newPaging } = action.payload;
		const { collectionName } = action.meta;
		const { items: oldItems = [], paging: oldPaging = {} } = state.tables[collectionName];

		const oldNextKey = prop("nextKey", oldPaging);
		const newNextKey = prop("nextKey", newPaging);

		const mergedItems = insertAll(oldItems.length, newItems, oldItems);

		if (newNextKey !== oldNextKey) {
			const setData = compose(
				set(`tables.${collectionName}.paging`, newPaging),
				set(`tables.${collectionName}.items`, mergedItems),
				clearAll(collectionName)
			);
			return setData(state);
		} else {
			return clearAll(collectionName)(state);
		}
	},
	[TYPES.GET_DP_SUCCESS]: (state, action) => {
		const { collectionName, id } = action.meta;
		const { data } = action.payload;
		const { items: oldItems = [] } = state.tables[collectionName];
		const itemIdx = findIndex(propEq("_id", id), oldItems);
		let setData, newItems;

		if (itemIdx > -1) {
			newItems = update(itemIdx, data, oldItems);
			setData = compose(set(`tables.${collectionName}.items`, newItems), clearAll(collectionName));
		} else {
			newItems = append(data, oldItems);
			setData = compose(set(`tables.${collectionName}.items`, newItems), clearAll(collectionName));
		}
		return setData(state);
	},
	[TYPES.CREATE_DP_SUCCESS]: (state, action) => {
		const { data, message } = action.payload;
		const { collectionName } = action.meta;
		const { items: oldItems = [] } = state.tables[collectionName];
		const newItems = append(data, oldItems);
		const count = path(["tables", collectionName, "count"], state) + 1;

		const setData = compose(
			set(`tables.${collectionName}.message`, message),
			set(`tables.${collectionName}.count`, count),
			set(`tables.${collectionName}.items`, newItems),
			clearAll(collectionName)
		);
		return setData(state);
	},
	[TYPES.UPDATE_DP_SUCCESS]: (state, action) => {
		const { data, message } = action.payload;
		const { collectionName, id } = action.meta;
		const { items: oldItems = [] } = state.tables[collectionName];
		const itemIdx = findIndex(propEq("_id", id), oldItems);

		if (itemIdx > -1) {
			let newItems = update(itemIdx, data, oldItems);
			const setData = compose(
				set(`tables.${collectionName}.message`, message),
				set(`tables.${collectionName}.items`, newItems),
				clearAll(collectionName)
			);
			return setData(state);
		} else {
			return state;
		}
	},
	[TYPES.DELETE_DP_SUCCESS]: (state, action) => {
		const { collectionName, id } = action.meta;
		const { message } = action.payload;
		const { items: oldItems = [] } = state.tables[collectionName];
		const count = path(["tables", collectionName, "count"], state) - 1;
		const itemIdx = findIndex(propEq("_id", id), oldItems);

		if (itemIdx > -1) {
			let newItems = remove(itemIdx, 1, oldItems);
			const setData = compose(
				set(`tables.${collectionName}.message`, message),
				set(`tables.${collectionName}.count`, count),
				set(`tables.${collectionName}.items`, newItems),
				clearAll(collectionName)
			);
			return setData(state);
		} else {
			return state;
		}
	},
};
const reducer = mergeAll([requestsMap, failuresMap, successMap]);

export { reducer };
