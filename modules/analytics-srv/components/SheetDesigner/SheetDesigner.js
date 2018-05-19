import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sheetActions } from "../../reducer";
import { sampleSchema } from "./sampleSchema";
import React, { Component, Fragment } from "react";
import { map, compose, filter, propEq, not } from "ramda";
import { Text, Button, Layout, Controls, Tag, PivotTable } from "lib";

const pushRoute = path => window.history.pushState([], "", path);
class SheetDesigner extends Component {
  state = {};
  schema = sampleSchema;
  isLoading = true;

  render() {
    return (
      <Fragment>
        {this.renderMenuRow()}
        <Layout.Row height={92} key="content">
          {this.renderSourceColumn()}
          {this.renderFilterColumn()}
          {this.renderSheetPreview()}
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
  renderSourceColumn() {
    return (
      <Layout.Column width={15} divider overFlow>
        <Text.Heading text="Data Analysis" />
        <Text.Heading text="Dimensions" />
        {map(Tag, this.getDimensionSchema(this.schema))}
        <Text.Heading text="Measures" />
        {map(Tag, this.getMeasureSchema(this.schema))}
      </Layout.Column>
    );
  }
  getDimensionSchema = schema => {
    const getProps = scheme => ({
      large: true,
      text: scheme.displayName,
      onClick: () => this.handleDimensionClick(scheme.fieldName)
    });
    return compose(map(getProps), filter(propEq("fieldType", "decimal")))(
      schema
    );
  };
  getMeasureSchema = schema => {
    const getProps = scheme => ({
      large: true,
      text: scheme.displayName,
      onClick: () => this.handleMeasureClick(scheme.fieldName)
    });
    return compose(
      map(getProps),
      filter(compose(not, propEq("fieldType", "decimal")))
    )(schema);
  };
  renderFilterColumn() {
    return (
      <Layout.Column width={15} divider overFlow>
        <Text.Heading text="Filters" />
        {this.renderFilters}
      </Layout.Column>
    );
  }
  renderFilters() {
    return;
  }
  renderSheetPreview() {
    return (
      <Layout.Column overFlow>
        <Layout.Row>
          <Controls.Input type="text" fill placeholder="Column" />
        </Layout.Row>
        <Layout.Row>
          <Controls.Input type="text" fill placeholder="Row" />
        </Layout.Row>
        <Layout.Row key="content">
          <Controls.Input
            inline
            type="text"
            name="sheetName"
            value="Sample Sheet 1"
            placeholder="New Sheet Name"
            onChange={""}
          />
        </Layout.Row>

        <Layout.Row key="table">
          <PivotTable
            valueKeys={["salesTarget, churnRate"]}
            headerKeys={[
              ["2016", "2017", "2018"],
              ["furniture", "technology", "office supplies"],
              ["consumer", "home office", "corporate"]
            ]}
            caption="Date / Category / Segment"
          />
        </Layout.Row>
      </Layout.Column>
    );
  }

  // HANDLERS
  handleDimensionClick(name) {
    return alert(name);
  }
  handleMeasureClick(name) {
    return alert(name);
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
      addSheet: sheetActions.createSheet,
      getSheets: sheetActions.getSheets,
      editSheets: sheetActions.updateSheets,
      deleteSheet: sheetActions.deleteSheet
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SheetDesigner);
