import * as TYPES from "./types";
import { param } from "./utils";

function getTables() {
  return {
    types: [
      TYPES.GET_TABLES_REQUEST,
      TYPES.GET_TABLES_SUCCESS,
      TYPES.GET_TABLES_FAILURE
    ],
    callAPI: () => fetch("GET", "/api/table")
  };
}
function getTable(collectionName) {
  return {
    types: [
      TYPES.GET_TABLE_REQUEST,
      TYPES.GET_TABLE_SUCCESS,
      TYPES.GET_TABLE_FAILURE
    ],
    callAPI: () => fetch("GET", `/api/table/${collectionName}`),
    meta: { collectionName }
  };
}
function addTable(data) {
  return {
    types: [
      TYPES.ADD_TABLE_REQUEST,
      TYPES.ADD_TABLE_SUCCESS,
      TYPES.ADD_TABLE_FAILURE
    ],
    callAPI: () => fetch("POST", "/api/table", data)
  };
}
function updateTable(collectionName, data) {
  return {
    types: [
      TYPES.UPDATE_TABLE_REQUEST,
      TYPES.UPDATE_TABLE_SUCCESS,
      TYPES.UPDATE_TABLE_FAILURE
    ],
    callAPI: () => fetch("PUT", `/api/table/${collectionName}`, data),
    meta: { collectionName }
  };
}
function deleteTable(collectionName) {
  return {
    types: [
      TYPES.DELETE_TABLE_REQUEST,
      TYPES.DELETE_TABLE_SUCCESS,
      TYPES.DELETE_TABLE_FAILURE
    ],
    callAPI: () => fetch("DELETE", `/api/table/${collectionName}`),
    meta: { collectionName }
  };
}
function starTable(collectionName) {
  return {
    types: [
      TYPES.STAR_TABLE_REQUEST,
      TYPES.STAR_TABLE_SUCCESS,
      TYPES.STAR_TABLE_FAILURE
    ],
    callAPI: () => fetch("GET", `/api/table/star/${collectionName}`),
    meta: { collectionName }
  };
}

function getDataPoints(collectionName, options) {
  const api = `/api/table/${collectionName}/item${param(options)}`;
  return {
    types: [
      TYPES.GET_DPS_REQUEST,
      TYPES.GET_DPS_SUCCESS,
      TYPES.GET_DPS_FAILURE
    ],
    callAPI: () => fetch("GET", api),
    meta: { collectionName }
  };
}
function createDataPoint(collectionName, data) {
  return {
    types: [
      TYPES.CREATE_DP_REQUEST,
      TYPES.CREATE_DP_SUCCESS,
      TYPES.CREATE_DP_FAILURE
    ],
    callAPI: () => fetch("POST", `/api/table/${collectionName}/item`, data),
    meta: { collectionName }
  };
}
function getDataPoint(collectionName, id) {
  return {
    types: [TYPES.GET_DP_REQUEST, TYPES.GET_DP_SUCCESS, TYPES.GET_DP_FAILURE],
    callAPI: () => fetch("GET", `/api/table/${collectionName}/item/${id}`),
    meta: { collectionName, id }
  };
}
function updateDataPoint(collectionName, id, data) {
  return {
    types: [
      TYPES.UPDATE_DP_REQUEST,
      TYPES.UPDATE_DP_SUCCESS,
      TYPES.UPDATE_DP_FAILURE
    ],
    callAPI: () =>
      fetch("PUT", `/api/table/${collectionName}/item/${id}`, data),
    meta: { collectionName, id }
  };
}
function deleteDataPoint(collectionName, id) {
  return {
    types: [
      TYPES.DELETE_DP_REQUEST,
      TYPES.DELETE_DP_SUCCESS,
      TYPES.DELETE_DP_FAILURE
    ],
    callAPI: () => fetch("DELETE", `/api/table/${collectionName}/item/${id}`),
    meta: { collectionName, id }
  };
}

export default {
  getTables,
  getTable,
  addTable,
  updateTable,
  deleteTable,
  starTable,

  getDataPoints,
  createDataPoint,
  getDataPoint,
  updateDataPoint,
  deleteDataPoint
};
