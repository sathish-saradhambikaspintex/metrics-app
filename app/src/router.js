/* eslint-disable react/display-name, react/prop-types */

import React from "react";
import store from "./reduxStore";
import AppNavbar from "./AppNavbar";
import Router from "universal-router";
import { getToken, decodeToken, setToken } from "./auth";
import { pushRoute, replaceRoute } from "./history";
import { isNil, compose, not, anyPass, isEmpty, path } from "ramda";

import { ListUsers, userActions } from "user-srv";
import {
  ListTables,
  ListBooks,
  TableViewer,
  TableDesigner,
  TableEntry
} from "data-srv";
import {
  Dashboard,
  DataSource,
  Sheets,
  SheetDesigner,
  DashboardDesigner
} from "analytics-srv";

const getStoreState = store.getState;
const addCurrentUser = data => store.dispatch(userActions.addCurrentUser(data));
const removeCurrentUser = data =>
  store.dispatch(userActions.addCurrentUser(data));
const gotoLoginPage = pushRoute("/login", true);
const gotoDataRoute = replaceRoute("/app/data/tables");
const gotoAnalyticsRoute = replaceRoute("/app/analytics/sheets");
const isCurrentUserInState = compose(
  not,
  anyPass([isNil, isEmpty]),
  path(["user", "currentUser"])
);
const authenticate = ({ next }) => {
  return Promise.resolve(getToken())
    .then(token => {
      if (isNil(token)) return gotoLoginPage();
      const currentStoreState = getStoreState();
      if (isCurrentUserInState(currentStoreState)) return Promise.resolve();
      const userClaims = decodeToken(token);
      addCurrentUser(userClaims);
      return Promise.resolve();
    })
    .then(next);
};

export const routes = [
  {
    path: "/app",
    action: () => {
      const isTokenInStore = getToken();
      const query = new URL(window.location.href).searchParams;
      const token = query.get("token");
      if (isTokenInStore) {
        return gotoDataRoute();
      } else if (!isNil(token)) {
        setToken({ token });
        return gotoDataRoute();
      } else {
        return gotoLoginPage();
      }
    }
  },
  {
    path: "/app/data",
    action: authenticate,
    children: [
      {
        path: "/",
        action: gotoDataRoute
      },
      {
        path: "/tables",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <ListTables />
          </div>
        )
      },
      {
        path: "/tables/:tableName",
        action: ({ params }) => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <TableViewer tableName={params.tableName} />
          </div>
        )
      },
      {
        path: "/tables/:tableName/create",
        action: ({ params }) => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <TableEntry tableName={params.tableName} />
          </div>
        )
      },
      {
        path: "/tables/:tableName/:id",
        action: ({ params }) => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <TableEntry tableName={params.tableName} id={params.id} />
          </div>
        )
      },
      {
        path: "/designer",
        action: () => {
          return (
            <div>
              <AppNavbar
                loggedInUser={getStoreState().user.currentUser}
                actions={removeCurrentUser}
              />
              <TableDesigner />
            </div>
          );
        }
      },
      {
        path: "/designer/:tableName",
        action: ({ params }) => {
          return (
            <div>
              <AppNavbar
                loggedInUser={getStoreState().user.currentUser}
                actions={removeCurrentUser}
              />
              <TableDesigner tableName={params.tableName} />
            </div>
          );
        }
      },
      {
        path: "/books",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <ListBooks />
          </div>
        )
      }
    ]
  },
  {
    path: "/app/analytics",
    action: authenticate,
    children: [
      {
        path: "/",
        action: gotoAnalyticsRoute
      },
      {
        path: "/dataSource",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <DataSource />
          </div>
        )
      },
      {
        path: "/sheets",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <Sheets />
          </div>
        )
      },
      {
        path: "/sheets/create",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <SheetDesigner />
          </div>
        )
      },
      {
        path: "/dashboard",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <Dashboard />
          </div>
        )
      },
      {
        path: "/dashboard/create",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <DashboardDesigner />
          </div>
        )
      }
    ]
  },
  {
    path: "/app/users",
    action: authenticate,
    children: [
      {
        path: "/",
        action: () => (
          <div>
            <AppNavbar
              loggedInUser={getStoreState().user.currentUser}
              actions={removeCurrentUser}
            />
            <ListUsers />
          </div>
        )
      }
    ]
  }
];

export default new Router(routes);
