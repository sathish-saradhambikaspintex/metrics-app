import * as TYPES from "./types";
import { param } from "./utils";

const getDataSources = () => ({
  types: [
    TYPES.GET_DATASOURCES_REQUEST,
    TYPES.GET_DATASOURCES_SUCCESS,
    TYPES.GET_DATASOURCES_FAILURE
  ],
  callAPI: () => fetch("GET", "/api/table")
});
const getDataSource = (collectionName, options) => ({
  types: [
    TYPES.GET_DATASOURCE_REQUEST,
    TYPES.GET_DATASOURCE_SUCCESS,
    TYPES.GET_DATASOURCE_FAILURE
  ],
  callAPI: () =>
    fetch("GET", `/api/table/${collectionName}/item${param(options)}`),
  meta: { collectionName }
});
const addDataSource = data => ({
  types: [
    TYPES.ADD_DATASOURCE_REQUEST,
    TYPES.ADD_DATASOURCE_SUCCESS,
    TYPES.ADD_DATASOURCE_FAILURE
  ],
  callAPI: () => fetch("POST", "/api/dataSource", data)
});

const removeDataSource = name => ({
  types: [
    TYPES.REMOVE_DATASOURCE_REQUEST,
    TYPES.REMOVE_DATASOURCE_SUCCESS,
    TYPES.REMOVE_DATASOURCE_FAILURE
  ],
  callAPI: () => fetch("DELETE", `/api/dataSource/${name}`),
  meta: { name }
});

const getJoinTable = () => ({
  type: [
    TYPES.GET_JOIN_TABLE_REQUEST,
    TYPES.GET_JOIN_TABLE_SUCCESS,
    TYPES.GET_JOIN_TABLE_FAILURE
  ]
});

const createJoinTable = data => ({
  type: [
    TYPES.CREATE_JOIN_TABLE_REQUEST,
    TYPES.CREATE_JOIN_TABLE_SUCCESS,
    TYPES.CREATE_JOIN_TABLE_FAILURE
  ],
  meta: { data }
});

export default {
  getDataSources,
  getDataSource,
  addDataSource,
  removeDataSource,
  createJoinTable,
  getJoinTable
};
