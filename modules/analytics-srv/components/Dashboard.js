import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dashboardActions } from "../reducer";
import React, { Component, Fragment } from "react";
import { length, path, compose, pathOr } from "ramda";
import {
  Button,
  Menu,
  Text,
  Controls,
  Popover,
  Layout,
  NonIdealState,
  Progress,
  HTMLTable,
  Dialog,
  converters
} from "lib";

const pushRoute = path => window.history.pushState([], "", path);
const toDate = converters.toDate;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    // props.getDashboards();
    this.state = {
      items: [
        {
          displayName: "DASHBOARD 01",
          name: "dashboard_01",
          createdAt: "2017-12-12T09:38:38.710Z",
          modifiedAt: "2017-12-23T03:48:30.530Z"
        },
        {
          displayName: "DASHBOARD 02",
          name: "dashboard_02",
          createdAt: "2017-12-12T09:38:38.710Z",
          modifiedAt: "2017-12-23T03:48:30.530Z"
        },
        {
          displayName: "DASHBOARD 03",
          name: "dashboard_03",
          createdAt: "2017-12-12T09:38:38.710Z",
          modifiedAt: "2017-12-23T03:48:30.530Z"
        },
        {
          displayName: "DASHBOARD 04",
          name: "dashboard_04",
          createdAt: "2017-12-12T09:38:38.710Z",
          modifiedAt: "2017-12-23T03:48:30.530Z"
        },
        {
          displayName: "DASHBOARD 05",
          name: "dashboard_05",
          createdAt: "2017-12-12T09:38:38.710Z",
          modifiedAt: "2017-12-23T03:48:30.530Z"
        },
        {
          displayName: "DASHBOARD 06",
          name: "dashboard_06",
          createdAt: "2017-12-12T09:38:38.710Z",
          modifiedAt: "2017-12-23T03:48:30.530Z"
        }
      ]
    };
  }
  render() {
    const { items } = this.state;
    return (
      <Fragment>
        {this.renderMenuRow()}
        <Layout.Row height={93.5} key="content">
          <Layout.Column width={15} divider>
            {this.renderSearchBar()}
          </Layout.Column>
          <Layout.Column overFlow>{this.renderData(items)}</Layout.Column>
        </Layout.Row>
      </Fragment>
    );
  }

  renderLoadingState() {
    return <NonIdealState visual={<Progress />} title="Data is loading...." />;
  }
  renderMenuRow() {
    return (
      <Layout.Row key="menu" divider sticky={{ top: 50 }}>
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/analytics/dataSource")}
          text="Data Source"
        />
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/analytics/sheets")}
          text="Sheets"
        />
        <Button.Minimal
          minimal
          onClick={pushRoute("/app/analytics/dashboard")}
          text="Dashboards"
        />
        <Button.Minimal
          icon="plus"
          intent="primary"
          text="Add New Dashboard"
          style={{ marginLeft: "auto" }}
          onClick={pushRoute("/app/analytics/dashboard/create")}
        />
        <Popover position="bottom-end">
          <Button.Minimal intent="primary" rightIcon="caret-down">
            {"Actions"}
          </Button.Minimal>
          <Menu>
            <Menu.Item
              icon="check"
              onClick={this._selectAllItems}
              text="Select All"
            />
            <Menu.Item
              icon="times"
              text="Clear selection"
              onClick={this._deselectAllItems}
            />
            <Menu.Item icon="trash" text="Delete Dashboard (s)" onClick={""} />
          </Menu>
        </Popover>
      </Layout.Row>
    );
  }

  renderSearchBar() {
    return (
      <Fragment>
        <Controls.Input
          key="search-by-dashboard"
          type="search"
          placeholder="Search By Dashboard Name"
          onChange={this.filter("name")}
        />
        <Text.Heading size={3} key="search-heading" text="General Filters" />
        <Controls.Group key="search-by-after">
          <Controls.Label text="Created on or after" />
          <Controls.Input
            type="date"
            placeholder="Search..."
            onChange={this.filter("createdAfter")}
          />
        </Controls.Group>
        <Controls.Group key="search-by-before">
          <Controls.Label text="Created on or before" />
          <Controls.Input
            type="date"
            placeholder="Search..."
            onChange={this.filter("createdBefore")}
          />
        </Controls.Group>
        <Controls.Checkbox
          key="search-by-favorite"
          text="Show starred only"
          onChange={this.filter("favorite")}
        />
        <Controls.Checkbox
          key="search-by-recent"
          text="Show Recents"
          onChange={this.filter("recent")}
        />
      </Fragment>
    );
  }
  renderData(items) {
    return (
      <HTMLTable.Container rowCount={length(items)}>
        <HTMLTable.Column render={this.renderCheckboxCol(items)} />
        <HTMLTable.Column render={this.renderDeleteCol(items)} />
        <HTMLTable.Column
          label="Name"
          width="100px"
          render={this.renderNameCol(items)}
        />
        <HTMLTable.Column
          label="Creator"
          width="100px"
          render={i =>
            compose(toDate("DD-MM-YY h:mm A"), path([i, "createdAt"]))(items)
          }
        />
        <HTMLTable.Column
          label="Modified"
          width="100px"
          render={i =>
            compose(toDate("DD-MM-YY h:mm A"), path([i, "modifiedAt"]))(items)
          }
        />
      </HTMLTable.Container>
    );
  }
  renderCheckboxCol = items => i => {
    const isSelected = pathOr(false, [i, "isSelected"], items);
    return <Controls.Checkbox value={isSelected} onChange={""} />;
  };
  renderDeleteCol = items => i => (
    <Dialog.Alert
      target={<Button.Minimal icon="trash" />}
      message={`Are you sure you want to delete ${path([i, "name"], items)}`}
      onClick={""}
    />
  );
  renderNameCol = items => i => {
    const displayName = path([i, "displayName"], items);
    return (
      <div style={{ display: "flex" }}>
        <Button.Minimal
          minimal
          intent="success"
          text={displayName}
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
          onClick={""}
        />
        <Button.Minimal
          style={{ marginLeft: "auto" }}
          icon="pencil-square-o"
          onClick={""}
        />
      </div>
    );
  };
}

const mapStateToProps = state => {
  const store = state.data;

  return {
    isLoading: store.isLoading,
    message: store.message
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDashboard: dashboardActions.creatDashboard,
      getDashboards: dashboardActions.getDashboards,
      deleteDashboard: dashboardActions.deleteDashboard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
