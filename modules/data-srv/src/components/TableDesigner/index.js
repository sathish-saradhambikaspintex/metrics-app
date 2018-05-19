import { assoc } from "ramda";
import { connect } from "react-redux";
import FormDesigner from "./FormDesigner";
import { bindActionCreators } from "redux";
import { tableActions } from "../../reducer";
import React, { Component, Fragment } from "react";
import TableOptionsDialog from "./TableOptionsDialog";
import { Layout, Controls, Button, Text } from "lib";

const pushRoute = path => window.history.pushState([], "", path);
const gotoDefaultRoute = pushRoute("/app/data/tables");
class TableDesigner extends Component {
  state = { inEditMode: false, workbook: null, tableName: null };
  setFormDesignerRef = ref => (this.formDesigner = ref);
  getSchema = () => this.formDesigner && this.formDesigner.getJSONSchema();

  constructor() {
    super();
    this.handleTableOptionsOnChange = this.handleTableOptionsOnChange.bind(
      this
    );
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
  }
  render() {
    return (
      <Fragment>
        {this.renderMenuRow()}
        {this.renderContentRow()}
      </Fragment>
    );
  }

  renderMenuRow() {
    const { inEditMode, tableName, workbook } = this.state;

    const saveButtonText = inEditMode ? "Update Schema" : "Save Schema";
    return (
      <Layout.Row divider key="menu" sticky={{ top: 50 }}>
        <Text.Heading size={2}>
          <Controls.Input.Editable
            type="text"
            name="tableName"
            value={tableName}
            placeholder="Table Name"
            intent="primary"
            onChange={this.handleTableOptionsOnChange}
          />
        </Text.Heading>
        <TableOptionsDialog
          workbook={workbook}
          handleChange={this.handleTableOptionsOnChange}
        />
        <Button
          type="submit"
          icon="floppy-o"
          intent="success"
          text={saveButtonText}
          onClick={this.handleSubmitButtonClick}
        />
        <Button
          icon="close"
          text="Cancel"
          intent="danger"
          onClick={pushRoute("/app/data/tables")}
        />
      </Layout.Row>
    );
  }
  renderContentRow() {
    return <FormDesigner ref={this.setFormDesignerRef} />;
  }

  // EVENTS
  handleTableOptionsOnChange({ name, value }) {
    this.setState(assoc(name, value));
  }
  handleSubmitButtonClick() {
    const { updateTable, tableName, addTable } = this.props;
    const { inEditMode, workbook } = this.state;

    console.log(this.getSchema());

    if (inEditMode) {
      return updateTable(tableName, {
        userSchema: this.getSchema(),
        workbook
      }).then(gotoDefaultRoute);
    } else {
      return addTable({
        displayName: this.state.tableName,
        userSchema: this.getSchema(),
        workbook
      }).then(gotoDefaultRoute);
    }
  }
}

const mapDispatch = dispatch =>
  bindActionCreators(
    {
      updateTable: tableActions.updateTable,
      addTable: tableActions.addTable
    },
    dispatch
  );

export default connect(null, mapDispatch)(TableDesigner);
