import * as TYPES from "./types";

const getSheets = () => ({
	types: [TYPES.GET_SHEETS_REQUEST, TYPES.GET_SHEETS_SUCCESS, TYPES.GET_SHEETS_FAILURE],
	callAPI: () => fetch("GET", "/api/sheets"),
});
const createSheet = data => ({
	types: [TYPES.CREATE_SHEET_REQUEST, TYPES.CREATE_SHEET_SUCCESS, TYPES.CREATE_SHEET_FAILURE],
	callAPI: () => fetch("POST", "/api/sheets", data),
});
const updateSheet = (name, data) => ({
	types: [TYPES.EDIT_SHEET_REQUEST, TYPES.EDIT_SHEET_SUCCESS, TYPES.EDIT_SHEET_FAILURE],
	callAPI: () => fetch("PUT", `/api/sheets/${name}`, data),
	meta: { name },
});
const deleteSheet = name => ({
	types: [TYPES.DELETE_SHEET_REQUEST, TYPES.DELETE_SHEET_SUCCESS, TYPES.DELETE_SHEET_FAILURE],
	callAPI: () => fetch("DELETE", `/api/sheets/${name}`),
	meta: { name },
});

export default { getSheets, createSheet, updateSheet, deleteSheet };
