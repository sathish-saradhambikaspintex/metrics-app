import * as TYPES from "./types";
import { createAction } from "redux-actions";

function getUsers() {
  return {
    types: [
      TYPES.GET_USERS_REQUEST,
      TYPES.GET_USERS_SUCCESS,
      TYPES.GET_USERS_FAILURE
    ],
    callAPI: () => fetch("GET", "/users")
  };
}
function getUser(username) {
  return {
    types: [
      TYPES.GET_USER_REQUEST,
      TYPES.GET_USER_SUCCESS,
      TYPES.GET_USER_FAILURE
    ],
    callAPI: () => fetch("GET", `/users/${username}`),
    meta: { username }
  };
}
function createUser(data) {
  return {
    types: [
      TYPES.CREATE_USER_REQUEST,
      TYPES.CREATE_USER_SUCCESS,
      TYPES.CREATE_USER_FAILURE
    ],
    callAPI: () => fetch("POST", "/users", data)
  };
}
function updateUser(username, data) {
  return {
    types: [
      TYPES.EDIT_USER_REQUEST,
      TYPES.EDIT_USER_SUCCESS,
      TYPES.EDIT_USER_FAILURE
    ],
    callAPI: () => fetch("PUT", `/users/${username}`, data),
    meta: { username }
  };
}
function deleteUser(username) {
  return {
    types: [
      TYPES.DELETE_USER_REQUEST,
      TYPES.DELETE_USER_SUCCESS,
      TYPES.DELETE_USER_FAILURE
    ],
    callAPI: () => fetch("DELETE", `/users/${username}`),
    meta: { username }
  };
}

const addCurrentUser = createAction(TYPES.ADD_CURRENT_USER, data => ({ data }));
const removeCurrentUser = createAction(TYPES.REMOVE_CURRENT_USER);

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addCurrentUser,
  removeCurrentUser
};
