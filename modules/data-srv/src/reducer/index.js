import { merge } from "ramda";
import { handleActions } from "redux-actions";
import { reducer as tableReducer } from "./tableReducer";
import { reducer as bookReducer } from "./bookReducer";
import tableActions from "./tableActions";
import bookActions from "./bookActions";

const initialState = {
	tables: {},
	books: {},
};
const reducer = handleActions(merge(tableReducer, bookReducer), initialState);

export { reducer as default, tableActions, bookActions };
