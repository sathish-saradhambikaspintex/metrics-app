import * as TYPES from "./types";

const getDashboards = () => ({
  types: [
    TYPES.GET_DASHBOARDS_REQUEST,
    TYPES.GET_DASHBOARDS_SUCCESS,
    TYPES.GET_DASHBOARDS_FAILURE
  ],
  callAPI: () => fetch("GET", "/api/dashboard")
});
const createDashboard = data => ({
  types: [
    TYPES.CREATE_DASHBOARD_REQUEST,
    TYPES.CREATE_DASHBOARD_SUCCESS,
    TYPES.CREATE_DASHBOARD_FAILURE
  ],
  callAPI: () => fetch("POST", "/api/dashboard", data)
});
const updateDashboard = (name, data) => ({
  types: [
    TYPES.EDIT_DASHBOARD_REQUEST,
    TYPES.EDIT_DASHBOARD_SUCCESS,
    TYPES.EDIT_DASHBOARD_FAILURE
  ],
  callAPI: () => fetch("PUT", `/api/dashboard/${name}`, data),
  meta: { name }
});
const deleteDashboard = name => ({
  types: [
    TYPES.DELETE_DASHBOARD_REQUEST,
    TYPES.DELETE_DASHBOARD_SUCCESS,
    TYPES.DELETE_DASHBOARD_FAILURE
  ],
  callAPI: () => fetch("DELETE", `/api/dashboard/${name}`),
  meta: { name }
});

export default {
  getDashboards,
  createDashboard,
  updateDashboard,
  deleteDashboard
};
