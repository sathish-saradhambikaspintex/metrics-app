import { handleActions } from "redux-actions";
import { reducer as usersReducer } from "./userReducer";
import userActions from "./userActions";

const initialState = {
	currentUser: {},
	isLoading: false,
	message: "",
	error: {},
};

const reducer = handleActions(usersReducer, initialState);

export { reducer as default, userActions };
