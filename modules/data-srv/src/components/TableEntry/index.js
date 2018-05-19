import moment from "moment";
import { connect } from "react-redux";
import FormBuilder from "./FormBuilder";
import { bindActionCreators } from "redux";
import { tableActions } from "../../reducer";
import React, { Component, Fragment } from "react";
import { prop, toUpper, find, propEq, compose, dissoc } from "ramda";
import { NonIdealState, Layout, Progress, Button, Text, converters } from "lib";

const pushRoute = path => window.history.pushState([], "", path);
const toDate = converters.toDate;
const modifiedDuration = string =>
  moment.duration(moment(string).diff()).humanize(true);

class DataEntryForm extends Component {
  tableName;
  inEditMode = false;
  setFormRef = ref => (this.form = ref);

  constructor(props) {
    super(props);

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleSaveAndContinueClick = this.handleSaveAndContinueClick.bind(
      this
    );
    this.handleUpdateClick = this.handleUpdateClick.bind(this);

    this.tableName = prop("tableName", props);
    this.gotoTableRoute = pushRoute(`/app/data/tables/${this.tableName}`);
    props.getTable(this.tableName);
  }
  componentWillReceiveProps(nextProps) {
    const data = prop(this.tableName, nextProps.store);
    this.store = nextProps.store;
    this.isLoading = prop("isLoading", data);
    this.tableSchema = prop("userSchema", data);

    if (this.id && !this.isLoading) {
      this.inEditMode = true;
      const items = prop("items", data);
      if (items) {
        const datum = find(propEq("_id", this.id), items);
        const dissocFields = compose(
          dissoc("_id"),
          dissoc("modifiedAt"),
          dissoc("createdAt")
        );
        this.setState(dissocFields(datum));
      }
    }
  }

  render() {
    if (this.isLoading)
      return <NonIdealState title="Data is loading" visual={<Progress />} />;
    if (!this.tableSchema)
      return (
        <NonIdealState
          title="Missing table definition"
          visual="exclamation-triangle"
          description="Schema for this table has not yet been defined. Please create one to enter data into it"
        />
      );

    return (
      <Fragment>
        {this.renderMenu()}
        {this.renderForm()}
      </Fragment>
    );
  }
  renderMenu() {
    const tableDisplayName = this.store[this.tableName].displayName;
    let buttons = (
      <Fragment>
        <Button
          text="Save"
          icon="floppy-o"
          intent="success"
          key="save-button"
          onClick={this.handleSaveClick}
          style={{ marginLeft: "auto" }}
        />
        <Button
          icon="floppy-o"
          intent="primary"
          text="Save And Continue"
          key="save-continue-button"
          onClick={this.handleSaveAndContinueClick}
        />
      </Fragment>
    );

    if (this.inEditMode) {
      buttons = (
        <Button
          text="Update"
          icon="floppy-o"
          intent="success"
          key="update-button"
          onClick={this.handleUpdateClick}
          style={{ marginLeft: "auto" }}
        />
      );
    }

    return (
      <Layout.Row key="menu" divider sticky={{ top: 50 }}>
        <Text.Heading size={1} text={toUpper(tableDisplayName)} />
        {buttons}
        <Button
          icon="times"
          text="Cancel"
          intent="danger"
          onClick={pushRoute("/app/data/tables")}
        />
      </Layout.Row>
    );
  }
  renderForm() {
    const tableData = this.store[this.tableName];
    const { modifiedAt, createdAt, createdBy, count } = tableData;
    return (
      <Layout.Row key="content" height={94}>
        <Layout.Column width={75} divider overFlow>
          <FormBuilder
            ref={this.setFormRef}
            jsonSchema={this.tableSchema}
            formData={{}}
          />
        </Layout.Column>
        <Layout.Column>
          <Text.Heading size={4} text={`Created By : ${createdBy}`} />
          <Text.Heading
            size={4}
            text={`Created At : ${toDate("DD-MM-YYYY", createdAt)}`}
          />
          <Text.Heading
            size={4}
            text={`Last Modified : ${modifiedDuration(modifiedAt)}`}
          />
          <Text.Heading size={4} text={`Number of items : ${count}`} />
        </Layout.Column>
      </Layout.Row>
    );
  }

  // EVENTS
  handleSaveClick() {
    let data = {};
    if (this.form) data = this.form.getFormData();
    this.props.createDataPoint(this.tableName, data).then(this.gotoTableRoute);
  }
  handleSaveAndContinueClick() {
    let data = {};
    if (this.form) data = this.form.getFormData();
    this.props
      .createDataPoint(this.tableName, data)
      .then(() => this.setState({}));
  }
  handleUpdateClick() {
    let data = {};
    if (this.form) data = this.form.getFormData();
    this.props
      .updateDataPoint(this.tableName, this.id, data)
      .then(this.gotoTableRoute);
  }
}

const mapState = state => ({ store: state.data.tables });
const mapDispatch = dispatch =>
  bindActionCreators(
    {
      getTable: tableActions.getTable,
      createDataPoint: tableActions.createDataPoint,
      updateDataPoint: tableActions.updateDataPoint
    },
    dispatch
  );

export default connect(mapState, mapDispatch)(DataEntryForm);
