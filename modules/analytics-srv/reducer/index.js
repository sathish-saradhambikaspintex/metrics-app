import { merge } from "ramda";
import { handleActions } from "redux-actions";
import { reducer as dataSourceReducer } from "./dataSourceReducer";
import { reducer as dashboardReducer } from "./dashboardReducer";
import { reducer as sheetReducer } from "./sheetReducer";
import dataSourceActions from "./dataSourceActions";
import dashboardActions from "./dashboardActions";
import sheetActions from "./sheetActions";

const initialState = {
	dataSource: {},
	dashboards: {},
	sheets: {},
};
const reducer = handleActions(merge(dataSourceReducer, dashboardReducer, sheetReducer), initialState);

export { reducer as default, dataSourceActions, dashboardActions, sheetActions };
