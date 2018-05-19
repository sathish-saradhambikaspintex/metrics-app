import * as TYPES from "./types";

const getBooks = () => ({
  types: [
    TYPES.GET_WORKBOOKS_REQUEST,
    TYPES.GET_WORKBOOKS_SUCCESS,
    TYPES.GET_WORKBOOKS_FAILURE
  ],
  callAPI: () => fetch("GET", "/api/workbooks")
});
const addWorkbook = data => ({
  types: [
    TYPES.CREATE_WORKBOOK_REQUEST,
    TYPES.CREATE_WORKBOOK_SUCCESS,
    TYPES.CREATE_WORKBOOK_FAILURE
  ],
  callAPI: () => fetch("POST", "/api/workbooks", data)
});
const updateWorkbook = (name, data) => ({
  types: [
    TYPES.EDIT_WORKBOOK_REQUEST,
    TYPES.EDIT_WORKBOOK_SUCCESS,
    TYPES.EDIT_WORKBOOK_FAILURE
  ],
  callAPI: () => fetch("PUT", `/api/workbooks/${name}`, data),
  meta: { name }
});
const deleteWorkbook = name => ({
  types: [
    TYPES.DELETE_WORKBOOK_REQUEST,
    TYPES.DELETE_WORKBOOK_SUCCESS,
    TYPES.DELETE_WORKBOOK_FAILURE
  ],
  callAPI: () => fetch("DELETE", `/api/workbooks/${name}`),
  meta: { name }
});

export default { getBooks, addWorkbook, updateWorkbook, deleteWorkbook };
