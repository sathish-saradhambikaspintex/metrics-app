import thunk from "redux-thunk";
import dataReducer from "data-srv";
import userReducer from "user-srv";
import analyticsReducer from "analytics-srv";
import {
  anyPass,
  lt,
  not,
  length,
  is,
  reduce,
  compose as rCompose
} from "ramda";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";

const rootReducer = combineReducers({
  data: dataReducer,
  analytics: analyticsReducer,
  user: userReducer
});

const checkTypes = anyPass([
  rCompose(not, is(Array)),
  rCompose(lt(3), length),
  rCompose(not, reduce((res, v) => res && is(String, v), true))
]);

function callApiMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload: initalPayload = {},
      meta = {}
    } = action;
    // normal action - passing it on
    if (!types) return next(action);

    if (checkTypes(types)) {
      throw new Error("Expected an array of three string types");
    }

    if (!is(Function, callAPI)) {
      throw new Error("Expected callAPI to be a function");
    }

    if (!shouldCallAPI(getState())) {
      return Promise.resolve(undefined);
    }

    const [requestType, successType, failureType] = types;

    dispatch({ payload: { ...initalPayload }, meta, type: requestType });

    return callAPI()
      .then(response => {
        const object = {
          meta,
          payload: { ...initalPayload, ...response },
          type: successType
        };
        return dispatch(object);
      })
      .catch(error => {
        const object = {
          meta,
          payload: error,
          error: true,
          type: failureType
        };
        return Promise.reject(dispatch(object));
      });
  };
}

function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, callApiMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

export default configureStore();
