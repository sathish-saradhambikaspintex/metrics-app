import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dashboardActions } from "../reducer";
import { Text, Button, Layout, Card, Tag, Controls } from "lib";

const pushRoute = path => window.history.pushState([], "", path);
class DashboardDesigner extends Component {
  isLoading = true;

  render() {
    return (
      <Fragment>
        {this.renderMenuRow()}
        <Layout.Row height={92} key="content">
          <Layout.Column width={15} divider>
            {this.renderSheetsColumn()}
          </Layout.Column>
          <Layout.Column>
            <Card style={{ height: "100%" }}>
              <Controls.Input
                inline
                type="text"
                name="DashboardName"
                value="Sample Dashboard 1"
                placeholder="New Dashboard Name"
                onChange={""}
              />
            </Card>
          </Layout.Column>
        </Layout.Row>
      </Fragment>
    );
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
          icon="floppy-o"
          intent="primary"
          style={{ marginLeft: "auto" }}
          title="Save Sheet"
        />
        <Button.Minimal icon="print" intent="primary" title="Print Sheet" />
        <Button.Minimal icon="download" intent="primary" title="Export Sheet" />
        <Button.Minimal icon="close" intent="primary" title="Close Sheet" />
      </Layout.Row>
    );
  }
  renderSheetsColumn() {
    return (
      <Fragment>
        <Text.Heading key="heading" text="Data Analysis" />
        <Card>
          <Text.Heading text="Sheets" />
          <Tag onClick={true} key={"tag"} text={"Prod.Date"} large />
          <Tag onClick={true} key={"tag"} text={"Machine Count"} large />
          <Tag onClick={true} key={"tag"} text={"Machine Name"} large />
          <Tag onClick={true} key={"tag"} text={"Supervisor"} large />
          <Tag onClick={true} key={"tag"} text={"Shift"} large />
          <Tag onClick={true} key={"tag"} text={"Stoppage Reasons"} large />
        </Card>
        <Card>
          <Text.Heading text="Objects" />
          <Tag onClick={true} key={"tag"} text={"Horizontal"} large />
          <Tag onClick={true} key={"tag"} text={"Vertical"} large />
          <Tag onClick={true} key={"tag"} text={"Text"} large />
          <Tag onClick={true} key={"tag"} text={"Image"} large />
          <Tag onClick={true} key={"tag"} text={"Web Page"} large />
          <Tag onClick={true} key={"tag"} text={"Blank"} large />
        </Card>
      </Fragment>
    );
  }
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
      editDashboard: dashboardActions.updateDashboard,
      getDashboards: dashboardActions.getDashboards,
      deleteDashboard: dashboardActions.deleteDashboard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDesigner);
